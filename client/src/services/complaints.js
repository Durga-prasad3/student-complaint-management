import {
    collection,
    doc,
    onSnapshot,
    query,
    runTransaction,
    serverTimestamp,
    setDoc,
    where
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getFirebaseFirestore, getFirebaseStorage } from "./firebase";

export const COMPLAINT_STATUSES = [
    "Submitted",
    "Under Review",
    "Assigned",
    "In Progress",
    "Resolved",
    "Closed"
];

export const COMPLAINT_PRIORITIES = ["Low", "Medium", "High", "Critical"];

function formatDate(value) {
    const date = value?.toDate ? value.toDate() : new Date(value || Date.now());
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function mapComplaint(snapshot) {
    const data = snapshot.data();
    return {
        ...data,
        firestoreId: snapshot.id,
        id: data.code || snapshot.id,
        student: data.studentName || "Student",
        staff: data.assignedStaff || "Not Assigned",
        assignedTo: data.assignedTo || "",
        date: formatDate(data.createdAt),
        assignedDate: data.assignedAt ? formatDate(data.assignedAt) : "Not Assigned"
    };
}

export function subscribeComplaints(user, onUpdate, onError) {
    const db = getFirebaseFirestore();
    let complaintsQuery = collection(db, "complaints");

    if (user.role === "student") {
        complaintsQuery = query(complaintsQuery, where("createdBy", "==", user.id));
    } else if (user.role === "staff") {
        complaintsQuery = query(complaintsQuery, where("department", "==", user.department || ""));
    }

    return onSnapshot(
        complaintsQuery,
        (snapshot) => {
            const complaints = snapshot.docs.map(mapComplaint);
            complaints.sort((first, second) => {
                const firstDate = first.createdAt?.toMillis?.() || 0;
                const secondDate = second.createdAt?.toMillis?.() || 0;
                return secondDate - firstDate;
            });
            onUpdate(complaints);
        },
        onError
    );
}

export function subscribeComplaint(id, onUpdate, onError) {
    const complaintRef = doc(getFirebaseFirestore(), "complaints", id);
    return onSnapshot(complaintRef, (snapshot) => {
        if (snapshot.exists()) {
            onUpdate(mapComplaint(snapshot));
        } else {
            onError(new Error("Complaint not found."));
        }
    }, onError);
}

export function getComplaintImageUrl(imagePath) {
    return getDownloadURL(ref(getFirebaseStorage(), imagePath));
}

export function subscribeComplaintUpdates(id, onUpdate, onError) {
    const updates = collection(getFirebaseFirestore(), "complaints", id, "updates");
    return onSnapshot(query(updates), (snapshot) => {
        const items = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
        items.sort((first, second) => {
            const firstDate = first.createdAt?.toMillis?.() || 0;
            const secondDate = second.createdAt?.toMillis?.() || 0;
            return secondDate - firstDate;
        });
        onUpdate(items);
    }, onError);
}

export function subscribeStaffMembers(onUpdate, onError) {
    const staffQuery = query(
        collection(getFirebaseFirestore(), "users"),
        where("role", "==", "staff")
    );
    return onSnapshot(staffQuery, (snapshot) => {
        onUpdate(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
    }, onError);
}

export async function addComplaintUpdate(complaint, user, message, details = {}) {
    const updateRef = doc(collection(
        getFirebaseFirestore(),
        "complaints",
        complaint.firestoreId,
        "updates"
    ));
    await setDoc(updateRef, {
        authorId: user.id,
        authorName: user.name,
        authorRole: user.role,
        type: details.type || "comment",
        message: message.trim(),
        ...details,
        createdAt: serverTimestamp()
    });
}

export async function createComplaint(user, fields, image) {
    const db = getFirebaseFirestore();
    const complaintRef = doc(collection(db, "complaints"));
    let imagePath = null;

    if (image) {
        if (!/^image\/(jpeg|png)$/.test(image.type) || image.size > 5 * 1024 * 1024) {
            throw new Error("Image must be a PNG or JPEG under 5 MB.");
        }

        imagePath = `complaint-images/${user.id}/${complaintRef.id}/attachment`;
        await uploadBytes(ref(getFirebaseStorage(), imagePath), image, {
            contentType: image.type
        });
    }

    const code = `CMP-${complaintRef.id.slice(-8).toUpperCase()}`;
    const now = new Date().toISOString();

    try {
        await setDoc(complaintRef, {
            code,
            createdBy: user.id,
            studentName: user.name,
            title: fields.title.trim(),
            description: fields.description.trim(),
            category: fields.category.trim(),
            location: fields.location.trim(),
            priority: fields.priority,
            status: "Submitted",
            department: fields.department.trim(),
            assignedStaff: "Not Assigned",
            assignedTo: null,
            imagePath,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            history: [{
                status: "Submitted",
                note: "Complaint submitted",
                updatedBy: user.id,
                updatedByName: user.name,
                createdAt: now
            }]
        });
    } catch (error) {
        if (imagePath) {
            await deleteObject(ref(getFirebaseStorage(), imagePath)).catch(() => {});
        }
        throw error;
    }

    return { id: complaintRef.id, code };
}

export async function updateComplaint(complaint, user, changes, note = "Status updated") {
    const db = getFirebaseFirestore();
    const complaintRef = doc(db, "complaints", complaint.firestoreId);
    const supportedChanges = {};

    for (const field of ["status", "priority", "department", "assignedStaff", "assignedTo"]) {
        if (Object.hasOwn(changes, field)) {
            supportedChanges[field] = changes[field];
        }
    }

    if (supportedChanges.status && !COMPLAINT_STATUSES.includes(supportedChanges.status)) {
        throw new Error("Invalid complaint status.");
    }
    if (supportedChanges.priority && !COMPLAINT_PRIORITIES.includes(supportedChanges.priority)) {
        throw new Error("Invalid complaint priority.");
    }

    await runTransaction(db, async (transaction) => {
        const current = await transaction.get(complaintRef);
        if (!current.exists()) {
            throw new Error("Complaint not found.");
        }

        const currentData = current.data();
        const history = [...(currentData.history || [])];
        const statusChanged = supportedChanges.status && supportedChanges.status !== currentData.status;
        if (statusChanged || (note.trim() && note !== "Status updated")) {
            history.push({
                status: supportedChanges.status || currentData.status,
                note: note.trim() || "Status updated",
                updatedBy: user.id,
                updatedByName: user.name,
                createdAt: new Date().toISOString()
            });
            supportedChanges.history = history;
        }

        transaction.update(complaintRef, {
            ...supportedChanges,
            updatedAt: serverTimestamp()
        });
    });
}
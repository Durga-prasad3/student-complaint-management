import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { subscribeComplaints } from "../services/complaints";

function preferenceKey(userId) {
    return `smartCampusNotificationPrefs:${userId}`;
}

function readPreferences(userId) {
    try {
        const saved = JSON.parse(localStorage.getItem(preferenceKey(userId)));
        return {
            read: Array.isArray(saved?.read) ? saved.read : [],
            dismissed: Array.isArray(saved?.dismissed) ? saved.dismissed : []
        };
    } catch {
        return { read: [], dismissed: [] };
    }
}

function formatDate(value) {
    const date = value?.toDate ? value.toDate() : new Date(value || Date.now());
    return {
        date: date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }),
        time: date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit"
        })
    };
}

function toNotifications(complaints, preferences) {
    return complaints.flatMap((complaint) => (complaint.history || []).map((event, index) => {
        const id = `${complaint.firestoreId}:${index}`;
        const { date, time } = formatDate(event.createdAt);
        const sortValue = event.createdAt?.toDate
            ? event.createdAt.toDate().getTime()
            : new Date(event.createdAt || 0).getTime();
        return {
            id,
            type: ["Resolved", "Closed"].includes(event.status)
                ? "success"
                : complaint.priority === "Critical" ? "warning" : "status",
            title: `${complaint.id} status updated`,
            message: event.note,
            date,
            time,
            sortValue,
            read: preferences.read.includes(id)
        };
    })).filter((item) => !preferences.dismissed.includes(item.id))
        .sort((first, second) => second.sortValue - first.sortValue);
}

export function useComplaintNotifications() {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [preferencesState, setPreferencesState] = useState({
        userId: null,
        value: { read: [], dismissed: [] }
    });

    useEffect(() => {
        if (!user) return undefined;
        return subscribeComplaints(user, setComplaints, (error) => alert(error.message));
    }, [user]);

    const preferences = user?.id === preferencesState.userId
        ? preferencesState.value
        : user ? readPreferences(user.id) : { read: [], dismissed: [] };
    const notifications = toNotifications(complaints, preferences);
    const savePreferences = (next) => {
        setPreferencesState({ userId: user.id, value: next });
        localStorage.setItem(preferenceKey(user.id), JSON.stringify(next));
    };

    const markAsRead = (id) => savePreferences({
        ...preferences,
        read: [...new Set([...preferences.read, id])]
    });

    const markAllAsRead = () => savePreferences({
        ...preferences,
        read: [...new Set([...preferences.read, ...notifications.map((item) => item.id)])]
    });

    const deleteNotification = (id) => savePreferences({
        ...preferences,
        dismissed: [...new Set([...preferences.dismissed, id])]
    });

    return {
        notifications,
        unreadCount: notifications.filter((item) => !item.read).length,
        markAsRead,
        markAllAsRead,
        deleteNotification
    };
}
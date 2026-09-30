
import { useState } from "react";

import {
    FiSearch,
    FiFilter,
    FiEye,
    FiEdit3,
    FiX
} from "react-icons/fi";

import StatusBadge from "../../components/statusBadge";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function AdminComplaints() {
    const [complaints, setComplaints] = useState([
        {
            id: "CMP-1001",
            title: "Wi-Fi not working in hostel",
            category: "Wi-Fi / Internet",
            student: "Durga Prasad",
            location: "Hostel Block A",
            department: "IT Department",
            staff: "Ravi Kumar",
            priority: "High",
            status: "In Progress",
            date: "15 Sep 2026"
        },
        {
            id: "CMP-1002",
            title: "Water leakage in bathroom",
            category: "Water Supply",
            student: "Rahul Kumar",
            location: "Hostel Block B",
            department: "Civil / Infrastructure",
            staff: "Not Assigned",
            priority: "Critical",
            status: "Submitted",
            date: "12 Sep 2026"
        },
        {
            id: "CMP-1003",
            title: "Classroom fan not working",
            category: "Electrical",
            student: "Priya Sharma",
            location: "Block C - Room 204",
            department: "Electrical",
            staff: "Suresh Kumar",
            priority: "Medium",
            status: "Resolved",
            date: "10 Sep 2026"
        },
        {
            id: "CMP-1004",
            title: "Cleaning required in hostel",
            category: "Cleanliness",
            student: "Arjun Reddy",
            location: "Hostel Block A",
            department: "Hostel",
            staff: "Ramesh",
            priority: "Low",
            status: "Under Review",
            date: "08 Sep 2026"
        },
        {
            id: "CMP-1005",
            title: "Bus timing issue",
            category: "Transport",
            student: "Sai Kumar",
            location: "Main Gate",
            department: "Transport",
            staff: "Vijay",
            priority: "Medium",
            status: "In Progress",
            date: "05 Sep 2026"
        }
    ]);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");

    const [selectedComplaint, setSelectedComplaint] =
        useState(null);

    const [showManage, setShowManage] =
        useState(false);

    const [newStatus, setNewStatus] =
        useState("");

    const [newPriority, setNewPriority] =
        useState("");

    const [newDepartment, setNewDepartment] =
        useState("");

    const [newStaff, setNewStaff] =
        useState("");

    const [updateText, setUpdateText] =
        useState("");

    /*
    ========================================
    FILTER COMPLAINTS
    ========================================
    */

    const filteredComplaints = complaints.filter(
        (complaint) => {
            const matchesSearch =
                complaint.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                complaint.id
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                complaint.student
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "" ||
                complaint.status === statusFilter;

            const matchesPriority =
                priorityFilter === "" ||
                complaint.priority === priorityFilter;

            const matchesCategory =
                categoryFilter === "" ||
                complaint.category === categoryFilter;

            const matchesDepartment =
                departmentFilter === "" ||
                complaint.department === departmentFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority &&
                matchesCategory &&
                matchesDepartment
            );
        }
    );

    /*
    ========================================
    EXPORT CSV
    ========================================
    */

    const exportCSV = () => {
        if (filteredComplaints.length === 0) {
            alert("No complaints available to export.");
            return;
        }

        const headers = [
            "Complaint ID",
            "Title",
            "Student",
            "Category",
            "Department",
            "Staff",
            "Priority",
            "Status",
            "Date"
        ];

        const rows = filteredComplaints.map(
            (complaint) => [
                complaint.id,
                complaint.title,
                complaint.student,
                complaint.category,
                complaint.department,
                complaint.staff,
                complaint.priority,
                complaint.status,
                complaint.date
            ]
        );

        const csvContent = [
            headers,
            ...rows
        ]
            .map((row) =>
                row
                    .map(
                        (value) =>
                            `"${String(value ?? "").replace(
                                /"/g,
                                '""'
                            )}"`
                    )
                    .join(",")
            )
            .join("\n");

        const blob = new Blob(
            [csvContent],
            {
                type: "text/csv;charset=utf-8;"
            }
        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "smart-campus-complaints.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    /*
    ========================================
    EXPORT PDF
    ========================================
    */

    const exportPDF = () => {
        if (filteredComplaints.length === 0) {
            alert("No complaints available to export.");
            return;
        }

        const doc = new jsPDF();

        doc.setFontSize(18);

        doc.text(
            "SmartCampus Complaint Report",
            14,
            20
        );

        doc.setFontSize(10);

        doc.text(
            `Total Complaints: ${filteredComplaints.length}`,
            14,
            28
        );

        const tableData =
            filteredComplaints.map(
                (complaint) => [
                    complaint.id,
                    complaint.title,
                    complaint.student,
                    complaint.category,
                    complaint.department,
                    complaint.priority,
                    complaint.status,
                    complaint.date
                ]
            );

        autoTable(doc, {
            startY: 35,

            head: [
                [
                    "ID",
                    "Title",
                    "Student",
                    "Category",
                    "Department",
                    "Priority",
                    "Status",
                    "Date"
                ]
            ],

            body: tableData,

            styles: {
                fontSize: 7
            },

            headStyles: {
                fontSize: 7
            },

            columnStyles: {
                1: {
                    cellWidth: 35
                },

                2: {
                    cellWidth: 22
                },

                3: {
                    cellWidth: 25
                },

                4: {
                    cellWidth: 25
                }
            }
        });

        doc.save(
            "smart-campus-complaints.pdf"
        );
    };

    /*
    ========================================
    OPEN MANAGE MODAL
    ========================================
    */

    const openManage = (complaint) => {
        setSelectedComplaint(complaint);

        setNewStatus(
            complaint.status
        );

        setNewPriority(
            complaint.priority
        );

        setNewDepartment(
            complaint.department
        );

        setNewStaff(
            complaint.staff
        );

        setUpdateText("");

        setShowManage(true);
    };

    /*
    ========================================
    CLOSE MANAGE MODAL
    ========================================
    */

    const closeManage = () => {
        setShowManage(false);

        setSelectedComplaint(null);
    };

    /*
    ========================================
    SAVE CHANGES
    ========================================
    */

    const saveChanges = () => {
        if (!selectedComplaint) {
            return;
        }

        setComplaints(
            (previousComplaints) =>
                previousComplaints.map(
                    (complaint) => {
                        if (
                            complaint.id ===
                            selectedComplaint.id
                        ) {
                            return {
                                ...complaint,
                                status: newStatus,
                                priority: newPriority,
                                department:
                                    newDepartment,
                                staff: newStaff
                            };
                        }

                        return complaint;
                    }
                )
        );

        alert(
            "Complaint updated successfully!"
        );

        closeManage();
    };

    return (
        <div className="admin-complaints-page">

            {/* ========================================
                PAGE HEADER
            ======================================== */}

            <div className="dashboard-page-header">

                <div>
                    <h1>
                        All Complaints
                    </h1>

                    <p>
                        Manage and monitor all student complaints
                    </p>
                </div>

                <div className="complaint-count">
                    {filteredComplaints.length}{" "}
                    Complaints
                </div>

            </div>


            {/* ========================================
                FILTER CARD
            ======================================== */}

            <div className="complaint-filter-card">

                <div className="filter-search">

                    <FiSearch />

                    <input
                        type="text"
                        placeholder="Search by complaint, ID or student..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>


                <div className="filter-select">

                    <FiFilter />

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            All Status
                        </option>

                        <option value="Submitted">
                            Submitted
                        </option>

                        <option value="Under Review">
                            Under Review
                        </option>

                        <option value="Assigned">
                            Assigned
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Resolved">
                            Resolved
                        </option>

                        <option value="Closed">
                            Closed
                        </option>

                    </select>

                </div>


                <div className="filter-select">

                    <select
                        value={priorityFilter}
                        onChange={(e) =>
                            setPriorityFilter(
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            All Priority
                        </option>

                        <option value="Low">
                            Low
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="High">
                            High
                        </option>

                        <option value="Critical">
                            Critical
                        </option>

                    </select>

                </div>


                <div className="filter-select">

                    <select
                        value={categoryFilter}
                        onChange={(e) =>
                            setCategoryFilter(
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            All Categories
                        </option>

                        <option value="Wi-Fi / Internet">
                            Wi-Fi / Internet
                        </option>

                        <option value="Water Supply">
                            Water Supply
                        </option>

                        <option value="Electrical">
                            Electrical
                        </option>

                        <option value="Cleanliness">
                            Cleanliness
                        </option>

                        <option value="Transport">
                            Transport
                        </option>

                    </select>

                </div>


                <div className="filter-select">

                    <select
                        value={departmentFilter}
                        onChange={(e) =>
                            setDepartmentFilter(
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            All Departments
                        </option>

                        <option value="IT Department">
                            IT Department
                        </option>

                        <option value="Electrical">
                            Electrical
                        </option>

                        <option value="Civil / Infrastructure">
                            Civil / Infrastructure
                        </option>

                        <option value="Hostel">
                            Hostel
                        </option>

                        <option value="Transport">
                            Transport
                        </option>

                    </select>

                </div>

            </div>


            {/* ========================================
                ALL COMPLAINTS CARD
            ======================================== */}

            <div className="admin-all-complaints-card">

                {/* EXPORT BUTTONS */}

                <div className="admin-section-header">

                    <div>
                        <h2>
                            All Complaints
                        </h2>

                        <span className="complaint-count">
                            {filteredComplaints.length}{" "}
                            Complaints
                        </span>
                    </div>

                    <div className="export-buttons">

                        <button
                            className="export-csv-btn"
                            onClick={exportCSV}
                        >
                            📊 Export CSV
                        </button>

                        <button
                            className="export-pdf-btn"
                            onClick={exportPDF}
                        >
                            📄 Export PDF
                        </button>

                    </div>

                </div>


                {/* ========================================
                    TABLE
                ======================================== */}

                <div className="admin-table-wrapper">

                    <table className="admin-table">

                        <thead>

                            <tr>

                                <th>
                                    Complaint
                                </th>

                                <th>
                                    Student
                                </th>

                                <th>
                                    Department
                                </th>

                                <th>
                                    Staff
                                </th>

                                <th>
                                    Priority
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredComplaints.map(
                                (complaint) => (

                                    <tr
                                        key={
                                            complaint.id
                                        }
                                    >

                                        <td>

                                            <div className="admin-complaint-title">

                                                <strong>
                                                    {
                                                        complaint.title
                                                    }
                                                </strong>

                                                <span>
                                                    {
                                                        complaint.id
                                                    }

                                                    {" • "}

                                                    {
                                                        complaint.category
                                                    }
                                                </span>

                                            </div>

                                        </td>


                                        <td>
                                            {
                                                complaint.student
                                            }
                                        </td>


                                        <td>
                                            {
                                                complaint.department
                                            }
                                        </td>


                                        <td>
                                            {
                                                complaint.staff
                                            }
                                        </td>


                                        <td>

                                            <span
                                                className={`priority-badge ${complaint.priority.toLowerCase()}`}
                                            >
                                                {
                                                    complaint.priority
                                                }
                                            </span>

                                        </td>


                                        <td>

                                            <StatusBadge
                                                status={
                                                    complaint.status
                                                }
                                            />

                                        </td>


                                        <td>
                                            {
                                                complaint.date
                                            }
                                        </td>


                                        <td>

                                            <div className="admin-action-buttons">

                                                <button
                                                    className="admin-view-btn"
                                                    onClick={() =>
                                                        alert(
                                                            `Viewing ${complaint.id}`
                                                        )
                                                    }
                                                >
                                                    <FiEye />
                                                </button>


                                                <button
                                                    className="admin-edit-btn"
                                                    onClick={() =>
                                                        openManage(
                                                            complaint
                                                        )
                                                    }
                                                >
                                                    <FiEdit3 />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>


                    {filteredComplaints.length === 0 && (

                        <div className="admin-empty">
                            No complaints found.
                        </div>

                    )}

                </div>

            </div>


            {/* ========================================
                MANAGE COMPLAINT MODAL
            ======================================== */}

            {showManage &&
                selectedComplaint && (

                    <div className="admin-modal-overlay">

                        <div className="admin-modal">

                            <div className="admin-modal-header">

                                <div>

                                    <span>
                                        {
                                            selectedComplaint.id
                                        }
                                    </span>

                                    <h2>
                                        Manage Complaint
                                    </h2>

                                </div>


                                <button
                                    className="modal-close"
                                    onClick={
                                        closeManage
                                    }
                                >
                                    <FiX />
                                </button>

                            </div>


                            <div className="manage-complaint-title">

                                <h3>
                                    {
                                        selectedComplaint.title
                                    }
                                </h3>

                                <p>
                                    Reported by{" "}
                                    {
                                        selectedComplaint.student
                                    }
                                </p>

                            </div>


                            <div className="manage-grid">

                                {/* STATUS */}

                                <div className="manage-field">

                                    <label>
                                        Status
                                    </label>

                                    <select
                                        value={newStatus}
                                        onChange={(e) =>
                                            setNewStatus(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="Submitted">
                                            Submitted
                                        </option>

                                        <option value="Under Review">
                                            Under Review
                                        </option>

                                        <option value="Assigned">
                                            Assigned
                                        </option>

                                        <option value="In Progress">
                                            In Progress
                                        </option>

                                        <option value="Resolved">
                                            Resolved
                                        </option>

                                        <option value="Closed">
                                            Closed
                                        </option>

                                    </select>

                                </div>


                                {/* PRIORITY */}

                                <div className="manage-field">

                                    <label>
                                        Priority
                                    </label>

                                    <select
                                        value={newPriority}
                                        onChange={(e) =>
                                            setNewPriority(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="Low">
                                            Low
                                        </option>

                                        <option value="Medium">
                                            Medium
                                        </option>

                                        <option value="High">
                                            High
                                        </option>

                                        <option value="Critical">
                                            Critical
                                        </option>

                                    </select>

                                </div>


                                {/* DEPARTMENT */}

                                <div className="manage-field">

                                    <label>
                                        Assign Department
                                    </label>

                                    <select
                                        value={newDepartment}
                                        onChange={(e) =>
                                            setNewDepartment(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="IT Department">
                                            IT Department
                                        </option>

                                        <option value="Electrical">
                                            Electrical
                                        </option>

                                        <option value="Civil / Infrastructure">
                                            Civil / Infrastructure
                                        </option>

                                        <option value="Hostel">
                                            Hostel
                                        </option>

                                        <option value="Transport">
                                            Transport
                                        </option>

                                        <option value="Administration">
                                            Administration
                                        </option>

                                        <option value="Security">
                                            Security
                                        </option>

                                    </select>

                                </div>


                                {/* STAFF */}

                                <div className="manage-field">

                                    <label>
                                        Assign Staff
                                    </label>

                                    <select
                                        value={newStaff}
                                        onChange={(e) =>
                                            setNewStaff(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="Not Assigned">
                                            Not Assigned
                                        </option>

                                        <option value="Ravi Kumar">
                                            Ravi Kumar
                                        </option>

                                        <option value="Suresh Kumar">
                                            Suresh Kumar
                                        </option>

                                        <option value="Ramesh">
                                            Ramesh
                                        </option>

                                        <option value="Vijay">
                                            Vijay
                                        </option>

                                    </select>

                                </div>

                            </div>


                            {/* ADMIN UPDATE */}

                            <div className="manage-field">

                                <label>
                                    Add Update
                                </label>

                                <textarea
                                    rows="4"
                                    placeholder="Write an update for the student..."
                                    value={updateText}
                                    onChange={(e) =>
                                        setUpdateText(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>


                            <div className="modal-actions">

                                <button
                                    className="cancel-btn"
                                    onClick={
                                        closeManage
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    className="save-btn"
                                    onClick={
                                        saveChanges
                                    }
                                >
                                    Save Changes
                                </button>

                            </div>

                        </div>

                    </div>

                )}

        </div>
    );
}

export default AdminComplaints;


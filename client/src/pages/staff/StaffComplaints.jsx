
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaSearch,
    FaEye,
    FaPlay,
    FaCheckCircle
} from "react-icons/fa";
import StatusBadge from "../../components/statusBadge";

function StaffComplaints() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");

    const [complaints, setComplaints] = useState([
        {
            id: "CMP-1001",
            title: "Wi-Fi not working in hostel",
            description:
                "The Wi-Fi connection is not working properly in Hostel Block A.",
            category: "Wi-Fi / Internet",
            location: "Hostel Block A",
            priority: "High",
            status: "In Progress",
            date: "15 Sep 2026",
            student: "Durga Prasad",
            department: "IT Department",
            assignedDate: "15 Sep 2026"
        },
        {
            id: "CMP-1006",
            title: "Projector not working",
            description:
                "The projector in the classroom is not displaying anything.",
            category: "Electrical",
            location: "Block B - Room 301",
            priority: "Medium",
            status: "Assigned",
            date: "17 Sep 2026",
            student: "Rahul",
            department: "Electrical Department",
            assignedDate: "17 Sep 2026"
        },
        {
            id: "CMP-1007",
            title: "Network issue in lab",
            description:
                "Internet connection is unstable in CSE Lab 2.",
            category: "Wi-Fi / Internet",
            location: "CSE Lab 2",
            priority: "Critical",
            status: "In Progress",
            date: "17 Sep 2026",
            student: "Priya",
            department: "IT Department",
            assignedDate: "17 Sep 2026"
        },
        {
            id: "CMP-1008",
            title: "Computer not starting",
            description:
                "One of the computers in the lab is not turning on.",
            category: "Infrastructure",
            location: "CSE Lab 1",
            priority: "Medium",
            status: "Resolved",
            date: "16 Sep 2026",
            student: "Arjun",
            department: "IT Department",
            assignedDate: "16 Sep 2026"
        }
    ]);

    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [updateText, setUpdateText] = useState("");

    const filteredComplaints = complaints.filter((complaint) => {
        const searchValue = search.toLowerCase();

        const matchesSearch =
            complaint.id.toLowerCase().includes(searchValue) ||
            complaint.title.toLowerCase().includes(searchValue) ||
            complaint.student.toLowerCase().includes(searchValue);

        const matchesStatus =
            statusFilter === "" ||
            complaint.status === statusFilter;

        const matchesPriority =
            priorityFilter === "" ||
            complaint.priority === priorityFilter;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority
        );
    });

    const openComplaint = (complaint) => {
        setSelectedComplaint(complaint);
        setUpdateText("");
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedComplaint(null);
        setUpdateText("");
        setShowModal(false);
    };

    const changeStatus = (id, newStatus) => {
        setComplaints((previousComplaints) =>
            previousComplaints.map((complaint) => {
                if (complaint.id === id) {
                    return {
                        ...complaint,
                        status: newStatus
                    };
                }

                return complaint;
            })
        );

        if (selectedComplaint) {
            setSelectedComplaint({
                ...selectedComplaint,
                status: newStatus
            });
        }
    };

    const addProgressUpdate = () => {
        if (updateText.trim() === "") {
            alert("Please enter a progress update.");
            return;
        }

        alert(
            `Progress update added for ${selectedComplaint.id}:\n\n${updateText}`
        );

        setUpdateText("");
    };

    const handleResolve = () => {
        changeStatus(selectedComplaint.id, "Resolved");

        alert(
            `${selectedComplaint.id} has been marked as resolved.`
        );
    };

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("");
        setPriorityFilter("");
    };

    return (
        <div className="staff-complaints-page">

            <div className="dashboard-page-header">

                <div>
                    <h1>Assigned Complaints</h1>

                    <p>
                        Manage complaints assigned to your department.
                    </p>
                </div>

                <div className="complaint-count">
                    {filteredComplaints.length} Complaints
                </div>

            </div>

            <div className="complaint-filter-card">

                <div className="filter-search">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search by complaint ID, title or student..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <select
                    className="filter-select"
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                >
                    <option value="">
                        All Status
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
                </select>

                <select
                    className="filter-select"
                    value={priorityFilter}
                    onChange={(e) =>
                        setPriorityFilter(e.target.value)
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

                <button
                    className="clear-filter-btn"
                    onClick={clearFilters}
                >
                    Clear
                </button>

            </div>

            <div className="admin-all-complaints-card">

                <div className="admin-table-wrapper">

                    <table className="admin-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Complaint</th>
                                <th>Student</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Assigned</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredComplaints.map((complaint) => (

                                <tr key={complaint.id}>

                                    <td>
                                        <strong>
                                            {complaint.id}
                                        </strong>
                                    </td>

                                    <td>
                                        <div className="admin-complaint-title">

                                            {complaint.title}

                                            <small>
                                                {complaint.category}
                                            </small>

                                        </div>
                                    </td>

                                    <td>
                                        {complaint.student}
                                    </td>

                                    <td>
                                        <span
                                            className={`priority-badge ${complaint.priority.toLowerCase()}`}
                                        >
                                            {complaint.priority}
                                        </span>
                                    </td>

                                    <td>
                                        <StatusBadge
                                            status={complaint.status}
                                        />
                                    </td>

                                    <td>
                                        {complaint.assignedDate}
                                    </td>

                                    <td>

                                        <div className="staff-action-buttons">

                                            <button
                                                className="admin-view-btn"
                                                onClick={() =>
                                                    openComplaint(
                                                        complaint
                                                    )
                                                }
                                            >
                                                <FaEye />
                                                View
                                            </button>

                                            {complaint.status === "Assigned" && (
                                                <button
                                                    className="staff-start-btn"
                                                    onClick={() =>
                                                        changeStatus(
                                                            complaint.id,
                                                            "In Progress"
                                                        )
                                                    }
                                                >
                                                    <FaPlay />
                                                    Start
                                                </button>
                                            )}

                                            {complaint.status === "In Progress" && (
                                                <button
                                                    className="staff-resolve-btn"
                                                    onClick={() =>
                                                        changeStatus(
                                                            complaint.id,
                                                            "Resolved"
                                                        )
                                                    }
                                                >
                                                    <FaCheckCircle />
                                                    Resolve
                                                </button>
                                            )}

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    {filteredComplaints.length === 0 && (
                        <div className="admin-empty">

                            <h3>
                                No complaints found
                            </h3>

                            <p>
                                Try changing your search or filters.
                            </p>

                        </div>
                    )}

                </div>

            </div>

            {showModal && selectedComplaint && (

                <div className="staff-modal-overlay">

                    <div className="staff-modal">

                        <div className="staff-modal-header">

                            <div>
                                <span>
                                    {selectedComplaint.id}
                                </span>

                                <h2>
                                    {selectedComplaint.title}
                                </h2>
                            </div>

                            <button
                                className="modal-close"
                                onClick={closeModal}
                            >
                                ×
                            </button>

                        </div>

                        <div className="staff-modal-body">

                            <div className="staff-detail-grid">

                                <div>
                                    <label>
                                        Student
                                    </label>

                                    <p>
                                        {selectedComplaint.student}
                                    </p>
                                </div>

                                <div>
                                    <label>
                                        Category
                                    </label>

                                    <p>
                                        {selectedComplaint.category}
                                    </p>
                                </div>

                                <div>
                                    <label>
                                        Location
                                    </label>

                                    <p>
                                        {selectedComplaint.location}
                                    </p>
                                </div>

                                <div>
                                    <label>
                                        Department
                                    </label>

                                    <p>
                                        {selectedComplaint.department}
                                    </p>
                                </div>

                                <div>
                                    <label>
                                        Priority
                                    </label>

                                    <p>
                                        <span
                                            className={`priority-badge ${selectedComplaint.priority.toLowerCase()}`}
                                        >
                                            {selectedComplaint.priority}
                                        </span>
                                    </p>
                                </div>

                                <div>
                                    <label>
                                        Current Status
                                    </label>

                                    <p>
                                        <StatusBadge
                                            status={
                                                selectedComplaint.status
                                            }
                                        />
                                    </p>
                                </div>

                            </div>

                            <div className="staff-description">

                                <h3>
                                    Complaint Description
                                </h3>

                                <p>
                                    {selectedComplaint.description}
                                </p>

                            </div>

                            <div className="staff-status-section">

                                <h3>
                                    Update Status
                                </h3>

                                <div className="staff-status-buttons">

                                    <button
                                        className={
                                            selectedComplaint.status ===
                                            "Assigned"
                                                ? "selected"
                                                : ""
                                        }
                                        onClick={() =>
                                            changeStatus(
                                                selectedComplaint.id,
                                                "Assigned"
                                            )
                                        }
                                    >
                                        Assigned
                                    </button>

                                    <button
                                        className={
                                            selectedComplaint.status ===
                                            "In Progress"
                                                ? "selected"
                                                : ""
                                        }
                                        onClick={() =>
                                            changeStatus(
                                                selectedComplaint.id,
                                                "In Progress"
                                            )
                                        }
                                    >
                                        In Progress
                                    </button>

                                    <button
                                        className={
                                            selectedComplaint.status ===
                                            "Resolved"
                                                ? "selected"
                                                : ""
                                        }
                                        onClick={() =>
                                            changeStatus(
                                                selectedComplaint.id,
                                                "Resolved"
                                            )
                                        }
                                    >
                                        Resolved
                                    </button>

                                </div>

                            </div>

                            <div className="staff-update-section">

                                <h3>
                                    Add Progress Update
                                </h3>

                                <textarea
                                    rows="4"
                                    placeholder="Write what you have done or what is currently happening..."
                                    value={updateText}
                                    onChange={(e) =>
                                        setUpdateText(
                                            e.target.value
                                        )
                                    }
                                />

                                <button
                                    className="staff-update-btn"
                                    onClick={addProgressUpdate}
                                >
                                    Add Update
                                </button>

                            </div>

                        </div>

                        <div className="staff-modal-footer">

                            <button
                                className="cancel-btn"
                                onClick={closeModal}
                            >
                                Close
                            </button>

                            {selectedComplaint.status !==
                                "Resolved" && (
                                <button
                                    className="staff-resolve-btn large"
                                    onClick={handleResolve}
                                >
                                    <FaCheckCircle />
                                    Mark as Resolved
                                </button>
                            )}

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default StaffComplaints;


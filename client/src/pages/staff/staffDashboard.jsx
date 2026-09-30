
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaClipboardList,
    FaClock,
    FaSpinner,
    FaCheckCircle,
    FaSearch
} from "react-icons/fa";
import StatusBadge from "../../components/statusBadge";

function StaffDashboard() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const [complaints, setComplaints] = useState([
        {
            id: "CMP-1001",
            title: "Wi-Fi not working in hostel",
            category: "Wi-Fi / Internet",
            location: "Hostel Block A",
            priority: "High",
            status: "In Progress",
            date: "15 Sep 2026",
            student: "Durga Prasad"
        },
        {
            id: "CMP-1006",
            title: "Projector not working",
            category: "Electrical",
            location: "Block B - Room 301",
            priority: "Medium",
            status: "Assigned",
            date: "17 Sep 2026",
            student: "Rahul"
        },
        {
            id: "CMP-1007",
            title: "Network issue in lab",
            category: "Wi-Fi / Internet",
            location: "CSE Lab 2",
            priority: "Critical",
            status: "In Progress",
            date: "17 Sep 2026",
            student: "Priya"
        },
        {
            id: "CMP-1008",
            title: "Computer not starting",
            category: "Infrastructure",
            location: "CSE Lab 1",
            priority: "Medium",
            status: "Resolved",
            date: "16 Sep 2026",
            student: "Arjun"
        }
    ]);

    const filteredComplaints = complaints.filter((complaint) => {
        return (
            complaint.title
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            complaint.id
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            complaint.student
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    });

    const updateStatus = (id, status) => {
        setComplaints((previousComplaints) =>
            previousComplaints.map((complaint) => {
                if (complaint.id === id) {
                    return {
                        ...complaint,
                        status: status
                    };
                }

                return complaint;
            })
        );
    };

    const totalComplaints = complaints.length;

    const assignedComplaints = complaints.filter(
        (complaint) => complaint.status === "Assigned"
    ).length;

    const inProgressComplaints = complaints.filter(
        (complaint) => complaint.status === "In Progress"
    ).length;

    const resolvedComplaints = complaints.filter(
        (complaint) => complaint.status === "Resolved"
    ).length;

    return (
        <div className="staff-dashboard">

            <div className="dashboard-page-header">
                <div>
                    <h1>Staff Dashboard</h1>

                    <p>
                        Manage and resolve complaints assigned to you.
                    </p>
                </div>

                <div className="admin-date">
                    Staff Panel
                </div>
            </div>

            <div className="stats-grid">

                <div className="stat-card">
                    <div className="stat-icon blue">
                        <FaClipboardList />
                    </div>

                    <div>
                        <span>Total Assigned</span>
                        <h2>{totalComplaints}</h2>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon orange">
                        <FaClock />
                    </div>

                    <div>
                        <span>Pending Tasks</span>
                        <h2>{assignedComplaints}</h2>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon purple">
                        <FaSpinner />
                    </div>

                    <div>
                        <span>In Progress</span>
                        <h2>{inProgressComplaints}</h2>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon green">
                        <FaCheckCircle />
                    </div>

                    <div>
                        <span>Resolved</span>
                        <h2>{resolvedComplaints}</h2>
                    </div>
                </div>

            </div>

            <div className="staff-complaints-card">

                <div className="admin-section-header">

                    <div>
                        <h2>My Assigned Complaints</h2>

                        <p>
                            Complaints currently assigned to you
                        </p>
                    </div>

                    <div className="staff-search">
                        <FaSearch />

                        <input
                            type="text"
                            placeholder="Search complaints..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                </div>

                <div className="admin-table-wrapper">

                    <table className="admin-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Complaint</th>
                                <th>Student</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredComplaints.map((complaint) => (

                                <tr key={complaint.id}>

                                    <td>
                                        <strong>{complaint.id}</strong>
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
                                        {complaint.date}
                                    </td>

                                    <td>

                                        <div className="staff-action-buttons">

                                            {complaint.status === "Assigned" && (
                                                <button
                                                    className="staff-start-btn"
                                                    onClick={() =>
                                                        updateStatus(
                                                            complaint.id,
                                                            "In Progress"
                                                        )
                                                    }
                                                >
                                                    Start
                                                </button>
                                            )}

                                            {complaint.status === "In Progress" && (
                                                <button
                                                    className="staff-resolve-btn"
                                                    onClick={() =>
                                                        updateStatus(
                                                            complaint.id,
                                                            "Resolved"
                                                        )
                                                    }
                                                >
                                                    Resolve
                                                </button>
                                            )}

                                            <button
                                                className="admin-view-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/student/complaints/${complaint.id}`
                                                    )
                                                }
                                            >
                                                View
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    {filteredComplaints.length === 0 && (
                        <div className="admin-empty">
                            <h3>No complaints found</h3>

                            <p>
                                Try searching with a different keyword.
                            </p>
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default StaffDashboard;

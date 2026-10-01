import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiFileText,
    FiClock,
    FiActivity,
    FiCheckCircle
} from "react-icons/fi";

import StatusBadge from "../../components/statusBadge";
import { useAuth } from "../../context/AuthContext";
import { subscribeComplaints } from "../../services/complaints";


function StudentDashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        if (!user) return undefined;
        return subscribeComplaints(user, setComplaints, (error) => alert(error.message));
    }, [user]);

    const visibleComplaints = complaints.slice(0, 4);

    const statistics = [
        {
            title: "Total Complaints",
            value: complaints.length,
            icon: <FiFileText />
        },
        {
            title: "Pending",
            value: complaints.filter((item) => ["Submitted", "Under Review", "Assigned"].includes(item.status)).length,
            icon: <FiClock />
        },
        {
            title: "In Progress",
            value: complaints.filter((item) => item.status === "In Progress").length,
            icon: <FiActivity />
        },
        {
            title: "Resolved",
            value: complaints.filter((item) => item.status === "Resolved" || item.status === "Closed").length,
            icon: <FiCheckCircle />
        }
    ];

    return (
        <div>

            <div className="page-heading">
                <div>
                    <h2>Student Dashboard</h2>
                    <p>
                        Welcome back! Here's an overview of your complaints.
                    </p>
                </div>

                <button
             className="primary-button"
             onClick={() => navigate("/student/submit")}
            >
            + Submit Complaint
          </button>
            </div>


            <div className="statistics-grid">

                {statistics.map((item) => (
                    <div
                        className="stat-card"
                        key={item.title}
                    >

                        <div className="stat-icon">
                            {item.icon}
                        </div>

                        <div>
                            <p>{item.title}</p>
                            <h3>{item.value}</h3>
                        </div>

                    </div>
                ))}

            </div>


            <div className="dashboard-section">

                <div className="section-heading">
                    <div>
                        <h3>Recent Complaints</h3>
                        <p>
                            Your latest submitted complaints
                        </p>
                    </div>

                    <button className="view-all-button" onClick={() => navigate("/student/complaints")}>
                        View All
                    </button>
                </div>


                <div className="complaints-table-wrapper">

                    <table className="complaints-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Complaint</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Priority</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {visibleComplaints.map((complaint) => (
                                <tr key={complaint.id}>

                                    <td>
                                        <strong>
                                            {complaint.id}
                                        </strong>
                                    </td>

                                    <td>
                                        {complaint.title}
                                    </td>

                                    <td>
                                        {complaint.category}
                                    </td>

                                    <td>
                                        {complaint.date}
                                    </td>

                                    <td>
                                        <span
                                            className={`priority-badge ${String(complaint.priority || "medium").toLowerCase()}`}
                                        >
                                            {complaint.priority || "Medium"}
                                        </span>
                                    </td>

                                    <td>
                                        <StatusBadge
                                            status={complaint.status}
                                        />
                                    </td>

                                </tr>
                            ))}

                            {visibleComplaints.length === 0 && (
                                <tr><td colSpan="6">No complaints submitted yet.</td></tr>
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default StudentDashboard;
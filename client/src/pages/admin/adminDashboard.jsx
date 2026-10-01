import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

import {
    FiFileText,
    FiClock,
    FiActivity,
    FiCheckCircle,
    FiSearch,
    FiFilter,
    FiEye
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import StatusBadge from "../../components/statusBadge";
import { useAuth } from "../../context/AuthContext";
import { subscribeComplaints } from "../../services/complaints";

function AdminDashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");

    useEffect(() => {
        if (!user) return undefined;
        return subscribeComplaints(user, setComplaints, (error) => alert(error.message));
    }, [user]);

    const categoryData = Object.entries(complaints.reduce((counts, complaint) => {
        counts[complaint.category] = (counts[complaint.category] || 0) + 1;
        return counts;
    }, {})).map(([name, count]) => ({ name, complaints: count }));

    const priorityData = ["Low", "Medium", "High", "Critical"].map((name) => ({
        name,
        value: complaints.filter((complaint) => complaint.priority === name).length
    }));

    const filteredComplaints = complaints.filter((complaint) => {
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
            status === "" ||
            complaint.status === status;

        const matchesPriority =
            priority === "" ||
            complaint.priority === priority;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority
        );
    });

    return (
        <div className="admin-dashboard">

            {/* PAGE HEADER */}

            <div className="dashboard-page-header">

                <div>
                    <h1>Admin Dashboard</h1>

                    <p>
                        Monitor and manage student complaints
                    </p>
                </div>

                <div className="admin-date">
                    <FiClock />
                    <span>September 2026</span>
                </div>

            </div>


            {/* STATISTICS */}

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="stat-icon blue">
                        <FiFileText />
                    </div>

                    <div>
                        <p>Total Complaints</p>
                        <h2>{complaints.length}</h2>
                        <span className="stat-info">
                            All complaints
                        </span>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon orange">
                        <FiClock />
                    </div>

                    <div>
                        <p>Pending</p>
                        <h2>{complaints.filter((item) => ["Submitted", "Under Review", "Assigned"].includes(item.status)).length}</h2>
                        <span className="stat-info">
                            Awaiting action
                        </span>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon purple">
                        <FiActivity />
                    </div>

                    <div>
                        <p>In Progress</p>
                        <h2>{complaints.filter((item) => item.status === "In Progress").length}</h2>
                        <span className="stat-info">
                            Currently working
                        </span>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon green">
                        <FiCheckCircle />
                    </div>

                    <div>
                        <p>Resolved</p>
                        <h2>{complaints.filter((item) => ["Resolved", "Closed"].includes(item.status)).length}</h2>
                        <span className="stat-info">
                            Successfully resolved
                        </span>
                    </div>

                </div>

            </div>


            {/* CHARTS */}

            <div className="admin-chart-grid">

                {/* CATEGORY CHART */}

                <div className="admin-chart-card">

                    <div className="chart-header">

                        <div>
                            <h3>Complaints by Category</h3>

                            <p>
                                Number of complaints reported
                            </p>
                        </div>

                    </div>

                    <div className="chart-container">

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <BarChart
                                data={categoryData}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="name"
                                />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="complaints"
                                    radius={[6, 6, 0, 0]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>


                {/* PRIORITY CHART */}

                <div className="admin-chart-card">

                    <div className="chart-header">

                        <div>
                            <h3>Complaint Priority</h3>

                            <p>
                                Priority distribution
                            </p>
                        </div>

                    </div>

                    <div className="chart-container">

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <PieChart>

                                <Pie
                                    data={priorityData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >

                                    {priorityData.map(
                                        (entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                            />
                                        )
                                    )}

                                </Pie>

                                <Tooltip />

                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>


            {/* RECENT COMPLAINTS */}

            <div className="admin-complaints-card">

                <div className="admin-section-header">

                    <div>
                        <h3>Recent Complaints</h3>

                        <p>
                            Review and manage recently submitted complaints
                        </p>
                    </div>

                    <button
                        className="view-all-btn"
                        onClick={() =>
                            navigate("/admin/complaints")
                        }
                    >
                        View All
                    </button>

                </div>


                {/* SEARCH AND FILTERS */}

                <div className="admin-filters">

                    <div className="admin-search">

                        <FiSearch />

                        <input
                            type="text"
                            placeholder="Search complaint, ID or student..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>


                    <div className="admin-filter">

                        <FiFilter />

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
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

                            <option value="In Progress">
                                In Progress
                            </option>

                            <option value="Resolved">
                                Resolved
                            </option>

                        </select>

                    </div>


                    <div className="admin-filter">

                        <select
                            value={priority}
                            onChange={(e) =>
                                setPriority(e.target.value)
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

                </div>


                {/* TABLE */}

                <div className="admin-table-wrapper">

                    <table className="admin-table">

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Complaint</th>
                                <th>Student</th>
                                <th>Department</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredComplaints.length > 0 ? (

                                filteredComplaints.map(
                                    (complaint) => (

                                        <tr key={complaint.id}>

                                            <td>
                                                <strong>
                                                    {complaint.id}
                                                </strong>
                                            </td>

                                            <td>
                                                <div className="admin-complaint-title">

                                                    <strong>
                                                        {complaint.title}
                                                    </strong>

                                                    <span>
                                                        {complaint.category}
                                                    </span>

                                                </div>
                                            </td>

                                            <td>
                                                {complaint.student}
                                            </td>

                                            <td>
                                                {complaint.department}
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
                                                    status={
                                                        complaint.status
                                                    }
                                                />
                                            </td>

                                            <td>
                                                {complaint.date}
                                            </td>

                                            <td>

                                                <button
                                                    className="admin-view-btn"
                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/complaints/${complaint.firestoreId}`
                                                        )
                                                    }
                                                >
                                                    <FiEye />
                                                    View
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )

                            ) : (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="admin-empty"
                                    >
                                        No complaints found.
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;
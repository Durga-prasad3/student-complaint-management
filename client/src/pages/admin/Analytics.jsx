
import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
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
    FiCheckCircle,
    FiClock,
    FiAlertTriangle
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { subscribeComplaints } from "../../services/complaints";

function Analytics() {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        if (!user) return undefined;
        return subscribeComplaints(user, setComplaints, (error) => alert(error.message));
    }, [user]);

    const now = new Date();
    const dateOf = (value) => value?.toDate ? value.toDate() : new Date(value || 0);
    const pendingCount = complaints.filter((item) => ["Submitted", "Under Review", "Assigned"].includes(item.status)).length;
    const resolvedCount = complaints.filter((item) => ["Resolved", "Closed"].includes(item.status)).length;
    const summaryData = [
        {
            title: "Total Complaints",
            value: complaints.length,
            icon: <FiFileText />,
            className: "analytics-blue"
        },
        {
            title: "Resolved",
            value: resolvedCount,
            icon: <FiCheckCircle />,
            className: "analytics-green"
        },
        {
            title: "Pending",
            value: pendingCount,
            icon: <FiClock />,
            className: "analytics-orange"
        },
        {
            title: "Critical",
            value: complaints.filter((item) => item.priority === "Critical").length,
            icon: <FiAlertTriangle />,
            className: "analytics-red"
        }
    ];

    const monthlyData = Array.from({ length: 6 }, (_, index) => {
        const monthStart = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() - 4 + index, 1);
        const monthComplaints = complaints.filter((item) => {
            const createdAt = dateOf(item.createdAt);
            return createdAt >= monthStart && createdAt < monthEnd;
        });
        const resolved = complaints.reduce((total, item) => total + (item.history || []).filter((event) => {
            const changedAt = dateOf(event.createdAt);
            return ["Resolved", "Closed"].includes(event.status)
                && changedAt >= monthStart && changedAt < monthEnd;
        }).length, 0);
        return {
            month: monthStart.toLocaleDateString("en", { month: "short" }),
            complaints: monthComplaints.length,
            resolved
        };
    });

    const categoryData = Object.entries(complaints.reduce((counts, item) => {
        counts[item.category] = (counts[item.category] || 0) + 1;
        return counts;
    }, {})).map(([category, count]) => ({ category, complaints: count }));

    const priorityData = ["Low", "Medium", "High", "Critical"].map((name) => ({
        name,
        value: complaints.filter((item) => item.priority === name).length
    }));

    const departmentData = Object.entries(complaints.reduce((counts, item) => {
        counts[item.department] = (counts[item.department] || 0) + 1;
        return counts;
    }, {})).map(([department, count]) => ({ department, complaints: count }));

    const statusData = ["Submitted", "Under Review", "Assigned", "In Progress", "Resolved", "Closed"].map((name) => ({
        name,
        value: complaints.filter((item) => item.status === name).length
    }));

    /*
    ========================================
    PIE CHART COLORS
    ========================================
    */

    const priorityColors = [
        "#22c55e",
        "#eab308",
        "#f97316",
        "#ef4444"
    ];

    const statusColors = [
        "#3b82f6",
        "#8b5cf6",
        "#06b6d4",
        "#f97316",
        "#22c55e",
        "#64748b"
    ];

    return (
        <div className="analytics-page">

            {/* ========================================
                PAGE HEADER
            ======================================== */}

            <div className="dashboard-page-header">

                <div>
                    <h1>
                        Analytics
                    </h1>

                    <p>
                        Monitor complaint trends and system performance
                    </p>
                </div>

                <div className="analytics-date">
                    {now.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                </div>

            </div>


            {/* ========================================
                SUMMARY CARDS
            ======================================== */}

            <div className="analytics-summary-grid">

                {summaryData.map(
                    (item) => (

                        <div
                            className="analytics-summary-card"
                            key={item.title}
                        >

                            <div
                                className={`analytics-summary-icon ${item.className}`}
                            >
                                {item.icon}
                            </div>

                            <div>

                                <span>
                                    {item.title}
                                </span>

                                <h2>
                                    {item.value}
                                </h2>

                            </div>

                        </div>

                    )
                )}

            </div>


            {/* ========================================
                MONTHLY TREND
            ======================================== */}

            <div className="analytics-chart-card">

                <div className="analytics-chart-header">

                    <div>
                        <h2>
                            Complaint Trends
                        </h2>

                        <p>
                            Complaints received and resolved each month
                        </p>
                    </div>

                </div>

                <div className="analytics-chart-container">

                    <ResponsiveContainer
                        width="100%"
                        height={350}
                    >

                        <LineChart
                            data={monthlyData}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="month"
                            />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="complaints"
                                name="Complaints"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                activeDot={{
                                    r: 7
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="resolved"
                                name="Resolved"
                                stroke="#22c55e"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>


            {/* ========================================
                CATEGORY + PRIORITY
            ======================================== */}

            <div className="analytics-chart-grid">

                {/* CATEGORY */}

                <div className="analytics-chart-card">

                    <div className="analytics-chart-header">

                        <div>
                            <h2>
                                Complaints by Category
                            </h2>

                            <p>
                                Number of complaints in each category
                            </p>
                        </div>

                    </div>

                    <div className="analytics-chart-container">

                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <BarChart
                                data={categoryData}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="category"
                                />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="complaints"
                                    name="Complaints"
                                    fill="#6366f1"
                                    radius={[
                                        6,
                                        6,
                                        0,
                                        0
                                    ]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>


                {/* PRIORITY */}

                <div className="analytics-chart-card">

                    <div className="analytics-chart-header">

                        <div>
                            <h2>
                                Priority Distribution
                            </h2>

                            <p>
                                Complaints grouped by priority
                            </p>
                        </div>

                    </div>

                    <div className="analytics-chart-container">

                        <ResponsiveContainer
                            width="100%"
                            height={320}
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
                                                key={
                                                    entry.name
                                                }
                                                fill={
                                                    priorityColors[
                                                        index
                                                    ]
                                                }
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


            {/* ========================================
                DEPARTMENT + STATUS
            ======================================== */}

            <div className="analytics-chart-grid">

                {/* DEPARTMENT */}

                <div className="analytics-chart-card">

                    <div className="analytics-chart-header">

                        <div>
                            <h2>
                                Department Performance
                            </h2>

                            <p>
                                Complaints assigned to each department
                            </p>
                        </div>

                    </div>

                    <div className="analytics-chart-container">

                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <BarChart
                                data={departmentData}
                                layout="vertical"
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    type="number"
                                />

                                <YAxis
                                    type="category"
                                    dataKey="department"
                                    width={80}
                                />

                                <Tooltip />

                                <Bar
                                    dataKey="complaints"
                                    name="Complaints"
                                    fill="#06b6d4"
                                    radius={[
                                        0,
                                        6,
                                        6,
                                        0
                                    ]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>


                {/* STATUS */}

                <div className="analytics-chart-card">

                    <div className="analytics-chart-header">

                        <div>
                            <h2>
                                Status Distribution
                            </h2>

                            <p>
                                Current complaint status
                            </p>
                        </div>

                    </div>

                    <div className="analytics-chart-container">

                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <PieChart>

                                <Pie
                                    data={statusData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >

                                    {statusData.map(
                                        (entry, index) => (
                                            <Cell
                                                key={
                                                    entry.name
                                                }
                                                fill={
                                                    statusColors[
                                                        index
                                                    ]
                                                }
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


            {/* ========================================
                PERFORMANCE SUMMARY
            ======================================== */}

            <div className="analytics-performance-card">

                <div className="analytics-chart-header">

                    <div>
                        <h2>
                            Resolution Performance
                        </h2>

                        <p>
                            Overall complaint resolution statistics
                        </p>
                    </div>

                </div>


                <div className="analytics-performance-grid">

                    <div className="performance-item">

                        <span>
                            Resolution Rate
                        </span>

                        <strong>
                            50%
                        </strong>

                        <div className="performance-bar">

                            <div
                                style={{
                                    width: "50%"
                                }}
                            ></div>

                        </div>

                    </div>


                    <div className="performance-item">

                        <span>
                            Average Resolution Time
                        </span>

                        <strong>
                            2.8 Days
                        </strong>

                        <div className="performance-bar">

                            <div
                                style={{
                                    width: "70%"
                                }}
                            ></div>

                        </div>

                    </div>


                    <div className="performance-item">

                        <span>
                            Critical Resolution
                        </span>

                        <strong>
                            75%
                        </strong>

                        <div className="performance-bar">

                            <div
                                style={{
                                    width: "75%"
                                }}
                            ></div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Analytics;


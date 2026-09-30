
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

function Analytics() {
    /*
    ========================================
    SUMMARY DATA
    ========================================
    */

    const summaryData = [
        {
            title: "Total Complaints",
            value: 120,
            icon: <FiFileText />,
            className: "analytics-blue"
        },
        {
            title: "Resolved",
            value: 60,
            icon: <FiCheckCircle />,
            className: "analytics-green"
        },
        {
            title: "Pending",
            value: 32,
            icon: <FiClock />,
            className: "analytics-orange"
        },
        {
            title: "Critical",
            value: 20,
            icon: <FiAlertTriangle />,
            className: "analytics-red"
        }
    ];

    /*
    ========================================
    MONTHLY COMPLAINT DATA
    ========================================
    */

    const monthlyData = [
        {
            month: "Apr",
            complaints: 12,
            resolved: 8
        },
        {
            month: "May",
            complaints: 18,
            resolved: 12
        },
        {
            month: "Jun",
            complaints: 24,
            resolved: 17
        },
        {
            month: "Jul",
            complaints: 20,
            resolved: 15
        },
        {
            month: "Aug",
            complaints: 26,
            resolved: 21
        },
        {
            month: "Sep",
            complaints: 20,
            resolved: 17
        }
    ];

    /*
    ========================================
    CATEGORY DATA
    ========================================
    */

    const categoryData = [
        {
            category: "Wi-Fi",
            complaints: 28
        },
        {
            category: "Hostel",
            complaints: 22
        },
        {
            category: "Electrical",
            complaints: 18
        },
        {
            category: "Water",
            complaints: 15
        },
        {
            category: "Transport",
            complaints: 12
        },
        {
            category: "Other",
            complaints: 10
        }
    ];

    /*
    ========================================
    PRIORITY DATA
    ========================================
    */

    const priorityData = [
        {
            name: "Low",
            value: 20
        },
        {
            name: "Medium",
            value: 35
        },
        {
            name: "High",
            value: 25
        },
        {
            name: "Critical",
            value: 20
        }
    ];

    /*
    ========================================
    DEPARTMENT DATA
    ========================================
    */

    const departmentData = [
        {
            department: "IT",
            complaints: 35
        },
        {
            department: "Hostel",
            complaints: 25
        },
        {
            department: "Electrical",
            complaints: 20
        },
        {
            department: "Civil",
            complaints: 18
        },
        {
            department: "Transport",
            complaints: 12
        }
    ];

    /*
    ========================================
    STATUS DATA
    ========================================
    */

    const statusData = [
        {
            name: "Submitted",
            value: 18
        },
        {
            name: "Under Review",
            value: 14
        },
        {
            name: "Assigned",
            value: 10
        },
        {
            name: "In Progress",
            value: 18
        },
        {
            name: "Resolved",
            value: 45
        },
        {
            name: "Closed",
            value: 15
        }
    ];

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
                    September 2026
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



import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
    FiHome,
    FiFileText,
    FiPlusCircle,
    FiClock,
    FiBell,
    FiSettings,
    FiLogOut,
    FiBarChart2
} from "react-icons/fi";

function Sidebar({ role = "student" }) {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const studentLinks = [
        {
            name: "Dashboard",
            path: "/student/dashboard",
            icon: <FiHome />
        },
        {
            name: "My Complaints",
            path: "/student/complaints",
            icon: <FiFileText />
        },
        {
            name: "Submit Complaint",
            path: "/student/submit",
            icon: <FiPlusCircle />
        },
        {
            name: "Complaint History",
            path: "/student/history",
            icon: <FiClock />
        },
        {
            name: "Notifications",
            path: "/student/notifications",
            icon: <FiBell />
        },
        {
            name: "Settings",
            path: "/student/settings",
            icon: <FiSettings />
        }
    ];

    const adminLinks = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: <FiHome />
        },
        {
            name: "All Complaints",
            path: "/admin/complaints",
            icon: <FiFileText />
        },
        {
            name: "Analytics",
            path: "/admin/analytics",
            icon: <FiBarChart2 />
        },
        {
            name: "Notifications",
            path: "/admin/notifications",
            icon: <FiBell />
        },
        {
            name: "Settings",
            path: "/admin/settings",
            icon: <FiSettings />
        }
    ];

    const staffLinks = [
        {
            name: "Dashboard",
            path: "/staff/dashboard",
            icon: <FiHome />
        },
        {
            name: "Assigned Complaints",
            path: "/staff/complaints",
            icon: <FiFileText />
        },
        {
            name: "Notifications",
            path: "/staff/notifications",
            icon: <FiBell />
        },
        {
            name: "Settings",
            path: "/staff/settings",
            icon: <FiSettings />
        }
    ];

    const links =
        role === "admin"
            ? adminLinks
            : role === "staff"
            ? staffLinks
            : studentLinks;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside className="sidebar">

            <div className="sidebar-logo">

                <div className="logo-icon">
                    🎓
                </div>

                <div>
                    <h4>SmartCampus</h4>

                    <span>
                        {role === "admin"
                            ? "Admin Panel"
                            : role === "staff"
                            ? "Staff Panel"
                            : "Student Portal"}
                    </span>
                </div>

            </div>

            <div className="sidebar-menu">

                <p className="sidebar-title">
                    MAIN MENU
                </p>

                {links.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        <span className="sidebar-icon">
                            {link.icon}
                        </span>

                        <span>
                            {link.name}
                        </span>
                    </NavLink>
                ))}

            </div>

            <button
                className="sidebar-logout"
                onClick={handleLogout}
            >
                <FiLogOut />

                <span>
                    Logout
                </span>
            </button>

        </aside>
    );
}

export default Sidebar;



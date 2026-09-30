import {
    FiBell,
    FiSearch,
    FiUser,
    FiLogOut
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DashboardNavbar({ role = "student" }) {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const displayName = user?.name || user?.email || (role === "admin" ? "Admin" : "Student");
    const displayRole = role === "admin" ? "Administrator" : role === "staff" ? "Staff Member" : "Student User";

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <header className="dashboard-navbar">

            <div className="navbar-search">
                <FiSearch />

                <input
                    type="text"
                    placeholder="Search complaints..."
                />
            </div>

            <div className="navbar-right">

                <button className="notification-button">
                    <FiBell />
                    <span className="notification-count">
                        3
                    </span>
                </button>

                <div className="user-profile">

                    <div className="user-avatar">
                        <FiUser />
                    </div>

                    <div className="user-info">
                        <strong>
                            {displayName}
                        </strong>

                        <span>
                            {displayRole}
                        </span>
                    </div>

                    <button
                        type="button"
                        className="profile-logout"
                        onClick={handleLogout}
                    >
                        <FiLogOut />
                        <span>Logout</span>
                    </button>

                </div>

            </div>

        </header>
    );
}

export default DashboardNavbar;
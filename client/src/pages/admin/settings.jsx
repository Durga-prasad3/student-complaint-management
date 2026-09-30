
import { useState } from "react";

import {
    FiUser,
    FiLock,
    FiBell,
    FiMoon,
    FiSave,
    FiSettings
} from "react-icons/fi";

import { useTheme } from "../../context/ThemeContext";

function Settings() {

    const [profile, setProfile] = useState({
        name: "System Administrator",
        email: "admin@example.com",
        phone: "9876543210",
        role: "Administrator"
    });

    const [notifications, setNotifications] = useState({
        newComplaints: true,
        criticalComplaints: true,
        assignments: true,
        resolutions: true,
        email: true
    });

    const {
        darkMode,
        toggleDarkMode
    } = useTheme();


    const handleProfileChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });

    };


    const toggleNotification = (name) => {

        setNotifications({
            ...notifications,
            [name]: !notifications[name]
        });

    };


    const saveProfile = () => {

        alert("Admin profile saved!");

    };


    return (

        <div className="settings-page">

            <div className="settings-header">

                <div>

                    <h1>
                        Admin Settings
                    </h1>

                    <p>
                        Manage administrator preferences
                    </p>

                </div>

            </div>


            {/* PROFILE */}

            <div className="settings-card">

                <div className="settings-card-header">

                    <div className="settings-icon">
                        <FiUser />
                    </div>

                    <div>

                        <h2>
                            Administrator Profile
                        </h2>

                        <p>
                            Manage your administrator account
                        </p>

                    </div>

                </div>


                <div className="settings-grid">

                    <div className="settings-field">

                        <label>
                            Full Name
                        </label>

                        <input
                            name="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                        />

                    </div>


                    <div className="settings-field">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                        />

                    </div>


                    <div className="settings-field">

                        <label>
                            Phone
                        </label>

                        <input
                            name="phone"
                            value={profile.phone}
                            onChange={handleProfileChange}
                        />

                    </div>


                    <div className="settings-field">

                        <label>
                            Role
                        </label>

                        <input
                            value={profile.role}
                            readOnly
                        />

                    </div>

                </div>


                <button
                    className="settings-save-btn"
                    onClick={saveProfile}
                >
                    <FiSave />
                    Save Profile
                </button>

            </div>


            {/* SYSTEM NOTIFICATIONS */}

            <div className="settings-card">

                <div className="settings-card-header">

                    <div className="settings-icon">
                        <FiBell />
                    </div>

                    <div>

                        <h2>
                            System Notifications
                        </h2>

                        <p>
                            Choose important admin notifications
                        </p>

                    </div>

                </div>


                <div className="settings-options">

                    <div className="settings-option">

                        <div>

                            <strong>
                                New Complaints
                            </strong>

                            <span>
                                Notify when a new complaint is submitted
                            </span>

                        </div>

                        <button
                            className={`toggle ${
                                notifications.newComplaints
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                toggleNotification(
                                    "newComplaints"
                                )
                            }
                        >
                            <span></span>
                        </button>

                    </div>


                    <div className="settings-option">

                        <div>

                            <strong>
                                Critical Complaints
                            </strong>

                            <span>
                                Immediately notify about critical complaints
                            </span>

                        </div>

                        <button
                            className={`toggle ${
                                notifications.criticalComplaints
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                toggleNotification(
                                    "criticalComplaints"
                                )
                            }
                        >
                            <span></span>
                        </button>

                    </div>


                    <div className="settings-option">

                        <div>

                            <strong>
                                Assignment Updates
                            </strong>

                            <span>
                                Notify when complaints are assigned
                            </span>

                        </div>

                        <button
                            className={`toggle ${
                                notifications.assignments
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                toggleNotification(
                                    "assignments"
                                )
                            }
                        >
                            <span></span>
                        </button>

                    </div>


                    <div className="settings-option">

                        <div>

                            <strong>
                                Resolution Updates
                            </strong>

                            <span>
                                Notify when complaints are resolved
                            </span>

                        </div>

                        <button
                            className={`toggle ${
                                notifications.resolutions
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                toggleNotification(
                                    "resolutions"
                                )
                            }
                        >
                            <span></span>
                        </button>

                    </div>


                    <div className="settings-option">

                        <div>

                            <strong>
                                Email Notifications
                            </strong>

                            <span>
                                Receive important system notifications by email
                            </span>

                        </div>

                        <button
                            className={`toggle ${
                                notifications.email
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                toggleNotification(
                                    "email"
                                )
                            }
                        >
                            <span></span>
                        </button>

                    </div>

                </div>

            </div>


            {/* APPEARANCE */}

            <div className="settings-card">

                <div className="settings-card-header">

                    <div className="settings-icon">
                        <FiMoon />
                    </div>

                    <div>

                        <h2>
                            Appearance
                        </h2>

                        <p>
                            Customize dashboard appearance
                        </p>

                    </div>

                </div>


                <div className="settings-option">

                    <div>

                        <strong>
                            Dark Mode
                        </strong>

                        <span>
                            Use dark theme for the admin dashboard
                        </span>

                    </div>


                    <button
                        className={`toggle ${
                            darkMode
                                ? "active"
                                : ""
                        }`}
                        onClick={toggleDarkMode}
                    >
                        <span></span>
                    </button>

                </div>

            </div>


            {/* SYSTEM */}

            <div className="settings-card">

                <div className="settings-card-header">

                    <div className="settings-icon">
                        <FiSettings />
                    </div>

                    <div>

                        <h2>
                            System Preferences
                        </h2>

                        <p>
                            General complaint management settings
                        </p>

                    </div>

                </div>


                <div className="settings-options">

                    <div className="settings-option">

                        <div>

                            <strong>
                                Auto Assignment
                            </strong>

                            <span>
                                Automatically assign complaints to departments
                            </span>

                        </div>

                        <button
                            className="toggle active"
                        >
                            <span></span>
                        </button>

                    </div>


                    <div className="settings-option">

                        <div>

                            <strong>
                                Duplicate Detection
                            </strong>

                            <span>
                                Detect potentially duplicate complaints
                            </span>

                        </div>

                        <button
                            className="toggle active"
                        >
                            <span></span>
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Settings;


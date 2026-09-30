
import { useState } from "react";

import {
    FiUser,
    FiLock,
    FiBell,
    FiMoon,
    FiSave,
    FiRefreshCw
} from "react-icons/fi";

import { useTheme } from "../../context/ThemeContext";

function Settings() {

    const [profile, setProfile] = useState({
        name: "Durga Prasad",
        email: "durga@example.com",
        phone: "9876543210",
        department: "Computer Science & Engineering"
    });

    const [password, setPassword] = useState({
        current: "",
        newPassword: "",
        confirm: ""
    });

    const [notifications, setNotifications] = useState({
        complaintUpdates: true,
        comments: true,
        assignments: true,
        email: true
    });

    const {
        darkMode,
        toggleDarkMode,
        setDarkMode
    } = useTheme();

    const handleProfileChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });

    };

    const handlePasswordChange = (e) => {

        setPassword({
            ...password,
            [e.target.name]: e.target.value
        });

    };

    const handleNotificationChange = (name) => {

        setNotifications({
            ...notifications,
            [name]: !notifications[name]
        });

    };

    const saveProfile = () => {

        alert("Profile settings saved!");

    };

    const changePassword = () => {

        if (
            !password.current ||
            !password.newPassword ||
            !password.confirm
        ) {

            alert("Please fill all password fields.");

            return;
        }

        if (
            password.newPassword !==
            password.confirm
        ) {

            alert("New passwords do not match.");

            return;
        }

        alert("Password changed successfully!");

        setPassword({
            current: "",
            newPassword: "",
            confirm: ""
        });

    };

    const resetSettings = () => {

        setProfile({
            name: "Durga Prasad",
            email: "durga@example.com",
            phone: "9876543210",
            department: "Computer Science & Engineering"
        });

        setNotifications({
            complaintUpdates: true,
            comments: true,
            assignments: true,
            email: true
        });

        setDarkMode(true);

        alert("Settings reset.");

    };

    return (

        <div className="settings-page">

            {/* HEADER */}

            <div className="settings-header">

                <div>

                    <h1>
                        Settings
                    </h1>

                    <p>
                        Manage your profile and preferences
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
                            Profile Information
                        </h2>

                        <p>
                            Update your personal information
                        </p>

                    </div>

                </div>


                <div className="settings-grid">

                    <div className="settings-field">

                        <label>
                            Full Name
                        </label>

                        <input
                            type="text"
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
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={profile.phone}
                            onChange={handleProfileChange}
                        />

                    </div>


                    <div className="settings-field">

                        <label>
                            Department
                        </label>

                        <input
                            type="text"
                            name="department"
                            value={profile.department}
                            onChange={handleProfileChange}
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


            {/* PASSWORD */}

            <div className="settings-card">

                <div className="settings-card-header">

                    <div className="settings-icon">
                        <FiLock />
                    </div>

                    <div>

                        <h2>
                            Change Password
                        </h2>

                        <p>
                            Keep your account secure
                        </p>

                    </div>

                </div>


                <div className="settings-grid">

                    <div className="settings-field">

                        <label>
                            Current Password
                        </label>

                        <input
                            type="password"
                            name="current"
                            value={password.current}
                            onChange={handlePasswordChange}
                        />

                    </div>


                    <div className="settings-field">

                        <label>
                            New Password
                        </label>

                        <input
                            type="password"
                            name="newPassword"
                            value={password.newPassword}
                            onChange={handlePasswordChange}
                        />

                    </div>


                    <div className="settings-field">

                        <label>
                            Confirm New Password
                        </label>

                        <input
                            type="password"
                            name="confirm"
                            value={password.confirm}
                            onChange={handlePasswordChange}
                        />

                    </div>

                </div>


                <button
                    className="settings-save-btn"
                    onClick={changePassword}
                >
                    <FiLock />
                    Change Password
                </button>

            </div>


            {/* NOTIFICATIONS */}

            <div className="settings-card">

                <div className="settings-card-header">

                    <div className="settings-icon">
                        <FiBell />
                    </div>

                    <div>

                        <h2>
                            Notification Preferences
                        </h2>

                        <p>
                            Choose which notifications you receive
                        </p>

                    </div>

                </div>


                <div className="settings-options">

                    <div className="settings-option">

                        <div>

                            <strong>
                                Complaint Updates
                            </strong>

                            <span>
                                Receive updates when your complaint status changes
                            </span>

                        </div>

                        <button
                            className={`toggle ${
                                notifications.complaintUpdates
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                handleNotificationChange(
                                    "complaintUpdates"
                                )
                            }
                        >
                            <span></span>
                        </button>

                    </div>


                    <div className="settings-option">

                        <div>

                            <strong>
                                Comments
                            </strong>

                            <span>
                                Receive notifications when someone comments
                            </span>

                        </div>

                        <button
                            className={`toggle ${
                                notifications.comments
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                handleNotificationChange(
                                    "comments"
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
                                Know when your complaint is assigned
                            </span>

                        </div>

                        <button
                            className={`toggle ${
                                notifications.assignments
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                handleNotificationChange(
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
                                Email Notifications
                            </strong>

                            <span>
                                Receive important updates by email
                            </span>

                        </div>

                        <button
                            className={`toggle ${
                                notifications.email
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                handleNotificationChange(
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
                            Customize the application appearance
                        </p>

                    </div>

                </div>


                <div className="settings-option">

                    <div>

                        <strong>
                            Dark Mode
                        </strong>

                        <span>
                            Use dark theme throughout the application
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


            {/* RESET */}

            <div className="settings-danger-card">

                <div>

                    <strong>
                        Reset Settings
                    </strong>

                    <span>
                        Restore all settings to their default values
                    </span>

                </div>


                <button
                    className="reset-btn"
                    onClick={resetSettings}
                >
                    <FiRefreshCw />
                    Reset
                </button>

            </div>

        </div>

    );

}

export default Settings;


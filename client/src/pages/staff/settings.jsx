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

function StaffSettings() {
    const [profile, setProfile] = useState({
        name: "Staff Member",
        email: "staff@smartcampus.edu",
        phone: "9876543210",
        department: "IT Support"
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

    const { darkMode, toggleDarkMode, setDarkMode } = useTheme();

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleNotificationChange = (name) => {
        setNotifications({ ...notifications, [name]: !notifications[name] });
    };

    const saveProfile = () => {
        alert("Profile settings saved!");
    };

    const changePassword = () => {
        if (!password.current || !password.newPassword || !password.confirm) {
            alert("Please fill all password fields.");
            return;
        }

        if (password.newPassword !== password.confirm) {
            alert("New passwords do not match.");
            return;
        }

        alert("Password changed successfully!");
        setPassword({ current: "", newPassword: "", confirm: "" });
    };

    const resetSettings = () => {
        setProfile({
            name: "Staff Member",
            email: "staff@smartcampus.edu",
            phone: "9876543210",
            department: "IT Support"
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
            <div className="settings-header">
                <div>
                    <h1>Settings</h1>
                    <p>Manage your profile and preferences</p>
                </div>
            </div>

            <div className="settings-card">
                <div className="settings-card-header">
                    <div className="settings-icon">
                        <FiUser />
                    </div>

                    <div>
                        <h2>Profile Information</h2>
                        <p>Update your personal information</p>
                    </div>
                </div>

                <div className="settings-grid">
                    <div className="settings-field">
                        <label>Full Name</label>
                        <input type="text" name="name" value={profile.name} onChange={handleProfileChange} />
                    </div>

                    <div className="settings-field">
                        <label>Email</label>
                        <input type="email" name="email" value={profile.email} onChange={handleProfileChange} />
                    </div>

                    <div className="settings-field">
                        <label>Phone Number</label>
                        <input type="text" name="phone" value={profile.phone} onChange={handleProfileChange} />
                    </div>

                    <div className="settings-field">
                        <label>Department</label>
                        <input type="text" name="department" value={profile.department} onChange={handleProfileChange} />
                    </div>
                </div>

                <div className="settings-actions">
                    <button className="secondary-button" type="button" onClick={resetSettings}>
                        <FiRefreshCw />
                        Reset
                    </button>

                    <button className="primary-button" type="button" onClick={saveProfile}>
                        <FiSave />
                        Save Profile
                    </button>
                </div>
            </div>

            <div className="settings-card">
                <div className="settings-card-header">
                    <div className="settings-icon warning">
                        <FiLock />
                    </div>

                    <div>
                        <h2>Change Password</h2>
                        <p>Secure your account</p>
                    </div>
                </div>

                <div className="settings-grid">
                    <div className="settings-field">
                        <label>Current Password</label>
                        <input type="password" name="current" value={password.current} onChange={handlePasswordChange} />
                    </div>

                    <div className="settings-field">
                        <label>New Password</label>
                        <input type="password" name="newPassword" value={password.newPassword} onChange={handlePasswordChange} />
                    </div>

                    <div className="settings-field full-width">
                        <label>Confirm Password</label>
                        <input type="password" name="confirm" value={password.confirm} onChange={handlePasswordChange} />
                    </div>
                </div>

                <div className="settings-actions right">
                    <button className="primary-button" type="button" onClick={changePassword}>
                        <FiLock />
                        Update Password
                    </button>
                </div>
            </div>

            <div className="settings-card">
                <div className="settings-card-header">
                    <div className="settings-icon theme">
                        <FiMoon />
                    </div>

                    <div>
                        <h2>Appearance & Alerts</h2>
                        <p>Customize your experience</p>
                    </div>
                </div>

                <div className="toggle-list">
                    {Object.entries(notifications).map(([key, value]) => (
                        <label key={key} className="toggle-row">
                            <span>{key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase())}</span>
                            <input
                                type="checkbox"
                                checked={value}
                                onChange={() => handleNotificationChange(key)}
                            />
                        </label>
                    ))}

                    <label className="toggle-row">
                        <span>Dark mode</span>
                        <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                    </label>
                </div>

                <div className="settings-actions right">
                    <button className="secondary-button" type="button" onClick={() => setDarkMode(!darkMode)}>
                        <FiBell />
                        Toggle Theme
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StaffSettings;
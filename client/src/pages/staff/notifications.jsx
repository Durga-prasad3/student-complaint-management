import { useState } from "react";

import {
    FiBell,
    FiCheck,
    FiFileText,
    FiUserPlus,
    FiAlertCircle,
    FiCheckCircle,
    FiTrash2
} from "react-icons/fi";

function StaffNotifications() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "complaint",
            title: "New complaint assigned",
            message: "Complaint CMP-1008 has been assigned to your team for review.",
            date: "18 Sep 2026",
            time: "09:30 AM",
            read: false
        },
        {
            id: 2,
            type: "critical",
            title: "Critical complaint received",
            message: "Complaint CMP-1002 has been marked as Critical and needs urgent action.",
            date: "12 Sep 2026",
            time: "11:20 AM",
            read: false
        },
        {
            id: 3,
            type: "assignment",
            title: "Pending inspection",
            message: "Please inspect CMP-1006 in Block B before the end of the day.",
            date: "12 Sep 2026",
            time: "12:00 PM",
            read: true
        }
    ]);

    const unreadCount = notifications.filter((notification) => !notification.read).length;

    const getIcon = (type) => {
        switch (type) {
            case "complaint":
                return <FiFileText />;
            case "critical":
                return <FiAlertCircle />;
            case "assignment":
                return <FiUserPlus />;
            case "resolved":
                return <FiCheckCircle />;
            default:
                return <FiBell />;
        }
    };

    const markAsRead = (id) => {
        setNotifications((current) =>
            current.map((notification) =>
                notification.id === id ? { ...notification, read: true } : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications((current) =>
            current.map((notification) => ({ ...notification, read: true }))
        );
    };

    const deleteNotification = (id) => {
        setNotifications((current) => current.filter((notification) => notification.id !== id));
    };

    return (
        <div className="notifications-page">
            <div className="notifications-header">
                <div>
                    <h1>Staff Notifications</h1>
                    <p>Track new assignments and urgent updates.</p>
                </div>

                {unreadCount > 0 && (
                    <button className="mark-all-btn" onClick={markAllAsRead}>
                        <FiCheck />
                        Mark all as read
                    </button>
                )}
            </div>

            <div className="notification-summary">
                <div className="notification-summary-icon">
                    <FiBell />
                </div>

                <div>
                    <strong>
                        {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                    </strong>
                    <span>Important updates requiring follow-up.</span>
                </div>
            </div>

            <div className="notifications-list">
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`notification-card ${notification.read ? "read" : "unread"}`}
                        >
                            <div className={`notification-icon ${notification.type}`}>
                                {getIcon(notification.type)}
                            </div>

                            <div className="notification-content">
                                <div className="notification-title-row">
                                    <h3>{notification.title}</h3>
                                    {!notification.read && <span className="unread-dot" />}
                                </div>

                                <p>{notification.message}</p>

                                <div className="notification-time">
                                    <span>{notification.date}</span>
                                    <span>{notification.time}</span>
                                </div>
                            </div>

                            <div className="notification-actions">
                                {!notification.read && (
                                    <button type="button" onClick={() => markAsRead(notification.id)}>
                                        Mark read
                                    </button>
                                )}

                                <button type="button" className="delete-btn" onClick={() => deleteNotification(notification.id)}>
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-complaints">
                        <h3>No notifications yet</h3>
                        <p>Everything is clear for now.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StaffNotifications;
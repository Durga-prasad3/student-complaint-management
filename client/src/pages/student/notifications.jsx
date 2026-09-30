import { useEffect, useState } from "react";

import {
    FiBell,
    FiCheck,
    FiCheckCircle,
    FiClock,
    FiMessageSquare,
    FiUserPlus,
    FiAlertCircle,
    FiTrash2
} from "react-icons/fi";
import { DEFAULT_COMPLAINTS, getComplaints } from "../../utils/complaints";


function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const complaints = getComplaints();
        const seeded = complaints.length ? complaints : DEFAULT_COMPLAINTS;

        const mapped = seeded.slice(0, 5).map((complaint, index) => ({
            id: complaint.id || index + 1,
            type: complaint.status === "Resolved" || complaint.status === "Closed" ? "success" : complaint.priority === "Critical" ? "warning" : "status",
            title: complaint.status === "Resolved" || complaint.status === "Closed" ? "Complaint resolved" : "Complaint status updated",
            message: `Your complaint ${complaint.id} is currently marked as ${complaint.status}.`,
            date: complaint.date,
            time: "09:00 AM",
            read: index > 1
        }));

        setNotifications(mapped);
    }, []);


    const unreadCount =
        notifications.filter(
            (notification) => !notification.read
        ).length;


    const getIcon = (type) => {

        switch (type) {

            case "status":
                return <FiClock />;

            case "assignment":
                return <FiUserPlus />;

            case "comment":
                return <FiMessageSquare />;

            case "success":
                return <FiCheckCircle />;

            case "warning":
                return <FiAlertCircle />;

            default:
                return <FiBell />;
        }
    };


    const markAsRead = (id) => {

        setNotifications(
            notifications.map((notification) =>
                notification.id === id
                    ? {
                        ...notification,
                        read: true
                    }
                    : notification
            )
        );
    };


    const markAllAsRead = () => {

        setNotifications(
            notifications.map((notification) => ({
                ...notification,
                read: true
            }))
        );
    };


    const deleteNotification = (id) => {

        setNotifications(
            notifications.filter(
                (notification) =>
                    notification.id !== id
            )
        );
    };


    return (
        <div className="notifications-page">

            {/* HEADER */}

            <div className="notifications-header">

                <div>

                    <h1>
                        Notifications
                    </h1>

                    <p>
                        Stay updated about your complaints
                    </p>

                </div>


                {unreadCount > 0 && (

                    <button
                        className="mark-all-btn"
                        onClick={markAllAsRead}
                    >
                        <FiCheck />

                        Mark all as read
                    </button>

                )}

            </div>


            {/* NOTIFICATION SUMMARY */}

            <div className="notification-summary">

                <div className="notification-summary-icon">

                    <FiBell />

                </div>

                <div>

                    <strong>
                        {unreadCount} unread notification
                        {unreadCount !== 1 ? "s" : ""}
                    </strong>

                    <span>
                        You are all caught up with your recent activity.
                    </span>

                </div>

            </div>


            {/* NOTIFICATIONS */}

            <div className="notifications-list">

                {notifications.length > 0 ? (

                    notifications.map(
                        (notification) => (

                            <div
                                key={notification.id}
                                className={`notification-card ${
                                    notification.read
                                        ? "read"
                                        : "unread"
                                }`}
                            >

                                <div
                                    className={`notification-icon ${notification.type}`}
                                >
                                    {getIcon(
                                        notification.type
                                    )}
                                </div>


                                <div className="notification-content">

                                    <div className="notification-title-row">

                                        <h3>
                                            {
                                                notification.title
                                            }
                                        </h3>

                                        {!notification.read && (

                                            <span className="unread-dot">
                                            </span>

                                        )}

                                    </div>


                                    <p>
                                        {
                                            notification.message
                                        }
                                    </p>


                                    <div className="notification-time">

                                        <span>
                                            {
                                                notification.date
                                            }
                                        </span>

                                        <span>
                                            •
                                        </span>

                                        <span>
                                            {
                                                notification.time
                                            }
                                        </span>

                                    </div>

                                </div>


                                <div className="notification-actions">

                                    {!notification.read && (

                                        <button
                                            title="Mark as read"
                                            onClick={() =>
                                                markAsRead(
                                                    notification.id
                                                )
                                            }
                                        >
                                            <FiCheck />
                                        </button>

                                    )}


                                    <button
                                        title="Delete"
                                        onClick={() =>
                                            deleteNotification(
                                                notification.id
                                            )
                                        }
                                    >
                                        <FiTrash2 />
                                    </button>

                                </div>

                            </div>

                        )
                    )

                ) : (

                    <div className="notifications-empty">

                        <div className="empty-bell">

                            <FiBell />

                        </div>

                        <h2>
                            No notifications
                        </h2>

                        <p>
                            You're all caught up!
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}


export default Notifications;
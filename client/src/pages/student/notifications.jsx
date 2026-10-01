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
import { useComplaintNotifications } from "../../hooks/useComplaintNotifications";


function Notifications() {
    const {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification
    } = useComplaintNotifications();


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
import {
    FiBell,
    FiCheck,
    FiFileText,
    FiUserPlus,
    FiAlertCircle,
    FiCheckCircle,
    FiTrash2
} from "react-icons/fi";
import { useComplaintNotifications } from "../../hooks/useComplaintNotifications";

function StaffNotifications() {
    const {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification
    } = useComplaintNotifications();

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
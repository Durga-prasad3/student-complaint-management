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

                    <h1>
                        Admin Notifications
                    </h1>

                    <p>
                        Monitor important complaint activity
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
                        Important activity requiring your attention.
                    </span>

                </div>

            </div>


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
                            Everything is up to date.
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}


export default Notifications;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FiArrowLeft,
    FiMapPin,
    FiCalendar,
    FiUser,
    FiMessageCircle,
    FiSend,
    FiClock,
    FiStar
} from "react-icons/fi";

import StatusBadge from "../../components/statusBadge";
import { useAuth } from "../../context/AuthContext";
import {
    addComplaintUpdate,
    getComplaintImageUrl,
    subscribeComplaint,
    subscribeComplaintUpdates
} from "../../services/complaints";

function formatDateTime(value) {
    const date = value?.toDate ? value.toDate() : new Date(value || Date.now());
    return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function ComplaintDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();

    const [complaint, setComplaint] = useState(null);
    const [loadedImage, setLoadedImage] = useState({ path: "", url: "" });
    const [updates, setUpdates] = useState([]);
    const [error, setError] = useState("");
    const [comment, setComment] = useState("");

    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const submittedFeedback = updates.find((item) => item.type === "feedback") || null;
    const comments = updates.filter((item) => item.type !== "feedback");
    const timeline = complaint?.history || [];
    const imageUrl = loadedImage.path === complaint?.imagePath ? loadedImage.url : "";
    const backPath = user?.role === "admin"
        ? "/admin/complaints"
        : user?.role === "staff" ? "/staff/complaints" : "/student/complaints";

    useEffect(() => {
        if (!user || !id) return undefined;
        const stopComplaint = subscribeComplaint(id, setComplaint, (loadError) => setError(loadError.message));
        const stopUpdates = subscribeComplaintUpdates(id, setUpdates, (loadError) => setError(loadError.message));
        return () => {
            stopComplaint();
            stopUpdates();
        };
    }, [id, user]);

    useEffect(() => {
        if (!complaint?.imagePath) return undefined;

        const imagePath = complaint.imagePath;
        let active = true;
        getComplaintImageUrl(imagePath)
            .then((url) => {
                if (active) setLoadedImage({ path: imagePath, url });
            })
            .catch((imageError) => {
                if (active) setError(imageError.message);
            });
        return () => {
            active = false;
        };
    }, [complaint?.imagePath]);

    const handleComment = async (e) => {
        e.preventDefault();

        if (!comment.trim()) {
            alert("Please enter a comment.");
            return;
        }

        try {
            await addComplaintUpdate(complaint, user, comment, { type: "comment" });
            setComment("");
        } catch (updateError) {
            alert(updateError.message || "Could not add your comment.");
        }
    };

    const handleFeedback = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            alert("Please select a rating.");
            return;
        }

        if (!feedback.trim()) {
            alert("Please enter your feedback.");
            return;
        }

        try {
            await addComplaintUpdate(complaint, user, feedback.trim(), {
                type: "feedback",
                rating
            });
            setRating(0);
            setFeedback("");
        } catch (updateError) {
            alert(updateError.message || "Could not save your feedback.");
        }
    };

    if (error) return <p role="alert">{error}</p>;
    if (!complaint) return <p>Loading complaint...</p>;

    return (
        <div className="complaint-details-page">

            {/* BACK BUTTON */}

            <button
                className="back-button"
                onClick={() => navigate(backPath)}
            >
                <FiArrowLeft />
                Back to My Complaints
            </button>


            {/* HEADER */}

            <div className="details-header">

                <div>

                    <div className="complaint-id">
                        {complaint.id}
                    </div>

                    <h2>
                        {complaint.title}
                    </h2>

                    <p>
                        Submitted on {complaint.date}
                    </p>

                </div>

                <StatusBadge
                    status={complaint.status}
                />

            </div>


            {/* TOP SECTION */}

            <div className="details-grid">

                {/* COMPLAINT INFORMATION */}

                <div className="details-card">

                    <div className="card-title">
                        <h3>
                            Complaint Details
                        </h3>
                    </div>


                    <div className="details-description">

                        <h4>
                            Description
                        </h4>

                        <p>
                            {complaint.description}
                        </p>

                    </div>

                    {imageUrl && (
                        <div className="details-description">
                            <h4>Attachment</h4>
                            <a href={imageUrl} target="_blank" rel="noreferrer">
                                <img
                                    src={imageUrl}
                                    alt={`Attachment for ${complaint.title}`}
                                    style={{ maxWidth: "100%", maxHeight: 480, objectFit: "contain" }}
                                />
                            </a>
                        </div>
                    )}


                    <div className="details-info-grid">

                        <div className="info-item">

                            <span className="info-icon">
                                📂
                            </span>

                            <div>
                                <small>
                                    Category
                                </small>

                                <strong>
                                    {complaint.category}
                                </strong>
                            </div>

                        </div>


                        <div className="info-item">

                            <span className="info-icon">
                                ⚡
                            </span>

                            <div>
                                <small>
                                    Priority
                                </small>

                                <span
                                    className={`priority-badge ${complaint.priority.toLowerCase()}`}
                                >
                                    {complaint.priority}
                                </span>
                            </div>

                        </div>


                        <div className="info-item">

                            <span className="info-icon">
                                <FiMapPin />
                            </span>

                            <div>
                                <small>
                                    Location
                                </small>

                                <strong>
                                    {complaint.location}
                                </strong>
                            </div>

                        </div>


                        <div className="info-item">

                            <span className="info-icon">
                                🏢
                            </span>

                            <div>
                                <small>
                                    Department
                                </small>

                                <strong>
                                    {complaint.department}
                                </strong>
                            </div>

                        </div>


                        <div className="info-item">

                            <span className="info-icon">
                                <FiCalendar />
                            </span>

                            <div>
                                <small>
                                    Submitted
                                </small>

                                <strong>
                                    {complaint.date}
                                </strong>
                            </div>

                        </div>


                        <div className="info-item">

                            <span className="info-icon">
                                <FiUser />
                            </span>

                            <div>
                                <small>
                                    Submitted By
                                </small>

                                <strong>
                                    {complaint.student}
                                </strong>
                            </div>

                        </div>

                    </div>

                </div>


                {/* STATUS TIMELINE */}

                <div className="details-card">

                    <div className="card-title">

                        <h3>
                            Complaint Status
                        </h3>

                    </div>


                    <div className="status-timeline">

                        {timeline.map((item, index) => (

                            <div
                                className="timeline-item"
                                    key={`${item.status}-${index}`}
                            >

                                <div className="timeline-marker">

                                    <div className="timeline-dot">
                                        ✓
                                    </div>

                                    {index < timeline.length - 1 && (
                                        <div className="timeline-line" />
                                    )}

                                </div>


                                <div className="timeline-content">

                                    <div className="timeline-top">

                                        <strong>
                                            {item.status}
                                        </strong>

                                        <span>
                                            {formatDateTime(item.createdAt)}
                                        </span>

                                    </div>

                                    <p>
                                        {item.note}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>


            {/* ACTIVITY */}

            <div className="details-card activity-card">

                <div className="card-title">

                    <div>

                        <h3>
                            Activity Timeline
                        </h3>

                        <p>
                            Recent updates about this complaint
                        </p>

                    </div>

                    <FiClock />

                </div>


                {[...timeline].reverse().map((item, index) => (
                    <div className="activity-item" key={`${item.status}-${index}`}>
                        <div className="activity-dot" />
                        <div>
                            <strong>{item.status}</strong>
                            <p>{item.note}</p>
                            <small>{formatDateTime(item.createdAt)}</small>
                        </div>
                    </div>
                ))}

            </div>


            {/* COMMENTS */}

            <div className="details-card comments-card">

                <div className="card-title">

                    <div>

                        <h3>
                            Comments
                        </h3>

                        <p>
                            Discussion related to this complaint
                        </p>

                    </div>

                    <FiMessageCircle />

                </div>


                <div className="comments-list">

                    {comments.map((item) => (

                        <div
                            className="comment-item"
                            key={item.id}
                        >

                            <div className="comment-avatar">
                                {item.authorName.charAt(0)}
                            </div>

                            <div className="comment-body">

                                <div className="comment-header">

                                    <div>

                                        <strong>
                                            {item.authorName}
                                        </strong>

                                        <span>
                                            {item.authorRole}
                                        </span>

                                    </div>

                                    <small>
                                        {formatDateTime(item.createdAt)}
                                    </small>

                                </div>

                                <p>
                                    {item.message}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>


                <form
                    className="comment-form"
                    onSubmit={handleComment}
                >

                    <textarea
                        value={comment}
                        onChange={(e) =>
                            setComment(e.target.value)
                        }
                        placeholder="Write a comment..."
                        rows="3"
                    />

                    <button
                        type="submit"
                        className="primary-button"
                    >
                        <FiSend />
                        Send Comment
                    </button>

                </form>

            </div>


            {/* FEEDBACK */}

            {user.role === "student" && (complaint.status === "Resolved" ||
                complaint.status === "Closed") && (

                <div className="details-card feedback-card">

                    <div className="card-title">

                        <div>

                            <h3>
                                Student Feedback
                            </h3>

                            <p>
                                Tell us about your complaint resolution experience
                            </p>

                        </div>

                        <FiStar />

                    </div>


                    {!submittedFeedback ? (

                        <form
                            className="feedback-form"
                            onSubmit={handleFeedback}
                        >

                            <div className="rating-section">

                                <label>
                                    Rate the resolution
                                </label>

                                <div className="rating-stars-input">

                                    {[1, 2, 3, 4, 5].map((star) => (

                                        <button
                                            key={star}
                                            type="button"
                                            className={`rating-star ${
                                                star <= rating
                                                    ? "star-filled"
                                                    : "star-empty"
                                            }`}
                                            onClick={() =>
                                                setRating(star)
                                            }
                                            aria-label={`Rate ${star} stars`}
                                        >
                                            <FiStar />
                                        </button>

                                    ))}

                                </div>

                                <span className="rating-text">
                                    {rating === 0
                                        ? "Select a rating"
                                        : `${rating} out of 5 stars`}
                                </span>

                            </div>


                            <div className="feedback-input-group">

                                <label>
                                    Your feedback
                                </label>

                                <textarea
                                    value={feedback}
                                    onChange={(e) =>
                                        setFeedback(e.target.value)
                                    }
                                    placeholder="Tell us how the issue was handled..."
                                    rows="4"
                                />

                            </div>


                            <button
                                type="submit"
                                className="submit-feedback-btn"
                            >
                                <FiSend />
                                Submit Feedback
                            </button>

                        </form>

                    ) : (

                        <div className="submitted-feedback">

                            <div className="feedback-success">
                                ✓ Feedback submitted successfully
                            </div>

                            <div className="submitted-rating">

                                <span>
                                    Your Rating
                                </span>

                                <div className="rating-stars">

                                    {[1, 2, 3, 4, 5].map((star) => (

                                        <FiStar
                                            key={star}
                                            className={
                                                star <= submittedFeedback.rating
                                                    ? "star-filled"
                                                    : "star-empty"
                                            }
                                        />

                                    ))}

                                </div>

                            </div>

                            <p className="submitted-comment">
                                "{submittedFeedback.message}"
                            </p>

                        </div>

                    )}

                </div>

            )}

        </div>
    );
}

export default ComplaintDetails;


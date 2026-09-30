
import { useState } from "react";
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

function ComplaintDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [comment, setComment] = useState("");

    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [submittedFeedback, setSubmittedFeedback] = useState(null);

    const complaint = {
        id: id || "CMP-1001",
        title: "Wi-Fi not working in hostel",
        description:
            "The Wi-Fi connection has not been working properly in Hostel Block A for the last two days. Multiple students are unable to access the internet for academic work.",
        category: "Wi-Fi / Internet",
        location: "Hostel Block A - Room 204",
        priority: "High",
        department: "IT Department",
        status: "In Progress",
        date: "15 Sep 2026",
        submittedBy: "Durga Prasad"
    };

    const timeline = [
        {
            status: "Submitted",
            date: "15 Sep 2026",
            time: "09:30 AM",
            description:
                "Complaint submitted successfully by the student."
        },
        {
            status: "Under Review",
            date: "15 Sep 2026",
            time: "11:15 AM",
            description:
                "Complaint has been reviewed by the administration."
        },
        {
            status: "Assigned",
            date: "15 Sep 2026",
            time: "02:30 PM",
            description:
                "Complaint assigned to the IT Department."
        },
        {
            status: "In Progress",
            date: "16 Sep 2026",
            time: "10:00 AM",
            description:
                "IT staff started working on the reported issue."
        }
    ];

    const comments = [
        {
            name: "IT Support",
            role: "Department Staff",
            message:
                "We have started checking the network connection in Block A.",
            date: "16 Sep 2026, 10:15 AM"
        },
        {
            name: "Durga Prasad",
            role: "Student",
            message:
                "The problem is still occurring in Room 204.",
            date: "16 Sep 2026, 02:40 PM"
        }
    ];

    const handleComment = (e) => {
        e.preventDefault();

        if (!comment.trim()) {
            alert("Please enter a comment.");
            return;
        }

        console.log("New comment:", comment);

        alert("Comment added!");

        setComment("");
    };

    const handleFeedback = (e) => {
        e.preventDefault();

        if (rating === 0) {
            alert("Please select a rating.");
            return;
        }

        if (!feedback.trim()) {
            alert("Please enter your feedback.");
            return;
        }

        const feedbackData = {
            rating,
            feedback: feedback.trim()
        };

        setSubmittedFeedback(feedbackData);

        setRating(0);
        setFeedback("");

        alert("Thank you for your feedback!");
    };

    return (
        <div className="complaint-details-page">

            {/* BACK BUTTON */}

            <button
                className="back-button"
                onClick={() => navigate("/student/complaints")}
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
                                    {complaint.submittedBy}
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
                                key={item.status}
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
                                            {item.date}
                                        </span>

                                    </div>

                                    <small>
                                        {item.time}
                                    </small>

                                    <p>
                                        {item.description}
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


                <div className="activity-item">

                    <div className="activity-dot" />

                    <div>

                        <strong>
                            IT Department started working
                        </strong>

                        <p>
                            The assigned team has started
                            investigating the Wi-Fi issue.
                        </p>

                        <small>
                            16 Sep 2026 · 10:00 AM
                        </small>

                    </div>

                </div>


                <div className="activity-item">

                    <div className="activity-dot" />

                    <div>

                        <strong>
                            Complaint assigned
                        </strong>

                        <p>
                            The complaint was assigned to
                            the IT Department.
                        </p>

                        <small>
                            15 Sep 2026 · 02:30 PM
                        </small>

                    </div>

                </div>


                <div className="activity-item">

                    <div className="activity-dot" />

                    <div>

                        <strong>
                            Complaint submitted
                        </strong>

                        <p>
                            Complaint was submitted successfully.
                        </p>

                        <small>
                            15 Sep 2026 · 09:30 AM
                        </small>

                    </div>

                </div>

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

                    {comments.map((item, index) => (

                        <div
                            className="comment-item"
                            key={index}
                        >

                            <div className="comment-avatar">
                                {item.name.charAt(0)}
                            </div>

                            <div className="comment-body">

                                <div className="comment-header">

                                    <div>

                                        <strong>
                                            {item.name}
                                        </strong>

                                        <span>
                                            {item.role}
                                        </span>

                                    </div>

                                    <small>
                                        {item.date}
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

            {(complaint.status === "Resolved" ||
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
                                "{submittedFeedback.feedback}"
                            </p>

                        </div>

                    )}

                </div>

            )}

        </div>
    );
}

export default ComplaintDetails;


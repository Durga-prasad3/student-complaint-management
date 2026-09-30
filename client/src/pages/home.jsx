import {
    FaBullhorn,
    FaClock,
    FaCheckCircle,
    FaComments,
    FaArrowRight,
    FaFileAlt,
    FaUserShield,
    FaChartLine
} from "react-icons/fa";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FeatureCard from "../components/feature_Card";

function Home() {

    const features = [
        {
            icon: <FaFileAlt />,
            title: "Easy Complaint Submission",
            description:
                "Submit campus complaints quickly with details, priority and images."
        },
        {
            icon: <FaClock />,
            title: "Track Progress",
            description:
                "Follow your complaint from submission to resolution."
        },
        {
            icon: <FaComments />,
            title: "Transparent Communication",
            description:
                "Communicate with administrators through comments and updates."
        },
        {
            icon: <FaCheckCircle />,
            title: "Better Campus Life",
            description:
                "Help your institution identify and resolve campus issues efficiently."
        }
    ];

    return (
        <div>

            <Navbar />

            {/* Hero Section */}

            <section className="hero-section">

                <div className="container">

                    <div className="row align-items-center min-vh-75">

                        <div className="col-lg-7">

                            <span className="hero-badge">
                                Student Complaint Management System
                            </span>

                            <h1>
                                Your Voice
                                <span> Matters.</span>
                            </h1>

                            <p className="hero-text">
                                Report campus issues easily, track their
                                progress and stay informed until your
                                complaint is resolved.
                            </p>

                            <div className="hero-buttons">

                                <a
                                    href="/register"
                                    className="btn btn-primary btn-lg"
                                >
                                    Get Started
                                    <FaArrowRight />
                                </a>

                                <a
                                    href="/login"
                                    className="btn btn-outline-light btn-lg"
                                >
                                    Login
                                </a>

                            </div>

                        </div>

                        <div className="col-lg-5 mt-5 mt-lg-0">

                            <div className="hero-card">

                                <div className="hero-card-header">
                                    <span>Complaint Status</span>

                                    <FaBullhorn />
                                </div>

                                <div className="complaint-preview">

                                    <div className="preview-icon">
                                        <FaBullhorn />
                                    </div>

                                    <div>
                                        <h6>Wi-Fi Issue</h6>

                                        <small>
                                            Library — 2nd Floor
                                        </small>
                                    </div>

                                    <span className="status-badge">
                                        In Progress
                                    </span>

                                </div>

                                <div className="progress">

                                    <div
                                        className="progress-bar"
                                        style={{ width: "70%" }}
                                    >
                                    </div>

                                </div>

                                <div className="progress-labels">

                                    <span>Submitted</span>
                                    <span>Assigned</span>
                                    <span>Resolved</span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Features */}

            <section
                id="features"
                className="features-section"
            >

                <div className="container">

                    <div className="section-heading">

                        <span>POWERFUL FEATURES</span>

                        <h2>
                            Everything You Need
                        </h2>

                        <p>
                            A complete platform for managing
                            student complaints efficiently.
                        </p>

                    </div>

                    <div className="row g-4">

                        {features.map((feature, index) => (

                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />

                        ))}

                    </div>

                </div>

            </section>

            {/* How It Works */}

            <section
                id="how-it-works"
                className="how-section"
            >

                <div className="container">

                    <div className="section-heading">

                        <span>SIMPLE PROCESS</span>

                        <h2>
                            How It Works
                        </h2>

                        <p>
                            Report an issue and follow its progress
                            in just a few simple steps.
                        </p>

                    </div>

                    <div className="row g-4">

                        <div className="col-md-4">

                            <div className="process-card">

                                <div className="process-number">
                                    01
                                </div>

                                <FaFileAlt />

                                <h4>
                                    Submit Complaint
                                </h4>

                                <p>
                                    Describe your campus issue,
                                    select a category and priority,
                                    and optionally upload an image.
                                </p>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="process-card">

                                <div className="process-number">
                                    02
                                </div>

                                <FaUserShield />

                                <h4>
                                    Admin Reviews
                                </h4>

                                <p>
                                    The administrator reviews the
                                    complaint and assigns it to the
                                    appropriate department.
                                </p>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="process-card">

                                <div className="process-number">
                                    03
                                </div>

                                <FaCheckCircle />

                                <h4>
                                    Issue Resolved
                                </h4>

                                <p>
                                    Track the status until the issue
                                    is resolved and provide feedback
                                    about the experience.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Statistics */}

            <section className="stats-section">

                <div className="container">

                    <div className="row text-center g-4">

                        <div className="col-6 col-lg-3">

                            <div className="stat-item">

                                <FaBullhorn />

                                <h2>1,250+</h2>

                                <p>Complaints Submitted</p>

                            </div>

                        </div>

                        <div className="col-6 col-lg-3">

                            <div className="stat-item">

                                <FaCheckCircle />

                                <h2>980+</h2>

                                <p>Issues Resolved</p>

                            </div>

                        </div>

                        <div className="col-6 col-lg-3">

                            <div className="stat-item">

                                <FaClock />

                                <h2>24/7</h2>

                                <p>Complaint Tracking</p>

                            </div>

                        </div>

                        <div className="col-6 col-lg-3">

                            <div className="stat-item">

                                <FaChartLine />

                                <h2>98%</h2>

                                <p>System Availability</p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <Footer />

        </div>
    );
}

export default Home;
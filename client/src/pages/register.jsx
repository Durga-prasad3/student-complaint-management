import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaGraduationCap,
    FaUser,
    FaEnvelope,
    FaLock,
    FaUserPlus
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (form.password.length < 6) {
            alert("Password must contain at least 6 characters.");
            return;
        }

        setIsSubmitting(true);

        try {
            await register({
                name: form.name,
                email: form.email,
                password: form.password,
                role: "student"
            });

            navigate("/login");
        } catch (error) {
            alert(error.message || "Registration failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <Link to="/" className="auth-logo">
                    <FaGraduationCap />
                    SmartCampus
                </Link>

                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-icon">
                            <FaUserPlus />
                        </div>
                        <h2>Create Account</h2>
                        <p>Create your student account to get started.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaUser />
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter your name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaEnvelope />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaLock />
                                </span>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Create password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Confirm Password</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaLock />
                                </span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    placeholder="Confirm password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary auth-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating account..." : "Create Account"}
                            <FaUserPlus />
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>OR</span>
                    </div>

                    <p className="auth-footer-text">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>

                <Link to="/" className="back-home">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}

export default Register;
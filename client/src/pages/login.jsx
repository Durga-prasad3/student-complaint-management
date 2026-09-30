
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaEnvelope,
    FaLock,
    FaUserShield
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [role, setRole] = useState("student");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            alert("Please enter email and password.");
            return;
        }

        setIsSubmitting(true);

        try {
            const userData = await login({
                email: form.email,
                password: form.password,
                role
            });

            if (userData.role === "admin") {
                navigate("/admin/dashboard");
            } else if (userData.role === "staff") {
                navigate("/staff/dashboard");
            } else {
                navigate("/student/dashboard");
            }
        } catch (error) {
            alert(error.message || "Login failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">🎓</div>
                    <h1>Welcome Back</h1>
                    <p>Login to your SmartCampus account</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="auth-form-group">
                        <label>Email Address</label>
                        <div className="auth-input-wrapper">
                            <FaEnvelope />
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-form-group">
                        <label>Password</label>
                        <div className="auth-input-wrapper">
                            <FaLock />
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-form-group">
                        <label>Login As</label>
                        <div className="auth-input-wrapper">
                            <FaUserShield />
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                                <option value="staff">Staff</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="auth-submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account?</p>
                    <button
                        type="button"
                        className="auth-link-btn"
                        onClick={() => navigate("/register")}
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;


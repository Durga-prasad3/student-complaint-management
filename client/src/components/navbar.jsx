import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
            <div className="container">

                <Link
                    to="/"
                    className="navbar-brand d-flex align-items-center gap-2"
                >
                    <FaGraduationCap />
                    <span>SmartCampus</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarContent"
                >

                    <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

                        <li className="nav-item">
                            <Link
                                to="/"
                                className="nav-link"
                            >
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <a
                                href="#features"
                                className="nav-link"
                            >
                                Features
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                href="#how-it-works"
                                className="nav-link"
                            >
                                How It Works
                            </a>
                        </li>

                        <li className="nav-item">
                            <Link
                                to="/login"
                                className="btn btn-outline-light px-4"
                            >
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                to="/register"
                                className="btn btn-primary px-4"
                            >
                                Register
                            </Link>
                        </li>

                    </ul>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;
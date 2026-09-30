import {
    FaGithub,
    FaEnvelope,
    FaGraduationCap
} from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">

            <div className="container">

                <div className="row g-4">

                    <div className="col-lg-5">

                        <div className="footer-brand">
                            <FaGraduationCap />
                            <span>SmartCampus</span>
                        </div>

                        <p>
                            A modern student complaint management
                            system designed to make campus issue
                            reporting simple, transparent and efficient.
                        </p>

                    </div>

                    <div className="col-sm-6 col-lg-3">

                        <h6>Quick Links</h6>

                        <ul className="footer-links">

                            <li>
                                <a href="#features">Features</a>
                            </li>

                            <li>
                                <a href="#how-it-works">
                                    How It Works
                                </a>
                            </li>

                            <li>
                                <a href="/login">
                                    Login
                                </a>
                            </li>

                            <li>
                                <a href="/register">
                                    Register
                                </a>
                            </li>

                        </ul>

                    </div>

                    <div className="col-sm-6 col-lg-4">

                        <h6>Contact</h6>

                        <p>
                            <FaEnvelope />
                            {" "}
                            support@smartcampus.com
                        </p>

                        <div className="footer-social">

                            <a href="#">
                                <FaGithub />
                            </a>

                        </div>

                    </div>

                </div>

                <hr />

                <div className="text-center">

                    <p className="mb-0">
                        © 2026 SmartCampus. All rights reserved.
                    </p>

                </div>

            </div>

        </footer>
    );
}

export default Footer;
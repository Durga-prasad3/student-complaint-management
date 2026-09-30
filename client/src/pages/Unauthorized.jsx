
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="unauthorized-page">

            <div className="unauthorized-card">

                <div className="unauthorized-icon">
                    <FaLock />
                </div>

                <h1>Access Denied</h1>

                <p>
                    You do not have permission to access this page.
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="unauthorized-btn"
                >
                    Go to Home
                </button>

            </div>

        </div>
    );
}

export default Unauthorized;


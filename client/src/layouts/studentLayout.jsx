import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import DashboardNavbar from "../components/dashboardNavbar";

function StudentLayout() {
    return (
        <div className="dashboard-container">

            <Sidebar role="student" />

            <div className="dashboard-main">

                <DashboardNavbar role="student" />

                <main className="dashboard-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default StudentLayout;
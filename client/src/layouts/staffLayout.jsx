
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import DashboardNavbar from "../components/dashboardNavbar";

function StaffLayout() {
    return (
        <div className="dashboard-container">
            <Sidebar role="staff" />

            <div className="dashboard-main">
                <DashboardNavbar role="staff" />

                <main className="dashboard-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default StaffLayout;

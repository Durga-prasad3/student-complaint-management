import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import DashboardNavbar from "../components/dashboardNavbar";

function AdminLayout() {
    return (
        <div className="dashboard-container">

            <Sidebar role="admin" />

            <div className="dashboard-main">

                <DashboardNavbar role="admin" />

                <main className="dashboard-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default AdminLayout;
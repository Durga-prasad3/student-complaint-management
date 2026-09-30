
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Unauthorized from "./pages/Unauthorized";

import ProtectedRoute from "./components/ProtectedRoute";

import StudentLayout from "./layouts/studentLayout";
import AdminLayout from "./layouts/adminLayout";
import StaffLayout from "./layouts/staffLayout";

import StudentDashboard from "./pages/student/studentDashboard";
import SubmitComplaint from "./pages/student/submitComplaint";
import MyComplaints from "./pages/student/myCompliants";
import ComplaintDetails from "./pages/student/compliantDetails";
import Notifications from "./pages/student/notifications";
import StudentSettings from "./pages/student/settings";

import AdminDashboard from "./pages/admin/adminDashboard";
import AdminComplaints from "./pages/admin/adminCompliants";
import AdminNotifications from "./pages/admin/notifications";
import AdminSettings from "./pages/admin/settings";

import StaffDashboard from "./pages/staff/staffDashboard";
import StaffComplaints from "./pages/staff/StaffComplaints";
import StaffNotifications from "./pages/staff/notifications";
import StaffSettings from "./pages/staff/settings";
import Analytics from "./pages/admin/Analytics";
function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/unauthorized"
                    element={<Unauthorized />}
                />


                {/* STUDENT ROUTES */}

                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={["student"]}
                        />
                    }
                >
                    <Route
                        path="/student"
                        element={<StudentLayout />}
                    >
                        <Route
                            path="dashboard"
                            element={<StudentDashboard />}
                        />

                        <Route
                            path="submit"
                            element={<SubmitComplaint />}
                        />

                        <Route
                            path="complaints"
                            element={<MyComplaints />}
                        />

                        <Route
                            path="history"
                            element={<MyComplaints />}
                        />

                        <Route
                            path="complaints/:id"
                            element={<ComplaintDetails />}
                        />

                        <Route
                            path="notifications"
                            element={<Notifications />}
                        />

                        <Route
                            path="settings"
                            element={<StudentSettings />}
                        />
                    </Route>
                </Route>


                {/* ADMIN ROUTES */}

                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={["admin"]}
                        />
                    }
                >
                    <Route
                        path="/admin"
                        element={<AdminLayout />}
                    >
                        <Route
                            path="dashboard"
                            element={<AdminDashboard />}
                        />

                        <Route
                            path="complaints"
                            element={<AdminComplaints />}
                        />
                         <Route
                        path="analytics"
                        element={<Analytics />}
                         />

                        <Route
                            path="notifications"
                            element={<AdminNotifications />}
                        />

                        <Route
                            path="settings"
                            element={<AdminSettings />}
                        />
                    </Route>
                </Route>


                {/* STAFF ROUTES */}

                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={["staff"]}
                        />
                    }
                >
                    <Route
                        path="/staff"
                        element={<StaffLayout />}
                    >
                        <Route
                            path="dashboard"
                            element={<StaffDashboard />}
                        />

                        <Route
                            path="complaints"
                            element={<StaffComplaints />}
                        />

                        <Route
                            path="notifications"
                            element={<StaffNotifications />}
                        />

                        <Route
                            path="settings"
                            element={<StaffSettings />}
                        />
                    </Route>
                </Route>


                <Route
                    path="*"
                    element={<Unauthorized />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;

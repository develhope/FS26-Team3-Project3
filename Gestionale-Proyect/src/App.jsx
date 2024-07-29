import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./components/AuthContext";
import EventLogin from "./components/EventLogin";
import Settings from "./components/Settings";
import PrivateRoute from "./components/PrivateRoute";
import RegisterCompany from "./components/RegisterCompany";
import RegisterEmployee from "./components/RegisterEmployee";
import EmployeeDashboard from "./components/EmployeeDashboard";
import DashboardSupervisor from "./components/DashboardSupervisor";
import PaySlip from "./components/PaySlip";
import ManagePaySlips from "./components/ManagePaySlips";

const App = () => {
  useEffect(() => {
    const members = [
      {
        firstName: "Jimmy",
        lastName: "Saavedra",
        email: "jimmsaav@icloud.com",
        password: "12345",
        id: "E0941518441",
        role: "user",
        gender: "male",
      },
      {
        firstName: "Francesca",
        lastName: "Pischedda",
        email: "francescapischedda30@gmail.com",
        password: "girasole",
        id: "ECARTADIEDENTITA",
        role: "supervisor",
        gender: "female",
      },
      {
        firstName: "Riccardo",
        lastName: "Cuomo",
        email: "cuomo.riccardo@gmail.com",
        password: "qwerty",
        id: "RC",
        role: "user",
        gender: "male",
      },
    ];

    const storedUsers = localStorage.getItem("users");
    if (!storedUsers) {
      localStorage.setItem("users", JSON.stringify(members));
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<EventLogin />} />
          <Route path="/register-company" element={<RegisterCompany />} />
          <Route path="/register-employee" element={<RegisterEmployee />} />
          <Route
            path="/dashboard-employee"
            element={
              <PrivateRoute role="user" element={<EmployeeDashboard />} />
            }
          />
          <Route
            path="/dashboard-supervisor"
            element={
              <PrivateRoute
                role="supervisor"
                element={<DashboardSupervisor />}
              />
            }
          />
          <Route
            path="/pay-slip"
            element={<PrivateRoute role="user" element={<PaySlip />} />}
          />
          <Route
            path="/manage-pay-slips"
            element={
              <PrivateRoute role="supervisor" element={<ManagePaySlips />} />
            }
          />
          <Route path="/settings" element={<SettingsRoute />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const SettingsRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Settings /> : <Navigate to="/" />;
};

export default App;

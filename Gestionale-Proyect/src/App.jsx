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
import DashboardSupervisor from "./components/DashboardSupervisor";
import EmployeeDashboard from "./components/EmployeeDashboard";
import RegisterCompany from "./components/RegisterCompany";
import RegisterEmployee from "./components/RegisterEmployee";
import RequestLeaveForm from './components/RequestLeaveForm';
import LeaveRequestsList from './components/LeaveRequestsList';

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
        gender: "Male",
        hoursWorked: 40,
      },
      {
        firstName: "Francesca",
        lastName: "Pischedda",
        email: "francescapischedda30@gmail.com",
        password: "girasole",
        id: "ECARTADIEDENTITA",
        role: "supervisor",
        gender: "Female",
        hoursWorked: 35,
      },
      {
        firstName: "Riccardo",
        lastName: "Cuomo",
        email: "cuomo.riccardo@gmail.com",
        password: "qwerty",
        id: "RC",
        role: "user",
        gender: "Male",
        hoursWorked: 30,
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
          <Route path="/dashboard-employee" element={<EmployeeDashboardRoute />} />
          <Route path="/dashboard-supervisor" element={<DashboardSupervisorRoute />} />
          <Route path="/settings" element={<SettingsRoute />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const EmployeeDashboardRoute = () => {
  const { isAuthenticated, userRole } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (userRole === "user") {
    return <EmployeeDashboard />;
  }
  return <Navigate to="/" />;
};

const DashboardSupervisorRoute = () => {
  const { isAuthenticated, userRole } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (userRole === "supervisor") {
    return <DashboardSupervisor />;
  }
  return <Navigate to="/" />;
};

const SettingsRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Settings /> : <Navigate to="/" />;
};

export default App;

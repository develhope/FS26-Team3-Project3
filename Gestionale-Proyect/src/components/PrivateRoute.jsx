import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import EmployeeDashboard from "./EmployeeDashboard";
import DashboardSupervisor from "./DashboardSupervisor";

const PrivateRoute = ({ role }) => {
  const { isAuthenticated, userRole } = useAuth();
  if (!isAuthenticated || userRole !== role) {
    return <Navigate to="/" />;
  }
  return role === "supervisor" ? (
    <DashboardSupervisor />
  ) : (
    <EmployeeDashboard />
  );
};

export default PrivateRoute;

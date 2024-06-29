import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import EmployeeDashboard from "./EmployeeDashboard";
import DashboardSupervisor from "./DashboardSupervisor";

const PrivateRoute = ({ role }) => {
  const { isAuthenticated, userRole } = useAuth();
  console.log("PrivateRoute - isAuthenticated:", isAuthenticated);
  console.log("PrivateRoute - userRole:", userRole);
  console.log("PrivateRoute - required role:", role);

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
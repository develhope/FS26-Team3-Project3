import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ element: Component, role, ...rest }) => {
  const { isAuthenticated, userRole } = useAuth();
  const location = useLocation();
  if (!isAuthenticated || userRole !== role) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return Component;
};

export default PrivateRoute;

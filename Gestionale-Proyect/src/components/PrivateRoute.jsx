import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const { isAuthenticated, userRole } = useAuth();

  console.log("PrivateRoute - isAuthenticated:", isAuthenticated);
  console.log("PrivateRoute - userRole:", userRole);
  console.log("PrivateRoute - required role:", role);

  if (!isAuthenticated || userRole !== role) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;



import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ element: Component, role, ...rest }) => {
  const { isAuthenticated, userRole } = useAuth();
  const location = useLocation(); // Per mantenere la posizione corrente quando si reindirizza

  console.log("PrivateRoute - isAuthenticated:", isAuthenticated);
  console.log("PrivateRoute - userRole:", userRole);
  console.log("PrivateRoute - required role:", role);

  if (!isAuthenticated || userRole !== role) {
    // Passa la location corrente per permettere il reindirizzamento dopo il login
    return <Navigate to="/" state={{ from: location }} />;
  }

  return Component;
};

export default PrivateRoute;

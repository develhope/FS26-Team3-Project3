import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ role, component: Component, ...rest }) => {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <Route
      {...rest}
      element={
        isAuthenticated && userRole === role ? (
          <Component />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;

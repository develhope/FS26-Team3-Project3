import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element: Component, path, ...rest }) => {
  const { isAuthenticated, userRole } = useAuth();
  
  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Component />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;



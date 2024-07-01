import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("isAuthenticated")
  );
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const login = (user) => {
    console.log("Logging in user:", user);
    setIsAuthenticated(true);
    setUserRole(user.role);
    setLoggedInUser(user);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };

  const logout = () => {
    console.log("Logging out");
    setIsAuthenticated(false);
    setUserRole(null);
    setLoggedInUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, loggedInUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

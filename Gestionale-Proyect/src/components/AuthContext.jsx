import React, { createContext, useContext, useState } from "react";

// Creación del contexto de autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("isAuthenticated")
  );
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  const login = (role) => {
    console.log("Login called with role:", role);
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
  };

  const logout = () => {
    console.log("Logout called");
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
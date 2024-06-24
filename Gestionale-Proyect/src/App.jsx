import React, { useEffect, createContext, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import EventLogin from "./components/EventLogin";
import EmployeeDashboard from "./components/EmployeeDashboard";
import DashboardSupervisor from "./components/DashboardSupervisor";
import Settings from "./components/Settings";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("isAuthenticated")
  );
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  const login = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("userRole", role);
  };

  const logout = () => {
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

const useAuth = () => useContext(AuthContext);

const App = () => {
  useEffect(() => {
    const members = [
      {
        Nombre: "Jimmy",
        Apellido: "Saavedra",
        Correo: "jimmsaav@icloud.com",
        Password: "12345",
        Id: "E0941518441",
        Role: "user",
      },
      {
        Nombre: "Francesca",
        Apellido: "Pischedda",
        Correo: "francescapischedda30@gmail.com",
        Password: "girasole",
        Id: "ECARTADIEDENTITA",
        Role: "supervisor",
      },
      {
        Nombre: "Riccardo",
        Apellido: "Cuomo",
        Correo: "cuomo.riccardo@gmail.com",
        Password: "qwerty",
        Id: "RC",
        Role: "user",
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
          <Route path="/dashboard" element={<PrivateRoute />} />
          <Route path="/settings" element={<SettingsRoute />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const PrivateRoute = () => {
  const { isAuthenticated, userRole } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return userRole === "supervisor" ? (
    <DashboardSupervisor />
  ) : (
    <EmployeeDashboard />
  );
};

const SettingsRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Settings /> : <Navigate to="/" />;
};

export default App;
export { useAuth };

import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import EventLogin from "./components/EventLogin";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";

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

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventLogin />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={isAuthenticated ? <Settings /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;

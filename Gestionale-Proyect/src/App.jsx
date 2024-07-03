import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/AuthContext";
import EventLogin from "./components/EventLogin";
import Settings from "./components/Settings";
import PrivateRoute from "./components/PrivateRoute";
import RegistrationComponent from "./components/RegistrationComponent";

const App = () => {
  useEffect(() => {
    const members = [
      {
        firstName: "Jimmy",
        lastName: "Saavedra",
        email: "jimmsaav@icloud.com",
        password: "12345",
        id: "E0941518441",
        role: "user",
      },
      {
        firstName: "Francesca",
        lastName: "Pischedda",
        email: "francescapischedda30@gmail.com",
        password: "girasole",
        id: "ECARTADIEDENTITA",
        role: "supervisor",
      },
      {
        firstName: "Riccardo",
        lastName: "Cuomo",
        email: "cuomo.riccardo@gmail.com",
        password: "qwerty",
        id: "RC",
        role: "user",
      },
      {
        firstName: "Giorgio",
        lastName: "Quintavalle",
        email: "quintavalle.giorgio@yahoo.it",
        password: "ciaociao",
        id: "1234",
        role: "user",
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
          <Route
            path="/dashboard-employee"
            element={<PrivateRoute role="user" />}
          />
          <Route
            path="/dashboard-supervisor"
            element={<PrivateRoute role="supervisor" />}
          />
          <Route path="/settings" element={<SettingsRoute />} />
          <Route path="/registrationForm" element={< RegistrationComponent />}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const SettingsRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Settings /> : <Navigate to="/" />;
};

export default App;
import React from "react";
import LoginComponent from "./LoginComponent";

const EventLogin = () => {
  const handleLogin = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(user => user.Correo === email && user.Password === password);

    if (user) {
      localStorage.setItem('isAuthenticated', true);
      window.location.href = "/dashboard";
    } else {
      alert("Invalid email or password");
    }
  };

  return <LoginComponent onLogin={handleLogin} />;
};

export default EventLogin;
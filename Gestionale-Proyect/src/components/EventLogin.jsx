import React from "react";
import useSWR from "swr";
import LoginComponent from "./LoginComponent";
import { fetcher } from "../fetcher";

const EventLogin = () => {
  const { data: users, error } = useSWR('http://127.0.0.1:8000/', fetcher);

  const handleLogin = (email, password) => {
    if (error) {
      alert("Error fetching users");
      return;
    }

    if (!users) {
      alert("Loading users...");
      return;
    }

    const user = users.find(
      (user) => user.Correo === email && user.Password === password
    );
    if (user) {
      window.location.href = "/dashboard";
    } else {
      alert("Invalid email or password");
    }
  };

  return <LoginComponent onLogin={handleLogin} />;
};

export default EventLogin;
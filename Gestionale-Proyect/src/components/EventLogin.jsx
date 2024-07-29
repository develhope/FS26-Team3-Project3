import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import { useAuth } from "./AuthContext";

const EventLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = (email, password, activeTab) => {
    console.log(
      "Attempting login with email:",
      email,
      "and password:",
      password,
      "on tab:",
      activeTab
    );
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      if (activeTab === "company" && user.role === "supervisor") {
        login(user);
        navigate("/dashboard-supervisor");
      } else if (activeTab === "employee" && user.role === "user") {
        login(user);
        navigate("/dashboard-employee");
      } else {
        setError("Unauthorized access. Check credentials and try again.");
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return <LoginComponent onLogin={handleLogin} error={error} />;
};

export default EventLogin;
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
    console.log("Stored users:", storedUsers);

    const user = storedUsers.find(
      (user) => user.email === email && user.password === password
    );
    console.log("Found user:", user);

    if (user) {
      if (activeTab === "company" && user.role === "supervisor") {
        console.log("Logging in as supervisor");
        login(user);
        navigate("/dashboard-supervisor");
      } else if (activeTab === "employee" && user.role === "user") {
        console.log("Logging in as employee");
        login(user);
        navigate("/dashboard-employee");
      } else {
        console.log("Unauthorized access");
        setError("Unauthorized access. Check credentials and try again.");
      }
    } else {
      console.log("Invalid email or password");
      setError("Invalid email or password");
    }
  };

  return <LoginComponent onLogin={handleLogin} error={error} />;
};

export default EventLogin;
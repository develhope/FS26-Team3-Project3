import { useNavigate } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import { useAuth } from "./AuthContext";

const EventLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (email, password) => {
    console.log(
      "Attempting login with email:",
      email,
      "and password:",
      password
    );
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    console.log("Stored users:", storedUsers);

    const user = storedUsers.find(
      (user) => user.email === email && user.password === password
    );
    console.log("Found user:", user);

    if (user) {
      login(user);
      if (user.role === "supervisor") {
        navigate("/dashboard-supervisor");
      } else if (user.role === "user") {
        navigate("/dashboard-employee");
      }
    } else {
      alert("Invalid email or password");
    }
  };

  return <LoginComponent onLogin={handleLogin} />;
};

export default EventLogin;

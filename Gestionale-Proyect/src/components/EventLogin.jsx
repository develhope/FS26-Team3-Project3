import { useNavigate } from "react-router-dom";
import LoginComponent from "./LoginComponent";

const EventLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (user) => user.Correo === email && user.Password === password
    );

    if (user) {
      localStorage.setItem("isAuthenticated", true);
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return <LoginComponent onLogin={handleLogin} />;
};

export default EventLogin;

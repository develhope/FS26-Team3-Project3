import { useNavigate } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import { useAuth } from "./AuthContext";

const EventLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Usa il contesto di autenticazione

  const handleLogin = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (user) => user.Correo === email && user.Password === password
    );

    if (user) {
      login(user.Role);
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return <LoginComponent onLogin={handleLogin} />;
};

export default EventLogin;

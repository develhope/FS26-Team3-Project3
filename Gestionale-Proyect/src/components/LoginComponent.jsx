import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./LoginComponent.css";
import { useAuth } from "./AuthContext";
const LoginComponent = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("azienda");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.Correo === email && user.Password === password
    );

    if (user) {
      if (activeTab === "azienda" && user.Role === "supervisor") {
        login(user.Role);
        navigate("/dashboard-supervisor");
      } else if (activeTab === "dipendente" && user.Role === "user") {
        login(user.Role);
        navigate("/dashboard-employee");
      } else {
        setError(
          "Accesso non autorizzato. Controlla le credenziali e riprova."
        );
      }
    } else {
      setError("Credenziali non valide. Controlla le credenziali e riprova.");
    }
  };

  const handleRegisterClick = () => {
    // Naviga alla pagina di registrazione quando sarà disponibile
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="./Resourse Genie Modificato.png" alt="Company Logo" />
      </div>
      <div className="tabs">
        <div
          className={`tab ${activeTab === "azienda" ? "active" : ""}`}
          onClick={() => setActiveTab("azienda")}
        >
          Azienda
        </div>
        <div
          className={`tab ${activeTab === "dipendente" ? "active" : ""}`}
          onClick={() => setActiveTab("dipendente")}
        >
          Dipendente
        </div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <div className="error">{error}</div>}
        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>
        <div className="register-link">
          <a href="#" onClick={handleRegisterClick}>
            Don't have an account? Register
          </a>
        </div>
      </form>
    </div>
  );
};

LoginComponent.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginComponent;

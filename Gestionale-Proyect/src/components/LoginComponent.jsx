import { useState } from "react";
import PropTypes from "prop-types";
import "./LoginComponent.css";

const LoginComponent = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("company");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit called");
    console.log("Email:", email);
    console.log("Password:", password);
    onLogin(email, password);
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="./Resourse Genie Modificato.png" alt="Company Logo" />
      </div>
      <div className="tabs">
        <div
          className={`tab ${activeTab === "company" ? "active" : ""}`}
          onClick={() => setActiveTab("company")}
        >
          Company
        </div>
        <div
          className={`tab ${activeTab === "employee" ? "active" : ""}`}
          onClick={() => setActiveTab("employee")}
        >
          Employee
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
          <a href="#">Don't have an account? Register</a>
        </div>
      </form>
    </div>
  );
};

LoginComponent.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginComponent;

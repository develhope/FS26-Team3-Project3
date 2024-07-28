import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./LoginComponent.css";

const LoginComponent = ({ error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("company");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === activeTab
    );
    if (user) {
      login(user);
      navigate("/dashboard");
    } else {
      // handle login error, possibly setting an error state here
      console.error("Invalid credentials or user role mismatch");
    }
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
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>
        <div className="register-link">
          {activeTab === "company" ? (
            <a href="#" onClick={() => navigate("/register-company")}>
              Don't have an account? Register
            </a>
          ) : (
            <a href="#" onClick={() => navigate("/register-employee")}>
              Don't have an account? Register
            </a>
          )}
        </div>
      </form>
    </div>
  );
};

LoginComponent.propTypes = {
  error: PropTypes.string,
};

export default LoginComponent;

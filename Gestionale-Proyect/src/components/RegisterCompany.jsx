import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterCompany.css";
import Header from "./Header";

const RegisterCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (companyName && vatNumber && supervisorName && email && password) {
      const newCompany = {
        companyName,
        vatNumber,
        supervisorName,
        email,
        password,
        role: "supervisor",
        hoursWorked: 0,
      };

      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(newCompany);
      localStorage.setItem("users", JSON.stringify(users));

      navigate("/");
    } else {
      setError("All fields are required.");
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="./Resourse Genie Modificato.png" alt="Company Logo" />
      </div>
      <h2>Register Company</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <input
          type="text"
          placeholder="p.IVA"
          value={vatNumber}
          onChange={(e) => setVatNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Supervisor Name"
          value={supervisorName}
          onChange={(e) => setSupervisorName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error">{error}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterCompany;
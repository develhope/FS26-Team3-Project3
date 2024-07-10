import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterEmployee.css";

const RegisterEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName && lastName && email && password) {
      const newEmployee = {
        firstName,
        lastName,
        email,
        password,
        role: "user",
        hoursWorked: 0,
      };

      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(newEmployee);
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
      <div className="tabs tab-form">Register Form</div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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

export default RegisterEmployee;

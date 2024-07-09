import React, { useState } from "react";
import "./EmployeeDashboard.css";
import DayCard from "./DayCard";
import { useAuth } from "./AuthContext";

const EmployeeDashboard = () => {
  const [days, setDays] = useState([
    { day: "Monday 01", status: "free" },
    { day: "Tuesday 02", status: "occupied" },
    { day: "Wednesday 03", status: "free" },
    { day: "Thursday 04", status: "occupied" },
    { day: "Friday 05", status: "free" },
  ]);

  const { userRole } = useAuth(); // Utilizzato per future logiche di autorizzazione

  // Funzione per gestire la richiesta di permesso per un giorno specifico
  const handlePermissionRequest = (index) => {
    const newDays = [...days];
    newDays[index].permissionStatus = "pending"; // Aggiungi lo stato pending per la richiesta di permesso
    setDays(newDays);
  };

  return (
    <div className="container">
      <div className="header">
        <i className="fas fa-bars"></i>
        <h1>Dashboard</h1>
        <i className="fas fa-bell"></i>
      </div>
      <div className="content">
        <div className="card">
          <h2>Summary</h2>
          <div className="grid">
            <div className="summary-item">
              <span>Total Hours Worked</span>
              <span>32</span>
            </div>
            <div className="summary-item">
              <span>Pending Shifts</span>
              <span>1</span>
            </div>
            <div className="summary-item">
              <span>Pay for Hours Worked</span>
              <span>$1,250</span>
            </div>
            <div className="summary-item">
              <span>Overtime Hours</span>
              <span>0</span>
            </div>
          </div>
        </div>
        <div className="scrolling-container">
          {days.map((day, index) => (
            <DayCard
              key={index}
              day={day.day}
              status={day.status}
              permissionStatus={day.permissionStatus} // Passa lo stato di permissionStatus al componente DayCard
              onPermissionRequest={() => handlePermissionRequest(index)} // Passa la funzione per gestire la richiesta di permesso
            />
          ))}
        </div>
        <div className="card">
          <h3>On-Duty Workers</h3>
          <ul>
            <li>Jimmy Saavedra - 7:00 AM</li>
            <li>Francesca - 8:00 AM</li>
            <li>Giorgio - 7:00 AM</li>
            <li>Ricardo -</li>
          </ul>
        </div>
        <div className="card">
          <div className="card-header">
            <h3>Notifications</h3>
            <i className="fas fa-bell"></i>
          </div>
          <p>Don't forget we need to work as a team</p>
        </div>
      </div>
      <div className="footer">
        <a href="#">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a href="#">
          <i className=""></i>
          <span>Dashboard</span>
        </a>
        <a href="#">
          <i className="fas fa-user"></i>
          <span>Profile</span>
        </a>
        <a href="/settings">
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </a>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

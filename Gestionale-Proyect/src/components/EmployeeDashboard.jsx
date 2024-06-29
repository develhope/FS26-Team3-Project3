import React from "react";
import "./EmployeeDashboard.css"; // Import the separate CSS file

const EmployeeDashboard = () => {
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
          <div className="day-card free">
            <span>Monday 01</span>
            <span>Free</span>
          </div>
          <div className="day-card occupied">
            <span>Tuesday 02</span>
            <span>Occupied</span>
          </div>
          <div className="day-card free">
            <span>Wednesday 03</span>
            <span>Free</span>
          </div>
          <div className="day-card occupied">
            <span>Thursday 04</span>
            <span>Occupied</span>
          </div>
          <div className="day-card free">
            <span>Friday 05</span>
            <span>Free</span>
          </div>
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
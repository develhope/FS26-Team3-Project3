import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import "./EmployeeDashboard.css";
import RequestLeaveForm from "./RequestLeaveForm";

const EmployeeDashboard = () => {
  const { loggedInUser } = useAuth();
  const [user, setUser] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, [loggedInUser]);

  const handleRequestSubmit = (request) => {
    setLeaveRequests([...leaveRequests, request]);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-employee">
      <div className="header">
        <i className="fas fa-bars"></i>
        <h1>Dashboard</h1>
        <h3>
          Welcome, {user.firstName} {user.lastName}!
        </h3>
        <i className="fas fa-bell"></i>
      </div>
      <div className="content">
        <div className="card">
          <h2>Summary</h2>
          {user && (
            <div>
              <div className="grid">
                <div className="summary-item">
                  <span>Name:</span>
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <div className="summary-item">
                  <span>Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className="summary-item">
                  <span>Role:</span>
                  <span>{user.role}</span>
                </div>
                <div className="summary-item">
                  <span>Hours Worked:</span>
                  <span>{user.hoursWorked}</span>
                </div>
              </div>
            </div>
          )}
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
        <div className="card">
          <h3>Request Leave</h3>
          <RequestLeaveForm onSubmit={handleRequestSubmit} />
        </div>
        <div className="card">
          <h3>My Leave Requests</h3>
          <ul>
            {leaveRequests.map((request, index) => (
              <li key={index}>
                {request.leaveType} from {request.startDate} to {request.endDate} - {request.status}
              </li>
            ))}
          </ul>
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

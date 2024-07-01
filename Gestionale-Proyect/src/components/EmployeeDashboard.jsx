import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const { loggedInUser } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(loggedInUser);
  }, [loggedInUser]);

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
          {user && (
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
          )}
        </div>
        {/* Altri contenuti della dashboard */}
      </div>
    </div>
  );
};

export default EmployeeDashboard;

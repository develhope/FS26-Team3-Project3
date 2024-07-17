import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import "./EmployeeDashboard.css";
import RequestLeaveForm from "./RequestLeaveForm";

const EmployeeDashboard = () => {
  const { loggedInUser } = useAuth();
  const [user, setUser] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [daysOff, setDaysOff] = useState([]);

  useEffect(() => {
    if (loggedInUser) {
      setUser(loggedInUser);
      const storedRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
      const userRequests = storedRequests.filter(request => request.employee === loggedInUser.email && request.status === 'Approved');
      setLeaveRequests(userRequests);

      const offDays = [];
      userRequests.forEach(request => {
        let currentDate = new Date(request.startDate);
        const endDate = new Date(request.endDate);
        while (currentDate <= endDate) {
          offDays.push(currentDate.toISOString().split('T')[0]);
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
      setDaysOff(offDays);
    }
  }, [loggedInUser]);

  const handleRequestSubmit = (request) => {
    const newRequest = { ...request, employee: user.email };
    const storedRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    const updatedRequests = [...storedRequests, newRequest];
    localStorage.setItem("leaveRequests", JSON.stringify(updatedRequests));
    setLeaveRequests(updatedRequests.filter(request => request.employee === user.email && request.status === 'Approved'));
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return daysArray.map(day => {
      const date = new Date(new Date().getFullYear(), new Date().getMonth(), day).toISOString().split('T')[0];
      const isOffDay = daysOff.includes(date);
      return (
        <div key={day} className={`day-card ${isOffDay ? 'free' : 'occupied'}`}>
          <span>{new Date(new Date().getFullYear(), new Date().getMonth(), day).toDateString()}</span>
          <span>{isOffDay ? 'Free' : 'Occupied'}</span>
        </div>
      );
    });
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
          {renderCalendar()}
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
                <br />
                Reason: {request.reason}
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

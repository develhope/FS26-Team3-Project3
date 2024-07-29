import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import EditEmployee from "./EditEmployee";
import LeaveRequestsList from "./LeaveRequestsList";
import ManagePaySlips from "./ManagePaySlips";  
import "./DashboardSupervisor.css";

const DashboardSupervisor = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [onDutyWorkers, setOnDutyWorkers] = useState([]);
  const { loggedInUser, logout } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(""); 

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    const filteredRequests = storedRequests.filter(
      (req) => req.recipients.includes(loggedInUser.email)
    );

    setUsers(storedUsers);
    setLeaveRequests(filteredRequests);

    const workers = storedUsers.map((user) => {
      const startTime = localStorage.getItem(`${user.email}-startTime`);
      const endTime = localStorage.getItem(`${user.email}-endTime`);
      return {
        ...user,
        startTime: startTime ? new Date(startTime) : null,
        endTime: endTime ? new Date(endTime) : null,
      };
    });
    setOnDutyWorkers(
      workers.filter((worker) => worker.startTime && !worker.endTime)
    );
  }, [loggedInUser]);

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setSelectedUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleApprove = (index) => {
    const newRequests = [...leaveRequests];
    newRequests[index].status = "Approved";
    setLeaveRequests(newRequests);
    localStorage.setItem("leaveRequests", JSON.stringify(newRequests));
  };

  const handleDeny = (index) => {
    const newRequests = [...leaveRequests];
    newRequests[index].status = "Denied";
    setLeaveRequests(newRequests);
    localStorage.setItem("leaveRequests", JSON.stringify(newRequests));
  };

  const handleAcknowledge = (notificationId) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== notificationId
    );
    setNotifications(updatedNotifications);
    const allNotifications = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    const notificationIndex = allNotifications.findIndex(
      (notification) => notification.id === notificationId
    );
    if (notificationIndex !== -1) {
      allNotifications[notificationIndex].readBy.push(loggedInUser.email);
    }
    localStorage.setItem("leaveRequests", JSON.stringify(allNotifications));
  };

  const pendingRequests = leaveRequests.filter(
    (request) => request.status === "Pending"
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showSidebar &&
        !document.querySelector(".sidebar").contains(event.target) &&
        !document.querySelector(".bell-icon").contains(event.target)
      ) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar]);

  const calculateMonthlyHours = (email) => {
    const dailyHoursKey = `${email}-dailyHours`;
    const dailyHours = JSON.parse(localStorage.getItem(dailyHoursKey)) || {};
    let totalHours = 0;
  
    Object.values(dailyHours).forEach(hours => {
      totalHours += hours;
    });

    return totalHours.toFixed(2); 
  };

  const handleSendNotification = () => {
    const newNotification = {
      id: Date.now(),
      message,
      recipients: selectedRecipients,
      readBy: []
    };
    const allNotifications = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    allNotifications.push(newNotification);
    localStorage.setItem("leaveRequests", JSON.stringify(allNotifications));
    setMessage('');
    setSelectedRecipients([]);
    setPopupMessage("Message sent"); 
    setShowPopup(true); 
  };

  return (
    <div className="dashboard-wrapper">
      <div className="header">
        <div className="header-container">
          <h1>Home</h1>
          <div
            className="bell-icon"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            {pendingRequests.length > 0 && (
              <div className="notification-dot"></div>
            )}
          </div>
        </div>
      </div>
      {showNotifications && (
        <div className="notifications">
          <h3>Notifications</h3>
          {notifications.length > 0 ? (
            <ul>
              {notifications.map(notification => (
                <li key={notification.id}>
                  <div className="notification-message">
                    {notification.message}
                  </div>
                  <button className="confirm-button" onClick={() => handleAcknowledge(notification.id)}>
                    Confirm
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No new notifications</p>
          )}
        </div>
      )}
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-grid">
            <div className="user-list card">
              <h2>User List</h2>
              <ul>
                {users
                  .filter((user) => user.role !== "supervisor")
                  .map((user) => (
                    <li key={user.id}>
                      <div className="user-name">
                        {user.firstName} {user.lastName}
                      </div>
                      <div>Email: {user.email}</div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="on-duty-workers card">
              <h2>On Duty Workers</h2>
              <ul>
                {onDutyWorkers
                  .filter((worker) => worker.role !== "supervisor")
                  .map((worker) => (
                    <li key={worker.email}>
                      {worker.firstName} {worker.lastName} - Clocked in at:{" "}
                      {worker.startTime.toLocaleTimeString()}
                    </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="history card">
              <h2>Hours Worked</h2>
              <ul>
                {users
                  .filter((user) => user.role !== "supervisor")
                  .map((user) => (
                    <li key={user.email}>
                      {user.firstName} {user.lastName} : {calculateMonthlyHours(user.email)}
                    </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="pay-slips card">
              <h2>Manage Pay Slips</h2>
              <ManagePaySlips />
            </div>
          </div>

          {selectedUser && (
            <EditEmployee
              employee={selectedUser}
              onSave={updateUser}
              onCancel={() => setSelectedUser(null)}
            />
          )}

          <div className="send-notification card">
            <h3>Send Notification</h3>
            <textarea
              className="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here"
            />
            <select
              multiple
              className="recipients-select"
              value={selectedRecipients}
              onChange={(e) =>
                setSelectedRecipients(Array.from(e.target.selectedOptions, option => option.value))
              }
            >
              {users.filter(user => user.role !== 'supervisor').map((user) => (
                <option key={user.id} value={user.email}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
            <button className="send-button" onClick={handleSendNotification}>
              Send
            </button>
          </div>
        </div>
      </div>
      <div className={`sidebar ${showSidebar ? "open" : ""}`}>
        <LeaveRequestsList
          requests={leaveRequests}
          onApprove={handleApprove}
          onDeny={handleDeny}
        />
      </div>
      {showPopup && (
        <div className="popup">
          <p>{popupMessage}</p>
        </div>
      )}
      <div className="footer">
        <a href="#">
          <i className="fas fa-home"></i>
          <span>Home</span>
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

export default DashboardSupervisor;

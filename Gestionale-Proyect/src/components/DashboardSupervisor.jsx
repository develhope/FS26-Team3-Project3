import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import EditEmployee from "./EditEmployee";
import LeaveRequestsList from "./LeaveRequestsList";
import "./DashboardSupervisor.css";

const DashboardSupervisor = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);


  const [onDutyWorkers, setOnDutyWorkers] = useState([]);

  const { loggedInUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    let storedRequests =
      JSON.parse(localStorage.getItem("leaveRequests")) || [];

    storedRequests = storedRequests.filter(
      (req, index, self) =>
        index ===
        self.findIndex(
          (r) =>
            r.startDate === req.startDate &&
            r.endDate === req.endDate &&
            r.employee === req.employee &&
            r.reason === req.reason &&
            r.status === req.status
        )
    );

    localStorage.setItem("leaveRequests", JSON.stringify(storedRequests));

    setUsers(storedUsers);
    setLeaveRequests(storedRequests);

    const workers = storedUsers.map(user => {
      const startTime = localStorage.getItem(`${user.email}-startTime`);
      const endTime = localStorage.getItem(`${user.email}-endTime`);
      return {
        ...user,
        startTime: startTime ? new Date(startTime) : null,
        endTime: endTime ? new Date(endTime) : null
      };
    });
    setOnDutyWorkers(workers.filter(worker => worker.startTime && !worker.endTime));
  }, []);

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

  const pendingRequests = leaveRequests.filter(
    (request) => request.status === "Pending"
  );

  return (
    <div className="dashboard-wrapper">
      <div className="header">
        <div className="header-container">
          <h1>Supervisor Dashboard</h1>
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
      <div className="dashboard-container">
        <div className="dashboard-content">
          {loggedInUser && (
            <h3>
              Welcome, {loggedInUser.firstName} {loggedInUser.lastName}!
            </h3>
          )}
          <div className="dashboard-grid">
            <div className="statistics">
              <h2>Statistics</h2>
              <div>Total Users: {users.length}</div>
              <div>
                Total Supervisors:{" "}
                {users.filter((user) => user.role === "supervisor").length}
              </div>
              <div>
                Total Employees:{" "}
                {users.filter((user) => user.role === "user").length}
              </div>
            </div>
            <div className="user-list">
              <h2>User List</h2>
              <ul>
                {users.map((user) => (
                  <li key={user.id}>
                    <div className="user-name">
                      {user.firstName} {user.lastName}
                    </div>
                    <div>Email: {user.email}</div>
                    <div>Role: {user.role}</div>
                    <div>Hours Worked: {user.hoursWorked}</div>
                    <button onClick={() => setSelectedUser(user)}>Edit</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="card">
              <h2>On Duty Workers</h2>
              <ul>
                {onDutyWorkers.map(worker => (
                  <li key={worker.email}>
                    {worker.firstName} {worker.lastName} - Clocked in at: {worker.startTime.toLocaleTimeString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
      

          {selectedUser && (
            <EditEmployee
              employee={selectedUser}
              onSave={updateUser}
              onCancel={() => setSelectedUser(null)}
            />
          )}
        </div>
      </div>
      <div className={`sidebar ${showSidebar ? "open" : ""}`}>
        <LeaveRequestsList
          requests={leaveRequests}
          onApprove={handleApprove}
          onDeny={handleDeny}
        />
      </div>
      <div className="footer">
        <a href="#">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a href="#">
          <i className=""></i>
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

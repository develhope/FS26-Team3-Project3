import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import EditEmployee from "./EditEmployee";
import LeaveRequestsList from "./LeaveRequestsList";
import './DashboardSupervisor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const DashboardSupervisor = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const { loggedInUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    setUsers(storedUsers);
    setLeaveRequests(storedRequests);
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
    newRequests[index].status = 'Approved';
    setLeaveRequests(newRequests);
    localStorage.setItem("leaveRequests", JSON.stringify(newRequests));
  };

  const handleDeny = (index) => {
    const newRequests = [...leaveRequests];
    newRequests[index].status = 'Denied';
    setLeaveRequests(newRequests);
    localStorage.setItem("leaveRequests", JSON.stringify(newRequests));
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="header">
        <div className="header-container">
          <h1>Supervisor Dashboard</h1>
          <div className="header-right">
            <FontAwesomeIcon icon={faBell} className="bell-icon" onClick={toggleDropdown} />
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <LeaveRequestsList requests={leaveRequests} onApprove={handleApprove} onDeny={handleDeny} />
          </div>
        )}
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
          {selectedUser && (
            <EditEmployee
              employee={selectedUser}
              onSave={updateUser}
              onCancel={() => setSelectedUser(null)}
            />
          )}
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

export default DashboardSupervisor;

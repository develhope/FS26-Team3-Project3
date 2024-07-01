import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import EditEmployee from "./EditEmployee";
import "./DashboardSupervisor.css";

const DashboardSupervisor = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { loggedInUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
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

  return (
    <div className="dashboard-wrapper">
      <div className="header">
        <div className="header-container">
          <h1>Company Management</h1>

          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h1>Supervisor Dashboard</h1>
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
    </div>
  );
};

export default DashboardSupervisor;

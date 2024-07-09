import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./DashboardSupervisor.css";

const DashboardSupervisor = () => {
  const [users, setUsers] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    console.log("Loaded users in DashboardSupervisor:", storedUsers);

    // Verifica la unicidad de los IDs
    const ids = storedUsers.map((user) => user.id);
    const uniqueIds = new Set(ids);


    setUsers(storedUsers);
  }, []);

  const totalUsers = users.length;
  const totalSupervisors = users.filter((user) => user.role === "supervisor").length;
  const totalEmployees = users.filter((user) => user.role === "user").length;

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
          <div className="dashboard-grid">
            <div className="statistics">
              <h2>Statistics</h2>
              <div>Total Users: {totalUsers}</div>
              <div>Total Supervisors: {totalSupervisors}</div>
              <div>Total Employees: {totalEmployees}</div>
            </div>
            <div className="user-list">
              <h2>User List</h2>
              <ul>
                {users.map((user, index) => {
                  const uniqueKey = `${user.id}-${index}`;
                  return (
                    <li key={uniqueKey}>
                      <div className="user-name">
                        {user.firstName} {user.lastName}
                      </div>
                      <div>Email: {user.email}</div>
                      <div>Role: {user.role}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSupervisor;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import "./DashboardSupervisor.css";

const DashboardSupervisor = () => {
  const [users, setUsers] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const totalUsers = users.length;
  const totalSupervisors = users.filter(
    (user) => user.Role === "supervisor"
  ).length;
  const totalEmployees = users.filter((user) => user.Role === "user").length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="header-container">
          <h1>Company Management</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>
      <div className="dashboard-content">
        <h1>Dashboard Supervisor</h1>
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
              {users.map((user) => (
                <li key={user.Id}>
                  <div className="user-name">
                    {user.Nombre} {user.Apellido}
                  </div>
                  <div>Email: {user.Correo}</div>
                  <div>Role: {user.Role}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSupervisor;

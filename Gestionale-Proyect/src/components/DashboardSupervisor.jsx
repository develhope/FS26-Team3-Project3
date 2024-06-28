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

    // Verifica l'unicità degli Id
    const ids = storedUsers.map((user) => user.Id);
    const uniqueIds = new Set(ids);

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
                {users.map((user, index) => {
                  const uniqueKey = `${user.Id}-${index}`;
                  //console.log(`Rendering user with Id: ${user.Id}`);
                  return (
                    <li key={uniqueKey}>
                      <div className="user-name">
                        {user.Nombre} {user.Apellido}
                      </div>
                      <div>Email: {user.Correo}</div>
                      <div>Role: {user.Role}</div>
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

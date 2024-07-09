import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./DashboardSupervisor.css";

const DashboardSupervisor = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);  // Aggiunto per gestire le richieste
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedRequests = JSON.parse(localStorage.getItem("days")) || []; // Carica le richieste dai giorni salvati
    const pendingRequests = storedRequests.filter(day => day.permissionStatus === "pending"); // Filtra solo le richieste pendenti

    setUsers(storedUsers);
    setRequests(pendingRequests); // Imposta le richieste pendenti
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handlePermissionResponse = (day, status) => {
    // Aggiorna lo stato della richiesta
    const updatedRequests = requests.map(request => {
      if (request.day === day) {
        return { ...request, permissionStatus: status };
      }
      return request;
    });
    setRequests(updatedRequests.filter(request => request.permissionStatus === "pending")); // Aggiorna l'elenco delle richieste pendenti
    localStorage.setItem("days", JSON.stringify(updatedRequests)); // Salva l'aggiornamento nello storage
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
                {users.map((user, index) => (
                  <li key={`${user.id}-${index}`}>
                    <div className="user-name">{user.firstName} {user.lastName}</div>
                    <div>Email: {user.email}</div>
                    <div>Role: {user.role}</div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Aggiunto per mostrare le richieste di permesso */}
            <div className="permission-requests">
              <h2>Pending Permission Requests</h2>
              {requests.map(request => (
                <div key={request.day}>
                  <p>{request.day} - {request.permissionStatus}</p>
                  <button onClick={() => handlePermissionResponse(request.day, "approved")}>Approve</button>
                  <button onClick={() => handlePermissionResponse(request.day, "denied")}>Deny</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSupervisor;

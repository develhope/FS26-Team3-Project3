import React from "react";
import "./EmployeeDashboard.css";

const DayCard = ({ day, status, permissionStatus, onPermissionRequest }) => {
  return (
    <div className={`day-card ${status}`}>
      <span>{day}</span>
      <span>{status === "free" ? "Free" : "Occupied"}</span>
      {status === "free" && (
        <div className="permission-button">
          {permissionStatus === "pending" ? (
            <span>Permission Requested</span>
          ) : (
            <button onClick={onPermissionRequest}>Request Permission</button>
          )}
        </div>
      )}
    </div>
  );
};

export default DayCard;

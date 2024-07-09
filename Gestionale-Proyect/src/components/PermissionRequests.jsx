import React from "react";

const PermissionRequests = ({ requests, onPermissionResponse }) => {
  return (
    <div>
      {requests.map((request, index) => (
        <div key={index} className="permission-request">
          <div>{request.day}</div>
          <div>Status: {request.status}</div>
          {request.status === "pending" && (
            <div>
              <button onClick={() => onPermissionResponse(index, true)}>Approve</button>
              <button onClick={() => onPermissionResponse(index, false)}>Deny</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PermissionRequests;

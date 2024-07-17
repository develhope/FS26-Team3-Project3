import React from 'react';
import './LeaveRequestsList.css';

const LeaveRequestsList = ({ requests, onApprove, onDeny }) => {
  return (
    <div className="leave-requests-list">
      <h3>Leave Requests</h3>
      <ul>
        {requests.map((request, index) => (
          <li key={index} className="request-item">
            <div className="request-details">
              <p><strong>Leave Type:</strong> {request.leaveType}</p>
              <p><strong>Period:</strong> from {request.startDate} to {request.endDate}</p>
              <p><strong>Reason:</strong> {request.reason}</p>
              <p><strong>Status:</strong> {request.status}</p>
            </div>
            <div className="buttons">
              <button className="approve-button" onClick={() => onApprove(index)}>Approve</button>
              <button className="deny-button" onClick={() => onDeny(index)}>Deny</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveRequestsList;

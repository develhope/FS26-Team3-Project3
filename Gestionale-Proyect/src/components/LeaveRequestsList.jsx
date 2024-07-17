import React from 'react';
import './LeaveRequestsList.css';

const LeaveRequestsList = ({ requests, onApprove, onDeny }) => {
  return (
    <div className="leave-requests-list">
      <h3>Leave Requests</h3>
      <ul>
        {requests.map((request, index) => (
          <li key={index} className="request-item">
            <div>Leave Type: {request.leaveType}</div>
            <div>Period: {request.startDate} to {request.endDate}</div>
            <div>Reason: {request.reason}</div>
            <div>Status: {request.status}</div>
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

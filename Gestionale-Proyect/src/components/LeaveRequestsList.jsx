import React from 'react';

const LeaveRequestsList = ({ requests, onApprove, onDeny }) => {
  return (
    <div>
      <h3>Leave Requests</h3>
      <ul>
        {requests.map((request, index) => (
          <li key={index}>
            {request.leaveType} from {request.startDate} to {request.endDate} - {request.status}
            <button onClick={() => onApprove(index)}>Approve</button>
            <button onClick={() => onDeny(index)}>Deny</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveRequestsList;



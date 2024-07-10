import React, { useState } from 'react';

const RequestLeaveForm = ({ onSubmit }) => {
  const [leaveType, setLeaveType] = useState('Vacation');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = { leaveType, startDate, endDate, reason, status: 'Pending' };
    onSubmit(request);
    setLeaveType('Vacation');
    setStartDate('');
    setEndDate('');
    setReason('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Leave Type:</label>
        <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
          <option value="Vacation">Vacation</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Personal Leave">Personal Leave</option>
        </select>
      </div>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      </div>
      <div>
        <label>Reason:</label>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />
      </div>
      <button type="submit">Submit Request</button>
    </form>
  );
};

export default RequestLeaveForm;

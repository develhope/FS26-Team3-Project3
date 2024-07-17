import React, { useState } from 'react';
import './RequestLeaveForm.css'; 

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
    <form onSubmit={handleSubmit} className="request-leave-form">
      <div>
        <label>Leave Type:</label>
        <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)} className="input-field">
          <option value="Vacation">Vacation</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Personal Leave">Personal Leave</option>
        </select>
      </div>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="input-field" />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className="input-field" />
      </div>
      <div>
        <label>Reason:</label>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} required className="input-field textarea-field" />
      </div>
      <button type="submit" className="submit-button">Submit Request</button>
    </form>
  );
};

export default RequestLeaveForm;

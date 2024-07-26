import React, { useState, useEffect } from 'react';
import { useAuth } from "./AuthContext";
import './ManagePaySlips.css';

const ManagePaySlips = () => {
  const { loggedInUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [paySlips, setPaySlips] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
    const storedPaySlips = JSON.parse(localStorage.getItem("paySlips")) || [];
    setPaySlips(storedPaySlips);
  }, []);

  const handleAddPaySlip = () => {
    if (selectedUser && amount && month && year) {
      const newPaySlip = {
        email: selectedUser.email,
        amount,
        month,
        year
      };
      const updatedPaySlips = [...paySlips, newPaySlip];
      setPaySlips(updatedPaySlips);
      localStorage.setItem("paySlips", JSON.stringify(updatedPaySlips));
      setSelectedUser(null);
      setAmount('');
      setMonth('');
      setYear('');
    }
  };

  return (
    <div className="manage-pay-slips">
      <h2>Manage Pay Slips</h2>
      <div className="pay-slip-form">
        <select onChange={e => setSelectedUser(users.find(user => user.email === e.target.value))} value={selectedUser ? selectedUser.email : ''}>
          <option value="">Select Employee</option>
          {users.filter(user => user.role === 'user').map(user => (
            <option key={user.email} value={user.email}>{user.firstName} {user.lastName}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Month"
          value={month}
          onChange={e => setMonth(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={e => setYear(e.target.value)}
        />
        <button onClick={handleAddPaySlip}>Add Pay Slip</button>
      </div>
      <h3>Existing Pay Slips</h3>
      <ul>
        {paySlips.map((paySlip, index) => (
          <li key={index} className="pay-slip-item">
            <p><strong>Employee:</strong> {paySlip.email}</p>
            <p><strong>Month:</strong> {paySlip.month}</p>
            <p><strong>Year:</strong> {paySlip.year}</p>
            <p><strong>Amount:</strong> ${paySlip.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePaySlips;

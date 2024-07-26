import React, { useState, useEffect } from 'react';
import { useAuth } from "./AuthContext";
import './PaySlip.css';

const PaySlip = () => {
  const { loggedInUser } = useAuth();
  const [paySlips, setPaySlips] = useState([]);

  useEffect(() => {
    const storedPaySlips = JSON.parse(localStorage.getItem("paySlips")) || [];
    const userPaySlips = storedPaySlips.filter(paySlip => paySlip.email === loggedInUser.email);
    setPaySlips(userPaySlips);
  }, [loggedInUser]);

  return (
    <div className="pay-slip">
      <h2>My Pay Slips</h2>
      {paySlips.length === 0 ? (
        <p>No pay slips available</p>
      ) : (
        <ul>
          {paySlips.map((paySlip, index) => (
            <li key={index} className="pay-slip-item">
              <p><strong>Month:</strong> {paySlip.month}</p>
              <p><strong>Year:</strong> {paySlip.year}</p>
              <p><strong>Amount:</strong> ${paySlip.amount}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaySlip;

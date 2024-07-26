import React, { useEffect, useState } from "react";

const PaySlip = () => {
  const [paySlips, setPaySlips] = useState([]);

  useEffect(() => {
    // Recupera i pay slip dal localStorage
    const storedPaySlips = JSON.parse(localStorage.getItem("paySlips")) || [];
    setPaySlips(storedPaySlips);
  }, []);

  return (
    <div className="pay-slip-container">
      <h3>My Pay Slips</h3>
      {paySlips.length === 0 ? (
        <p>No pay slips available.</p>
      ) : (
        <ul>
          {paySlips.map((paySlip, index) => (
            <li key={index}>
              <span>Email: {paySlip.email}</span><br />
              <span>Amount: {paySlip.amount}</span><br />
              <span>Month: {paySlip.month}</span><br />
              <span>Year: {paySlip.year}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaySlip;


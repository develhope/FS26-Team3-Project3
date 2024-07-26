import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import "./PaySlip.css";

const PaySlip = () => {
  const { loggedInUser } = useAuth();
  const [paySlips, setPaySlips] = useState([]);

  useEffect(() => {
    const storedPaySlips = JSON.parse(localStorage.getItem("paySlips")) || [];
    const userPaySlips = storedPaySlips.filter(
      (paySlip) => paySlip.employee === loggedInUser.email
    );
    setPaySlips(userPaySlips);
  }, [loggedInUser]);

  return (
    <div className="payslip-card">
      {paySlips.length === 0 ? (
        <p>No pay slips available</p>
      ) : (
        <ul>
          {paySlips.map((paySlip, index) => (
            <li key={index}>
              <p>
                <strong>Month:</strong> {paySlip.month}
              </p>
              <p>
                <strong>Year:</strong> {paySlip.year}
              </p>
              <p>
                <strong>Amount:</strong> ${paySlip.amount}
              </p>
              {index < paySlips.length - 1 && <hr />} 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaySlip;

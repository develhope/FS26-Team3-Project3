import React, { useState, useEffect } from 'react';
import { useAuth } from "./AuthContext"; 
import './TimeClock.css';

const TimeClock = () => {
  const { loggedInUser } = useAuth();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [hoursWorked, setHoursWorked] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    console.log('Loading clock in/out times from localStorage');
    const storedStartTime = localStorage.getItem(`${loggedInUser.email}-startTime`);
    const storedEndTime = localStorage.getItem(`${loggedInUser.email}-endTime`);
    if (storedStartTime) setStartTime(new Date(storedStartTime));
    if (storedEndTime) setEndTime(new Date(storedEndTime));
  }, [loggedInUser]);

  const updateOnDutyWorkers = (email, action) => {
    let onDutyWorkers = JSON.parse(localStorage.getItem("onDutyWorkers")) || [];
    if (action === "clockIn") {
      if (!onDutyWorkers.includes(email)) {
        onDutyWorkers.push(email);
      }
    } else if (action === "clockOut") {
      onDutyWorkers = onDutyWorkers.filter(workerEmail => workerEmail !== email);
    }
    localStorage.setItem("onDutyWorkers", JSON.stringify(onDutyWorkers));
  };

  const handleClockIn = () => {
    setModalMessage("Ready to start your workday?");
    setConfirmAction(() => clockIn);
    setShowModal(true);
  };

  const handleClockOut = () => {
    setModalMessage("Ending your workday?");
    setConfirmAction(() => clockOut);
    setShowModal(true);
  };

  const clockIn = () => {
    const now = new Date();
    setStartTime(now);
    localStorage.setItem(`${loggedInUser.email}-startTime`, now.toISOString());
    updateOnDutyWorkers(loggedInUser.email, "clockIn");
    setPopupMessage("Let's get started!");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); 
  };

  const clockOut = () => {
    const now = new Date();
    setEndTime(now);
    localStorage.setItem(`${loggedInUser.email}-endTime`, now.toISOString());
    updateOnDutyWorkers(loggedInUser.email, "clockOut");
    calculateHoursWorked(now);
    setPopupMessage("Have a nice day!");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); 
  };

  const calculateHoursWorked = (end) => {
    if (startTime) {
      const diff = (end - startTime) / (1000 * 60 * 60); 
      setHoursWorked(diff.toFixed(2));
    }
  };

  const handleConfirm = () => {
    confirmAction();
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="time-clock">
      <h2>Time Clock</h2>
      <div>
        {startTime ? (
          <p>Clocked in at: {startTime.toLocaleTimeString()}</p>
        ) : (
          <button onClick={handleClockIn}>Clock In</button>
        )}
      </div>
      <div>
        {endTime ? (
          <p>Clocked out at: {endTime.toLocaleTimeString()}</p>
        ) : (
          startTime && <button onClick={handleClockOut}>Clock Out</button>
        )}
      </div>
      {hoursWorked > 0 && (
        <p>Hours worked: {hoursWorked}</p>
      )}
      {showModal && (
        <div className="Overlay">
          <div className="Modal">
            <p>{modalMessage}</p>
            <div className="modal-buttons">
              <button className="confirm-button" onClick={handleConfirm}>Yes</button>
              <button className="cancel-button" onClick={handleCancel}>No</button>
            </div>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="popup">
          <p>{popupMessage}</p>
        </div>
      )}
    </div>
  );
};

export default TimeClock;


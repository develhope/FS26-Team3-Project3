import React, { useState } from 'react';

const TimeClock = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [hoursWorked, setHoursWorked] = useState(0);

  const handleClockIn = () => {
    const now = new Date();
    setStartTime(now);
  };

  const handleClockOut = () => {
    const now = new Date();
    setEndTime(now);
    calculateHoursWorked(now);
  };

  const calculateHoursWorked = (end) => {
    if (startTime) {
      const diff = (end - startTime) / (1000 * 60 * 60); // Differenza in ore
      setHoursWorked(diff.toFixed(2));
    }
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
    </div>
  );
};

export default TimeClock;

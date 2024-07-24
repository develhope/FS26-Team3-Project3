import React, { useState } from "react";
import "./EditEmployee.css";

const EditEmployee = ({ employee, onSave, onCancel }) => {
  const [hoursWorked, setHoursWorked] = useState(employee.hoursWorked || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...employee,
      hoursWorked,
    });
  };

  return (
    <div className="edit-popup">
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={employee.firstName} readOnly />
        </label>
        <label>
          Last Name:
          <input type="text" value={employee.lastName} readOnly />
        </label>
        <label>
          Hours Worked:
          <input
            type="number"
            value={hoursWorked}
            onChange={(e) => setHoursWorked(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;

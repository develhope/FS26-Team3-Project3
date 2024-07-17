import React, { useState } from 'react';
import './EditEmployee.css';

const EditEmployee = ({ employee, onSave, onCancel }) => {
  const [firstName, setFirstName] = useState(employee.firstName);
  const [lastName, setLastName] = useState(employee.lastName);
  const [email, setEmail] = useState(employee.email);
  const [role, setRole] = useState(employee.role);
  const [hoursWorked, setHoursWorked] = useState(employee.hoursWorked);
  const [gender, setGender] = useState(employee.gender); 

  const handleSave = () => {
    const updatedEmployee = {
      ...employee,
      firstName,
      lastName,
      email,
      role,
      hoursWorked,
      gender, 
    };
    onSave(updatedEmployee);
  };

  return (
    <div className="edit-employee">
      <h2>Edit Employee</h2>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="supervisor">Supervisor</option>
        </select>
      </label>
      <label>
        Hours Worked:
        <input
          type="number"
          value={hoursWorked}
          onChange={(e) => setHoursWorked(e.target.value)}
        />
      </label>
      <label>
        Gender:
        <select value={gender} onChange={(e) => setGender(e.target.value)}> 
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditEmployee;

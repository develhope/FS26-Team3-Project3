import React, { useState } from 'react';
import './RegistrationComponent.css';

const RegistrationComponent = ({ onRegister }) => {
  const [form, setForm] = useState({
    companyName: '',
    supervisorName: '',
    email: '',
    password: '',
    vatNumber: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!form.companyName) formErrors.companyName = 'Nome dell\'azienda è obbligatorio';
    if (!form.supervisorName) formErrors.supervisorName = 'Nome del supervisore è obbligatorio';
    if (!form.email) formErrors.email = 'Email è obbligatoria';
    if (!form.password) formErrors.password = 'Password è obbligatoria';
    if (!form.vatNumber) formErrors.vatNumber = 'Partita IVA è obbligatoria';

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      onRegister(form);
    }
  };

  const handleRegisterClick = () => {
    // Navigate to registration page when available
    navigate("/")
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="./Resourse Genie Modificato.png" alt="Company Logo" />
      </div>
      <div className="tabs">
        <div className="tab active">Registrazione</div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="companyName" 
          placeholder="Nome dell'azienda" 
          value={form.companyName} 
          onChange={handleChange} 
        />
        {errors.companyName && <div className="error">{errors.companyName}</div>}
        
        <input 
          type="text" 
          name="supervisorName" 
          placeholder="Nome del supervisore" 
          value={form.supervisorName} 
          onChange={handleChange} 
        />
        {errors.supervisorName && <div className="error">{errors.supervisorName}</div>}
        
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={form.email} 
          onChange={handleChange} 
        />
        {errors.email && <div className="error">{errors.email}</div>}
        
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={form.password} 
          onChange={handleChange} 
        />
        {errors.password && <div className="error">{errors.password}</div>}
        
        <input 
          type="text" 
          name="vatNumber" 
          placeholder="Partita IVA" 
          value={form.vatNumber} 
          onChange={handleChange} 
        />
        {errors.vatNumber && <div className="error">{errors.vatNumber}</div>}
        
        <button type="submit" onClick={handleRegisterClick}>Registrati</button>
      </form>
    </div>
  );
};

export default RegistrationComponent;
import React, { useState } from 'react';

const RequestLeave = () => {
  const [date, setDate] = useState('');
  const [type, setType] = useState(''); // es. ferie, malattia
  const [reason, setReason] = useState('');

  const handleSubmit = async () => {
    // Invio dei dati al server o salvataggio in localStorage
    const request = { date, type, reason, status: 'pending' };
    // Simulazione di invio al server
    localStorage.setItem('leaveRequest', JSON.stringify(request));
    alert('Richiesta inviata con successo!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="">Seleziona Tipo</option>
        <option value="ferie">Ferie</option>
        <option value="malattia">Malattia</option>
      </select>
      <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Motivo" required />
      <button type="submit">Invia Richiesta</button>
    </form>
  );
};

export default RequestLeave;


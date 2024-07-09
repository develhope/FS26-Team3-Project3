import React, { useState } from 'react';
import { useLeaveRequest } from './LeaveRequestContext';

const RequestLeave = () => {
    const { addRequest } = useLeaveRequest();
    const [type, setType] = useState('ferie');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addRequest({ type, startDate, endDate, reason });
        setType('ferie');
        setStartDate('');
        setEndDate('');
        setReason('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Tipo:
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="ferie">Ferie</option>
                    <option value="malattia">Malattia</option>
                    <option value="permesso">Permesso</option>
                </select>
            </label>
            <label>
                Data Inizio:
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </label>
            <label>
                Data Fine:
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </label>
            <label>
                Motivo:
                <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />
            </label>
            <button type="submit">Invia Richiesta</button>
        </form>
    );
};

export default RequestLeave;


import React from 'react';
import { useLeaveRequest } from './LeaveRequestContext';

const ViewLeaveRequests = () => {
    const { requests } = useLeaveRequest();

    return (
        <div>
            <h2>Le Mie Richieste di Permesso</h2>
            <ul>
                {requests.map(req => (
                    <li key={req.id}>
                        <p>Tipo: {req.type}</p>
                        <p>Data Inizio: {req.startDate}</p>
                        <p>Data Fine: {req.endDate}</p>
                        <p>Motivo: {req.reason}</p>
                        <p>Stato: {req.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewLeaveRequests;


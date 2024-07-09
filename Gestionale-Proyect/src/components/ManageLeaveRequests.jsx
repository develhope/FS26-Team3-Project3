import React from 'react';
import { useLeaveRequest } from './LeaveRequestContext';

const ManageLeaveRequests = () => {
    const { requests, updateRequestStatus } = useLeaveRequest();

    return (
        <div>
            <h2>Gestione Richieste di Permesso</h2>
            <ul>
                {requests.map(req => (
                    <li key={req.id}>
                        <p>Tipo: {req.type}</p>
                        <p>Data Inizio: {req.startDate}</p>
                        <p>Data Fine: {req.endDate}</p>
                        <p>Motivo: {req.reason}</p>
                        <p>Stato: {req.status}</p>
                        <button onClick={() => updateRequestStatus(req.id, 'approved')}>Approva</button>
                        <button onClick={() => updateRequestStatus(req.id, 'denied')}>Rifiuta</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageLeaveRequests;

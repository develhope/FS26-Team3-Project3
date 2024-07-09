import React, { createContext, useState, useContext } from 'react';

export const LeaveRequestContext = createContext();

export const useLeaveRequest = () => {
    return useContext(LeaveRequestContext);
};

const LeaveRequestProvider = ({ children }) => {
    const [requests, setRequests] = useState([
        { id: 1, type: 'Vacation', status: 'Pending' },
        { id: 2, type: 'Sick Leave', status: 'Pending' },
    ]);

    const addRequest = (newRequest) => {
        setRequests([...requests, { ...newRequest, id: requests.length + 1, status: 'Pending' }]);
    };

    const updateRequestStatus = (id, status) => {
        setRequests(requests.map(req => req.id === id ? { ...req, status } : req));
    };

    return (
        <LeaveRequestContext.Provider value={{ requests, addRequest, updateRequestStatus }}>
            {children}
        </LeaveRequestContext.Provider>
    );
};

export default LeaveRequestProvider;

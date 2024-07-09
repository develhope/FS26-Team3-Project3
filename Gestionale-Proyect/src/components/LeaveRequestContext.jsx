import React, { createContext, useState, useContext } from 'react';

const LeaveRequestContext = createContext();

export const useLeaveRequest = () => {
    return useContext(LeaveRequestContext);
};

export const LeaveRequestProvider = ({ children }) => {
    const [requests, setRequests] = useState([]);

    const addRequest = (newRequest) => {
        setRequests([...requests, { ...newRequest, id: requests.length + 1, status: 'pending' }]);
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

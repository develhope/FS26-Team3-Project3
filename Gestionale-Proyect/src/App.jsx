import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeDashboard from './EmployeeDashboard';
import DashboardSupervisor from './DashboardSupervisor';
import PaySlip from './PaySlip';
import ManagePaySlips from './ManagePaySlips';
import LoginComponent from './LoginComponent';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <PrivateRoute path="/employee-dashboard" element={<EmployeeDashboard />} />
          <PrivateRoute path="/supervisor-dashboard" element={<DashboardSupervisor />} />
          <PrivateRoute path="/pay-slip" element={<PaySlip />} />
          <PrivateRoute path="/manage-pay-slips" element={<ManagePaySlips />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

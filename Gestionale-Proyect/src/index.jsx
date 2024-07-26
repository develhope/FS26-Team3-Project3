import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 
import App from './App'; 
import reportWebVitals from './reportWebVitals';

const resetLocalStorage = () => {
  localStorage.removeItem('leaveRequests');
  localStorage.removeItem('onDutyWorkers');
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.forEach(user => {
    localStorage.removeItem(`${user.email}-startTime`);
    localStorage.removeItem(`${user.email}-endTime`);
    localStorage.removeItem(`${user.email}-startTimes`);
    localStorage.removeItem(`${user.email}-endTimes`);
  });
};

if (process.env.NODE_ENV === 'development') {
  resetLocalStorage();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
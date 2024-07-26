import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Importa il CSS principale
import App from './App'; // Importa il componente principale
import reportWebVitals from './reportWebVitals';

// Funzione per resettare i dati di localStorage
const resetLocalStorage = () => {
  localStorage.removeItem('leaveRequests');
  localStorage.removeItem('onDutyWorkers');
  localStorage.removeItem('startTime');
  localStorage.removeItem('endTime');
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.forEach(user => {
    localStorage.removeItem(`${user.email}-startTime`);
    localStorage.removeItem(`${user.email}-endTime`);
    localStorage.removeItem(`${user.email}-startTimes`);
    localStorage.removeItem(`${user.email}-endTimes`);
  });
  localStorage.setItem('clockInStatus', 'false'); // Aggiungi questo per resettare lo stato di ClockIn
};

// Resetta i dati di localStorage se l'app è in modalità sviluppo
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

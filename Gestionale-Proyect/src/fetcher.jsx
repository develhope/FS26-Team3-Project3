import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Importa il CSS principale
import App from './App'; // Importa il componente principale
import reportWebVitals from './reportWebVitals';

// Funzione per resettare i dati di localStorage
const resetLocalStorage = () => {
  console.log('Resetting localStorage for development environment');
  localStorage.clear();

  const users = [
    { firstName: 'Riccardo', lastName: 'Cuomo', email: 'cuomo.riccardo@gmail.com', password: 'qwerty', id: 'RC', role: 'user' },
    { firstName: 'Francesca', lastName: 'Pischedda', email: 'francesca.pischedda@gmail.com', password: 'asdfgh', id: 'FP', role: 'supervisor' },
    { firstName: 'Jim', lastName: 'Saav', email: 'jimmsaav@icloud.com', password: 'password', id: 'JS', role: 'user' },
  ];

  localStorage.setItem('users', JSON.stringify(users));
  console.log('localStorage reset with users:', users);
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

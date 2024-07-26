import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Importa il CSS principale
import App from './App'; // Importa il componente principale
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

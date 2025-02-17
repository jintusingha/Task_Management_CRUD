import React from 'react';
import ReactDOM from 'react-dom/client';  // Use 'react-dom/client' for React 18+
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create root with 'createRoot'
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

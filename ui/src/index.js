import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('mainContent'));
// render react content to mainContent div
root.render(<React.StrictMode><App /></React.StrictMode>);

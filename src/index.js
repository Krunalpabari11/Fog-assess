import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure this points to your Tailwind CSS file
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PlayListProvider } from './context/playListContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PlayListProvider>
    <App />
    </PlayListProvider>
  </React.StrictMode>
);

reportWebVitals();

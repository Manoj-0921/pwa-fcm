import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

if ('serviceWorker' in navigator) {
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const swFile = isIOS ? 'sw.js' : 'firebase-messaging-sw.js';

  navigator.serviceWorker.register(`/${swFile}`, {
    type: isIOS ? 'module' : undefined, // 👈 Register as module ONLY for sw.js
  })
  .then((reg) => console.log('Service Worker registered:', reg.scope))
  .catch((err) => console.error('SW registration failed:', err));
}





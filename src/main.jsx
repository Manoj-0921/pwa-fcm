import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// Register service worker
if ('serviceWorker' in navigator) {
  const swFile = /iphone|ipad|ipod/i.test(navigator.userAgent) ? 'sw.js' : 'firebase-messaging-sw.js';
  navigator.serviceWorker.register(`/${swFile}`);
}


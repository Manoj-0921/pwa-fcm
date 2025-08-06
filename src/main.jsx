import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
//     const swFile = isIOS ? 'sw.js' : 'firebase-messaging-sw.js';

//     navigator.serviceWorker
//       .register(`/${swFile}`) // Don't use type: module unless you use import in the file
//       .then((reg) => {
//         console.log('✅ Service Worker registered at:', reg.scope);
//       })
//       .catch((err) => {
//         console.error('❌ Service Worker registration failed:', err);
//       });
//   });
// }
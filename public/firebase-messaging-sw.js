importScripts(
  "https://www.gstatic.com/firebasejs/10.3.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyD2vQikbick8bhRAeXY2N2roy7BNuSegTg",
  authDomain: "pwaapp-c4216.firebaseapp.com",
  projectId: "pwaapp-c4216",
  storageBucket: "pwaapp-c4216.firebasestorage.app",
  messagingSenderId: "128942456236",
  appId: "1:128942456236:web:6bffcf65d7b2e1420d8e09",
  measurementId: "G-4XG707RC7M",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: icon || "/pwa-512x512.png",
  });
});

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2vQikbick8bhRAeXY2N2roy7BNuSegTg",
  authDomain: "pwaapp-c4216.firebaseapp.com",
  projectId: "pwaapp-c4216",
  storageBucket: "pwaapp-c4216.firebasestorage.app",
  messagingSenderId: "128942456236",
  appId: "1:128942456236:web:6bffcf65d7b2e1420d8e09",
  measurementId: "G-4XG707RC7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };

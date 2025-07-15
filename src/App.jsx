import { useEffect, useState } from "react";
import { messaging, getToken, onMessage } from "./firebase-config";
import axios from "axios";

function App() {
  const [fcmToken, setFcmToken] = useState("");

  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getToken(messaging, {
          vapidKey: "BLNEofFNYEcYaTRKWtRT3nj3xMwpUenDwX2Xqr3M3CT0hrLJt37iQTEiZcAhsE6WCt9wc16IMJTv39VrUgapI68"
        }).then((token) => {
          if (token) {
            setFcmToken(token);
            console.log("FCM Token:", token);
            // TODO: Send token to backend
          } else {
            console.log("No token available");
          }
        }).catch(err => console.log("Token Error", err));
      }
    });
   
    
    onMessage(messaging, (payload) => {
      console.log("Message Received", payload);
      alert(`${payload.notification.title}\n${payload.notification.body}`);
    });
  }, []);
  const sendPushNotification = async () => {
    console.log(fcmToken)
    try {
      const response = await axios.post('http://localhost:4000/notification', {
        token: fcmToken
      });
      if (response.status === 200) {
        console.log("✅ Successfully sent notification");
      }
    } catch (error) {
      console.error("❌ Error sending notification:", error.response?.data || error.message);
    }
  };
  return (
    <div>
      <h1>PWA Push Notifications (FCM)</h1>
      <p>FCM Token:</p>
      <textarea rows="5" cols="80" value={fcmToken} readOnly />
      <button onClick={sendPushNotification}>Send Push Notification</button>

    </div>
  );
}

export default App;

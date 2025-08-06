import { notification } from "antd";
import { messaging, getToken, onMessage } from "../firebase-config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function detectPlatform() {
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return "android";
  if (/iphone|ipad|ipod/.test(ua) && !window.MSStream) return "ios";
  return "unknown";
}

function isPwaInstalled() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  return new Uint8Array([...raw].map((char) => char.charCodeAt(0)));
}

export async function registerForPush(setToken) {
  const platform = detectPlatform();
  const username=localStorage.getItem("")
 alert(`
Platform: ${platform}
Is PWA Installed: ${isPwaInstalled()}

`);

  try {
    
     
       

    if (platform === "android") {
      console.log("urru this andriod block")
      const token = await getToken(messaging, {
        vapidKey: "BLNEofFNYEcYaTRKWtRT3nj3xMwpUenDwX2Xqr3M3CT0hrLJt37iQTEiZcAhsE6WCt9wc16IMJTv39VrUgapI68",
      });
console.log(token,"tokn")
      if (token) {
        console.log(" Android FCM Token:", token);
        setToken({token,platform});
      }

      // Listen for foreground messages
      onMessage(messaging, (payload) => {
        console.log(" Foreground FCM message:", payload);
        alert(`${payload.notification.title}\n${payload.notification.body}`);
      });

    } else if (platform === "ios" ) {
    console.log("hii ur is ios block")
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BH0D4dd-80wJw1zqYt9QMSeV7aI1hZXjmfAXKRAIfR_ejTcTn6SeQwEGbYjiT8YNgpCoLsbmjI9ASsbvlpnhOfc"),
      });

      console.log("iOS Web Push Subscription:", subscription,platform);
      setToken({ token: subscription, platform });  // Send to backend
    } else {
      console.warn("Push notifications not supported or PWA not installed on iOS.");
    }

  } catch (err) {
    console.error(" Error during push registration:", err);
    setToken(null);
  }
}

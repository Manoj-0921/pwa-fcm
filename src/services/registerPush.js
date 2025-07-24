import { messaging, getToken, onMessage } from "../firebase-config";

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
 const permission=Notification.permission
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
        applicationServerKey: urlBase64ToUint8Array("BMU_YCY4w8CyrDxvP5aQt-1KsAJT8huKF6zfJQoBAGN0Xvcdzmxn5E-h-PKYeJAKEVPnFgO1zz3bZCOzBQQe7t8"),
      });

      console.log("iOS Web Push Subscription:", subscription,platform);
      setToken({token:JSON.stringify(subscription),platform}); // Send to backend
    } else {
      console.warn("Push notifications not supported or PWA not installed on iOS.");
    }

  } catch (err) {
    console.error(" Error during push registration:", err);
    setToken(null);
  }
}

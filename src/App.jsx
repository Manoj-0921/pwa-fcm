import { useEffect, useState } from "react";
import { registerForPush } from "./services/registerPush.js";
import axios from "axios";
function detectPlatform() {
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return "android";
  if (/iphone|ipad|ipod/.test(ua) && !window.MSStream) return "ios";
  return "unknown";
}
function App() {
  const [token, setToken] = useState("");
  const [platform, setPlatform] = useState("");


useEffect(()=>{
  registerForPush(({ token, platform }) => {
      setToken(token);
      setPlatform(platform);
    });
},[])

  const sendTokenToBackend = async () => {
    if (!token || !platform) {
      alert("❌ No token or platform to send");
      return;
    }

    try {
      const response = await axios.post("https://d8f967a18680.ngrok-free.app/notification", {
        token,
        platform
      });
      if (response.status === 200) {
        alert("✅ Token successfully sent to backend");
      }
    } catch (error) {
      alert(`❌ Error sending token: ${error.message}`);
    }
  };

  const logOut = async () => {
    if (!token || !platform) {
      alert("❌ No token or platform to logout");
      return;
    }

    try {
      const response = await axios.post("https://d8f967a18680.ngrok-free.app/logout", {
        token,
        platform
      });

      if (response.status === 200) {
        alert("👋 Logged out and token removed");
        setToken("");
        setPlatform("");
      }
    } catch (error) {
      alert(`❌ Logout error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div>
      <h1>PWA Push Notification</h1>
      <p>Push Token:</p>
      <textarea rows="5" cols="80" value={token} readOnly />
      <p>Platform:</p>
      <textarea rows="2" cols="20" value={platform} readOnly />
      <br />
     
      <button onClick={sendTokenToBackend}>📤 Send Token To Backend</button>
      <button onClick={logOut}>🚪 Logout</button>
    </div>
  );
}

export default App;

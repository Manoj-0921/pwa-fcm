import { useEffect, useState } from "react";
import { registerForPush } from "./services/registerPush.js";
import axios from "axios";

function App() {
  const [token, setToken] = useState("");
  const [platform, setPlatform] = useState("");
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      console.log("🔔 Notification not yet granted");
    } else {
      // Already granted, register directly
      register();
    }
  }, []);

  const register = () => {
    registerForPush(({ token, platform }) => {
      setToken(token);
      setPlatform(platform);
    });
  };

  const handleEnableNotifications = async () => {
    const permissionResult = await Notification.requestPermission();
    setPermission(permissionResult);

    if (permissionResult === "granted") {
      alert("✅ Notification permission granted!");
      register();
    } else if (permissionResult === "denied") {
      alert("❌ Notification permission denied. Please enable from browser settings.");
    } else {
      alert("⚠️ Notification permission dismissed.");
    }
  };

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
        setPermission("default");
      }
    } catch (error) {
      alert(`❌ Logout error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>PWA Push Notification</h1>
      <p>Push Token:</p>
      <textarea rows="5" cols="80" value={token} readOnly />
      <p>Platform:</p>
      <textarea rows="2" cols="20" value={platform} readOnly />
      <br />

      {/* Permission-based Button UI */}
      {permission !== "granted" && (
        <div style={{ margin: "1rem 0" }}>
          <button
            onClick={handleEnableNotifications}
            style={{
              background: "#0d6efd",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            👉 Enable Notifications
          </button>
        </div>
      )}

      <button onClick={sendTokenToBackend} style={{ marginRight: "10px" }}>
        📤 Send Token To Backend
      </button>
      <button onClick={logOut}>🚪 Logout</button>
    </div>
  );
}

export default App;

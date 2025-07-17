import { useState } from "react";
import { registerForPush } from "./services/registerPush.js";
import axios from "axios";

function App() {
  const [token, setToken] = useState("");
  const [platform, setPlatform] = useState("");

  const handleRegisterPush = () => {
    registerForPush(({ token, platform }) => {
      setToken(token);
      setPlatform(platform);
    });
  };

  console.log(token,platform)

  const sendTokenToBackend = async (token) => {
    if (!token) {
      alert("No token to send");
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
      alert(`❌ Error: ${error.message}`);
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
      <button onClick={handleRegisterPush}>🔔 Enable Push Notifications</button>
      <button onClick={() => sendTokenToBackend(token)}>📤 Send Token To Backend</button>
    </div>
  );
}

export default App;

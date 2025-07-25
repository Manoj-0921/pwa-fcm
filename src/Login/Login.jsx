import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNotification } from '../NotificationContext';
import { useNavigate } from "react-router-dom";

export default function Login({setIsLoggedIn}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token, platform } = useNotification(); // ✅ get from context
  const [permissionStatus, setPermissionStatus] = useState()
  console.log(token,platform)
  
const navigate = useNavigate();
const enableNotifications = async () => {
    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
      if (permission === "granted") {
        window.location.reload(); // force context to re-register
      } else {
        alert("🚫 Notification permission denied");
      }
    } else {
      alert("✅ Notification permission already " + Notification.permission);
    }
  };

  const handleLogin = async () => {
    if (!token || !platform) {
      alert("🔔 Push token or platform not available yet.");
      return;
    }

    try {
      const response = await axios.post("https://de87e542bd7e.ngrok-free.app/login", {
        username,
        password,
        token,
        platform,
      });

      if (response.status === 200) {
        alert("✅ Login successful");
setIsLoggedIn(true)
sessionStorage.setItem("isLoggedIn", "true");
sessionStorage.setItem("username", username)
       navigate("/home")
      }
    } catch (err) {
      console.error(err);
      alert("❌ Login failed");
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="header-container">
          <h1 className="title">Welcome Back</h1>
          <p className="subtitle">Sign in to continue</p>
        </div>

        <div className="form-container">
          <div className="input-group">
            <label htmlFor="username" className="label">Username</label>
            <input
              id="username"
              type="text"
              className="input"
              placeholder="Enter your username"
              autoCapitalize="none"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // ✅ controlled input
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // ✅ controlled input
            />
          </div>
           {permissionStatus !== "granted" && (
            <button
              className="login-button"
              style={{ backgroundColor: "#ffb347", marginBottom: "10px" }}
              onClick={enableNotifications}
            >
              Enable Notifications
            </button>
          )}

          <button className="login-button" onClick={handleLogin}>
            Sign In
          </button>

          <button className="signup-link">
            <span className="signup-text">
              Don't have an account?{' '}
              <span className="signup-text-bold">Sign up</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

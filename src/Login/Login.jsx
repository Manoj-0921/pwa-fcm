import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNotification } from '../NotificationContext';
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [permissionGranted, setPermissionGranted] = useState(Notification.permission === "granted");
  const { token, platform } = useNotification(); // ✅ get from context
  const navigate = useNavigate();

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        alert("🔔 Notifications enabled");
        setPermissionGranted(true);
      } else {
        alert("❌ Notifications blocked or dismissed");
        setPermissionGranted(false);
      }
    } catch (err) {
      console.error("Error requesting permission", err);
      alert("❌ Notification request failed");
    }
  };

  const handleLogin = async () => {
    if (!token || !platform) {
      alert("⚠️ Push token or platform not available. Please allow notifications first.");
      return;
    }

    try {
      const response = await axios.post("https://4ed32b77deb9.ngrok-free.app/login", {
        username,
        password,
        token,
        platform,
      });

      if (response.status === 200) {
        alert("✅ Login successful");
        setIsLoggedIn(true);
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("username", username);
        navigate("/home");
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
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* ✅ Notification permission button */}
          {!permissionGranted && (
            <button className="login-button" onClick={requestNotificationPermission}>
              Enable Notifications
            </button>
          )}

          {/* ✅ Only show login when permission granted */}
          {permissionGranted && (
            <button className="login-button" onClick={handleLogin}>
              Sign In
            </button>
          )}

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

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { NotificationProvider } from "./NotificationContext";
import { ToastContainer } from "react-toastify";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Admin from "./Home/admin/Admin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "";
  });

  // Keep localStorage in sync
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <NotificationProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                role === "admin" ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/home" replace />
                )
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
              )
            }
          />
          <Route
            path="/home"
            element={
              isLoggedIn && role === "user" ? (
                <Home setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/admin"
            element={
              isLoggedIn && role === "admin" ? (
                <Admin setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </NotificationProvider>
  );
}

export default App;

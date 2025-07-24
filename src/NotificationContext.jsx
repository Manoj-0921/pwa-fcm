// context/NotificationContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { registerForPush } from "./services/registerPush.js";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [platform, setPlatform] = useState("");
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    if (Notification.permission === "default"||"granted") {
      register();
    } else {
      console.log("🔔 Notification permission not granted");
    }
  }, []);

  const register = () => {
    registerForPush(({ token, platform }) => {
      setToken(token);
      setPlatform(platform);
    });
  };

  return (
    <NotificationContext.Provider
      value={{ token, platform, permission }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

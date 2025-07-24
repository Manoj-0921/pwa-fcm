// context/NotificationContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { registerForPush } from "./services/registerPush.js";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [platform, setPlatform] = useState("");
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    if (Notification.permission === "granted") {
      register();
    } else {
      console.log("🔔 Notification permission not granted");
    }
  }, []);

 const register = async () => {
    try {
      await registerForPush(({ token, platform }) => {
        setToken(token);
        setPlatform(platform);
        setPermission("granted");
      });
    } catch (err) {
      console.error("❌ Error during registration:", err);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ token, platform, permission ,register}}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

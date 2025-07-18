import { useNavigate } from "react-router-dom";
import { useNotification } from "../NotificationContext";
import axios from "axios";

function Home({setIsLoggedIn}) {
  const navigate = useNavigate();
  const { token, platform } = useNotification(); // ✅ Get from context
console.log("oken",platform)
  const handleLogout = async () => {
    try {
      // ✅ Send logout request with token & platform
      await axios.post("https://cd4266f80db0.ngrok-free.app/logout", {
         token,
         platform,
      });

      console.log("🔕 Push token unregistered successfully");
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
    finally{
        setIsLoggedIn(false)
        localStorage.removeItem("isLoggedIn");


 navigate("/");
    }

   
  };

  return (
    <div>
      <h1>🏠 Home Page</h1>
      <p><strong>Push Token:</strong> {token}</p>
      <p><strong>Platform:</strong> {platform}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;

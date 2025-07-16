import { useEffect, useState } from "react";
import {registerForPush} from "./services/registerPush.js"
function App() {
  const [token, setToken] = useState("");
  const [platform,setPlatfrom]=useState("")

  useEffect(() => {
    registerForPush(({token,platform}) => {
      setToken(token);
      setPlatfrom(platform)

    });
  }, []);



  return (
    <div>
      <h1>PWA Push Notification</h1>
      <p>FCM Token:</p>
      <textarea rows="5" cols="80" value={token} readOnly />
      <textarea row="2" cols="20" value={platform} readOnly/>
      

    </div>
  );
}

export default App;

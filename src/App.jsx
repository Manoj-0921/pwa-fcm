import { useEffect, useState } from "react";
import {registerForPush} from "./services/registerPush.js"
import axios from "axios";
function App() {
  const [token, setToken] = useState("");
  const [platform,setPlatfrom]=useState("")

  useEffect(() => {
    registerForPush(({token,platform}) => {
      setToken(token);
      setPlatfrom(platform)

    });
  }, []);
const sendTokenToBackend= async(token)=>{
  try{
    const reponse=   await axios.post("https://4f0eb7f39936.ngrok-free.app/notifcation",{
      token
    })
    if(reponse.status==200){
      alert("ur token sucessfully send to the  backend")
    }
  
  }
  catch(error){
     alert(`errr0:${error.message}`)
  };
 

 
  
}


  return (
    <div>
      <h1>PWA Push Notification</h1>
      <p>FCM Token:</p>
      <textarea rows="5" cols="80" value={token} readOnly />
      <textarea row="2" cols="20" value={platform} readOnly/>
       <button  onClick={sendTokenToBackend}>sendTokenToBackend</button>

    </div>
  );
}

export default App;

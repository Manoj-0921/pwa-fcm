import React from 'react';
import './Home.css';
import Date from './Date.jsx/Date';
import { Layout, theme } from 'antd';
import { LogoutOutlined } from '@ant-design/icons'; // import the icon
import axios from 'axios';
import { useNotification } from '../NotificationContext';
import { useNavigate } from "react-router-dom"; 
const { Header, Content, Footer } = Layout;

const Home = ({setIsLoggedIn}) => {
   const navigate = useNavigate();
    const { token, platform } = useNotification();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

 const handleLogout = async () => {
    try {
      
      await axios.post("https://a79ed7b4f23a.ngrok-free.app/logout", {
         token,
         platform,
      });

      console.log("🔕 Push token unregistered successfully");
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
    finally{
        setIsLoggedIn(false)
        sessionStorage.removeItem("isLoggedIn");


 navigate("/");
    }

   
  };
 
  const fetchFromBackend=async(dates)=>{
try{
const response=await axios.post("",{
  startDate:dates.startDate,
  endDate:dates.endDate
})
if(response.status===200){
  console.log(response.data)
}
}
catch(error){
  console.log(error)
}
  }

  return (
    <Layout hasSider>
      <Layout>
        <Header className="header">
          <div className="header-left">
            <img src="/user.png" alt="Avatar" className="header-logo" />
            <span className="header-title">My App</span>
          </div>
          <button className="logout-icon-btn" onClick={handleLogout}>
            <LogoutOutlined style={{ fontSize: '18px', color: 'white' }} />
          </button>
        </Header>

        <Content style={{ marginTop: 64, overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: " #f5f6fa",
              borderRadius: borderRadiusLG,
            }}
          >
           <Date fetchFromBackend={fetchFromBackend}/>
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }} />
      </Layout>
    </Layout>
  );
};

export default Home;

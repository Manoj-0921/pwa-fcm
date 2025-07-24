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
      
      await axios.post(" https://0ebaccb699c1.ngrok-free.app /logout", {
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
        sessionStorage.removeItem("username");


 navigate("/");
    }

   
  };
 
const fetchFromBackend = async (dates) => {
  const username = sessionStorage.getItem("username");
  const { startDate, endDate } = dates;

  try {
    const response = await axios.post(" https://0ebaccb699c1.ngrok-free.app /date", {
      username,
      startDate,
      endDate,
    });

    if (response.status === 200) {
      console.log("✅ Response from backend:", response.data);
    }
  } catch (error) {
    console.error("❌ Error fetching data from backend:", error.message);
  }
};



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
              paddingTop: 24,
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

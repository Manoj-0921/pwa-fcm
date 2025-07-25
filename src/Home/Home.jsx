import React from 'react';
import { useState } from 'react';
import './Home.css';
import Date from './Date.jsx/Date';
import Data from "./Data/Data"
import { Layout, theme } from 'antd';
import { ImportOutlined, LogoutOutlined } from '@ant-design/icons'; // import the icon
import axios from 'axios';
import { useNotification } from '../NotificationContext';
import { useNavigate } from "react-router-dom"; 
const { Header, Content, Footer } = Layout;

const Home = ({setIsLoggedIn}) => {
   const navigate = useNavigate();
    const { token, platform } = useNotification([]);
    const[data,setData]=useState([])
    console.log(data,"hii")
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

 const handleLogout = async () => {
    try {
      
      await axios.post(" https://de87e542bd7e.ngrok-free.app/logout", {
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
  console.log("hiii")
  const { startDate, endDate } = dates;

  try {
    const response = await axios.post(" https://de87e542bd7e.ngrok-free.app/date", {
      username,
      startDate,
      endDate,
    });

    if (response.status === 200) {
      
       
      console.log("✅ Response from backend:", response.data.attendance);
      setData(response.data.attendance||[])
      // You can handle success message if needed
    }
  } catch (error) {
    let message = "❌ An unexpected error occurred";

    if (error.response) {
      // Server responded with a status outside 2xx
      message = `🚫 Server Error: ${error.response.status}\n${error.response.data?.error || error.response.statusText}`;
    } else if (error.request) {
      // Request made but no response received
      message = "📡 Network Error: No response from the server. Please check your connection.";
    } else {
      // Other unknown errors (e.g., config, CORS, client-side)
      message = `⚠️ Error: ${error.message}`;
    }

    console.error("❌ Error fetching data from backend:", error);
    alert(message);
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
              paddingTop: 4,
              textAlign: 'center',
              background: " #f5f6fa",
              borderRadius: borderRadiusLG,
            }}
          >
           <Date fetchFromBackend={fetchFromBackend}/>
          </div>
        <div style={{
              paddingTop: 1,
              textAlign: 'center',
              background: " #f5f6fa",
              borderRadius: borderRadiusLG,
            }}>
          <Data data={data}/>
        </div>
        </Content>

        <Footer style={{ textAlign: 'center' }} />
      </Layout>
    </Layout>
  );
};

export default Home;

import React from 'react';
import { useState } from 'react';
import './Home.css';
import Date from './Date.jsx/Date';
import Data from "./Data/Data"
import { Layout, theme } from 'antd';
import { CodeSandboxCircleFilled, ImportOutlined, LogoutOutlined } from '@ant-design/icons'; // import the icon
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
  const refreshToken=sessionStorage.getItem("refreshToken")
    try {
      
      await axios.post("https://a36e13d19a39.ngrok-free.app/logout", {
         token,
         platform,
         refreshToken
      });

      console.log("🔕 Push token unregistered successfully");
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
    finally{
        setIsLoggedIn(false)
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("username");


 navigate("/");
    }

   
  };
 
const fetchFromBackend = async (dates) => {
  const username = sessionStorage.getItem("username");
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  const { startDate, endDate } = dates;

  try {
    const response = await axios.post(
      "https://a36e13d19a39.ngrok-free.app/date",
      { startDate, endDate },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("✅ Response from backend:", response.data.attendance);
      setData(response.data.attendance || []);
    }
  } catch (error) {
    if (error.response && error.response.status === 403 && refreshToken) {
      console.log("🔄 Access token expired. Attempting to refresh...");
      try {
        // Call refresh endpoint
        const refreshResponse = await axios.post(
          "https://a36e13d19a39.ngrok-free.app/refresh",
          { username, refreshToken }
        );

        if (refreshResponse.status === 200 && refreshResponse.data.accessToken) {
          sessionStorage.setItem("accessToken", refreshResponse.data.accessToken);
          console.log("🔁 Token refreshed. Retrying original request...");
          return fetchFromBackend(dates); // Retry with new token
        } else {
          throw new Error("Refresh token invalid or missing access token in response.");
        }
      } catch (refreshError) {
        console.error("🔒 Failed to refresh token:", refreshError);
        alert("Session expired. Please login again.");
       setIsLoggedIn(false)
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("username");


 navigate("/");
      }
    } else {
      let message = "❌ An unexpected error occurred";

      if (error.response) {
        message = `🚫 Server Error: ${error.response.status}\n${error.response.data?.error || error.response.statusText}`;
      } else if (error.request) {
        message = "📡 Network Error: No response from the server.";
      } else {
        message = `⚠️ Error: ${error.message}`;
      }

      console.error("❌ Error fetching data from backend:", error);
      alert(message);
    }
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

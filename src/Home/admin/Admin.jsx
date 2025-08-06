import React, { useEffect, useState } from "react";
import { Layout, Select, Table, Switch } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import "./Admin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;
const { Option } = Select;

const Admin = ({setIsLoggedIn}) => {
  const [hierarchyData, setHierarchyData] = useState({});
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHierarchyData();
  }, []);

  const fetchHierarchyData = async () => {
    try {
      const response = await axios.get(
        "https://c65e73a26f76.ngrok-free.app/api/get_hierarchy",
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      if (response.status === 200) {
        setHierarchyData(response.data);
      }
    } catch (err) {
      console.error("❌ Error fetching hierarchy data:", err);
    }
  };

  const handleDeptChange = (value) => {
    setSelectedDept(value);
    setSelectedTeam(null);
  };

  const handleTeamChange = (value) => {
    setSelectedTeam(value);
    fetchMembers(selectedDept, value);
  };

  const fetchMembers = async (department, team) => {
    try {
      const response = await axios.post(
        "https://c65e73a26f76.ngrok-free.app/api/get_members",
        { department, team },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      if (response.status === 200) {
        setMembers(
          response.data.members.map((member, index) => ({
            key: index,
            department,
            team,
            name: member.name,
            enabled: member.notificationEnabled,
            averageStay: member.avgStayTime,
          }))
        );
      }
    } catch (err) {
      console.error("❌ Error fetching members:", err);
    }
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");


    try {
      await axios.post(
        "https://c65e73a26f76.ngrok-free.app/api/logout_mobile",
        { refreshToken },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("🔕 Push token unregistered successfully");
    } catch (error) {
      console.error("❌ Logout failed:", error);
    } finally {
      setIsLoggedIn(false);
      // Clear all stored data
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("username");

      navigate("/"); // Redirect to login
    }
  };
const handleToggleNotification = async (username, enabled) => {
  try {
    await axios.post(
      " https://c65e73a26f76.ngrok-free.app/api/update_notification_status",
      { username, enabled },
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    console.log(`✅ Updated notification for ${username}: ${enabled}`);
  } catch (err) {
    console.error(`❌ Error updating notification for ${username}:`, err);
  }
};


const columns = [
  { title: "Member", dataIndex: "name", key: "name" },
  {
    title: "Enable",
    key: "enable",
    render: (_, record) => (
      <Switch
        defaultChecked={record.enabled}
        onChange={(checked) => handleToggleNotification(record.name, checked)}
      />
    ),
  },
  { title: "Avg Stay", dataIndex: "averageStay", key: "averageStay" },
];

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <div className="header-left">
          <img src="/user.png" alt="Avatar" />
          <span>Admin Dashboard</span>
        </div>
        <button className="logout-icon-btn" onClick={handleLogout}>
          <LogoutOutlined style={{ fontSize: "18px", color: "white" }} />
        </button>
      </Header>

      <Content className="app-content">
        <div className="selectors">
          <Select
            placeholder="Select Department"
            style={{ width: 200 }}
            onChange={handleDeptChange}
            value={selectedDept}
          >
            {Object.keys(hierarchyData).map((dept) => (
              <Option key={dept} value={dept}>
                {dept}
              </Option>
            ))}
          </Select>

          <Select
            placeholder="Select Team"
            style={{ width: 200 }}
            onChange={handleTeamChange}
            value={selectedTeam}
            disabled={!selectedDept}
          >
            {selectedDept &&
              hierarchyData[selectedDept]?.map((team) => (
                <Option key={team} value={team}>
                  {team}
                </Option>
              ))}
          </Select>
        </div>

        <div className="table-wrapper">
          <Table
            dataSource={members}
            columns={columns}
            pagination={false}
            scroll={{ x: true }}
            size="middle"
          />
        </div>
      </Content>
    </Layout>
  );
};

export default Admin;

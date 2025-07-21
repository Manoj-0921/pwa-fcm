
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../NotificationContext";

import axios from "axios";
import "./Home.css"
function Home({setIsLoggedIn}) {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("daily");
  const [startDate, setStartDate] = useState(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });
  const [endDate, setEndDate] = useState(() => new Date());
  const { token, platform } = useNotification(); // ✅ Get from context
console.log("oken",platform)
 const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to update the date range based on the selected period (Today, Week, Month)
  const updateDateRange = (selectedPeriod) => {
    const now = new Date();
    let start = new Date(now);
    let end = new Date(now);

    switch (selectedPeriod) {
      case "daily":
        start.setHours(0, 0, 0, 0); // Start of today
        end = new Date(); // Current time for end date
        break;
      case "weekly":
        end.setHours(23, 59, 59, 999); // End of current day
        start.setDate(now.getDate() - now.getDay()); // Start of the current week (Sunday)
        start.setHours(0, 0, 0, 0);
        break;
      case "monthly":
        end.setHours(23, 59, 59, 999); // End of current day
        start = new Date(now.getFullYear(), now.getMonth(), 1); // First day of current month
        start.setHours(0, 0, 0, 0);
        break;
      case "custom":
        // For custom, dates are handled by the date inputs
        break;
      default:
        break;
    }

    setStartDate(start);
    setEndDate(end);
    setPeriod(selectedPeriod);
  };

  // Effect to set the initial date range to "daily" when the component mounts
  useEffect(() => {
    updateDateRange("daily");
  }, []);

  
  const onStartDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate <= endDate) {
      setStartDate(selectedDate);
      setPeriod("custom");
    } else {
     
      console.error("Invalid Date Range: Start date must be before end date.");
      alert("Invalid Date Range: Start date must be before end date."); 
    }
  };

  
  const onEndDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    selectedDate.setHours(23, 59, 59, 999); 

    if (selectedDate >= startDate) {
      setEndDate(selectedDate);
      setPeriod("custom"); 
    } else {
     
      console.error("Invalid Date Range: End date must be after start date.");
      alert("Invalid Date Range: End date must be after start date."); 
    }
  };

 
  const PeriodButton = ({ title, selected, onClick }) => (
    <button
     className={`period-button ${selected ? "period-button-selected" : "period-button-default"}`}
      onClick={onClick}
    >
      {title}
    </button>
  );

  
  const DatePickerField = ({ label, value, onChange }) => (
    <div className="date-picker-field">
      <label className="date-picker-label">{label}</label>
      <input
        type="date"
        value={formatDateForInput(value)}
        onChange={onChange}
        className="date-picker-input"
      />
    </div>
  );

  const handleLogout = async () => {
    try {
      
      await axios.post("https://04b85df38392.ngrok-free.app/logout", {
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
    
      
      <div className="container1">
     
      <div className="period-wrapper">
        <div className="period-container">
          <PeriodButton
            title="Today"
            selected={period === "daily"}
            onClick={() => updateDateRange("daily")}
          />
          <PeriodButton
            title="Week"
            selected={period === "weekly"}
            onClick={() => updateDateRange("weekly")}
          />
          <PeriodButton
            title="Month"
            selected={period === "monthly"}
            onClick={() => updateDateRange("monthly")}
          />
        </div>
      </div>

      {/* Container for custom date pickers */}
      <div className="date-picker-container">
        <DatePickerField
          label="Start Date"
          value={startDate}
          onChange={onStartDateChange}
        />
        <DatePickerField
          label="End Date"
          value={endDate}
          onChange={onEndDateChange}
        />
      </div>

      {/* Display current selected range (for debugging/verification) */}
      <div className="debug-display">
        <p>Selected Period: <span className="debug-text-bold">{period}</span></p>
        <p>Start Date: <span className="debug-text-bold">{formatDateForInput(startDate)}</span></p>
        <p>End Date: <span className="debug-text-bold">{formatDateForInput(endDate)}</span></p>
      </div>
         <h1>🏠 Home Page</h1>
      <p><strong>Push Token:</strong> {token}</p>
      <p><strong>Platform:</strong> {platform}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
   
  );

}
export default Home;

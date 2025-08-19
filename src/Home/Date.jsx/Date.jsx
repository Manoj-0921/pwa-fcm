import React, { useState, useEffect } from "react";
import { Card, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import "./Date.css"; // Import CSS here

const Date = ({ fetchFromBackend }) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const handleShortcutClick = (type) => {
    const today = dayjs();
    if (type === "today") {
      setStartDate(today.startOf("day")); // 00:00 today
      setEndDate(today.endOf("day")); // 23:59:59 today
    } else if (type === "week") {
      setStartDate(today.subtract(6, "day").startOf("day"));
      setEndDate(today.endOf("day"));
    } else if (type === "month") {
      setStartDate(today.subtract(29, "day").startOf("day"));
      setEndDate(today.endOf("day"));
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchFromBackend({
        startDate: startDate.format("YYYY-MM-DD HH:mm:ss"),
        endDate: endDate.format("YYYY-MM-DD HH:mm:ss"),
      });
    }
  }, [startDate, endDate]);

  return (
    <div className="date-selector-container1">
      {/* Shortcut Buttons */}
      <Card variant="borderless" className="custom-card">
        <div className="button-container">
          <Button
            className="custom-button"
            type="primary"
            size="large"
            onClick={() => handleShortcutClick("today")}
          >
            Today
          </Button>
          <Button
            className="custom-button"
            type="primary"
            size="large"
            onClick={() => handleShortcutClick("week")}
          >
            Week
          </Button>
          <Button
            className="custom-button"
            type="primary"
            size="large"
            onClick={() => handleShortcutClick("month")}
          >
            Month
          </Button>
        </div>
      </Card>

      {/* Date Pickers */}
      <Card variant="borderless" className="custom-card">
        <div className="date-row">
          <div className="date-column">
            <label className="date-label">Start Date</label>
            <DatePicker
              className="range-picker"
              value={startDate}
              onChange={setStartDate}
            />
          </div>
          <div className="date-column">
            <label className="date-label">End Date</label>
            <DatePicker
              className="range-picker"
              value={endDate}
              onChange={setEndDate}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Date;

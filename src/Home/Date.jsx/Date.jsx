import React, { useState, useEffect } from 'react';
import { Card, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';

const DateSelector = ({ fetchFromBackend }) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const handleShortcutClick = (type) => {
    const today = dayjs();
    if (type === "today") {
      setStartDate(today);
      setEndDate(today);
    } else if (type === "week") {
      setStartDate(today.subtract(6, 'day'));
      setEndDate(today);
    } else if (type === "month") {
      setStartDate(today.subtract(29, 'day'));
      setEndDate(today);
    }
  };

  useEffect(() => {
    if (fetchFromBackend && startDate && endDate) {
      fetchFromBackend({
        startDate: startDate.format('YYYY-MM-DD HH:mm:ss'),
        endDate: endDate.format('YYYY-MM-DD HH:mm:ss'),
      });
    }
  }, [startDate, endDate, fetchFromBackend]);

  return (
    <div style={containerStyle}>
      {/* Start Date Inline */}
    
      {/* Shortcut Buttons */}
      <Card
        variant="borderless"
        style={cardStyle}
        bodyStyle={{ padding: '10px' }}
      >
        <div style={buttonRowStyle}>
          <Button type="primary" size="large" onClick={() => handleShortcutClick('today')} style={buttonStyle}>Today</Button>
          <Button type="primary" size="large" onClick={() => handleShortcutClick('week')} style={buttonStyle}>Week</Button>
          <Button type="primary" size="large" onClick={() => handleShortcutClick('month')} style={buttonStyle}>Month</Button>
        </div>
      </Card>

      {/* Start and End Date Side-by-Side */}
      <Card variant="borderless" style={cardStyle} bodyStyle={{ padding: '10px' }}>
        <div style={dateRowStyle}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Start Date</label>
            <DatePicker
              style={pickerStyle}
              value={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>End Date</label>
            <DatePicker
              style={pickerStyle}
              value={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

const containerStyle = {
  width: '100%',
  maxWidth: '24rem',
  margin: '0 auto',
  padding: '10px',
};

const cardStyle = {
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  marginBottom: '10px',
};

const buttonRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '8px',
};

const buttonStyle = {
  flex: 1,
  borderRadius: '8px',
  fontSize: '16px',
  height: '44px',
};

const pickerStyle = {
  width: '100%',
  height: '44px',
  fontSize: '16px',
  borderRadius: '8px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: 'bold',
  fontSize: '14px',
};

const dateRowStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
};

export default DateSelector;

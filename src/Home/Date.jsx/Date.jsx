import React, { useState,useEffect } from 'react';
import { Card, Button, DatePicker, Space } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const DateSelector = ({fetchFromBackend}) => {
  


  
  const [rangeDates, setRangeDates] = useState([
    dayjs(),
    dayjs()
  ]);
  

  

  const handleShortcutClick = (type) => {
    const today = dayjs();
    if (type === "today") {
      setRangeDates([today,today]);
    } else if (type === "week") {
      setRangeDates([today.subtract(6, 'day'), today]); // last 7 days
    } else if (type === "month") {
      setRangeDates([today.subtract(29, 'day'), today]); // last 30 days
    }
  };
  useEffect(() => {
  if (fetchFromBackend && rangeDates?.[0] && rangeDates?.[1]) {
    const formattedDates = {
      startDate: rangeDates[0].format('YYYY-MM-DD HH:mm:ss'),
      endDate: rangeDates[1].format('YYYY-MM-DD HH:mm:ss'),
    };
    fetchFromBackend(formattedDates);
  }
}, [rangeDates, fetchFromBackend]);

  return (
    <Space direction="vertical" size="large" >
      {/* First Card with shortcut buttons and DatePicker */}
      <Card variant="borderless" style={{ width: "300px", padding: "0px",zIndex:"2",boxShadow:"4px" }}>
        <Space direction="vertical" size="middle" style={{ width: "100%", }}>
          <Space wrap>
            <Button type="primary" onClick={() => handleShortcutClick("today")}>
              Today
            </Button>
            <Button type="primary" onClick={() => handleShortcutClick("week")}>
              Week
            </Button>
            <Button type="primary" onClick={() => handleShortcutClick("month")}>
              Month
            </Button>
          </Space>

        </Space>
      </Card>

      {/* Second Card with RangePicker */}
      <Card variant="borderless" style={{ width: 300, padding: "0px" }}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <RangePicker
            style={{ width: "100%" }}
            value={rangeDates}
            onChange={(dates) => setRangeDates(dates)}
          />
        </Space>
      </Card>
    </Space>
  );
};

export default DateSelector;

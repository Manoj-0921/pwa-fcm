import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

const Data = () => {
  return (
    <div style={{ padding: "16px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // 💡 allow wrapping on small screens
          gap: "12px",
          justifyContent: "space-between",
        }}
      >
        {/* Card 1 wrapper */}
        <div
          style={{
            flex: "1 1 140px", // 💡 grow/shrink and minimum width
            display: "flex",
            minWidth: "140px",
          }}
        >
          <Card
            style={{
              borderRadius: 8,
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)',
              textAlign: 'center',
              width: '100%',
              height: '100%',
            }}
            bodyStyle={{
              paddingTop: 0,
              paddingBottom: 12,
              paddingLeft: 12,
              paddingRight: 12,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Title level={5} style={{ marginBottom: 4, fontSize: 14 }}>Total Logins</Title>
            <Text style={{ fontSize: 18, fontWeight: 600, color: '#1890ff' }}>
              123
            </Text>
          </Card>
        </div>

        {/* Card 2 wrapper */}
        <div
          style={{
            flex: "1 1 140px",
            display: "flex",
            minWidth: "140px",
          }}
        >
          <Card
            style={{
              borderRadius: 8,
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)',
              textAlign: 'center',
              width: '100%',
              height: '100%',
            }}
            bodyStyle={{
              paddingTop: 0,
              paddingBottom: 12,
              paddingLeft: 12,
              paddingRight: 12,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Title level={5} style={{ marginBottom: 4, fontSize: 14 }}>Total Duration</Title>
            <Text style={{ fontSize: 18, fontWeight: 600, color: '#52c41a' }}>
              1123h 60m 60s
            </Text>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Data;

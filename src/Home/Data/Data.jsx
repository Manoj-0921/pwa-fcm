import React, { useState } from 'react'; // Import useState hook
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import "./Data.css"

dayjs.extend(duration);


const Data = ({ data }) => {
 
  const [activeTab, setActiveTab] = useState('events');
const [pageIndex, setPageIndex] = useState(0);
const itemsPerPage = 5;


  if (!Array.isArray(data)) {
    return (
      <div className="no-data-message">
        <p>No data available</p>
      </div>
    );
  }
const chartData = data.map(day => {
  let totalMinutes = 0;

  day.records?.forEach(record => {
    const entry = dayjs(`2025-01-01T${record.entry}`);
    const exit = dayjs(`2025-01-01T${record.exit}`);
    totalMinutes += exit.diff(entry, 'minute');
  });

  return {
    date: dayjs(day.date).format('DD MMM'), // formatted here
    duration: totalMinutes,
  };
});


const paginatedChartData = chartData.slice(
  pageIndex * itemsPerPage,
  (pageIndex + 1) * itemsPerPage
);

 
  let totalLogins = 0;
  let totalMinutes = 0;

  
  data.forEach(day => {
   
    day.records?.forEach(record => {
      totalLogins += 1; 
      const entry = dayjs(`2025-01-01T${record.entry}`);
      const exit = dayjs(`2025-01-01T${record.exit}`);

     
      const diff = exit.diff(entry, 'minute');
      totalMinutes += diff; 
    });
  });

  
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
 
  const totalDurationStr = `${totalHours}h ${remainingMinutes}m`;

  return (
    <div className="container1">
  
      <div className="card-summary-container">
     
        <div className="card login-card">
          <p className="card-label">Total Logins</p>
          <h1 className="card-value blue-text">{totalLogins}</h1>
        </div>

      
        <div className="card duration-card">
          <p className="card-label">Total Duration</p>
          <h1 className="card-value green-text">{totalDurationStr}</h1>
        </div>
      </div>


      <div className="tab-container">
     
        <div className="tab-buttons-wrapper">
          <button
            className={`tab-button ${activeTab === 'events' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button
            className={`tab-button ${activeTab === 'insights' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            Insights
          </button>
        </div>

     
        {activeTab === 'events' && (
          <div className="tab-content">
            <h2 className="section-title">Attendance Records</h2>
            {data.length === 0 ? (
             
              <p className="no-records-message">No records to display.</p>
            ) : (
              
              <ul className="daily-record-list"> 
                {data.sort((a, b) => dayjs(b.date) - dayjs(a.date)).map((day) => (
                  <li key={day.date} className="daily-record-item"> 
                    <div className="daily-record-header">
                      <strong className="record-date">{day.date}:</strong>
                    
                      {Array.isArray(day.records) && day.records.length > 0 && (
                        <span className="daily-total-duration">
                          Total: {(() => {
                            let dayMinutes = 0;
                            day.records.forEach(record => {
                              const entry = dayjs(`2025-01-01T${record.entry}`);
                              const exit = dayjs(`2025-01-01T${record.exit}`);
                              dayMinutes += exit.diff(entry, 'minute');
                            });
                            const dayHours = Math.floor(dayMinutes / 60);
                            const dayRemainingMinutes = dayMinutes % 60;
                            return `${dayHours}h ${dayRemainingMinutes}m`;
                          })()}
                        </span>
                      )}
                    </div>
                    {Array.isArray(day.records) && day.records.length > 0 ? (
                      
                      <ul className="individual-record-list"> 
                        {day.records.map((record, index) => {
                         
                          const entryTime = dayjs(`2025-01-01T${record.entry}`);
                          const exitTime = dayjs(`2025-01-01T${record.exit}`);
                          const recordDiffMinutes = exitTime.diff(entryTime, 'minute');
                          const recordHours = Math.floor(recordDiffMinutes / 60);
                          const recordMinutes = recordDiffMinutes % 60;
                          const recordDurationStr = `${recordHours}h ${recordMinutes}m`;

                          return (
                            <li key={index} className="individual-record-card"> 
                             <div className="record-row">
  <div className="record-cell">
    <div className="detail-label">Entry</div>
    <div className="detail-value">{record.entry}</div>
  </div>
  <div className="record-cell">
    <div className="detail-label">Exit</div>
    <div className="detail-value">{record.exit}</div>
  </div>
  <div className="record-cell">
    <div className="detail-label">Duration</div>
    <div className="detail-value">{recordDurationStr}</div>
  </div>
</div>

                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                     
                      <span className="no-records-day">No records for this day.</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="tab-content">
    <h2 className="section-title">Daily Duration</h2>
   <div className="tab-content">
  <h2 className="section-title">Daily Duration</h2>
  {chartData.length === 0 ? (
    <p>No data for insights.</p>
  ) : (
    <>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={paginatedChartData}
            margin={{ top: 16, right: 16, left: 8, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              tickFormatter={(min) => {
                const hours = Math.floor(min / 60);
                const mins = min % 60;
                return `${hours}h ${mins}m`;
              }}
              label={{ value: 'Duration', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(min) => {
                const h = Math.floor(min / 60);
                const m = min % 60;
                return `${h}h ${m}m`;
              }}
            />
            <Bar dataKey="duration" fill="#436794ff" name="Total Duration" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pagination Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <button
          onClick={() => setPageIndex(prev => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
          style={{ marginRight: 10 }}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setPageIndex(prev =>
              (prev + 1) * itemsPerPage < chartData.length ? prev + 1 : prev
            )
          }
          disabled={(pageIndex + 1) * itemsPerPage >= chartData.length}
        >
          Next
        </button>
      </div>
    </>
  )}
</div>
          </div>
        )}
      </div>
     </div>
  );
};

 

export default Data;

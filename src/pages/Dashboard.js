// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { getReports } from '../services/api';

const Dashboard = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch reports from the backend
    getReports().then(data => {
      setReports(data);
    });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Monthly Reports</h2>
        {reports.length > 0 ? (
          reports.map(report => (
            <div key={report.id}>
              <p>{report.name}: ${report.total_spent}</p>
            </div>
          ))
        ) : (
          <p>No reports available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

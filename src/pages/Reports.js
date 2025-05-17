// src/pages/Reports.js
import React, { useEffect, useState } from 'react';
import { getReports } from '../services/api';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getReports()
      .then((data) => {
        if (Array.isArray(data)) {
          setReports(data);
        } else {
          setReports([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch reports');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Reports</h1>
      <div>
        {reports.length > 0 ? (
          reports.map((report) => (
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

export default Reports;

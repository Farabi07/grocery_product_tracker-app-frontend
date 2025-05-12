// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import ReceiptScan from './pages/ReceiptScan';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/receipt-scan" element={<ReceiptScan />} />
      </Routes>
    </div>
  );
}

export default App;

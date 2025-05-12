// src/pages/ReceiptScan.js
import React, { useState } from 'react';
import { submitReceipt } from '../services/api';

const ReceiptScan = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      
      submitReceipt(formData)
        .then(response => {
          console.log('Receipt submitted successfully:', response);
        })
        .catch(error => {
          console.error('Error submitting receipt:', error);
        });
    }
  };

  return (
    <div>
      <h1>Scan Receipt</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit Receipt</button>
    </div>
  );
};

export default ReceiptScan;

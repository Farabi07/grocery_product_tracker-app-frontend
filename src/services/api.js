// src/services/api.js
import axios from 'axios';

// Replace with your Django backend URL
const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Include authentication tokens if required
  },
});

// Example of GET request
export const getReports = () => {
  return api.get('reports/')  // Replace with your endpoint
    .then(response => response.data)
    .catch(error => {
      console.error('There was an error!', error);
    });
};

// Example of POST request
export const submitReceipt = (receiptData) => {
  return api.post('receipts/', receiptData)  // Replace with your endpoint
    .then(response => response.data)
    .catch(error => {
      console.error('There was an error!', error);
    });
};

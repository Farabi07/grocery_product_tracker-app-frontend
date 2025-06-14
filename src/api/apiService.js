// src/api/apiService.js
import axios from "axios";
import { apiConfig } from "./apiConfig"; // Import configuration from apiConfig

// Create an axios instance with the provided configurations
const apiService = axios.create(apiConfig);

// Interceptor to add JWT token to the headers
apiService.interceptors.request.use(
  (config) => {
    // Get the token from local storage or a global state (if available)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add the token to the header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Exporting common API methods (GET, POST, etc.)
export const apiGet = async (endpoint) => {
  try {
    const response = await apiService.get(endpoint);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const apiPost = async (endpoint, data) => {
  try {
    const response = await apiService.post(endpoint, data);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// You can add more methods for PUT, DELETE, etc., as needed.

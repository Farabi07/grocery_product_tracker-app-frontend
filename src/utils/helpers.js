// src/utils/helpers.js

// Store JWT token in localStorage
export const storeToken = (token) => {
  localStorage.setItem("token", token);
};

// Retrieve JWT token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove JWT token from localStorage
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Error handling function
export const handleError = (error) => {
  console.error("API Error:", error);
  return error.response ? error.response.data : error.message;
};

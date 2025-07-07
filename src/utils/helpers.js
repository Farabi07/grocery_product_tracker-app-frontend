// src/utils/helpers.js

// Store JWT token in localStorage
export const storeToken = (token) => {
  localStorage.setItem("token", token);
};

// Retrieve JWT token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove all localstorage data
export const removeLocalStorageData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("full_name");
  localStorage.removeItem("email");
  localStorage.removeItem("image");
  localStorage.removeItem("id");
};

// Get User id
export const getId = ()=>{
  return localStorage.getItem('id')
}

// Remove JWT token from localStorage
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Error handling function
export const handleError = (error) => {
  console.error("API Error:", error);
  return error.response ? error.response.data : error.message;
};

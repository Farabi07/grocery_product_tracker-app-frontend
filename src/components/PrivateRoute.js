// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate from react-router-dom
import { getToken } from '../utils/helpers'; // Import your helper function to check if the token exists

const PrivateRoute = ({ children }) => {
  const token = getToken(); // Check if the token exists

  // If no token is found, redirect to the sign-in page
  if (!token) {
    return <Navigate to="/signin" replace />; // This will navigate the user to /signin
  }

  return children; // If token exists, render the child components
};

export default PrivateRoute;

// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate from react-router-dom
import { getToken } from '../utils/helpers'; // Import your helper function to check if the token exists


const PrivateRoute = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to="/signin" replace />
};


export default PrivateRoute;

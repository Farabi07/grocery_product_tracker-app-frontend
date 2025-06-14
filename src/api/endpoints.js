// src/api/endpoints.js

export const ENDPOINTS = {
  LOGIN: "djoser/auth/jwt/create/", // The endpoint for logging in (sign-in)
  // You can add more API endpoints here as required
  GET_USER: "users/me/", // Example for getting user info
  LOGOUT: "auth/jwt/refresh/", // Example for logging out (refresh token)
};

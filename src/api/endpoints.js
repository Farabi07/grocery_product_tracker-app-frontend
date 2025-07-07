// src/api/endpoints.js

export const ENDPOINTS = {
  MAIN_URL: "http://10.0.70.145:8001",
  LOGIN: "user/api/v1/user/login/", // The endpoint for logging in (sign-in)
  GET_USER: "users/me/", // Example for getting user info
  LOGOUT: "auth/jwt/refresh/", // Example for logging out (refresh token)
  RECENT_ORDERS: "report/orders/recent/", // Example of Recent Orders
  STATISTICS: "report/reports/statistics/", // Statistics
  EXPENSES_STATISTICS: "report/reports/monthly/", // Expenses Statistics
  IMAGE_UPLOAD_URL: "user/api/v1/user/uploadimage/", // Upload imag url
  CREATE_EMPLOYEE: "employee/api/v1/employee/create/", // Create new employee
  ALL_EMPLOYEE_LIST: "employee/api/v1/employee/all/",
  DELETE_EMPLOYEE: "employee/api/v1/employee/delete/",
  FETCH_CARD_DATA: "report/api/v1/product-cost-summary/"
};

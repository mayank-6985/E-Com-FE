import React from "react";
import { Navigate } from "react-router-dom";

// A higher-order component to protect routes
const PrivateRoute = ({ element: Component, isAuthenticated, ...rest }) => {
  console.log({ isAuthenticated });
  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;

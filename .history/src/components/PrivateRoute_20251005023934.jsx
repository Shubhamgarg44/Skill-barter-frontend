import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // if token not found → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // else render the child component (like Dashboard)
  return children;
};

export default PrivateRoute;

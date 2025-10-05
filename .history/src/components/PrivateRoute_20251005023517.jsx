// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * ✅ PrivateRoute protects pages that require authentication.
 * If a JWT token exists in localStorage, user can continue.
 * Otherwise, redirect to /login.
 */
const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected child route
  return <Outlet />;
};

export default PrivateRoute;

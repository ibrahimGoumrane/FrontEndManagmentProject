import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const user = localStorage.getItem("userdata");

  if (!user) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/" />;
  }

  // If the user is authenticated, render the nested routes
  return <Outlet />;
};

export default ProtectedRoute;

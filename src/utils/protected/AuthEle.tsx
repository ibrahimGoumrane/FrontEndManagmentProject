import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const user = localStorage.getItem("userdata");
  if (!user) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/" />;
  }

  // If the user is authenticated, render the element
  return <>{element}</>;
};

export default ProtectedRoute;

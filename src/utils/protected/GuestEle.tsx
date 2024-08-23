import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../Contexte/UserContext/userContexte";

const ProtectedRoute: React.FC = () => {
  const { user } = useUser();

  if (user) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/home/" />;
  }

  // If the user is authenticated, render the nested routes
  return <Outlet />;
};

export default ProtectedRoute;

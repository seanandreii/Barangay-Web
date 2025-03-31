import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, requiredRole }) => {
  const { currentUser, role, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  // Redirect if the user is not authenticated or does not have the required role
  if (!currentUser || (requiredRole && role !== requiredRole)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

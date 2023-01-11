import React from "react";
import { Loader } from "react-feather";
import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

// For routes that can only be accessed by unauthenticated users
function GuestGuard({ children }) {
  const { isAuthenticated, isInitialized, loading } = useAuth();
  if (loading) {
    return <Loader />;
  }
  if (!isInitialized && !isAuthenticated) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return <Navigate to="/dashboard" />;
}

export default GuestGuard;

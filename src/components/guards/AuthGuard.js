import React from "react";
import { Loader } from "react-feather";
import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }
  if (isInitialized && !isAuthenticated) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;

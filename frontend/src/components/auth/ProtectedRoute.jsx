import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
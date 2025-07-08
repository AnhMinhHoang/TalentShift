import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";

const RoleBasedOutlet = ({ allowedRoles }) => {
  const { user } = useAuth();
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default RoleBasedOutlet;
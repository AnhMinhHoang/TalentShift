import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";

const PrivateOutlet = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default PrivateOutlet;
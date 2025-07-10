import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";
import Loading from "./Loading/Loading";

const PrivateOutlet = () => {
  const { userData, loading } = useAuth();

  if (loading) return <Loading isLoading={true} />;

  if (!userData) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default PrivateOutlet;
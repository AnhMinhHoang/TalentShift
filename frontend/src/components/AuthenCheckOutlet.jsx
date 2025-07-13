import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";
import Loading from "./Loading/Loading";

const AuthenCheckOutlet = ({ }) => {
    const { userData, loading } = useAuth();
    if (loading) return <Loading isLoading={true} />;

    if (userData) {
        if (!userData?.fillingForm) {
            if (userData?.role === "HIRER") {
                return <Navigate to="/hirer-additional" />;
            } else if (userData?.role === "FREELANCER") {
                return <Navigate to="/register-additional" />;
            }
        }
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default AuthenCheckOutlet;
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";
import Loading from "./Loading/Loading";

const AuthenCheckOutlet = ({  }) => {
    const { userData, loading } = useAuth();
    if (loading) return <Loading isLoading={true} />;

    if (userData || userData?.fillingForm) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default AuthenCheckOutlet;
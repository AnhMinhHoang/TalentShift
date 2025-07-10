import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";
import Loading from "./Loading/Loading";
import {notification} from "antd";

const FillFormVerifiedOutlet = () => {
    const { userData, loading } = useAuth();

    const openNotification = (type, message, placement, description) => {
        notification[type]({
            message,
            description,
            placement,
            duration: 3,
            showProgress: true,
            pauseOnHover: true,
        });
    };

    if (loading) return <Loading isLoading={true} />;

    if (!userData.fillingForm) {
        openNotification(
            "warning",
            "Complete Your Profile",
            "topRight",
            "Please complete your profile before continuing."
        );

        const role = userData.role?.toUpperCase();
        const redirectPath =
            role === "FREELANCER"
                ? "/register-additional"
                : role === "HIRER"
                    ? "/hirer-additional"
                    : "/unauthorized";

        return <Navigate to={redirectPath} />;
    }

    return <Outlet />;
};

export default FillFormVerifiedOutlet;
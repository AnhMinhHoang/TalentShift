import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
);

export default MainLayout; 
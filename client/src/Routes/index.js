import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Page404 from "@pages/404";
import SignUpPage from "@pages/Auth/signUp";
import LoginPage from "@pages/Auth/login";
import DashboardPage from "@pages/Dashboard";
import CategoryPage from "@pages/Category";
import VehiclesPage from "@pages/Vehicles";

const ComponentRoute = () => {
    const token = useSelector((state) => state.login.user?.token);

    const authRoutes = [
        { path: "/", component: LoginPage },
        { path: "/signup", component: SignUpPage },
    ];

    const validRoutes = [
        { path: "/dashboard", component: DashboardPage },
        { path: "/category", component: CategoryPage },
        { path: "/vehicles", component: VehiclesPage },
    ];

    return (
        <>
            <ToastContainer autoClose={1500} position="bottom-right" />
            <Routes>
                {token
                    ? validRoutes.map((route, index) => (
                        <Route key={index} path={route.path} element={<route.component />} />
                    ))
                    : authRoutes.map((route, index) => (
                        <Route key={index} path={route.path} element={<route.component />} />
                    ))}
                <Route path="*" element={<Page404 />} />
            </Routes>
        </>
    );
};

export default ComponentRoute;

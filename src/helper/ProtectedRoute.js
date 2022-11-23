import React from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "./UserProvider";
import Login from "../pages/Login";

const useAuth = () => {
    const { token } = useUser();
    return token;
};

function ProtectedRoute() {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Login />;
}

export default ProtectedRoute;

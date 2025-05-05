import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roleRequired }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/" />;
    }
    if (roleRequired && user.role !== roleRequired) {
        alert("Bạn không có quyền truy cập vào trang này!");
        return <Navigate to="/" />;
    }
    return children;
};

export default PrivateRoute;

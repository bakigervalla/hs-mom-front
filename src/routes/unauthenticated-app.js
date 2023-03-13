import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Home } from "../screens/home";
import {
    Registration,
    Login,
    ForgotPassword,
    ResetPassword,
} from "../components/users";
import { Subscription } from "../components/subscription/subscription";
import { UnAuthLayout } from "../components/shared/unauthlayout";

export const UnauthenticatedApp = () => {
    return (
        // <ToastProvider>
            <Routes>
                <Route element={<UnAuthLayout />}>
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Route>
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<Navigate replace to="/home" />} />
                {/* <Route path="*" element={<Navigate replace to="/login" />} /> */}
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
    );
};

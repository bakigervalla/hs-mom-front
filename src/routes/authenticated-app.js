import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthLayout } from "../components/shared/authlayout";
import { Dashboard } from "../components/dashboard/dashboard";
import { Subscription } from "../components/subscription/subscription";
import { Client } from "../components/clients/clients";
import { ChangePassword, Profile } from "../components/users";

import { MetricsState } from "../context/dashboard/context";

export const AuthenticatedApp = () => {

  return (
    <MetricsState>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/clients" element={<Client />} />
          <Route path="*" element={<Navigate replace to="/dashboard" />} />
        </Route>
      </Routes>
    </MetricsState>
  );
};

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { fetchAdminUser } from "../utils/fetchLocalStorageData";

const AdminRoutes = () => {
  const adminUser = fetchAdminUser();
  return adminUser ? <Outlet /> : <Navigate to="/Adminlogin" />;
};

export default AdminRoutes;
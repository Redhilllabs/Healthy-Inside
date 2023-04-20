import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { fetchUser } from "../utils/fetchLocalStorageData";

const PublicRoutes = () => {
  return !fetchUser() ? <Outlet /> : <Navigate to="/morningfood" />;
};

export default PublicRoutes;

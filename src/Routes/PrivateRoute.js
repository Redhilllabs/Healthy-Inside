import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { fetchUser } from "../utils/fetchLocalStorageData";

const PrivateRoutes = () => {
  const user = fetchUser();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const UserValidta = () => {
  const Location = useLocation();
  const kindOfUsers = localStorage.getItem("userTK");
  return kindOfUsers !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: Location }} replace />
  );
};

export default UserValidta;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes({ children, redirectTo, restrict }: ProtectedRoutesProps) {
  if (restrict)
    return <Navigate to={redirectTo} />

  return children
    ? children
    : <Outlet />
}

type ProtectedRoutesProps = {
  restrict: boolean;
  redirectTo: string;
  children?: React.ReactNode | undefined;
};

export default ProtectedRoutes
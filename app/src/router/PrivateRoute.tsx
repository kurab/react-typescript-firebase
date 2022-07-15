import { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLoginUser } from "../hooks/useLoginUser";

export const PrivateRoute = memo(
  ({ children, redirectPath = "/auth/login" }: any) => {
    const { loginUser } = useLoginUser();
    if (!loginUser) {
      return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
  }
);

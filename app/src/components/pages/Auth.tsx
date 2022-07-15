import { FC, memo } from "react";
import { Outlet } from "react-router-dom";

export const Auth: FC = memo(() => {
  return <Outlet />;
});

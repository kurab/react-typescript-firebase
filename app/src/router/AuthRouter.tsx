import { Login } from "../components/pages/auth/Login";
import { Register } from "../components/pages/auth/Register";
import { NotFound } from "../components/pages/NotFound";

export const AuthRoutes = [
  {
    path: "/login",
    exact: false,
    children: <Login />,
  },
  {
    path: "/register",
    exact: false,
    children: <Register />,
  },
  {
    path: "*",
    exact: false,
    children: <NotFound />,
  },
];

import { Login } from "../components/pages/auth/Login";
import { Register } from "../components/pages/auth/Register";

export const AuthRoutes = [
  {
    path: "login",
    children: <Login />,
  },
  {
    path: "register",
    children: <Register />,
  },
];

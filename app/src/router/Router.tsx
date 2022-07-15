import { memo, FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../components/pages/Home";
import { Auth } from "../components/pages/Auth";
import { NotFound } from "../components/pages/NotFound";
import { AuthRoutes } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "../components/pages/auth/Login";

export const Router: FC = memo(() => {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute children={<Home />} />} />
      <Route path='auth' element={<Auth />}>
        <Route index element={<Login />} />
        {AuthRoutes.map((route, key) => (
          <Route
            path={route.path}
            element={route.children}
            key={`RouteAuth${key}`}
          />
        ))}
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
});

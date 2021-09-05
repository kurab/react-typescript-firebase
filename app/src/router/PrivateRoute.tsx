import { memo, ReactNode, VFC } from "react";
import { Redirect, Route } from "react-router-dom";
import { useLoginUser } from "../hooks/useLoginUser";

type Props = {
  exact: boolean;
  path: string;
  children: ReactNode;
};

export const PrivateRoute: VFC<Props> = memo((props) => {
  const { exact, path, children } = props;
  const { loginUser } = useLoginUser();
  return loginUser ? (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  ) : (
    <Redirect to="/auth/login" />
  );
});

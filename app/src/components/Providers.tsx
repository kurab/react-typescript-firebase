import React, { FC } from "react";
import { LoginUserProvider } from "../providers/LoginUserProvider";

type Props = {
  children: React.ReactNode;
};

export const Providers: FC<Props> = (props) => {
  return <LoginUserProvider>{props.children}</LoginUserProvider>;
};

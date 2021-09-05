import { VFC, memo } from "react";
import { useAuth } from "../../hooks/useAuth";

export const Home: VFC = memo(() => {
  const { logout } = useAuth();

  const onClickLogout = () => logout();
  return (
    <div className="container">
      <h1>Home, Sweet Home!</h1>
      <img src="/cat.png" alt="" />
      <button className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  );
});

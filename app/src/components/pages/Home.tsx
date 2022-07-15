import { FC, memo } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useLoginUser } from "../../hooks/useLoginUser";

export const Home: FC = memo(() => {
  const { logout } = useAuth();
  const { loginUser } = useLoginUser();

  const onClickLogout = () => logout();
  return (
    <div className='container'>
      <h1>Home, Sweet Home!</h1>
      <img src='/cat.png' alt='' />
      <p>email: {loginUser!.email}</p>
      <p>provider type: {loginUser!.providerData[0].providerId}</p>
      <button className='logout-button' onClick={onClickLogout}>
        Logout
      </button>
    </div>
  );
});

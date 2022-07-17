import { FC, memo } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useLoginUser } from "../../hooks/useLoginUser";

export const Home: FC = memo(() => {
  const { logout } = useAuth();
  const { loginUser } = useLoginUser();

  const onClickLogout = () => logout();
  const providerType = loginUser!.providerData[0]?.providerId
    ? loginUser!.providerData[0]?.providerId
    : "CustomToken";
  return (
    <div className='container'>
      <h1>Home, Sweet Home!</h1>
      <img src='/cat.png' alt='' />
      <p>uid: {loginUser!.uid}</p>
      <p>provider type: {providerType}</p>
      <button className='logout-button' onClick={onClickLogout}>
        Logout
      </button>
    </div>
  );
});

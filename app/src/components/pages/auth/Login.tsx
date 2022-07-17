import { FC, memo, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const Login: FC = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginWithFacebook, loginWithCustomToken } = useAuth();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onClickLogin = () => login(email, password);
  const onClickFacebook = () => loginWithFacebook();
  const onClickCustomToken = () => {
    // get unique id from provider that isn't supported by firebase default
    const userId = "kurab";
    loginWithCustomToken(userId);
  };

  return (
    <>
      <div className='container'>
        <div className='auth-box'>
          <h1>Login</h1>
          <label>Email</label>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={onChangeEmail}
          />
          <label>Password</label>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={onChangePassword}
          />
          <button
            className='auth-button'
            onClick={onClickLogin}
            disabled={email === "" || password === ""}
          >
            Login
          </button>
          or
          <button className='auth-facebook' onClick={onClickFacebook}>
            Facebook
          </button>
          or
          <button className='auth-facebook' onClick={onClickCustomToken}>
            CustomToken
          </button>
        </div>
        <div className='other-option'>
          <Link to='/auth/register'>Register</Link>
        </div>
      </div>
    </>
  );
});

import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useLoginUser } from "../hooks/useLoginUser";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const useAuth = () => {
  const history = useHistory();
  const { setLoginUser } = useLoginUser();

  const login = useCallback(
    (email: string, password: string) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setLoginUser(user);
          history.push("/");
        })
        .catch((err) => {
          alert(err);
        });
    },
    [history, setLoginUser]
  );

  const loginWithFacebook = useCallback(() => {
    const fbProvider = new FacebookAuthProvider();
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoginUser(user);
        history.push("/");
      })
      .catch((err) => {
        alert(err);
      });
  }, [history, setLoginUser]);

  const register = useCallback(
    (email: string, password: string) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setLoginUser(user);
          history.push("/");
        })
        .catch((err) => {
          alert(err);
        });
    },
    [history, setLoginUser]
  );

  const logout = useCallback(() => {
    signOut(auth);
  }, []);

  return { login, loginWithFacebook, register, logout };
};

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

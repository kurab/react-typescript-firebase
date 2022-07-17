import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "../hooks/useLoginUser";

import { initializeApp, getApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithCustomToken,
} from "firebase/auth";
import {
  getFunctions,
  httpsCallable,
  //connectFunctionsEmulator,
} from "firebase/functions";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setLoginUser } = useLoginUser();

  const login = useCallback(
    (email: string, password: string) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setLoginUser(user);
          navigate("/");
        })
        .catch((err) => {
          alert(err);
        });
    },
    [navigate, setLoginUser]
  );

  const loginWithFacebook = useCallback(() => {
    const fbProvider = new FacebookAuthProvider();
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoginUser(user);
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  }, [navigate, setLoginUser]);

  const register = useCallback(
    (email: string, password: string) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setLoginUser(user);
          navigate("/");
        })
        .catch((err) => {
          alert(err);
        });
    },
    [navigate, setLoginUser]
  );

  const loginWithCustomToken = useCallback(
    async (userId: string) => {
      const functions = getFunctions(getApp(), "asia-northeast1");
      //connectFunctionsEmulator(functions, "localhost", 5001);
      const fetchCustomToken = httpsCallable(functions, "fetchCustomToken");

      fetchCustomToken({
        userId,
        api_secret: process.env.REACT_APP_FETCHCUSTOMTOMTOKEN_SECRET,
      })
        .then((res: any) => {
          signInWithCustomToken(auth, res.data.customToken)
            .then((userCredential) => {
              const user = userCredential.user;
              console.log(user);
              setLoginUser(user);
              navigate("/");
            })
            .catch((err) => {
              alert(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [navigate, setLoginUser]
  );

  const logout = useCallback(() => {
    signOut(auth);
  }, []);

  return { login, loginWithFacebook, loginWithCustomToken, register, logout };
};

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

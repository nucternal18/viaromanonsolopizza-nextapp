import React, { createContext, useContext, useReducer, useEffect } from "react";
import nookies from "nookies";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updatePassword,
  sendPasswordResetEmail,
  onIdTokenChanged,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "viaromaninsolopizza.firebaseapp.com",
  databaseURL: "https://viaromaninsolopizza.firebaseio.com",
  projectId: "viaromaninsolopizza",
  storageBucket: "viaromaninsolopizza.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

type User = {
  uid: string;
  displayName?: string | null;
  email: string;
  photoUrl?: string | null;
  emailVerified: boolean;
};
// Google auth
interface InitialAuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: Error;
  userData: User;
  message: string;
}

export enum ActionType {
  USER_ACTION_REQUEST = "USER_ACTION_REQUEST",
  USER_ACTION_FAIL = "USER_ACTION_FAIL",
  USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS",
  USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS",
  USER_UPDATE_PROFILE_SUCCESS = "USER_UPDATE_PROFILE_SUCCESS",
  USER_EDIT_SUCCESS = "USER_EDIT_SUCCESS",
  USER_REQUEST_PASSWORD_RESET_SUCCESS = "USER_REQUEST_PASSWORD_RESET_SUCCESS",
  USER_RESET_PASSWORD_SUCCESS = "USER_RESET_PASSWORD_SUCCESS",
  USER_EMAIL_VERIFICATION_SUCCESS = "USER_EMAIL_VERIFICATION_SUCCESS",
  USER_IMAGE_UPLOAD_SUCCESS = "USER_IMAGE_UPLOAD_SUCCESS",
  USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS",
  FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
}

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  userData: null,
  message: "",
};

const AuthContext = createContext<{
  state: InitialAuthState;
  dispatch: React.Dispatch<any>;
  login: (email: string, password: string) => void;
  logout: () => void;
}>({
  state: initialState,
  dispatch: () => null,
  login: () => {},
  logout: () => {},
});

const authReducer = (state: InitialAuthState, action) => {
  switch (action.type) {
    case ActionType.USER_ACTION_REQUEST:
      return { ...state, loading: true };
    case ActionType.USER_ACTION_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ActionType.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case ActionType.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    case ActionType.FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload,
        isAuthenticated: true,
      };
    case ActionType.USER_LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

const auth = getAuth();

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        dispatch({
          type: ActionType.USER_LOGOUT_SUCCESS,
        });
        nookies.set(undefined, "token", "", {});
        return;
      }
      const userData = {
        uid: user.uid,
        displayName: user.displayName ? user.displayName : "",
        email: user.email,
        photoUrl: user.photoURL
          ? user.photoURL
          : "https://res.cloudinary.com/viaromanonsolopizza-com/image/upload/ar_1:1,b_rgb:262c35,bo_5px_solid_rgb:ff0000,c_fill,e_sharpen:100,g_auto,r_max,w_1000/v1634588859/success_gmoweo.webp",
        emailVerified: user.emailVerified,
      };
      console.log(userData);
      dispatch({
        type: ActionType.FETCH_USER_SUCCESS,
        payload: userData,
      });
      const token = await user.getIdToken();
      nookies.set(undefined, "token", token, {
        maxAge: 30 * 24 * 60 * 60,
        sameSite: true,
        path: "/",
      });
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in
  //       const userData = {
  //         uid: user.uid,
  //         displayName: user.displayName,
  //         email: user.email,
  //         photoUrl: user.photoURL,
  //         emailVerified: user.emailVerified,
  //       };
  //       dispatch({
  //         type: ActionType.FETCH_USER_SUCCESS,
  //         payload: userData,
  //       });
  //     } else {
  //       dispatch({
  //         type: ActionType.USER_LOGOUT_SUCCESS,
  //       });
  //     }
  //   });
  // }, []);

  /**
   * @description login User
   * @param email
   * @param password
   */
  const login = async (email: string, password: string) => {
    try {
      dispatch({
        type: ActionType.USER_ACTION_REQUEST,
      });
      await signInWithEmailAndPassword(auth, email, password);
      dispatch({});
    } catch (error) {
      const errorMessage = error.message;
      dispatch({
        type: ActionType.USER_ACTION_FAIL,
        payload: errorMessage,
      });
    }
  };

  /**
   * @description logout User
   */
  const logout = async () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: ActionType.USER_LOGOUT_SUCCESS,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch({
          type: ActionType.USER_ACTION_FAIL,
          payload: errorMessage,
        });
      });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };

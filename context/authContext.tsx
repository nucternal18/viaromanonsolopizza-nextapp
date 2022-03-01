import React, { createContext, useContext, useReducer, useEffect } from "react";
import nookies from "nookies";
import { getSession } from "next-auth/react";
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
  updateProfile,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { NEXT_URL } from "../config";

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
  _id: string;
  name?: string | null;
  email: string;
  image?: string | null;
  isAdmin: boolean;
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
  updateUserProfile: (dispatch: string, photoURL: string) => void;
}>({
  state: initialState,
  dispatch: () => null,
  updateUserProfile: () => {},
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

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        dispatch({
          type: ActionType.FETCH_USER_SUCCESS,
          payload: session.user,
        });
      }
    });
  }, []);

  // Authentication/User
  const createAccount = async (
    displayName: string,
    email: string,
    password: string
  ) => {
    try {
      dispatch({
        type: ActionType.USER_ACTION_REQUEST,
      });
      const res = await fetch(`${NEXT_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName,
          email,
          password,
          image:
            "https://firebasestorage.googleapis.com/v0/b/aolausoro-tech.appspot.com/o/2C7EB02D-5902-4970-9807-43E09C9D5AED_1_201_a.jpeg?alt=media&token=52d9c142-99bc-4772-98db-a28c352d9deb",
          isAdmin: true,
        }),
      });

      if (res.ok) {
        dispatch({
          type: ActionType.USER_REGISTER_SUCCESS,
          payload: "Account created successfully",
        });
      }
    } catch (error) {
      const errorMessage = error.message;
      dispatch({
        type: ActionType.USER_ACTION_FAIL,
        payload: errorMessage,
      });
    }
  };

  const updateUserProfile = async (
    displayName: string,
    photoURL: string
  ): Promise<void> => {
    try {
      dispatch({
        type: ActionType.USER_ACTION_REQUEST,
      });
    } catch (error) {
      const errorMessage = error.message;
      dispatch({
        type: ActionType.USER_ACTION_FAIL,
        payload: errorMessage,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        updateUserProfile,
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

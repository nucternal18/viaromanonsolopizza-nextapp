import { createContext, useEffect, useReducer, useContext } from "react";
import {
  doc,
  setDoc,
  collection,
  orderBy,
  query,
  onSnapshot,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../context/authContext";

// utils
import { uploadImage } from "../lib/upload";
import { NEXT_URL } from "../config";

type ImagesProps = {
  createdAt: Timestamp;
  url: string;
  id: string;
};

interface InitialGalleryState {
  loading: boolean;
  error?: Error;
  images?: ImagesProps[];
  message?: string;
  success?: boolean;
  uploading?: boolean;
  image?: { url: string };
  page?: number;
  sort?: string;
  sortOptions?: string[];
}

const initialState = {
  loading: false,
  error: null,
  images: [],
  message: "",
  uploading: false,
  success: false,
  image: { url: "" },
  page: 1,
  sort: "latest",
  sortOptions: ["latest", "oldest"],
};

export enum ActionType {
  GALLERRIA_ITEM_ACTION_REQUEST = "GALLERRIA_ITEM_ACTION_REQUEST",
  GALLERRIA_IMAGE_UPLOAD_ACTION_REQUEST = "GALLERRIA_IMAGE_UPLOAD_ACTION_REQUEST",
  GALLERRIA_ITEM_ACTION_FAIL = "GALLERRIA_ITEM_ACTION_FAIL",
  GALLERRIA_IMAGE_UPLOAD_ACTION_FAIL = "GALLERRIA_IMAGE_UPLOAD_ACTION_FAIL",
  GALLERRIA_ITEM_FETCH_SUCCESS = "GALLERRIA_ITEM_FETCH_SUCCESS",
  GALLERRIA_ITEM_ADD_SUCCESS = "GALLERRIA_ITEM_ADD_SUCCESS",
  GALLERRIA_IMAGE_UPLOAD_SUCESS = "GALLERRIA_IMAGE_UPLOAD_SUCESS",
  GALLERRIA_ITEM_DELETE_SUCESS = "GALLERRIA_ITEM_DELETE_SUCESS",
  CHANGE_PAGE = "CHANGE_PAGE",
}

export const GalleryContext = createContext<{
  state: InitialGalleryState;
  dispatch: React.Dispatch<any>;
  addPicture: (image: string, cookies: string) => void;
  deletePicture: (id: string) => void;
  uploadGalleryImage: (
    base64EncodedImage: string | ArrayBuffer,
    cookies: string
  ) => void;
}>({
  state: initialState,
  dispatch: () => null,
  addPicture: () => {},
  deletePicture: () => {},
  uploadGalleryImage: () => {},
});

const galleryReducer = (state: InitialGalleryState, action) => {
  switch (action.type) {
    case ActionType.GALLERRIA_ITEM_ACTION_REQUEST:
      return { ...state, loading: true };
    case ActionType.GALLERRIA_IMAGE_UPLOAD_ACTION_REQUEST:
      return { ...state, loading: true };
    case ActionType.GALLERRIA_ITEM_ACTION_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ActionType.GALLERRIA_IMAGE_UPLOAD_ACTION_FAIL:
      return { ...state, uploading: false, error: action.payload };
    case ActionType.GALLERRIA_ITEM_FETCH_SUCCESS:
      return { ...state, loading: false, images: action.payload };
    case ActionType.GALLERRIA_ITEM_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        success: true,
      };
    case ActionType.GALLERRIA_IMAGE_UPLOAD_SUCESS:
      return {
        ...state,
        uploading: false,
        image: action.payload.image,
        message: action.payload.message,
        success: true,
      };
    case ActionType.GALLERRIA_ITEM_DELETE_SUCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case ActionType.CHANGE_PAGE:
      return { ...state, page: action.payload.page };
    default:
      state;
  }
};

const GalleryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(galleryReducer, initialState);

  /**
   *
   * @param imageUrl
   */
  const addPicture = async (image: string, cookies: string) => {
    console.log(image);
    try {
      dispatch({
        type: ActionType.GALLERRIA_ITEM_ACTION_REQUEST,
      });
      const res = await fetch(`${NEXT_URL}/api/gallery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookies,
        },
        body: JSON.stringify({ imageUrl: image }),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch({
          type: ActionType.GALLERRIA_ITEM_ADD_SUCCESS,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionType.GALLERRIA_ITEM_ACTION_FAIL,
        payload: error.message,
      });
    }
  };

  /**
   *
   * @param id
   */
  const deletePicture = async (id: string) => {
    try {
      dispatch({
        type: ActionType.GALLERRIA_ITEM_ACTION_REQUEST,
      });
      const res = await fetch(`${NEXT_URL}/api/gallery/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        dispatch({
          type: ActionType.GALLERRIA_ITEM_DELETE_SUCESS,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionType.GALLERRIA_ITEM_ACTION_FAIL,
        payload: error.message,
      });
    }
  };

  /**
   *
   * @param base64EncodedImage
   */
  const uploadGalleryImage = async (
    base64EncodedImage: string,
    cookies: string
  ): Promise<void> => {
    try {
      dispatch({
        type: ActionType.GALLERRIA_IMAGE_UPLOAD_ACTION_REQUEST,
      });
      const data = await uploadImage(base64EncodedImage, cookies);
      dispatch({
        type: ActionType.GALLERRIA_IMAGE_UPLOAD_SUCESS,
        payload: { image: data, message: "Immagine caricata con successo" },
      });
    } catch (error) {
      dispatch({
        type: ActionType.GALLERRIA_IMAGE_UPLOAD_ACTION_FAIL,
        payload: error.message,
      });
    }
  };
  return (
    <GalleryContext.Provider
      value={{
        addPicture,
        deletePicture,
        uploadGalleryImage,
        state,
        dispatch,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

const useGallery = () => {
  return useContext(GalleryContext);
};

export { useGallery, GalleryProvider };

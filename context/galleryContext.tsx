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
import { NEXT_URL } from "../config";

// utils
import { uploadImage } from "../lib/upload";

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
}

const initialState = {
  loading: false,
  error: null,
  images: [],
  message: "",
  uploading: false,
  success: false,
  image: { url: "" },
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
}

export const GalleryContext = createContext<{
  state: InitialGalleryState;
  dispatch: React.Dispatch<any>;
  addPicture: (imgUrl) => void;
  deletePicture: (id: string) => void;
  uploadGalleryImage: (base64EncodedImage: string | ArrayBuffer) => void;
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
      return { ...state, loading: false, message: action.payload };
    case ActionType.GALLERRIA_IMAGE_UPLOAD_SUCESS:
      return {
        ...state,
        uploading: false,
        image: action.payload.image,
        message: action.payload.message,
      };
    case ActionType.GALLERRIA_ITEM_DELETE_SUCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    default:
      state;
  }
};

const GalleryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(galleryReducer, initialState);

  useEffect(() => {
    const q = query(collection(db, "images"), orderBy("createdAt", "desc"));
    dispatch({
      type: ActionType.GALLERRIA_ITEM_ACTION_REQUEST,
    });
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        dispatch({
          type: ActionType.GALLERRIA_ITEM_FETCH_SUCCESS,
          payload: documents,
        });
      },
      (error) => {
        dispatch({
          type: ActionType.GALLERRIA_ITEM_ACTION_FAIL,
          payload: error.message,
        });
      }
    );

    return () => unsubscribe();
  }, []);

  /**
   *
   * @param imageUrl
   */
  const addPicture = async (url: string) => {
    try {
      dispatch({
        type: ActionType.GALLERRIA_ITEM_ACTION_REQUEST,
      });
      const docRef = doc(db, "images");
      await setDoc(docRef, {
        url: url,
        createdAt: Timestamp.now(),
      });
      dispatch({
        type: ActionType.GALLERRIA_ITEM_FETCH_SUCCESS,
        payload: "Immagine aggiunta con successo",
      });
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
      await deleteDoc(doc(db, "images", id));
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
    base64EncodedImage: string
  ): Promise<void> => {
    try {
      dispatch({
        type: ActionType.GALLERRIA_IMAGE_UPLOAD_ACTION_REQUEST,
      });
      const data = await uploadImage(base64EncodedImage);
      dispatch({
        type: ActionType.GALLERRIA_ITEM_FETCH_SUCCESS,
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

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import { convertCollectionsSnapshotToMap } from "../lib/convertSnapshotToMap";
import { db } from "../context/authContext";

export type MenuProps = {
  main: {
    id: string;
    title: string;
    items: {
      Antipasti: { name: string; name_english: string; price: string }[];
      Contorni: { name: string; name_english: string; price: string }[];
      LETEMPURE: { name: string; name_english: string; price: string }[];
      Secondi: { name: string; name_english: string; price: string }[];
    }[];
  };
  desserts: {
    id: string;
    title: string;
    items: {
      price: string;
      name: string;
    }[];
  };
  gourmetpizza: {
    id: string;
    title: string;
    items: {
      price: string;
      name: string;
      ingredients: string[];
    }[];
  };
  pizzas: {
    id: string;
    title: string;
    items: {
      price: string;
      name: string;
      ingredients: string[];
    }[];
  };
  cantina: {
    id: string;
    items: {
      subtitle: string;
      types: { name: string; Bottiglia: string; Calice: string }[];
    }[];
  };
  bianche: {
    id: string;
    title: string;
    items: {
      price: string;
      name: string;
      ingredients: string[];
    }[];
  };
};

interface InitialMenuState {
  loading: boolean;
  error: Error;
  menu: MenuProps;
  message: string;
}

export enum ActionType {
  MENU_ACTION_REQUEST = "MENU_ACTION_REQUEST",
  MENU_ACTION_FAIL = "MENU_ACTION_FAIL",
  MENU_ITEM_FETCH_SUCCESS = "MENU_ITEM_FETCH_SUCCESS",
  MENU_ITEM_UPDATE_SUCESS = "MENU_ITEM_UPDATE_SUCESS",
  MENU_ITEM_DELETE_SUCESS = "MENU_ITEM_DELETE_SUCESS",
}

const initialState = {
  loading: false,
  error: null,
  menu: {
    main: {
      id: "",
      title: "",
      items: [],
    },
    desserts: {
      id: "",
      title: "",
      items: [],
    },
    gourmetpizza: {
      id: "",
      title: "",
      items: [],
    },
    pizzas: {
      id: "",
      title: "",
      items: [],
    },
    cantina: {
      id: "",
      items: [],
    },
    bianche: {
      id: "",
      title: "",
      items: [],
    },
  },
  message: "",
};

const MenuContext = createContext<{
  state: InitialMenuState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const menuReducer = (state: InitialMenuState, action) => {
  switch (action.type) {
    case ActionType.MENU_ACTION_REQUEST:
      return { ...state, loading: true };
    case ActionType.MENU_ACTION_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ActionType.MENU_ITEM_FETCH_SUCCESS:
      return { ...state, loading: false, menu: action.payload };
    default:
      state;
  }
};

const MenuProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(menuReducer, initialState);

  useEffect(() => {
    const q = collection(db, "Menu");

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const collectionMap: MenuProps =
        convertCollectionsSnapshotToMap(snapshot);
      dispatch({
        type: ActionType.MENU_ITEM_FETCH_SUCCESS,
        payload: collectionMap,
      });
    });

    return () => unsubscribe();
  }, []);
  return (
    <MenuContext.Provider value={{ state, dispatch }}>
      {children}
    </MenuContext.Provider>
  );
};

const useMenu = () => {
  return useContext(MenuContext);
};

export { MenuProvider, useMenu };

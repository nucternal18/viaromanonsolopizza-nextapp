import React, { createContext, useContext, useReducer, useEffect } from "react";

import { NEXT_URL } from "../config";

export type MenuProps = {
  antipasti: {
    _id: string;
    name: string;
    name_english: string;
    price: string;
    type?: string;
  }[];
  contorni: {
    _id: string;
    name: string;
    name_english: string;
    price: string;
    type?: string;
  }[];
  letempure: {
    _id: string;
    name: string;
    name_english: string;
    price: string;
    type?: string;
  }[];
  secondi: {
    _id: string;
    name: string;
    name_english: string;
    price: string;
    type?: string;
  }[];
  desserts: {
    _id: string;
    price: string;
    name: string;
    type?: string;
  }[];
  gourmetPizza: {
    _id: string;
    price: string;
    name: string;
    ingredients: string[];
    type?: string;
  }[];
  pizzas: {
    _id: string;
    price: string;
    name: string;
    ingredients: string[];
    type?: string;
  }[];

  cantina: {
    _id: string;
    subtitle: string;
    types: { name: string; Bottiglia: string; Calice: string }[];
    type?: string;
  }[];

  bianche: {
    _id: string;
    price: string;
    name: string;
    ingredients: string[];
    type?: string;
  }[];
};

interface InitialMenuState {
  loading: boolean;
  error: Error;
  menu: MenuProps;
  message: string;
  sort: string;
  sortOptions: string[];
  page: number;
  menuType: string;
  menuTypeOptions: string[];
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
    antipasti: [],
    contorni: [],
    letempure: [],
    secondi: [],
    desserts: [],
    gourmetPizza: [],
    pizzas: [],
    cantina: [],
    bianche: [],
  },
  message: "",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  menuTypeOptions: [
    "antipasti",
    "contorni",
    "letempure",
    "secondi",
    "desserts",
    "gourmetPizza",
    "pizzas",
    "cantina",
    "bianche",
  ],
  menuType: "antipasti",
  page: 1,
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

  // useEffect(() => {
  //   const q = collection(db, 'Menu');

  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const collectionMap: MenuProps =
  //       convertCollectionsSnapshotToMap(snapshot);
  //     dispatch({
  //       type: ActionType.MENU_ITEM_FETCH_SUCCESS,
  //       payload: collectionMap,
  //     });
  //   });

  //   return () => unsubscribe();
  // }, []);

  // headers: {
  //       Authorization: `Bearer ${userInfo.token}`,
  //     }
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

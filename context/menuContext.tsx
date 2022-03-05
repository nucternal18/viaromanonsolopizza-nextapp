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
  pizzaSpeciali: {
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

type MenuDetails = {
  name: string;
  price: string;
  Bottiglia: string;
  Calice: string;
  name_english: string;
  ingredients: string[];
  typesId: string | string[];
  menuType: string;
};

interface InitialMenuState {
  loading: boolean;
  error: Error;
  success: boolean;
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
  MENU_ITEM_UPDATE_TYPE = "MENU_ITEM_UPDATE_TYPE",
  MENU_ITEM_UPDATE_SORT = "MENU_ITEM_UPDATE_SORT",
  MENU_ITEM_DELETE_SUCESS = "MENU_ITEM_DELETE_SUCESS",
}

// Fetch sort option from localStorage
const sortItemFromStorage =
  typeof window !== "undefined"
    ? localStorage.getItem("sort")
      ? JSON.parse(localStorage.getItem("sort"))
      : "latest"
    : "latest";
// Fetch menu type from local storage
const menuTypeItemFromStorage =
  typeof window !== "undefined"
    ? localStorage.getItem("menuType")
      ? JSON.parse(localStorage.getItem("menuType"))
      : "antipasti"
    : "antipasti";

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
    pizzaSpeciali: [],
    pizzas: [],
    cantina: [],
    bianche: [],
  },
  message: "",
  success: false,
  sort: sortItemFromStorage,
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  menuTypeOptions: [
    "antipasti",
    "contorni",
    "letempure",
    "secondi",
    "desserts",
    "gourmetPizza",
    "pizzaSpeciali",
    "pizzas",
    "cantina",
    "bianche",
  ],
  menuType: menuTypeItemFromStorage,
  page: 1,
};

const MenuContext = createContext<{
  state: InitialMenuState;
  dispatch: React.Dispatch<any>;
  addMenuItem: (menuDetails) => void;
  updateMenuItem: (menuType: string, id: string, menuDetails) => void;
  deleteMenuItem: (menuType: string, id: string) => void;
  deleteCantinaMenuItem: (
    menuType: string,
    id: string,
    typesId: string,
    cookie: string
  ) => void;
}>({
  state: initialState,
  dispatch: () => null,
  addMenuItem: () => {},
  updateMenuItem: () => {},
  deleteMenuItem: () => {},
  deleteCantinaMenuItem: () => {},
});

const menuReducer = (state: InitialMenuState, action) => {
  switch (action.type) {
    case ActionType.MENU_ACTION_REQUEST:
      return { ...state, loading: true };
    case ActionType.MENU_ACTION_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ActionType.MENU_ITEM_FETCH_SUCCESS:
      return { ...state, loading: false, menu: action.payload, success: true };
    case ActionType.MENU_ITEM_UPDATE_SUCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        success: true,
      };
    case ActionType.MENU_ITEM_DELETE_SUCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        success: true,
      };
    case ActionType.MENU_ITEM_UPDATE_TYPE: {
      localStorage.setItem("menuType", JSON.stringify(action.payload));
      return { ...state, loading: false, menuType: action.payload };
    }
    case ActionType.MENU_ITEM_UPDATE_SORT: {
      localStorage.setItem("sort", JSON.stringify(action.payload));
      return { ...state, loading: false, sort: action.payload };
    }
    default:
      state;
  }
};

const MenuProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(menuReducer, initialState);

  const addMenuItem = async (
    menuDetails: Partial<MenuDetails>
  ): Promise<void> => {
    try {
      dispatch({ type: ActionType.MENU_ACTION_REQUEST });
      const res = await fetch(`${NEXT_URL}/api/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuDetails),
      });
      const data = await res.json();
      dispatch({
        type: ActionType.MENU_ITEM_UPDATE_SUCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({ type: ActionType.MENU_ACTION_FAIL, payload: error });
    }
  };
  const updateMenuItem = async (
    menuType: string,
    id: string,
    menuDetails: Partial<MenuDetails>
  ): Promise<void> => {
    try {
      dispatch({ type: ActionType.MENU_ACTION_REQUEST });
      const res = await fetch(
        `${NEXT_URL}/api/menu/${id}?type=${menuType}&typesId=${menuDetails.typesId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(menuDetails),
        }
      );
      const data = await res.json();
      dispatch({
        type: ActionType.MENU_ITEM_UPDATE_SUCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({ type: ActionType.MENU_ACTION_FAIL, payload: error });
    }
  };
  const deleteMenuItem = async (
    menuType: string,
    id: string
  ): Promise<void> => {
    try {
      dispatch({ type: ActionType.MENU_ACTION_REQUEST });
      const res = await fetch(`${NEXT_URL}/api/menu/${id}?type=${menuType}`, {
        method: "DELETE",
      });
      const data = await res.json();
      dispatch({
        type: ActionType.MENU_ITEM_DELETE_SUCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({ type: ActionType.MENU_ACTION_FAIL, payload: error });
    }
  };
  const deleteCantinaMenuItem = async (
    id: string,
    menuType: string,
    typesId: string,
    cookie: string
  ): Promise<void> => {
    console.log(id, menuType, typesId);
    try {
      dispatch({ type: ActionType.MENU_ACTION_REQUEST });
      const res = await fetch(
        `${NEXT_URL}/api/menu/${id}?type=${menuType}&typesId=${typesId}`,
        {
          method: "DELETE",
          headers: {
            cookie: cookie,
          },
        }
      );
      const data = await res.json();
      dispatch({
        type: ActionType.MENU_ITEM_DELETE_SUCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({ type: ActionType.MENU_ACTION_FAIL, payload: error });
    }
  };

  return (
    <MenuContext.Provider
      value={{
        state,
        dispatch,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        deleteCantinaMenuItem,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

const useMenu = () => {
  return useContext(MenuContext);
};

export { MenuProvider, useMenu };

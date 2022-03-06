import React, { createContext, useContext, useReducer } from "react";

import { NEXT_URL } from "../config";
import { MenuDetails, MenuProps } from "../lib/types";

interface InitialMenuState {
  loading: boolean;
  error: Error;
  isError: boolean;
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
  isError: false,
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
  addMenuItem: (menuDetails: Partial<MenuDetails>, cookies: string) => void;
  updateMenuItem: (
    menuType: string,
    id: string,
    menuDetails: Partial<MenuDetails>,
    cookies: string
  ) => void;
  deleteMenuItem: (menuType: string, id: string, cookie: string) => void;
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
      return { ...state, loading: false, isError: true, error: action.payload };
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
    menuDetails: Partial<MenuDetails>,
    cookies: string
  ): Promise<void> => {
    try {
      dispatch({ type: ActionType.MENU_ACTION_REQUEST });
      const res = await fetch(`${NEXT_URL}/api/menu`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          cookie: cookies,
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
    menuDetails: Partial<MenuDetails>,
    cookies: string
  ): Promise<void> => {
    try {
      dispatch({ type: ActionType.MENU_ACTION_REQUEST });
      const res = await fetch(
        `${NEXT_URL}/api/menu/${id}?type=${menuType}&typesId=${menuDetails.typesId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            cookie: cookies,
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
    id: string,
    cookie: string
  ): Promise<void> => {
    try {
      dispatch({ type: ActionType.MENU_ACTION_REQUEST });
      const res = await fetch(`${NEXT_URL}/api/menu/${id}?type=${menuType}`, {
        method: "DELETE",
        headers: {
          cookie: cookie,
        },
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

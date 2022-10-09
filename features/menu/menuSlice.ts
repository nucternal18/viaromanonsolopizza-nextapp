import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { AppError, MenuProps } from "@lib/types";
import { HYDRATE } from "next-redux-wrapper";

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

interface InitialMenuState {
  error: AppError;
  menu: MenuProps;
  message: string;
  sort: string;
  isSelected: boolean;
  selectedMenu: "Cuccina" | "Pizze" | "Dessert" | "La Nostra Cantina";
  sortOptions: string[];
  page: number;
  menuType: string;
  menuTypeOptions: string[];
  subtitle: string;
  subtitleOptions: string[];
}

const initialState: InitialMenuState = {
  error: null,
  selectedMenu: "Pizze",
  isSelected: false,
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
  sort: sortItemFromStorage,
  sortOptions: ["latest", "oldest"],
  menuTypeOptions: [
    "PIZZA",
    "PIZZA_SPECIALI",
    "ANTIPASTI",
    "SECONDI",
    "CONTORNI",
    "BIANCHE",
    "DESSERT",
    "GOURMET_PIZZA",
    "LETEMPURE",
    "CANTINA",
  ],
  menuType: menuTypeItemFromStorage,
  page: 1,
  subtitle: "",
  subtitleOptions: [
    "BOLLICINE",
    "VINI BIANCHI",
    "VINI ROSSI",
    "VINI ROSATI",
    "VINI DOLCI",
    "AMARI/GRAPPE/LIQUORI",
    "BIRRA ALLA SPINA",
    "BIRRA IN BOTTIGLIA",
    "AQUA NATURALE/FRIZZANTE",
    "BIBITE",
    "CAFFETERIA",
  ],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuType: (state, { payload }: PayloadAction<string>) => {
      localStorage.setItem("menuType", JSON.stringify(payload));
      state.menuType = payload;
    },
    setSort: (state, { payload }: PayloadAction<string>) => {
      localStorage.setItem("sort", JSON.stringify(payload));
      state.sort = payload;
    },
    setSelectedMenu: (
      state,
      {
        payload,
      }: PayloadAction<"Cuccina" | "Pizze" | "Dessert" | "La Nostra Cantina">
    ) => {
      state.selectedMenu = payload;
      state.isSelected = true;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload) {
        state = action.payload;
      }
    },
  },
});

export const { setMenuType, setSort, setSelectedMenu } = menuSlice.actions;
export const menuSelector = (state: RootState) => state.menu;
export default menuSlice.reducer;

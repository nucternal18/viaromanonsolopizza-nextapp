import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
  Action,
  AnyAction,
  configureStore,
  ThunkAction,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { userApiSlice, menuApiSlice, galleryApiSlice } from "./apiSlice";
import userReducer from "@features/users/userSlice";
import galleryReducer from "@features/gallery/gallerySlice";
import menuReducer from "@features/menu/menuSlice";

const reducers = {
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [menuApiSlice.reducerPath]: menuApiSlice.reducer,
  [galleryApiSlice.reducerPath]: galleryApiSlice.reducer,
  user: userReducer,
  gallery: galleryReducer,
  menu: menuReducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<any, AnyAction> = (
  state,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply data from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApiSlice.middleware,
      menuApiSlice.middleware,
      galleryApiSlice.middleware,
    ]),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

const makeStore = () => store;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);

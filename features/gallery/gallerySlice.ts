import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { AppError } from "@lib/types";
import { HYDRATE } from "next-redux-wrapper";

interface IGalleryProps {
  requestStatus: string;
  error: AppError | null;
  image: string | null;
  message: null;
  page: number;
  sortOptions: Array<string>;
}

const initialGalleryState: IGalleryProps = {
  requestStatus: "",
  error: null,
  image: "",
  message: null,
  page: 0,
  sortOptions: ["oldest", "latest"],
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState: initialGalleryState,
  reducers: {
    setImage: (state, { payload }: PayloadAction<string | null>) => {
      state.image = payload;
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
    setError: (state, { payload }: PayloadAction<AppError>) => {
      state.error = payload;
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

export const { setImage, setPage, setError } = gallerySlice.actions;
export const gallerySelector = (state: RootState) => state.gallery;
export default gallerySlice.reducer;

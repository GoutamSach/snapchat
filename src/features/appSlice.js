import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    selectedImage: null,
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    selectImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    resetSelectImage: (state) => {
      state.selectedImage = null;
    },
  },
});

export const { logout, login, selectImage, resetSelectImage } =
  appSlice.actions;

export const userLogin = (state) => state.app.value;

export const selectSelectedImage = (state) => state.app.selectedImage;

export default appSlice.reducer;

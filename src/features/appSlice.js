import { createSlice } from "@reduxjs/toolkit";

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
    selectImagefromAppSlice: (state, action) => {
      state.selectedImage = action.payload;
    },
    resetSelectImage: (state) => {
      state.selectedImage = null;
    },
  },
});

export const { logout, login, selectImagefromAppSlice, resetSelectImage } =
  appSlice.actions;

export const userLogin = (state) => state.app.user;

export const selectSelectedImage = (state) => state.app.selectedImage;

export default appSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: false,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openMenu: (state) => {
      state.isMenuOpen = true;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    toggleMenu: (state) => {
      if (state.isMenuOpen) {
        state.isMenuOpen = false;
      } else {
        state.isMenuOpen = true;
      }
    },
  },
});

export const { openMenu, closeMenu, toggleMenu } = drawerSlice.actions;
export default drawerSlice.reducer;

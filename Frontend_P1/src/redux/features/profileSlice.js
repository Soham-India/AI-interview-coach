import { createSlice } from "@reduxjs/toolkit";

export const DIFFICULTY = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
  ADAPTIVE: "ADAPTIVE",
};

export const THEME = {
  CYBER: "CYBER",
  BLUEPRINT: "BLUEPRINT",
  TERMINAL: "TERMINAL",
};

const initialState = {
  length: 10,
  difficulty: DIFFICULTY.ADAPTIVE,
  theme: THEME.CYBER,
};

const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {
    setInterviewLength: (state, action) => {
      state.length = action.payload;
    },

    setDifficultyThreshold: (state, action) => {
      state.difficulty = action.payload;
    },

    setInterfaceTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {
  setInterviewLength,
  setDifficultyThreshold,
  setInterfaceTheme,
} = profileSlice.actions;

export const selectProfile = (state) => state.profile;

export const selectInterviewConfig = (state) => ({
  length: state.profile.length,
  difficulty: state.profile.difficulty,
  theme: state.profile.theme,
});

export const selectInterviewLength = (state) =>
  state.profile.length;

export const selectDifficulty = (state) =>
  state.profile.difficulty;

export const selectTheme = (state) =>
  state.profile.theme;

export default profileSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isInitialized: false,
  jobTitle: "",
  jobDesc: "",
};

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    setInterviewConfig: (state, action) => {
      state.isInitialized = true;
      state.jobTitle = action.payload.jobTitle;
      state.jobDesc = action.payload.jobDesc;
    },
    resetInterview: (state) => {
      state.isInitialized = false;
      state.jobTitle = "";
      state.jobDesc = "";
    },
  },
});

export const { setInterviewConfig, resetInterview } = interviewSlice.actions;
export default interviewSlice.reducer;
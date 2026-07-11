import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isInitialized: false,
  jobTitle: "",
  jobDesc: "",
  sessionId: null,
  questions: [],
  currentQuestionIndex: 0,
};

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    setInterviewConfig: (state, action) => {
      state.isInitialized = true;
      state.jobTitle = action.payload.jobTitle;
      state.jobDesc = action.payload.jobDesc;
      state.sessionId = action.payload.sessionId;
      state.questions = action.payload.questions;
      state.currentQuestionIndex = 0;
    },
    resetInterview: (state) => {
      state.isInitialized = false;
      state.jobTitle = "";
      state.jobDesc = "";
      state.sessionId = null;
      state.questions = [];
      state.currentQuestionIndex = 0;
    },
  },
});

export const { setInterviewConfig, resetInterview } = interviewSlice.actions;
export default interviewSlice.reducer;
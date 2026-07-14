import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isInitialized: false,
  jobTitle: "",
  jobDesc: "",
  sessionId: null,
  questions: [],
  currentQuestionIndex: 0,
  interviewLengthMinutes: 10,
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
      state.interviewLengthMinutes = action.payload.interviewLengthMinutes || 10;
    },
    resetInterview: (state) => {
      state.isInitialized = false;
      state.jobTitle = "";
      state.jobDesc = "";
      state.sessionId = null;
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.interviewLengthMinutes = 10;
    },
  },
});

export const { setInterviewConfig, resetInterview } = interviewSlice.actions;
export default interviewSlice.reducer;
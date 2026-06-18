import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "./features/drawerSlice";
import interviewReducer from "./features/interviewSlice";
import loadingReducer from "./features/loadingSlice";
import profileReducer from "./features/profileSlice"; // <-- Add profile map line
import archiveReducer from "./features/archiveSlice"; // <-- Add archive map line

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    interview: interviewReducer,
    loading: loadingReducer,
    profile: profileReducer,
    archive: archiveReducer
  }
});
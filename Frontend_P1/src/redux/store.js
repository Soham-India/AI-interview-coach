import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import drawerReducer from "./features/drawerSlice";
import interviewReducer from "./features/interviewSlice";
import loadingReducer from "./features/loadingSlice";
import profileReducer from "./features/profileSlice";
import archiveReducer from "./features/archiveSlice";
import quotaReducer from "./features/quotaSlice";

// Rehydrate auth state from localStorage on app start
const preloadedState = {
    auth: {
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null,
        isAuthenticated: !!localStorage.getItem('token'),
    },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    drawer: drawerReducer,
    interview: interviewReducer,
    loading: loadingReducer,
    profile: profileReducer,
    archive: archiveReducer,
    quota: quotaReducer,
  },
  preloadedState,
});
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  logsList: [],
  isLoading: true,
  error: null,
};

const archiveSlice = createSlice({
  name: "archive",
  initialState,
  reducers: {
    updateVaultSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setVaultLogs: (state, action) => {
      state.logsList = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setArchiveLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setArchiveError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    commitSessionToArchive: (state, action) => {
      // Pushes fresh completed interview evaluation logs seamlessly onto the head of your history queue
      state.logsList.unshift(action.payload);
    }
  }
});

export const { updateVaultSearchQuery, setVaultLogs, setArchiveLoading, setArchiveError, commitSessionToArchive } = archiveSlice.actions;

// Reusable Redux Selector to handle real-time fuzzy text queries on the data stack centrally
export const selectFilteredVaultLogs = (state) => {
  const { searchQuery, logsList } = state.archive;
  const query = searchQuery.toLowerCase().trim();
  
  if (!query) return logsList;
  
  return logsList.filter(log => 
    log.role?.toLowerCase().includes(query) ||
    log.company?.toLowerCase().includes(query) ||
    log.reference?.toLowerCase().includes(query)
  );
};

export const selectArchiveState = (state) => state.archive;

export default archiveSlice.reducer;
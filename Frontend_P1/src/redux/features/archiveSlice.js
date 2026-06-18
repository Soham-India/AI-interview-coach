import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  logsList: [
    {
      id: "log-01",
      reference: "MISSION_REF: 8829-X",
      timestamp: "12.04.2024",
      status: "COMPLETED",
      score: 94,
      role: "SR. PROPULSION ARCHITECT",
      company: "SPACE_X",
      sector: "SECTOR_07_ALPHA"
    },
    {
      id: "log-02",
      reference: "MISSION_REF: 4410-B",
      timestamp: "08.03.2024",
      status: "COMPLETED",
      score: 89,
      role: "LEAD INTELLIGENCE OPERATIVE",
      company: "PALANTIR",
      sector: "SECTOR_02_DELTA"
    },
    {
      id: "log-03",
      reference: "MISSION_REF: 1105-Q",
      timestamp: "02.01.2024",
      status: "TERMINATED",
      score: null,
      role: "PRINCIPAL SYSTEMS AUDITOR",
      company: "STRIPE",
      sector: "SECTOR_09_OMEGA"
    }
  ]
};

const archiveSlice = createSlice({
  name: "archive",
  initialState,
  reducers: {
    updateVaultSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    commitSessionToArchive: (state, action) => {
      // Pushes fresh completed interview evaluation logs seamlessly onto the head of your history queue
      state.logsList.unshift(action.payload);
    }
  }
});

export const { updateVaultSearchQuery, commitSessionToArchive } = archiveSlice.actions;

// Reusable Redux Selector to handle real-time fuzzy text queries on the data stack centrally
export const selectFilteredVaultLogs = (state) => {
  const { searchQuery, logsList } = state.archive;
  const query = searchQuery.toLowerCase().trim();
  
  if (!query) return logsList;
  
  return logsList.filter(log => 
    log.role.toLowerCase().includes(query) ||
    log.company.toLowerCase().includes(query) ||
    log.reference.toLowerCase().includes(query)
  );
};

export default archiveSlice.reducer;
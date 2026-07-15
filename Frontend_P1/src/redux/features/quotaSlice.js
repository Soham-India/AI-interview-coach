import { createSlice } from "@reduxjs/toolkit";

const quotaSlice = createSlice({
    name: "quota",
    initialState: {
        used: 0,
        limit: 500,
        warning: false,
        blocked: false,
        loaded: false,
    },
    reducers: {
        setQuotaStatus: (state, action) => {
            state.used = action.payload.used;
            state.limit = action.payload.limit;
            state.warning = action.payload.warning;
            state.blocked = action.payload.blocked;
            state.loaded = true;
        },
    },
});

export const { setQuotaStatus } = quotaSlice.actions;
export const selectQuota = (state) => state.quota;
export default quotaSlice.reducer;

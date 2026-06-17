import {configureStore} from '@reduxjs/toolkit'
import drawerReducer from './features/drawerSlice'
import loadingReducer from "./features/loadingSlice"; // <-- 1. Import loading slice
import interviewReducer from './features/interviewSlice';

export const store = configureStore(
    {
        reducer :{
            drawer : drawerReducer,
            loading : loadingReducer,
            interview : interviewReducer,
        },
    }
)
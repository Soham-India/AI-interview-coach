import {configureStore} from '@reduxjs/toolkit'
import drawerReducer from './features/drawerSlice'

export const store = configureStore(
    {
        reducer :{
            drawer : drawerReducer,
        },
    }
)
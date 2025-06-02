import { configureStore } from '@reduxjs/toolkit'
import campaignReducer from './slices/campaignSlice'

export const store = configureStore({
  reducer: {
    campaign: campaignReducer,
  },
})
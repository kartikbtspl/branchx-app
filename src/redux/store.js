import { configureStore } from '@reduxjs/toolkit'
import campaignReducer from './slices/campaignSlice'
import loginReducer from './slices/authSlice'
import campaignDetailReducer from './slices/campaignDetailSlice'

export const store = configureStore({
  reducer: {
    campaign: campaignReducer,
    auth: loginReducer, 
    campaignDetail : campaignDetailReducer
  },
})
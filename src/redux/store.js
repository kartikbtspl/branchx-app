import { configureStore } from '@reduxjs/toolkit'
import campaignReducer from './slices/campaignSlice'
import loginReducer from './slices/authSlice'
import userReducer from './slices/userProfileSlice' 

export const store = configureStore({
  reducer: {
    campaign: campaignReducer,
    auth: loginReducer, 
    user:userReducer,
  },
})
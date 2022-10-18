import { configureStore } from '@reduxjs/toolkit';
import epifanyReducer from '../features/epifanies/epifanySlice'
import userReducer from '../features/users/userSlice'

export const store = configureStore({
  reducer: {
    epifanies: epifanyReducer,
    users: userReducer
  },
});

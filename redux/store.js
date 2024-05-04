import { configureStore } from '@reduxjs/toolkit'
import {jobListingSlice} from './slices/jobListingSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        [jobListingSlice.name]:jobListingSlice.reducer,  //slice name : all reducers object of authSlice
    },
    devTools: true, // to enable chrome redux devtools extension
  })
}
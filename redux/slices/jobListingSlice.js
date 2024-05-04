import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobPosts: [],
  pageNumber:0,
  jobPostsPerPage:10,
  totalCount:0,
};

export const jobListingSlice = createSlice({
  name: "jobListing", // name
  initialState,
  reducers: {
    setJobPostsDetails(state, action) {
      // console.log("action.payload", action.payload);
      state.jobPosts = [...state.jobPosts,...action.payload.jobPosts];
      state.pageNumber = action.payload.pageNumber,
      state.jobPostsPerPage = action.payload.jobPostsPerPage,
      state.totalCount = action.payload.totalCount
    },

  },
});

export const { setJobPostsDetails } = jobListingSlice.actions; // export actions
export const selectJobPostsDetails = (state) => state.jobListing; // directly written useSelector's callback here and exported it. 'auth' is an name of all reducers of authSlice
export default jobListingSlice.reducer; // exporting all reducers
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobPosts: [],
  pageNumber:0,
  jobPostsPerPage:10,
  totalCount:0,
  filteredJobPosts:[],
  ReduxSelectedRoleOptions:[],
  ReduxSelectedRemoteOptions:[],
  ReduxSelectedLocationOptions:[],
  ReduxSelectedBasePay:{},
  ReduxSelectedExperience:{},
  ReduxCompanyName:""
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
      state.totalCount = action.payload.totalCount,
      state.filteredJobPosts = [...state.jobPosts,...action.payload.jobPosts];
    },
    setFilteredJobPosts(state, action) {
      state.filteredJobPosts = [...action.payload.jobPosts];
    },
    setReduxSelectedRoleOptions(state, action) {
      state.ReduxSelectedRoleOptions = [...action.payload];
    },
    setReduxSelectedRemoteOptions(state, action) {
      state.ReduxSelectedRemoteOptions = [...action.payload];
    },
    setReduxSelectedLocationOptions(state, action) {
      state.ReduxSelectedLocationOptions = [...action.payload];
    },
    setReduxSelectedBasePay(state, action) {
      state.ReduxSelectedBasePay = action.payload;
    },
    setReduxSelectedExperience(state, action) {
      state.ReduxSelectedExperience = action.payload;
    },
    setReduxCompanyName(state, action) {
      state.ReduxCompanyName = action.payload;
    },

  },
});

export const { setJobPostsDetails,setFilteredJobPosts,setReduxSelectedRoleOptions,setReduxSelectedRemoteOptions,setReduxSelectedLocationOptions,setReduxSelectedBasePay,setReduxSelectedExperience,setReduxCompanyName } = jobListingSlice.actions; // export actions
export const selectJobPostsDetails = (state) => state.jobListing; // directly written useSelector's callback here and exported it. 'auth' is an name of all reducers of authSlice
export default jobListingSlice.reducer; // exporting all reducers
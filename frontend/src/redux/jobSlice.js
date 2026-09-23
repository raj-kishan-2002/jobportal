import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
    browseJobs: []
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setBrowseJobs: (state, action) => {
      state.browseJobs = action.payload;
    }

  }
});

export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByText, setAllAppliedJobs, setSearchedQuery, setBrowseJobs } = jobSlice.actions;
export default jobSlice.reducer;
"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectJobPostsDetails,
  setFilteredJobPosts,
  setJobPostsDetails,
} from "@/redux/slices/jobListingSlice";
import { jobList } from "@/utils/apiEndpoints";
import { fetchApi } from "@/utils/methods";
import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Loader from "../common/Loader";
import Filters from "./FIlters";

const HomePage = (props) => {
  //  to update the job listings data from redux store
  const dispatch = useAppDispatch();

  //  to get the job listings data from redux store
  const jobPostsDetails = useAppSelector(selectJobPostsDetails);

  //  to check the api requesting is in processign or not if its in processign then show the loader according to this state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetch joblisting from api at initial time when their is no data
    jobPostsDetails.jobPosts.length === 0 && fetchJobLists(100, 0, true);
  }, []);

  const fetchJobLists = async (limit, offset, initial) => {
    setLoading(true);
    try {
      const payload = {
        limit: limit,
        offset: offset,
      };
      const jobListData = await fetchApi(jobList, "POST", payload);

      const postListingDetails = {
        jobPosts: jobListData.jdList,
        pageNumber: offset,
        jobPostsPerPage: limit,
        totalCount: jobListData.totalCount,
      };

      // update the joblistings data
      dispatch(setJobPostsDetails(postListingDetails));

      // roleFilter, experienceFilter,remoteFilter,locationFilter,basepayFilter,companyNameFilter

      console.log(
        "jobPostsDetails.ReduxSelectedRoleOptions",
        jobPostsDetails.ReduxSelectedRoleOptions
      );

      !initial &&
        filterFunction(
          jobPostsDetails.ReduxSelectedRoleOptions,
          jobPostsDetails.ReduxSelectedExperience,
          jobPostsDetails.ReduxSelectedRemoteOptions,
          jobPostsDetails.ReduxSelectedLocationOptions,
          jobPostsDetails.ReduxSelectedBasePay,
          jobPostsDetails.ReduxCompanyName
        );
      setLoading(false);
      console.log("jobPostsDetails.jobPosts", jobPostsDetails.jobPosts.length);
    } catch (error) {
      console.error(error);
    }
  };

  // Infiinite scroll functionality
  const handleScroll = () => {
    const scrollThreshold = 200;

    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - scrollThreshold
    ) {
      if (
        jobPostsDetails.totalCount > jobPostsDetails.jobPosts.length &&
        !loading &&
        jobPostsDetails.pageNumber != jobPostsDetails.pageNumber + 1
      ) {
        fetchJobLists(100, jobPostsDetails.pageNumber + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    jobPostsDetails.totalCount,
    jobPostsDetails.jobPosts,
    loading,
    jobPostsDetails.ReduxSelectedRoleOptions,
    jobPostsDetails.ReduxSelectedRemoteOptions,
    jobPostsDetails.ReduxSelectedLocationOptions,
    jobPostsDetails.ReduxSelectedExperience,
    jobPostsDetails.ReduxSelectedBasePay,
    jobPostsDetails.ReduxCompanyName
  ]);

  // Define a function to filter the job posts
  const filterJobPosts = (selectedFilters, companyNameFilter) => {
    console.log("selectedFilters", selectedFilters);
    const filteredData = jobPostsDetails.jobPosts.filter((jobPost) => {
      // Check if each job post matches all the selected filters and company name filter

      // Check role filter
      const roleMatch =
        selectedFilters.roleFilter.length === 0 ||
        selectedFilters.roleFilter.some(
          (role) => role.name.toLowerCase() === jobPost.jobRole.toLowerCase()
        );

      // Check remote filter
      const remoteMatch =
        selectedFilters.remoteFilter.length === 0 ||
        selectedFilters.remoteFilter.some(
          (remote) =>
            remote.name.toLowerCase() === jobPost.location.toLowerCase()
        );

      // Check location filter
      const locationMatch =
        selectedFilters.locationFilter.length === 0 ||
        selectedFilters.locationFilter.some(
          (location) =>
            location.name.toLowerCase() === jobPost.location.toLowerCase()
        );

      // Check company name filter
      const companyMatch =
        companyNameFilter === "" ||
        jobPost.companyName
          .toLowerCase()
          .includes(companyNameFilter.toLowerCase());


    // Check experience filter
    const experienceMatch = !selectedFilters.experienceFilter.name || 
      (Number(selectedFilters.experienceFilter.name) >= jobPost.minExp && 
       Number(selectedFilters.experienceFilter.name) <= jobPost.maxExp);


      // Check basepay filter
      const basepayMatch =
        !selectedFilters.basepayFilter.name ||
        selectedFilters.basepayFilter.name <= jobPost.minJdSalary;

      // Check if any of the selected options match the corresponding property of the job post
      return (
        roleMatch &&
        remoteMatch &&
        locationMatch &&
        companyMatch &&
        experienceMatch &&
        basepayMatch
      );
    });

    console.log("filteredData", filteredData);

    const data = { jobPosts: filteredData };

    dispatch(setFilteredJobPosts(data));
  };

  const filterFunction = (
    roleFilter = [],
    experienceFilter = {},
    remoteFilter = [],
    locationFilter = [],
    basepayFilter = {},
    companyNameFilter = ""
  ) => {
    const selectedFilters = {
      roleFilter: roleFilter, // Example of selected role filter
      experienceFilter: experienceFilter, // Example of selected experience filter
      remoteFilter: remoteFilter, // Example of selected remote filter
      locationFilter: locationFilter, // Example of selected location filter
      basepayFilter: basepayFilter, // Example of selected basepay filter
    };

    filterJobPosts(selectedFilters, companyNameFilter);
  };

  return (
    <>
      <Filters filterJobPosts={filterJobPosts} />
      <div className="post-card-container">
        {jobPostsDetails.filteredJobPosts.length > 0
          ? jobPostsDetails.filteredJobPosts.map((jobPost, index) => (
              <JobCard post={jobPost} key={index} />
            ))
          : jobPostsDetails.filteredJobPosts.length < 10
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} style={{ margin: "10px 0px" }}>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </div>
            ))
          : Array.from({ length: 10 }).map((_, index) => (
              <div key={index} style={{ margin: "10px 0px" }}>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </div>
            ))}
      </div>

      {loading && <Loader />}

      <style jsx>{`
        .post-card-container {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: start;
          width:95%;
          margin:auto;
        }
      `}</style>
    </>
  );
};

export default HomePage;

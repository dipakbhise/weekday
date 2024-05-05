"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectJobPostsDetails,
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
    jobPostsDetails.jobPosts.length === 0 && fetchJobLists(100, 0);
  }, []);

  const fetchJobLists = async (limit, offset) => {
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
      setLoading(false);
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
  }, [jobPostsDetails.totalCount, jobPostsDetails.jobPosts, loading]);

  return (
    <>
      <Filters />
      <div className="post-card-container">
        {jobPostsDetails.jobPosts.length > 0
          ? jobPostsDetails.jobPosts.map((jobPost, index) => (
              <JobCard post={jobPost} key={index} />
            ))
          : jobPostsDetails.jobPosts.length < 10
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
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default HomePage;

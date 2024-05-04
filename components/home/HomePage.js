"use client";
import { jobList } from "@/utils/apiEndpoints";
import { fetchApi } from "@/utils/methods";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  useEffect(() => {
    fetchJobLists(10,0)
  }, []);
  const fetchJobLists = async (limit, offset) => {
    try {
      const payload = {
        limit: limit,
        offset: offset,
      };
      const jobListData = await fetchApi(jobList, "POST", payload);

      console.log("jobListData");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
  <div>HomePage

  </div>

  </React.Fragment>);
};

export default HomePage;

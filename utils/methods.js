// common function to call api with parameters like api endpoint, method, payload,additionalHeaders, successfunction which will call after api response

import { BASE_URL } from "./config";

export const fetchApi = async (
  endpoint,
  method = "GET",
  payload = null,
  additionalHeaders = {},
  successFunc = null
) => {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...additionalHeaders,
    // Add any other headers you need (e.g., authorization tokens)
  };

  const options = {
    method,
    headers,
    body: payload ? JSON.stringify(payload) : null,
  };

  try {
    // fetch is the vanila js function for AJAX calls
    const response = await fetch(url, options);
    if (response.ok) {

    // call the success func after api success response 
      if (successFunc) {
        successFunc();
      }
    } else {
      console.error("API request failed");
    }

    // convert the fetched data into json format and return it
    return response.json();
  } catch (error) {
    console.error("API request failed:", error.message);
    throw error;
  }
};

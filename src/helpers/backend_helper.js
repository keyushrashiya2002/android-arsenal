import { APIClient } from "./api_helper";
import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

export const getReadme = (data) =>
  api.get(
    `${url.README_URL}${data.user_name}/${data.repository}/${data.branch}/README.md`
  );
export const getBranchDetails = (data) =>
  api.get(
    `${url.GET_DETAILS}${data.user_name}/${data.repository}/${data.type}`
  );
export const getDetails = (data) =>
  api.get(`${url.GET_DETAILS}${data.user_name}/${data.name}`);
export const getHomePageData = (data) =>
  api.get(
    `${url.GET_SEARCH}?q=${data.q}+language:${data.languages}&sort=${data.sortBy}&order=desc&page=${data.page}&per_page=${data.per_page}`
  );
// api.get(url.GET_SEARCH, data);

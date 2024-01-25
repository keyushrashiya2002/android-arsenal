import React from "react";
import { Navigate } from "react-router-dom";

// Home
import Home from "../pages/Home/Home";
import Details from "../pages/Home/Details";

import PrivacyPolicy from "../pages/Pages/PrivacyPolicy/index";

//Calendar

const authProtectedRoutes = [
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "*", component: <Navigate to="/" /> },
];

const publicRoutes = [
  { path: "/", component: <Home /> },

  // { path: "/profile", component: <Settings /> },
  { path: "/details/:user_name/:repository_name", component: <Details /> },
  { path: "/privacy", component: <PrivacyPolicy /> },
];

export { authProtectedRoutes, publicRoutes };

import React from "react";
import { Navigate } from "react-router-dom";

// Home
import Home from "../pages/Home/Home";
import Details from "../pages/Home/Details";

import PrivacyPolicy from "../pages/Pages/PrivacyPolicy/index";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Logout from "../pages/Authentication/Logout";
import Settings from "../pages/Pages/Profile/Settings/Settings";
import ForgetPassword from "../pages/Authentication/ForgetPassword";
import LikeList from "../pages/Home/LikeList";
//Calendar

const authProtectedRoutes = [
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "*", component: <Navigate to="/" /> },
  { path: "/likelist", component: <LikeList /> },
];

const publicRoutes = [
  { path: "/", component: <Home /> },
  { path: "/login", component: <Login /> },
  { path: "/forgotpassword", component: <ForgetPassword /> },
  { path: "/register", component: <Register /> },
  { path: "/logout", component: <Logout /> },
  // { path: "/profile", component: <Settings /> },
  { path: "/details/:user_name/:repository_name", component: <Details /> },
  { path: "/privacy", component: <PrivacyPolicy /> },
];

export { authProtectedRoutes, publicRoutes };

import React from "react";
import { Routes, Route } from "react-router-dom";
import NonAuthLayout from "../Layouts/NonAuthLayout";
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import PrivateRoute from "./PrivateRoute";

const Index = () => {

  return (
    <React.Fragment>
      <Routes>
        <Route>
          {publicRoutes?.map((route, idx) => (
            <Route
              path={route?.path}
              element={
                <NonAuthLayout>
                  {route?.component}
                </NonAuthLayout>
              }
              key={idx}
              exact={true}
            />
          ))}
          {/* {publicRoutes?.map((route, index) => {
            return (
              <Route
                path={route.path}
                element={route.path === '/login' || route.path === '/register' || route.path === '/forgotpassword' ?
                  route.component
                  :
                  <NonAuthLayout>{route.component}</NonAuthLayout>
                }
                key={index}
                exact={true}
              />
            )
          })} */}
        </Route>

        <Route>
          {authProtectedRoutes?.map((route, idx) => (
            <Route
              path={route?.path}
              element={
                <PrivateRoute>
                  {route?.component}
                </PrivateRoute>
              }
              key={idx}
              exact={true}
            />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default Index;

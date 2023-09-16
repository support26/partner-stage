import React, { useState, useEffect, Suspense } from "react";
import Loader from "Loader";
// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
//  React example components
import Sidenav from "examples/Sidenav";
//  React themes
import theme from "assets/theme";
//  React Dark Mode themes
import themeDark from "assets/theme-dark";
//  React routes
import routes from "routes";
import SignIn from "layouts/authentication/sign-in";
// import ResetPassword from "layouts/authentication/reset-password/cover/index";
// import AddUsers from "layouts/AddUsers";
// import Notifications from "./layouts/notifications";
import Cookies from "js-cookie";

//  React contexts
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

import anaxee_logo from "assets/images/icons/Ellipse 1.png";
const ResetPassword = React.lazy(() =>
  import("./layouts/authentication/reset-password/cover/index")
);
const ContactUs = React.lazy(() => import('./layouts/contactUs'));
const AddUsers = React.lazy(() => import("./layouts/AddUsers"));
const Notifications = React.lazy(() => import("./layouts/notifications"));
const Opportunities = React.lazy(() => import("./layouts/opportunities"));
const Cases = React.lazy(() => import("./layouts/cases"));
export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    // layout,
    openConfigurator,
    sidenavColor,
    // transparentSidenav,
    // whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={
              <Suspense fallback={<Loader />}>{route.component}</Suspense>
            }
            key={route.key}
          />
        );
      }
      return null;
    });

  const roleId = localStorage.getItem("roleId"); // get role id from local storage

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {/* {layout === "dashboard" && ( */}
      {Cookies.get("token") ? (
        <>
          <Suspense fallback={<Loader />}>
            <Sidenav
              color={sidenavColor}
              brand={anaxee_logo}
              brandName=""
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
          </Suspense>
        </>
      ) : null}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <SignIn />
            </Suspense>
          }
        />
        {/* Add contact us route */}
        <Route path="/contact-us" element={
            <Suspense fallback={<Loader/>}>
              <ContactUs />
            </Suspense>
          } />
        {sessionStorage.getItem("token") && (
          <Route
            path="/reset"
            element={
              <Suspense fallback={<Loader />}>
                <ResetPassword />
              </Suspense>
            }
          />
        )}
        <Route path="*" element={<Navigate to="/" />} />
        {/* change later it to 404 page */}
        {Cookies.get("token") && roleId == 0 && (
          <Route
            path="/users"
            element={
              <Suspense fallback={<Loader />}>
                <AddUsers />
              </Suspense>
            }
          />
        )}
        {Cookies.get("token") && roleId == 0 && (
          <Route
            path="/notifications"
            element={
              <Suspense fallback={<Loader />}>
                <Notifications />
              </Suspense>
            }
          />
        )}
        {Cookies.get("token") && roleId == 0 && (
          <Route
            path="/opportunities"
            element={
              <Suspense fallback={<Loader />}>
                <Opportunities />
              </Suspense>
            }
          />
        )}
        {Cookies.get("token") && roleId == 0 && (
          <Route
            path="/cases"
            element={
              <Suspense fallback={<Loader />}>
                <Cases />
              </Suspense>
            }
          />
        )}

        {/* below line first check that token is present than show routes*/}
        {Cookies.get("token") && getRoutes(routes)}
      </Routes>
    </ThemeProvider>
  );
}

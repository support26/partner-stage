import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import Icon from "@mui/material/Icon";

//  React components
// import MDBox from "components/MDBox";

//  React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

//  React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

//  React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

//  React routes
import routes from "routes";
import SignIn from "layouts/authentication/sign-in";
import ResetPassword from "layouts/authentication/reset-password/cover/index";
import AddUsers from "layouts/AddUsers";
import Notifications from "./layouts/notifications";
import Cookies from 'js-cookie';

//  React contexts
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import anaxee_logo from "assets/images/icons/Ellipse 1.png";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

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
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  const roleId = localStorage.getItem("roleId"); // get role id from local storage

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />

        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={
                (transparentSidenav && !darkMode) || whiteSidenav
                  ? anaxee_logo
                  : brandWhite
              }
              brandName=""
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {/* {configsButton} */}
          </>
        )}
        {layout === "vr" && <Configurator />}

        <Routes>
          <Route exact path="/" element={<SignIn />} />
          {/* <Route path="/sign-in" element={<SignIn />} /> */}
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
          {/* change later it to 404 page */}
          {Cookies.get('token') && roleId == 0 && <Route path="/users" element={<AddUsers />} />}
          {Cookies.get('token') && roleId == 0 && (
            <Route path="/notifications" element={<Notifications />} />
          )}
          {/* below line first check that token is present than show routes*/}
          {Cookies.get('token') && getRoutes(routes)}
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={anaxee_logo}
            brandName=""
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {/* {configsButton} */}
        </>
      )}

      {layout === "vr" && <Configurator />}
      <Routes>
      <Route exact path="/" element={<SignIn />} />
        {sessionStorage.getItem("token") && (
          <Route path="/reset" element={<ResetPassword />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
        {/* change later it to 404 page */}
        {Cookies.get('token') && roleId == 0 && <Route path="/users" element={<AddUsers />} />}
        {Cookies.get('token') && roleId == 0 && (
          <Route path="/notifications" element={<Notifications />} />
        )}
        {/* below line first check that token is present than show routes*/}
        {Cookies.get('token') && getRoutes(routes)}
      </Routes>
    </ThemeProvider>
  );
}

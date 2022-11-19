import React from "react";
// import Dashboard from "./layouts/dashboard";
// import Tables from "./layouts/tables";
// // import Opportunities from "./layouts/opportunities";
// import Banner from "./layouts/banner/index";
// import Anouncement from "./layouts/anouncement";
// @mui icons
import Icon from "@mui/material/Icon";

const Dashboard = React.lazy(() => import('./layouts/dashboard'));
const Tables = React.lazy(() => import('./layouts/tables'));
const Opportunities = React.lazy(() => import('./layouts/opportunities'));
const Banner = React.lazy(() => import('./layouts/banner/index'));
const Anouncement = React.lazy(() => import('./layouts/anouncement'));

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Runners",
    key: "runners",
    icon: <Icon fontSize="medium">table_view</Icon>,
    route: "/runners",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Banner",
    key: "banner",
    icon: <Icon fontSize="medium">ad_units_rounded</Icon>,
    route: "/banner",
    component: <Banner />,
  },
  {
    type: "collapse",
    name: "Announcement",
    key: "anouncement",
    icon: <Icon fontSize="medium">campaign</Icon>,
    route: "/anouncement",
    component: <Anouncement />,
  },
  // {
  //   type: "collapse",
  //   name: "Opportunity",
  //   key: "opportunity",
  //   icon: <Icon fontSize="medium">assignment</Icon>,
  //   route: "/opportunities",
  //   component: <Opportunities />,
  // },
  
];

export default routes;

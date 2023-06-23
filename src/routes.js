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
const Banner = React.lazy(() => import('./layouts/banner/index'));
const Anouncement = React.lazy(() => import('./layouts/anouncement'));
const DirectApplications = React.lazy(() => import('./layouts/direct_applications'));
const Ticket = React.lazy(()=> import('./layouts/ticket'));

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
  {
    type: "collapse",
    name: "Direct Applications",
    key: "applications",
    icon: <Icon fontSize="medium">groups</Icon>,
    route: "/applications",
    component: <DirectApplications />,
  },
  {
    type: "collapse",
    name: "Tickets",
    key: "ticket",
    icon: <Icon fontSize="medium">confirmation_number</Icon>,
    route :"/ticket",
    component: <Ticket />
  }
  
];

export default routes;

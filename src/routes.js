import Dashboard from "./layouts/dashboard";
import Tables from "./layouts/tables";
import Notifications from "./layouts/notifications";
import Opportunities from "./layouts/opportunities";

// @mui icons
import Icon from "@mui/material/Icon";


const temp = localStorage.getItem('roleId')

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    route: "/dashboard",
    component: < Dashboard />,
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
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="medium">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Opportunities",
    key: "opportunities",
    icon: <Icon fontSize="medium">assignment</Icon>,
    route: "/opportunities",
    component: <Opportunities />,
  },
  // {
  //   type: "collapse",
  //   name: "All Users",
  //   key: "users",
  // //   icon: <Icon fontSize="medium">account_circle</Icon>,
  //   route: "/users",
  //   component: <AddUsers />,
  // },
  // {
    // type: "collapse",
    // name: "Sign In",
    // key: "sign-in",
    // icon: <Icon fontSize="medium">login</Icon>,
  //   route: "/sign-in",
  //   component: <SignIn />,
  // },
  // {
    // type: "collapse",
    // name: "reset ",
    // key: "reset-password",
    // icon: <Icon fontSize="medium">ResetPassword</Icon>,
  //   route: "/reset",
  //   component: <ResetPassword />,
  // }

];

export default routes;

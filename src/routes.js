import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Notifications from "layouts/notifications";
import SignIn from "layouts/authentication/sign-in";
import AddUsers from 'layouts/AddUsers'

// @mui icons
import Icon from "@mui/material/Icon";

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
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="medium">table_view</Icon>,
    route: "/tables",
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
    name: "All Users",
    key: "users",
    icon: <Icon fontSize="medium">account_circle</Icon>,
    route: "/users",
    component: <AddUsers />,
  },
  {
    // type: "collapse",
    // name: "Sign In",
    // key: "sign-in",
    // icon: <Icon fontSize="medium">login</Icon>,
    route: "/sign-in",
    component: <SignIn />,
  },
  

];

export default routes;

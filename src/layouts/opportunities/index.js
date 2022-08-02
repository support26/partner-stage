import React from 'react'
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import Icon from "@mui/material/Icon";


export default function index() {
  return (
    <DashboardLayout>
    <DashboardNavbar />

    <Icon fontSize="medium">table_view</Icon>
    </DashboardLayout>
  )
}

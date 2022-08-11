// @mui material components
import Grid from "@mui/material/Grid";
//Hooks
import useUsers from "../../hooks/useUsers";
import { useState, useEffect } from "react";

import UserRepository from "api/UsersRepository";
//  React components
import { Navigate } from "react-router-dom";
// import { useState } from "react";
import cookies from "js-cookie";

import MDBox from "components/MDBox";

//  React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import PieChart from "examples/Charts/PieChart";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
// import verticalBarChartData from "layouts/dashboard/data/verticalBarChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import pieChartData from "./data/pieChartData";
import useusers from "../../hooks/useUsers";
// import { useSelector } from 'react-redux'

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState("0");
  const [activeUsers, setActiveUsers] = useState("0");
  const [total, setTotal] = useState([]);
  const [state, setState] = useState([]);

  const partner_app_users = () => {
    UserRepository.TotalUsers()
      .then((res) => {
        // console.log(res.data.data.total_users);
        setTotalUsers(res.data.data.total_users);
      })
      .catch((err) => {
        console.log(err);
      });
    UserRepository.ActiveUsers()
      .then((res) => {
        // console.log(res);
        setActiveUsers(res.data.data.active_users);
      })
      .catch((err) => {
        console.log(err);
      });
    UserRepository.usersByState()
      .then((res) => {
        console.log(res);
        setTotal(res.data.data.total);
        setState(res.data.data.state);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    partner_app_users();
  }, []);
 

  const verticalBarChartData = {
    labels: state,
    datasets: [
      {
        label: "Users",
        color: "info",
        data: total,
      },
    ],
  };
  // const partner_app_active_users = () => {
  //   getActiveUsers().then((res) => {
  //     setActiveUsers(res.data.data);
  //   });
  // };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={5} mx={1}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6} lg={4} mt={0}>
            <MDBox mb={0}>
              <ComplexStatisticsCard
                sx={{ height: "10%" }}
                color="dark"
                icon="group"
                title="Total Users"
                count={totalUsers}
                // percentage={{
                //   color: 'success',
                //   amount: '+55%',
                //   label: 'than lask week'
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} mt={0} ml={0}>
            <MDBox mb={0}>
              <ComplexStatisticsCard
                icon="person_pin_rounded"
                title="Active Users"
                count={activeUsers}
                // percentage={{
                //   color: 'success',
                //   amount: '+3%',
                //   label: 'than last month'
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} mt={0}>
            <MDBox mb={0}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Nothing"
                count="0"
                // percentage={{
                //   color: 'success',
                //   amount: '+1%',
                //   label: 'than yesterday'
                // }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <VerticalBarChart
                  icon={{ color: "info", component: "leaderboard" }}
                  title="Users Data"
                  description="users in different states"
                  chart={verticalBarChartData}
                />
              </MDBox>
            </Grid>
            {/* <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <PieChart
                  icon={{ color: 'info', component: 'leaderboard' }}
                  title='Pie Chart'
                  description='Analytics Insights'
                  chart={pieChartData}
                />
              </MDBox>
            </Grid> */}
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;

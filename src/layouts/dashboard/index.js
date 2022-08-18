import { useState, useEffect } from "react";
import UserRepository from "api/UsersRepository";
// @mui material components
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";

//  React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState("0");
  const [activeUsers, setActiveUsers] = useState("0");
  const [support_users, setSupport_users] = useState("0");
  const [total, setTotal] = useState([]);
  const [state, setState] = useState([]);

  const partner_app_users = () => {
    // total users
    UserRepository.TotalUsers()
      .then((res) => {
        setTotalUsers(res.data.data.total_users);
      })
      .catch((err) => {
        console.log(err);
      });
      // active users
    UserRepository.ActiveUsers()
      .then((res) => {
        setActiveUsers(res.data.data.active_users);
      })
      .catch((err) => {
        console.log(err);
      });

        // support users 
        UserRepository.supportUsers()
        .then((res) => {
          
          setSupport_users(res.data.data.support_users);

        })
        .catch((err) => {
          console.log(err);
        });


      // state graph
    UserRepository.usersByState()
      .then((res) => {
        // console.log(res);
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
                icon="group"
                title="Support Users"
                count={support_users}
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

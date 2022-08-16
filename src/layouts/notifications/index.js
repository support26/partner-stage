import { useState } from "react";
import ButtonGroup from '@mui/material/ButtonGroup';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

//  React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import State from "./state";
import Distric from "./distric";
import Number from "./number";
import Allnotification from "./allnotification";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import "../AddUsers/style.css";
import axios from "axios";
import { useEffect } from "react";
import useAdmin from "../../hooks/useAdmin";

function Notifications() {
  const [open, setOpen] = useState(false);
  const [disopen, setdisOpen] = useState(false);
  const [numopen, setnumOpen] = useState(false);
  const [allopen, setAllOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [noticationLog, setNoticationLog] = useState([]);

  const {
    GetNotification } = useAdmin();

    const GetBanner = () => {
     
      var GetNotifications = GetNotification();
      GetNotifications.then((response) => {
        if (response.status === 200) {
         console.log(response);
          setNoticationLog(response.data.data);
        }
      }).catch((e) => {
        console.log(e);
      });
    };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    GetBanner();
    setOpen(false);
  };

  const handleDistricOpen = () => {
    setdisOpen(true);
  };

  const handleDistricClose = () => {
    GetBanner();
    setdisOpen(false);
  };
  const handleNumberOpen = () => {
    setnumOpen(true);
  };

  const handleNumberClose = () => {
    GetBanner();
    setnumOpen(false);
  };
  const handleAllOpen = () => {
    setAllOpen(true);
  };
  const handleAllClose = () => {
    GetBanner();
    setAllOpen(false);
  };
  
  useEffect(() => {
    GetBanner();
  }, []);

  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* notication  */}
      <MDBox mt={3} mb={1}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item sx={{ padding: 1 }} xs={12} sm={12} md={8}>
            <Card sx={{  width: "100%" ,py:10}}>
            

              <Box sx={{ }} textAlign='center'>
                <MDTypography align="center" variant="h3" sx={{ pb: "30px" }}>
                Notification
              </MDTypography>
              
              

                  <Button
                    style={{
                      color: "#ffffff",
                      backgroundColor: "#33A2B5",
                      width: 200,
                   margin:10
                    }}
                    onClick={handleAllOpen}
                  >
                    Send to All
                  </Button>
<br/>
                  <Button
                    style={{
                      color: "#ffffff",
                      backgroundColor: "#33A2B5",
                      width: 200,
                      margin:10
                    }}
                    onClick={handleClickOpen}
                  >
                    Send By state
                  </Button>
                  <br/>
                  <Button
                    style={{
                      color: "#ffffff",
                      backgroundColor: "#33A2B5",
                      width: 200,
                      margin:10
                    }}
                    onClick={handleDistricOpen}
                  >
                    Send By Distric
                  </Button>
                  <br/>
                  <Button
                    style={{
                      color: "#ffffff",
                      backgroundColor: "#33A2B5",
                      width: 200,
                      margin:10
                    }}
                    onClick={handleNumberOpen}
                  >
                    Send By Number
                  </Button>

               

              
              </Box>
            </Card>
          </Grid>

          <Grid item sx={{ padding: 1 }} xs={12} sm={12} md={4} >
            <Card sx={{ px: 8, py: 1, width: "100%",mb:0 ,background:'#33A2B5',borderRadius:'0% '}}>
              <MDTypography align="center" variant="h3" sx={{ pb: "10px",color:'#ffffff' }}>
                History
              </MDTypography>
            </Card>
            
          <Card  sx={{ width:'100%',height:'400px', overflow: 'scroll' ,borderRadius:'0% ' }}>
            <Grid  item sx={{ padding: 1 }} xs={12} sm={12} md={12} >
            {noticationLog.map((demo) => {
              // return <TextField value={val} />;
              return (
                <Grid item sx={{ padding: 1 }} xs={12} sm={12} md={12}>
                 <div>
                    <CardContent sx ={{py:1}}>
                      <Typography gutterBottom variant="h6" component="div" sx={{textTransform:'capitalize'}}>
                       {demo.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{py:2}}>
                        {demo.body}
                      </Typography> 
                    
                       <Typography variant="body2" color="text.primary"  >
                       {demo.created_by}
                      </Typography> 
                      <Typography variant="body2" color="text.primary" >
                       {demo.created_at}
                      </Typography> 
                    </CardContent>
              
                   <hr sx={{width:'100%'}}/>
                </div>  
                </Grid>
              );
            })}

          </Grid>
            </Card>

          </Grid>
        </Grid>
      </MDBox>

       {/* for All State wise  */}

      <Dialog maxWidth={maxWidth} open={allopen} >
        <div>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleAllClose}
            aria-label="close"
            style={{ float: "right" }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Box
          noValidate
          component="form"
          sx={{
            maxWidth,
          }}
        >
          <Allnotification />
        </Box>
      </Dialog>

      {/* for state */}
      <Dialog maxWidth={maxWidth} open={open} >
        <div>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            style={{ float: "right" }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Box
          noValidate
          component="form"
          sx={{
            maxWidth,
          }}
        >
          <State />
        </Box>
      </Dialog>

      {/* for District wise  */}

      <Dialog maxWidth={maxWidth} open={disopen} >
        <div>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDistricClose}
            aria-label="close"
            style={{ float: "right" }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Box
          noValidate
          component="form"
          sx={{
            maxWidth,
          }}
        >
          <Distric />
        </Box>
      </Dialog>
      {/* for Number wise  */}

      <Dialog maxWidth={maxWidth} open={numopen}>
        <div>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleNumberClose}
            aria-label="close"
            style={{ float: "right" }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Box
          noValidate
          component="form"
          sx={{
            maxWidth,
          }}
        >
          <Number />
        </Box>
      </Dialog>

    
    </DashboardLayout>
  );
}

export default Notifications;

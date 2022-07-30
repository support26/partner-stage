import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from '@mui/material/Box'


//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


//  React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";



import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import State from "./state";
import Distric from "./distric";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import "../AddUsers/style.css";

function Notifications() {
  const [open, setOpen] = useState(false);
  const [disopen, setdisOpen] = useState(false);
  const [maxWidth, setMaxWidth] =useState('sm');


      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      const handleDistricOpen = () => {
        setdisOpen(true);
      };

      const handleDistricClose = () => {
        setdisOpen(false);
      };
     

  return (
    <DashboardLayout>
      <DashboardNavbar />
      
      <MDBox mt={1} mb={1}>
        <Grid container spacing={0} justifyContent="center" >
          <Grid item sx = {{padding:1}} >
            <Card  sx={{ px:8, py:4,width:'100%'}} >
            <MDTypography  align="center" variant="h3" sx={{ pb:"30px"}} >Notification</MDTypography>    

               <Box sx={{ pb:3, minWidth: 120 }}>
      
           <div style={{width:200}}>
           <Button
            style={{ color: "#ffffff", backgroundColor: "#33A2B5",width:200 }}
            onClick={handleClickOpen}
          >
           Send By state
          </Button>
          <br/>  <br/>

          <Button
            style={{ color: "#ffffff", backgroundColor: "#33A2B5",width:200 }}
            onClick={handleDistricOpen}
          >
              Send By Distric
          </Button>
               
                {/* <Button sx={{backgroundColor:'#33A2B5',color:'#ffffff'}} variant="contained" onClick={handlePersional} disableElevation>
                     Send By Persional
                </Button> 
               */}
          </div>
               </Box>
              </Card>         
          </Grid>
        </Grid>
      </MDBox>

{/* for state */}
      <Dialog
     
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      > 
        <div >
        <IconButton
      edge="start"
      color="inherit"
      onClick={handleClose}
      aria-label="close"
      style={{float:'right'}}
    >
      <CloseIcon />
    </IconButton></div>
          <Box
            noValidate
            component="form"
            sx={{
             
            
              maxWidth
            }}
          >
            <State/>
           
          </Box>
     
       
      </Dialog>

{/* for state wise  */}

<Dialog
     
     maxWidth={maxWidth}
     open={disopen}
     onClose={handleDistricClose}
   > 
   
      <div>
     <IconButton
   edge="start"
   color="inherit"
   onClick={handleDistricClose}
   aria-label="close"
   style={{float:'right'}}
 >
   <CloseIcon />
 </IconButton>
 </div>
       <Box
         noValidate
         component="form"
         sx={{
          
         
           maxWidth
         }}
       >
        <Distric/>
        
       </Box>
    
    
   </Dialog>

     
   
    </DashboardLayout>
  );
}

export default Notifications;

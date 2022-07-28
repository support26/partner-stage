import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from '@mui/material/Box'
import NativeSelect from '@mui/material/NativeSelect';

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import {Navigate} from 'react-router-dom';

//  React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { width } from "@mui/system";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// mui custom style




function Notifications() {
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={1} mb={1}>
        <Grid container spacing={0} justifyContent="center" >
          <Grid item sx = {{padding:1}} >
            <Card  sx={{ px:8, py:4,width:'100%'}} >
            <MDTypography  align="center" variant="h3" sx={{ pb:"30px"}} >Notification</MDTypography>    

        <Box sx={{ pb:3, minWidth: 120 }}>
            <FormControl maxWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Age
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: 'age',
                  id: 'uncontrolled-native',
                }}
              >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </NativeSelect>
            </FormControl>

            <FormControl maxWidth sx={{ml:5}}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Age
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: 'age',
                  id: 'uncontrolled-native',
                }}
              >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </NativeSelect>
            </FormControl>
            <FormControl maxWidth sx={{ml:5}}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Age
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: 'age',
                  id: 'uncontrolled-native',
                }}
              >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </NativeSelect>
            </FormControl>
          </Box>

              
              
 
              <MDInput  label="Type here..." multiline rows={5}  style={{minWidth: 'auto' ,maxWidth:'400px' }} /> <br/>
                <TextField
              helperText="Any ID Proof Photo(Aadhar/Voter ID) "
              type="file"
            /> <br/>
         <Button variant="contained" style={{background:'#33A2B5', color:'white'}} href="#contained-buttons">
          Send
          </Button>
              </Card>         
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Notifications;

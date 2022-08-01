import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import UserRepository from "api/UsersRepository";

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
import { useEffect } from "react";
import axios from "axios";

// mui custom style




function Distric() {
  
  const [state, setState] = useState([]);
  const [districts,setDistricts] = useState([]);
const [sId,setsId] =useState(null)
const [name ,setName]=useState(null)
const [districImages ,setDistricImages]=useState(null)
const diastricName =e =>{
  const demo2 =  e.target.value
  console.log(demo2)
}
const getDistrict = e => {
  //setsId(e.target.value)
const demo =  e.target.value
  console.log(demo)
  
  axios
  .get(`https://project-swarksha.uc.r.appspot.com/districts?sid=${demo}`)
  .then((response) => {
    setDistricts(response.data.districts);
    // setTableLoading(false);
    console.log(response.data);
  });
}
      useEffect(() => {
        axios
          .get("https://project-swarksha.uc.r.appspot.com/states")
          .then((response) => {
            setState(response.data.states);
            // setTableLoading(false);
            console.log(response.data);
          });
      }, []);

      let file;
      let form_data = new FormData();
      const handelDistricImages = (event) => {
        file = event.target.files[0];
        form_data.append("file", file);
        UserRepository.UploadImageFile(form_data)
          .then((response) => {
            console.log(response.data);
            setDistricImages(response.data.data.fileUrl);
          })
          .catch((e) => {
            console.log(e);
          });
      };

      // useEffect(() => {
      //   axios
      //     .get(`https://project-swarksha.uc.r.appspot.com/districts?sid=${sId}`)
      //     .then((response) => {
      //       setDistricts(response.data.districts);
      //       // setTableLoading(false);
      //       console.log(response.data);
      //     });
      // }, []);

  return (
   
     
            <Card  sx={{ px:5,  py: 1, pb:4,width:'100%'}} >
            <MDTypography  align="center" variant="h3" sx={{ pb:"20px"}} >Distric Notification</MDTypography>    

        <Box sx={{ pb:2, minWidth: 120}}>
            <FormControl sx={{ width: 160 }}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                State
              </InputLabel>
              <NativeSelect
              
                value ={sId}
                onChange={getDistrict}
              >
                
            <option >   None      </option>
                {state.map(({ name,sid}) => {
              return (
                
                <option key={name} value={sid} style={{color:'black'}}>
                  {name}
                  
                </option>
              
              );
            })}
             
              </NativeSelect>
            </FormControl>

            <FormControl  sx={{ width: 120 , ml:3}}
              value = {name}
              onChange={diastricName}
           >
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Distric
              </InputLabel>
              <NativeSelect
                
              >   <option >   None      </option>
                  {districts.map(({ name}) => {
              return (
                <option key={name} value={name} style={{color:'black'}}>
                  {name}
                  
                </option>
              );
            })}
              </NativeSelect>
            </FormControl>
           
          </Box>

              
              
          <TextField
             
              type="text"
              label="Title..."
            />
            <br/>
              <MDInput  label="Type here..." multiline rows={5}  style={{minWidth: 'auto' ,maxWidth:'400px' }} /> <br/>
               
                <TextField
              helperText="image / upload"
              type="file"
              onChange={handelDistricImages}
            /> <br/>
         <Button variant="contained" style={{background:'#33A2B5', color:'white'}} href="#contained-buttons">
          Send
          </Button>
              </Card>         
         
   
  );
}

export default Distric;

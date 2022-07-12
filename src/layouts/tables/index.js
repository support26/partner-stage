import useAdmin from '../../hooks/useAdmin'

// export default Tables;
import { useHistory } from 'react-router';
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
//import React, { useState ,useEffect} from "react";
import axios from "axios";
//  React components
import MDBox from "components/MDBox";
import Button from "@mui/material/Button";

import MDTypography from "components/MDTypography";
import {Navigate} from 'react-router-dom';

//  React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import UploadImages from "./upload_image";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Tables(props) {
  const {Runner} = useAdmin()

  const [runnerdata, setrunnerdata] = useState([]);
  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // }; function (params) {

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: function (params) {
        var handleClickOpen = function (e) {
            e.stopPropagation(); // don't select this row after clicking
            var api = params.api;
            var thisRow = {};
            api
                .getAllColumns()
                .filter(function (c) { return c.field !== '__check__' && !!c; })
                .forEach(function (c) { return (thisRow[c.field] = params.getValue(params.id, c.field)); });
                setID(params.id);
                setFirstName(params.row.firstName);
                setLastName(params.row.lastName);
                setNumber_user(params.row.number_user);
                setEmail(params.row.email);
                setAge(params.row.age);
                setDob(params.row.dob);
                setGender(params.row.gender);
                setEducation(params.row.education);
                setAddress(params.row.address);
                setState(params.row.state);
                setDistrict(params.row.district);
                setTehsil(params.row.tehsil);
                setVillage(params.row.village);
                setLocation(params.row.location);
                setBeneficiaryname(params.row.beneficiaryname);
                setAccountno(params.row.accountno);
                setifsc(params.row.ifsc);
                setIdproofPhoto(params.row.idproofPhoto);
                setPassbook(params.row.passbook);
                setPancard(params.row.pancard);
                setIdnumber(params.row.idnumber);
                setPancardno(params.row.pancardno);
                setRunnerphoto(params.row.runnerphoto);
             
                setOpen(true);

            return console.log(id)
            //<div className='hello'>{alert(JSON.stringify(thisRow, null, 4))}</div>;
        };

        return <Button onClick={handleClickOpen}>Click</Button>;
      },
    },
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    {
      field: "lastName",
      headerName: "Last Name ",
      width: 130,
     
    },  {
      field: "phone_number",
      headerName: "Number(Prefilled from Sign In)  ",
      type: "number",
      width: 90,
     
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
     
    },
    {
      field: "email",
      headerName: "Email(Prefilled from Sign In)",
      type: "text",
      width: 130,
     
    },
    {
      field: "dob",
      headerName: "DOB",
      type: "date",
      width: 130,
     
    },
    {
      field: "gender",
      headerName: "Gender",
      type: "text",
      width: 130,
     
    },
    {
      field: "education",
      headerName: "Education",
      type: "text",
      width: 130,
     
    },
    {
      field: "latlong_address",
      headerName: "Address",
      type: "text",
      width: 130,
     
    },
    {
      field: "state",
      headerName: "State",
      type: "text",
      width: 130,
     
    },
    {
      field: "district",
      headerName: "District",
      type: "text",
      width: 130,
     
    },
    {
      field: "tehsil",
      headerName: "Tehsil",
      type: "text",
      width: 130,
     
    },
    {
      field: "village",
      headerName: "Village",
      type: "text",
      width: 130,
     
    },
    {
      field: "location",
      headerName: "GPS Location",
      type: "text",
      width: 130,
     
    },

    //bank deatail
    {
      field: "beneficiaryname",
      headerName: "Beneficiary Name",
      type: "text",
      width: 130,
     
    },
    {
      field: "accountno",
      headerName: "Bank Account Number",
      type: "number",
      width: 180,
     
    },

    {
      field: "ifsc",
      headerName: "Bank IFSC Code",
      type: "text",
      width: 150,
     
    },

    //Documents
    {
      field: "idproofPhoto",
      headerName: "ID Proof Photo",
      type: "file",
      width: 150,
     
    },
    {
      field: "passbook",
      headerName: "Bank Passbook Photo",
      type: "file",
      width: 150,
     
    },
    {
      field: "pancard",
      headerName: "Pan Card Photo",
      type: "file",
      width: 150,
     
    },
    {
      field: "idnumber",
      headerName: "ID Proof Photo",
      type: "file",
      width: 150,
     
    },

    {
      field: "pancardno",
      headerName: "Pan Card No",
      type: "file",
      width: 150,
     
    },

    {
      field: "runnerphoto",
      headerName: "Runner’s Photo",
      type: "file",
      width: 150,
     
    },
  ];

  //runner set data
   const [id, setID] = useState(null);
  const [name, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone_number, setNumber_user] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [latlong_address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [tehsil, setTehsil] = useState("");
  const [village, setVillage] = useState("");
  const [location, setLocation] = useState("");
  const [beneficiaryname, setBeneficiaryname] = useState("");
  const [accountno, setAccountno] = useState("");
  const [ifsc, setifsc] = useState("");

  const [idproofPhoto, setIdproofPhoto] = useState("");
  const [passbook, setPassbook] = useState("");
  const [pancard, setPancard] = useState("");
  const [idnumber, setIdnumber] = useState("");
  const [pancardno, setPancardno] = useState("");
  const [runnerphoto, setRunnerphoto] = useState("");

  const [APIData, setAPIData] = useState([]);
  

 

  const updateAPIData =event => {
    setOpen(false);

    event.preventDefault();
    axios
      .put(`http://localhost:3000/users/${id}`, {
       
        name,
        lastName,
        phone_number,
        email,
        age,
        dob,
        gender,
        education,
        latlong_address,
        state,
        district,
        tehsil,
        village,
        location,
        beneficiaryname,
        accountno,
        ifsc,
        idproofPhoto,
        passbook,
        pancard,
        idnumber,
        pancardno,
        runnerphoto,
        // lastName,
      })
      .then(() => {
        GetRunner();
       // history.push('/Tables')
      });
  };
  
const GetRunner=()=>{
   axios.get(`http://localhost:8001/users`).then((response) => {
      setAPIData(response.data);
     
    });
}


//Runner({name,email,phone_number,latlong_address})
  useEffect(() => {
    GetRunner();
  }, []);
//session token
  // const session_token = sessionStorage.getItem('session_token')
  // if (!session_token) {
  //   return <Navigate to='/' />
  // }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              {/* <div style={{ height: 500, width: '100%' }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={20}
                      rowsPerPageOptions={[20]}
                      checkboxSelection
                    />
                  </div>  */}
              <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                  rows={APIData}
                  columns={columns}
                  pageSize={20}
                 // checkboxSelection
                  disableSelectionOnClick
                />
              </div>
            </Card>
          </Grid>
        </Grid>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              
              <Typography sx={{ ml: 2, flex: 1,fontSize:20 ,color:'#2196f3'}} variant="h6" component="div">
                    {id}
              </Typography>

              <Button    type='submit' onClick={updateAPIData}>Submit</Button>
            </Toolbar>
          </AppBar>

          {/*--tabkle form data update-*/}

          <Box
            sx={{
              "& .MuiTextField-root": { m: 2, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
         
                
                  <TextField
                    required
                    id="outlined-required"
                    label="First Name "
                    value={name}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Last Name "
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <TextField
                    id="outlined-disabled"
                    label="Number(Prefilled from Sign In)"
                    value={phone_number}
                    onChange={(e) => setNumber_user(e.target.value)}
                  />{" "}
                  <TextField
                    id="outlined-password-input"
                    label="Email(Prefilled from Sign In)"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    id="outlined-read-only-input"
                    label="Age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <TextField
                    id="outlined-number"
                    label="DOB"
                    type="text"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}

                  />
                  <TextField
                    id="outlined-helperText"
                    label="Gender"
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}

                  /><br/>
                  <>
                    <TextField
                      required
                      id="filled-required"
                      label="Education"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}

                    />
                    <TextField
                      
                    
                      label="Address"
                      
                      value={latlong_address}
                      onChange={(e) => setAddress(e.target.value)}

                    />
                    <TextField
                    
                      label="State"
                      
                      value={state}
                      onChange={(e) => setState(e.target.value)}

                    />
                    <TextField
                      id="filled-read-only-input"
                      label="District"
                      value={district}
                      
                      onChange={(e) => setDistrict(e.target.value)}

                    />
                    <TextField
                      id="filled-number"
                      label="Tehsil"
                      type="text"
                      value={tehsil}
                      onChange={(e) => setTehsil(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      
                    />
                    <TextField
                      id="filled-search"
                      label="Village"
                      type="search"
                      
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}

                    />
                    <TextField
                      id="filled-helperText"
                      label="GPS Location"
                      helperText="Some important text"
                      
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}

                    />
                  </>
                  <h3>Bank Details</h3>
                  <TextField
                    required
                    id="standard-required"
                    label="Beneficiary Name"
                   
                    value={beneficiaryname}
                    onChange={(e) => setBeneficiaryname(e.target.value)}

                  />
                  <TextField
                    id="standard-disabled"
                    label="Bank Account no."
                   
                    value={accountno}
                    onChange={(e) => setAccountno(e.target.value)}

                  />
                  <TextField
                    id="standard-disabled"
                    label="ifsc Code  "
                    type="text"
                   
                    value={ifsc}
                    onChange={(e) => setifsc(e.target.value)}

                  />
                  <h3>Documents</h3>
                  <TextField
                    id="standard-number"
                    label="Any ID Proof Photo(Aadhar/Voter ID) "
                    type="text"
                    value={idproofPhoto}
                    onChange={(e) => setIdproofPhoto(e.target.value)}

                    InputLabelProps={{
                      shrink: true,
                    }}
                   
                  />
                  <TextField
                    id="standard-search"
                    label="Bank Passbook Photo"
                    type="search"
                   
                    value={passbook}
                    onChange={(e) => setPassbook(e.target.value)}

                  />
                  <TextField
                    id="standard-helperText"
                    label="Pan Card Photo"
                    defaultValue="Default Value"
                    helperText="Some important text"
                   
                    value={pancard}
                    onChange={(e) => setPancard(e.target.value)}

                  />
                  <TextField
                    id="standard-helperText"
                    label="ID number"
                    defaultValue="Default Value"
                    helperText="Some important text"
                   
                    value={idnumber}
                    onChange={(e) => setIdnumber(e.target.value)}

                  />
                  <TextField
                    id="standard-helperText"
                    label="Pan Card No"
                   
                    helperText="Some important text"
                   
                    value={pancardno}
                    onChange={(e) => setPancardno(e.target.value)}

                  />
                  <TextField
                    id="standard-helperText"
                    label="Runner's Photo "
                    defaultValue="Default Value"
                    helperText="Some important text"
                   
                    value={runnerphoto}
                    onChange={(e) => setRunnerphoto(e.target.value)}

                  />
                 
                  <UploadImages/>
                {/* <Button  variant="contained" type='submit' onClick={updateAPIData}>submit</Button> */}
                 
              

            <div></div>
          </Box>
        </Dialog>
       
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

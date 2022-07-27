import Modal from "@mui/material/Modal";

import { useHistory } from "react-router";
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
import { Navigate } from "react-router-dom";

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 50,

// };
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Tables(props) {
  const [runnerdata, setrunnerdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [imgopens, setimgOpen] = React.useState([]);
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
            .filter(function (c) {
              return c.field !== "__check__" && !!c;
            })
            .forEach(function (c) {
              return (thisRow[c.field] = params.getValue(params.id, c.field));
            });
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

          return console.log(id);
          //<div className='hello'>{alert(JSON.stringify(thisRow, null, 4))}</div>;
        };

        return <Button onClick={handleClickOpen}>Click</Button>;
      },
    },
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "Name", width: 130 },
    {
      field: "lastName",
      headerName: "Last Name ",
      width: 130,
    },
    {
      field: "number_user",
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
      type: "string",
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
      type: "string",
      width: 130,
    },
    {
      field: "education",
      headerName: "Education",
      type: "string",
      width: 130,
    },
    {
      field: "address",
      headerName: "Address",
      type: "string",
      width: 130,
    },
    {
      field: "state",
      headerName: "State",
      type: "string",
      width: 130,
    },
    {
      field: "district",
      headerName: "District",
      type: "string",
      width: 130,
    },
    {
      field: "tehsil",
      headerName: "Tehsil",
      type: "string",
      width: 130,
    },
    {
      field: "village",
      headerName: "Village",
      type: "string",
      width: 130,
    },
    {
      field: "location",
      headerName: "GPS Location",
      type: "string",
      width: 130,
    },

    //bank deatail
    {
      field: "beneficiaryname",
      headerName: "Beneficiary Name",
      type: "string",
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
      type: "string",
      width: 150,
    },

    //Documents
    {
      field: "idproofPhoto",
      headerName: "ID Proof Photo",
      type: "string",
      width: 150,
    },
    {
      field: "passbook",
      headerName: "Bank Passbook Photo",
      type: "string",
      width: 150,
    },
    {
      field: "pancard",
      headerName: "Pan Card Photo",
      type: "string",
      width: 150,
    },
    {
      field: "idnumber",
      headerName: "ID Proof Photo",
      type: "string",
      width: 150,
    },

    {
      field: "pancardno",
      headerName: "Pan Card No",
      type: "string",
      width: 150,
    },

    {
      field: "runnerphoto",
      headerName: "runnerphoto",
      type: "string",
      width: 150,
      renderCell: function (params) {
        setRunnerphoto(params.row.runnerphoto);
        return <img src={runnerphoto} />;
      },
    },
  ];

  //runner set data
  const [id, setID] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number_user, setNumber_user] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [tehsil, setTehsil] = useState("");
  const [village, setVillage] = useState("");
  const [location, setLocation] = useState("");
  const [beneficiaryname, setBeneficiaryname] = useState("");
  const [accountno, setAccountno] = useState("");
  const [ifsc, setifsc] = useState("");
  const token = localStorage.getItem("token");
  const [pageSize, setPageSize] = useState(10)
  const [idproofPhoto, setIdproofPhoto] = useState("");
  const [passbook, setPassbook] = useState(null);
  const [pancard, setPancard] = useState("");
  const [idnumber, setIdnumber] = useState("");
  const [pancardno, setPancardno] = useState("");
  const [runnerphoto, setRunnerphoto] = useState("");

  const [APIData, setAPIData] = useState([]);

  const changeHandler = (event) => {
    setPassbook(event.target.files[0]);
    //setIsSelected(true);
  };
  const bank_passbook_photo = passbook;
  const acct_holder_name = accountno;
  let form_data = new FormData();
  form_data.append("bank_passbook_photo", bank_passbook_photo);
  form_data.append("acct_holder_name", acct_holder_name);
  
  const updateAPIData = (event) => {
    setOpen(false);
    // console.log(bank_passbook_photo);
    event.preventDefault();
    axios
      .post(
        `http://localhost:8001/users/bankDetails/8878031674`,
        form_data, 
        {
          headers: {
            Authorization: "Bearer " + token,
            "content-type": "multipart/form-data",
          },
        }

        // firstName,
        // lastName,
        // number_user,
        // email,
        // age,
        // dob,
        // gender,
        // education,
        // address,
        // state,
        // district,
        // tehsil,
        // village,
        // location,
        // beneficiaryname,
        // accountno,
        // ifsc,
        // idproofPhoto,
        // passbook,
        // pancard,
        // idnumber,
        // pancardno,
        // runnerphoto,
        // lastName,
      )
      .then((response) => {
        console.log(response);
        // GetRunner();
        // history.push('/Tables')
      })
      .catch((err) => console.log(err));
  };

  const GetRunner = () => {
    axios.get(`http://localhost:3000/user`).then((response) => {
      setAPIData(response.data);
      // console.log(response.data[0])
    });
  };

  useEffect(() => {
    GetRunner();
  }, []);
  //session token

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                  rows={APIData}
                  columns={columns}
                  pageSize={pageSize}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20, 50]}
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

              <Typography
                sx={{ ml: 2, flex: 1, fontSize: 20, color: "#2196f3" }}
                variant="h6"
                component="div"
              >
                {id}
              </Typography>

              <Button type="submit" onClick={updateAPIData}>
                Submit
              </Button>
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
              value={firstName}
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
              value={number_user}
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
            />
            <br />
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
                value={address}
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
              id="standard-helperText"
              label="ID number"
              // defaultValue="Default Value"
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
            {/* images upload */}
            <TextField
              // label="runner photos"

              name="upload-photo"
              type="file"
              helperText="runner photos"
              onChange={(e) => setRunnerphoto(e.target.value)}
            />
            <TextField
              type="file"
              helperText="Pancard Photos"
              onChange={(e) => setPancard(e.target.value)}
            />
            <TextField
              type="file"
              accept="image/png, image/jpeg"
              helperText="passbook Photos"
              onChange={changeHandler}
            />
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="The house from the offer."
              src={passbook}
            />
            <TextField
              helperText="Any ID Proof Photo(Aadhar/Voter ID) "
              type="file"
              onChange={(e) => setIdproofPhoto(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* <UploadImages runnerphoto={runnerphoto}  id ={id} ravi = {APIData[0]}/> */}
            <div></div>
          </Box>
        </Dialog>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

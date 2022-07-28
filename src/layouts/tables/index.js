import UserRepository from "api/UsersRepository";
import Modal from "@mui/material/Modal";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useHistory } from "react-router";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
// @mui material components
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
//import React, { useState ,useEffect} from "react";
import axios from "axios";
//  React components
import MDBox from "components/MDBox";
import Button from "@mui/material/Button";

import MDTypography from "components/MDTypography";
import DeleteIcon from "@mui/icons-material/Delete";
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
import borders from "assets/theme-dark/base/borders";
//import IconButton from '@mui/material/IconButton';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { textTransform } from "@mui/system";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "35%",
  transform: "translate(-50%, -50%)",
  width: 50,
};
export default function Tables(props) {
  const [loading, setLoading] = React.useState(true);
  const handleClickLoading = () => {
    setLoading((prevLoading) => !prevLoading);
  };
  const [runnerdata, setrunnerdata] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [pageSize, setPageSize] = useState(10);

  const [imgopen, setimgOpen] = useState(false);
  const imageshandleOpen = () => setimgOpen(true);
  const imageshandleClose = () => setimgOpen(false);

  const [imgpassopen, setimgpassOpen] = useState(false);
  const imagespasshandleOpen = () => setimgpassOpen(true);
  const imagespasshandleClose = () => setimgpassOpen(false);

  const [imgpancardopen, setimgpancardOpen] = useState(false);
  const imagespancardhandleOpen = () => setimgpancardOpen(true);
  const imagespancardhandleClose = () => setimgpancardOpen(false);

  const [otheropen, setotherOpen] = useState(false);
  const otherhandleOpen = () => setotherOpen(true);
  const otherhandleClose = () => setotherOpen(false);

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
          setFirstName(params.row.name);
          setEmail(params.row.email);
          setAddress(params.row.latlong_address);
          setphone_number(params.row.phone_number);

          setBeneficiaryname(params.row.acct_holder_name);
          setBankName(params.row.bank_name);
          setAccountno(params.row.bank_acct_no);
          setbank_ifsc_code(params.row.bank_ifsc_code);

          setbank_passbook_photo(params.row.bank_passbook_photo);
          setPancardno(params.row.pancard_no);
          setother_id_proof_no(params.row.other_id_proof_no);
          setPancardno(params.row.pancard_no);
          setState(params.row.runner_state);
          setDistrict(params.row.runner_district);
          setTehsil(params.row.runner_taluka);
          setVillage(params.row.runner_village);

          setprofileImage(params.row.profileImage);
          setPancardImages(params.row.pancard_image);
          setother_Id_proof_image(params.row.other_Id_proof_image);
          // console.log(params.row.profileImage)

          setOpen(true);

          return console.log(id);
          //<div className='hello'>{alert(JSON.stringify(thisRow, null, 4))}</div>;
        };

        return (
          <Button
            style={{ color: "black", backgroundColor: "#33A2B5" }}
            onClick={handleClickOpen}
          >
            Edit
          </Button>
        );
      },
    },
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    // {
    //   field: "lastName",
    //   headerName: "Last Name ",
    //   width: 130,
    // },
    {
      field: "email",
      headerName: "Email(Prefilled from Sign In)",
      type: "text",
      width: 130,
    },
    {
      field: "phone_number",
      headerName: "Number(Prefilled from Sign In)  ",
      type: "number",
      width: 90,
    },
    {
      field: "latlong_address",
      headerName: "Address",
      type: "text",
      width: 130,
    },
    {
      field: "acct_holder_name",
      headerName: "acct_holder_name",
      type: "text",
      width: 90,
    },

    {
      field: "bank_name",
      headerName: "bank_name",
      type: "text",
      width: 130,
    },
    {
      field: "bank_ifsc_code",
      headerName: "Gender",
      type: "text",
      width: 130,
    },
    {
      field: "pancard_no",
      headerName: "Education",
      type: "text",
      width: 130,
    },

    {
      field: "other_id_proof_no",
      headerName: "other_id_proof_no",
      type: "text",
      width: 130,
    },
    {
      field: "runner_state",
      headerName: "runner_state",
      type: "text",
      width: 130,
    },
    {
      field: "runner_district",
      headerName: "runner_district",
      type: "text",
      width: 130,
    },
    {
      field: "runner_taluka",
      headerName: "runner_taluka",
      type: "text",
      width: 130,
    },
    {
      field: "runner_village",
      headerName: "runner_village",
      type: "text",
      width: 130,
    },
  ];

  //runner set data
  const [id, setID] = useState(null);
  const [name, setFirstName] = useState("");

  const [phone_number, setphone_number] = useState("");

  const [Email, setEmail] = useState("");

  const [latlong_address, setAddress] = useState("");
  const [runner_state, setState] = useState("");
  const [runner_district, setDistrict] = useState("");
  const [runner_taluka, setTehsil] = useState("");
  const [runner_village, setVillage] = useState("");
  const [acct_holder_name, setBeneficiaryname] = useState("");
  const [bank_acct_no, setAccountno] = useState("");
  const [bank_ifsc_code, setbank_ifsc_code] = useState("");
  const token = localStorage.getItem("token");

  const [other_Id_proof_image, setother_Id_proof_image] = useState("");

  const [pancard_image, setPancardImages] = useState("");
  const [other_id_proof_no, setother_id_proof_no] = useState("");
  const [pancard_no, setPancardno] = useState("");
  const [bank_name, setBankName] = useState("");
  const [profileImage, setprofileImage] = useState(null);
  const [APIData, setAPIData] = useState([]);

  const [bank_passbook_photo, setbank_passbook_photo] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  //get api

  const GetRunner = () => {
    axios
      .get(`http://localhost:8001/users/12730`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setAPIData(response.data.data);
        setTableLoading(false);
        console.log(response.data);
      });
  };

  useEffect(() => {
    setTableLoading(true);
    GetRunner();
  }, []);

  const updateAPIData = (event) => {
    setOpen(false);
    console.log("ohter", other_Id_proof_image);
    // console.log(profileImage);
    event.preventDefault();
    axios
      .put(
        `http://localhost:8001/users/profile/${id}`,
        {
          name,
          acct_holder_name,
          bank_name,
          acct_holder_name,
          bank_acct_no,
          bank_ifsc_code,
          other_id_proof_no,
          pancard_no,
          phone_number,
          latlong_address,
          runner_state,
          runner_district,
          runner_taluka,
          runner_village,
          profileImage,
          bank_passbook_photo,
          pancard_image,
          other_Id_proof_image,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "content-type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);

        GetRunner();
      })
      .catch((err) => console.log(err));
  };

  let file;
  let form_data = new FormData();

  const handleProfileImage = (event) => {
    file = event.target.files[0];
    form_data.append("file", file);
    UserRepository.UploadImageFile(id, form_data)
      .then((response) => {
        console.log(response.data);
        setprofileImage(response.data.data.fileUrl);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlePancardImages = (event) => {
    file = event.target.files[0];
    form_data.append("file", file);
    UserRepository.UploadImageFile(id, form_data)
      .then((response) => {
        console.log(response.data);
        setPancardImages(response.data.data.fileUrl);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleBank_passbook_photo = (event) => {
    file = event.target.files[0];
    form_data.append("file", file);
    UserRepository.UploadImageFile(id, form_data)
      .then((response) => {
        console.log(response.data);
        setbank_passbook_photo(response.data.data.fileUrl);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handelother_Id_proof_image = (event) => {
    file = event.target.files[0];
    form_data.append("file", file);
    UserRepository.UploadImageFile(id, form_data)
      .then((response) => {
        console.log(response.data);
        setother_Id_proof_image(response.data.data.fileUrl);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <div style={{ height: 550, width: "100%" }}>
                <DataGrid
                  sx={{
                    boxShadow: 2,
                    border: 2,
                    borderColor: "#33A2B5",
                    "& .MuiDataGrid-cell:hover": {
                      color: "#33A2B5",
                    },
                  }}
                  rows={APIData}
                  columns={columns}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[5, 10, 20, 50, 100]}
                  // checkboxSelection
                  loading={tableLoading}
                  disableSelectionOnClick
                />
              </div>
            </Card>
          </Grid>
        </Grid>
        <Dialog
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
                sx={{
                  ml: 2,
                  flex: 1,
                  fontSize: 20,
                  color: "#33A2B5",
                  textTransform: "capitalize",
                }}
                variant="h6"
                component="div"
              >
                {name}
              </Typography>

              <Box
                component="img"
                sx={{
                  height: 120,
                  width: 120,
                  borderRadius: "50%",
                  //ml: 3,
                  m: 2,
                }}
                onClick={imageshandleOpen}
                alt="The upload image."
                src={profileImage}
                display="flex"
                // / src={URL.createObjectURL(profileImage)}
              />

              <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton
                  style={{
                    marginTop: "60px",
                    marginLeft: "-50px",
                    fontSize: "20px",
                    color: "white",
                    backgroundColor: "#33A2B5",
                  }}
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleProfileImage}
                  />
                  <PhotoCamera />
                </IconButton>
              </Stack>

              <Modal
                open={imgopen}
                onClose={imageshandleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <img src={profileImage} width="500px" height="500px" />
                </Box>
              </Modal>
            </Toolbar>
          </AppBar>

          {/*--tabkle form data update-*/}

          <Box
            sx={{
              "& .MuiTextField-root": { mx: 3, my: 2, width: "20ch" },
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
              id="outlined-required"
              disabled
              label="Email(Prefilled from Sign In)"
              type="mail"
              value={Email}
              onChange={(e) => setEmail(e.target.vaue)}
            />

            <TextField
              label="Address"
              value={latlong_address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              id="outlined-disabled"
              label="Number(Prefilled from Sign In)"
              value={phone_number}
              onChange={(e) => setphone_number(e.target.value)}
            />
            <TextField
              label="State"
              value={runner_state}
              onChange={(e) => setState(e.target.value)}
            />
            <TextField
              id="filled-read-only-input"
              label="District"
              value={runner_district}
              onChange={(e) => setDistrict(e.target.value)}
            />
            <TextField
              id="filled-number"
              label="Tehsil"
              type="text"
              value={runner_taluka}
              onChange={(e) => setTehsil(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="filled-search"
              label="Village"
              type="text"
              value={runner_village}
              onChange={(e) => setVillage(e.target.value)}
            />

            <br />

            <h3 style={{ color: "#33A2B5", marginLeft: "25px" }}>
              Bank Details
            </h3>
            <TextField
              required
              id="standard-required"
              label="Beneficiary Name"
              value={acct_holder_name}
              onChange={(e) => setBeneficiaryname(e.target.value)}
            />

            <TextField
              required
              id="standard-required"
              label="Bank Name"
              value={bank_name}
              onChange={(e) => setBankName(e.target.value)}
            />

            {/* bank_passbook_photo */}
            <div style={{}}>
              <Box
                component="img"
                sx={{
                  height: 100,
                  width: 219,
                  ml: 3.5,
                  mt: 2.5,
                  display: "inline",
                  borderRadius: "10px",
                  boxShadow: 1,
                }}
                onClick={imagespasshandleOpen}
                alt="The upload image."
                src={bank_passbook_photo}
                display="flex"
                // / src={URL.createObjectURL(profileImage)}
              />
              <div style={{ float: "right" }}>
                <TextField
                  id="standard-disabled"
                  label="Bank Account no."
                  value={bank_acct_no}
                  onChange={(e) => setAccountno(e.target.value)}
                />
                <br />

                <TextField
                  id="standard-disabled"
                  label="ifsc Code  "
                  type="text"
                  value={bank_ifsc_code}
                  onChange={(e) => setbank_ifsc_code(e.target.value)}
                />
              </div>

              <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton
                  style={{
                    marginTop: "-110px",
                    marginLeft: "228px",
                    fontSize: "20px",
                    color: "white",
                    backgroundColor: "#33A2B5",
                  }}
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input //passbook image
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleBank_passbook_photo}
                  />
                  <FileUploadIcon />
                </IconButton>
              </Stack>
              <span
                style={{
                  fontSize: "12px",
                  marginLeft: "80px",
                  color: "hwb(0deg 0% 100% / 60%)",
                }}
              >
                bank passbook Image
              </span>
            </div>
            <div style={{ position: "relative", left: "8px" }}></div>

            <Modal
              open={imgpassopen}
              onClose={imagespasshandleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <img src={bank_passbook_photo} width="500px" height="500px" />
              </Box>
            </Modal>

            {/* pancard image  */}

            <div style={{}}>
              <Box
                component="img"
                sx={{
                  height: 100,
                  width: 219,
                  ml: 3.5,
                  mt: 2.5,
                  display: "inline",
                  borderRadius: "10px",
                  boxShadow: 1,
                }}
                onClick={imagespancardhandleOpen}
                alt="The upload image."
                src={pancard_image}
                display="flex"
                // / src={URL.createObjectURL(profileImage)}
              />
              <div style={{ float: "right" }}>
                <TextField
                  id="standard-disabled"
                  label="Pan card no."
                  value={pancard_no}
                  onChange={(e) => setPancardno(e.target.value)}
                />
              </div>

              <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton
                  style={{
                    marginTop: "-110px",
                    marginLeft: "228px",
                    fontSize: "20px",
                    color: "white",
                    backgroundColor: "#33A2B5",
                  }}
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input //passbook image
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handlePancardImages}
                  />
                  <FileUploadIcon />
                </IconButton>
              </Stack>
              <span
                style={{
                  fontSize: "12px",
                  marginLeft: "80px",
                  color: "hwb(0deg 0% 100% / 60%)",
                }}
              >
                Pancard Photo
              </span>
            </div>
            <Modal
              open={imgpancardopen}
              onClose={imagespancardhandleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <img src={pancard_image} width="500px" height="500px" />
              </Box>
            </Modal>

            {/* pancard images */}
            {/* 
  <div sx={{display: 'inline' }}>
            <Box
              component="img"
              sx={{
                height: 100,
                width: 219,
                ml: 3.5,
                mt:2.5,
                display:'inline',
                borderRadius :'10px',boxShadow: 1

              }}
              onClick={imagespancardhandleOpen}
              alt="The upload image."
              src={pancard_image}
              display="inline"
            />  
             <TextField
             style={{position:'relative',
             left:'25px'}}
            id="standard-helperText"
            label="Pan Card No"
            helperText="Some important text"
            value={pancard_no}
            onChange={(e) => setPancardno(e.target.value)}
          />
            
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton
                style={{
                 position:'relative',
                left:0,
                right:0,
                fontSize: "20px",
                color: "white",
                backgroundColor: "#33A2B5",
                }}
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input //pancard image
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handlePancardImages}
                />
                <PhotoCamera />
              </IconButton>
            </Stack>
             */}

            <div style={{}}>
              <Box
                component="img"
                sx={{
                  height: 100,
                  width: 219,
                  ml: 3.5,
                  mt: 2.5,
                  display: "inline",
                  borderRadius: "10px",
                  boxShadow: 1,
                }}
                onClick={otherhandleOpen}
                alt="The upload image."
                src={other_Id_proof_image}
                display="flex"
                // / src={URL.createObjectURL(profileImage)}
              />
              <div style={{ float: "right" }}>
                <TextField
                  id="standard-helperText"
                  label="other_id_proof_no"
                  value={other_id_proof_no}
                  onChange={(e) => setother_id_proof_no(e.target.value)}
                />
              </div>

              <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton
                  style={{
                    marginTop: "-110px",
                    marginLeft: "228px",
                    fontSize: "20px",
                    color: "white",
                    backgroundColor: "#33A2B5",
                  }}
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input //passbook image
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handelother_Id_proof_image}
                  />
                  <FileUploadIcon />
                </IconButton>
              </Stack>
              <span
                style={{
                  fontSize: "12px",
                  marginLeft: "40px",
                  color: "hwb(0deg 0% 100% / 60%)",
                }}
              >
                Any ID Proof Photo(Aadhar/Voter ID)
              </span>
            </div>

            {/* Any ID Proof Photo(Aadhar/Voter ID)
            <Box
              component="img"
              sx={{
               height: 100,
                width: 219,
                ml: 3.5,
                mt:2.5,
                display:'inline',
                borderRadius :'10px',boxShadow: 1
               
              }}
              onClick={otherhandleOpen}
              alt="The upload image."
              src={other_Id_proof_image}
             
              // / src={URL.createObjectURL(profileImage)}
            />  
          
            <span style={{ fontSize: "12px", marginLeft: "40px", color:'hwb(0deg 0% 100% / 60%)'}}>
              Any ID Proof Photo(Aadhar/Voter ID)
            </span>

           
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton
                style={{
                 marginTop: "-110px",
                marginLeft: "228px",
                fontSize: "20px",
                color: "white",
                backgroundColor: "#33A2B5",
                }}
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  // helperText="Any ID Proof Photo(Aadhar/Voter ID) "
                  type="file"
                  onChange={handelother_Id_proof_image}
                  accept="image/*"
                />
                <PhotoCamera />
              </IconButton>
            </Stack>

 */}

            <Modal
              open={otheropen}
              onClose={otherhandleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <img src={other_Id_proof_image} width="500px" height="500px" />
              </Box>
            </Modal>

            <Button
              sx={{
                color: "#f0f2f5",
                backgroundColor: "#33A2B5",
                "&:hover": { backgroundColor: "#2A90A2" },
                float: "right",
                margin: 2,
              }}
              type="submit"
              onClick={updateAPIData}
            >
              submit
            </Button>
            {/* <TextField
              type="file"
              accept="image/png, image/jpeg"
              helperText="bank_passbook_photo"
              onChange={(e) => setbank_passbook_photo(e.target.files[0])}
            /> */}
            {/* <TextField
              type="file"
              helperText="Pancard Photos"
              onChange={(e) => setPancard(e.target.files[0])}
            /> */}

            {/* <TextField
              type="file"
              accept="image/png, image/jpeg"
              helperText="profileImage"
             // value={profileImage}
              onChange={(e) => setprofileImage(e.target.files[0])} 
              
            />  */}
          </Box>
        </Dialog>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

import * as React from "react";
import UserRepository from "api/UsersRepository";
import AdminRepository from "api/AdminRepository";
import Cookies from "js-cookie";
import Modal from "@mui/material/Modal";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import useUsers from "../../hooks/useUsers";
import FileUploadIcon from "@mui/icons-material/FileUpload";
// import { useHistory } from "react-router";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridActionsCellItem,
} from "@mui/x-data-grid";
// @mui material components
import EditIcon from "@mui/icons-material/Edit";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
//import React, { useState ,useEffect} from "react";

//  React components
import MDBox from "components/MDBox";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
// import MDTypography from "components/MDTypography";
// import DeleteIcon from "@mui/icons-material/Delete";
//  React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

// import ListItemText from "@mui/material/ListItemText";
// import ListItem from "@mui/material/ListItem";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// import UploadImages from "./upload_image";
// import { Navigate } from "react-router-dom";
// import borders from "assets/theme-dark/base/borders";
//import IconButton from '@mui/material/IconButton';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
// import { textTransform } from "@mui/system";
import "../AddUsers/style.css";
// import nophoto from "assets/images/no-image-available.png";
// import profile from "assets/images/profile.png";
// import Switch from "@mui/material/Switch";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 50,
};
function Tables() {
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport
          csvOptions={{
            fields: [
              "isUserActiveOrNot",
              "name",
              "email",
              "phone_number",
              "age",
              "dob",
              "gender",
              "education",
              "latlong_address",
              "latlong",
              "last_active",
              "created_at",
              "App_version",
              "acct_holder_name",
              "bank_name",
              "bank_acct_no",
              "bank_ifsc_code",
              "pancard_no",
              "other_id_proof_no",
              "runner_state",
              "runner_district",
              "runner_taluka",
              "runner_village",
              "isUserDisabled",
              "reason",
              "updated_by",
              "updated_at",
            ],
            fileName: "runnersData",
          }}
        />
        <GridToolbarQuickFilter
          style={{ position: "absolute", right: "1%", maxWidth: "150px" }}
        />
      </GridToolbarContainer>
    );
  }
  const {
    ChangeRunnerDisable,
    GetAllRunner,
    UpdateRunners,
    EnableDisablePartnerAppProfileUpdation,
  } = useUsers();
  const [loading, setLoading] = React.useState(true);
  const handleClickLoading = () => {
    setLoading((prevLoading) => !prevLoading);
  };
  const [runnerdata, setrunnerdata] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [pageSize, setPageSize] = useState(50);

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
  const [isUserActiveOrNot, setisUserActiveOrNot] = useState("y");
  const [selectvalue, setSelectvalue] = useState("y");
  const [reason, setReason] = useState(null);

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

  const [other_Id_proof_image, setother_Id_proof_image] = useState(null);

  const [pancard_image, setPancardImages] = useState(null);
  const [other_id_proof_no, setother_id_proof_no] = useState("");
  const [pancard_no, setPancardno] = useState("");
  const [age, setage] = useState("");
  const [address, setaddress] = useState("");
  const [education, seteducation] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setdob] = useState("");

  const [bank_name, setBankName] = useState("");
  const [profileImage, setprofileImage] = useState(null);
  const [APIData, setAPIData] = useState([]);

  const [bank_passbook_photo, setbank_passbook_photo] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  //get api
  const roleId = localStorage.getItem("roleId");
  // const  = localStorage.getItem("user_email");
  const [disabled, setDisabled] = useState(roleId == 1 ? true : false);

  const GetRunner = () => {
    setTableLoading(true);
    var GetAllRunners = GetAllRunner();
    GetAllRunners.then((response) => {
      if (response.status === 200) {
        setTableLoading(false);
        setAPIData(response.data.data);
        // console.log(response.data);
      }
    }).catch((error) => {
      console.log(error);
    });
    AdminRepository.checkUserActive()
      .then((res) => {
        if (res.data.data.is_active === "N") {
          window.location.href = "/";
          localStorage.clear();
          Cookies.remove("token");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetRunner();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const [allopen, setAllOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState("md");
  const handleAllOpen = () => {
    setAllOpen(true);
  };

  const sumbitRunnerDisable = () => {
    const admin_email = localStorage.getItem("user_email");

    const disabledData = {
      isUserDisabled: selectvalue,
      reason: reason,
      admin_email: admin_email,
    };
    // console.log(disabledData);
    var updateDisableStatus = ChangeRunnerDisable(id, disabledData);
    updateDisableStatus
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          GetRunner();
          setAllOpen(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = [
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      type: "actions",
      width: 70,
      renderCell: function (params) {
        var handleClickOpen = function (e) {
          e.stopPropagation(); // don't select this row after clicking
          setID(params.id);
          setFirstName(params.row.name);
          setEmail(params.row.email);
          setAddress(params.row.latlong_address);
          setphone_number(params.row.phone_number);

          setBeneficiaryname(params.row.acct_holder_name);
          setBankName(params.row.bank_name);
          setAccountno(params.row.bank_acct_no);
          setbank_ifsc_code(params.row.bank_ifsc_code);

          // setbank_passbook_photo(params.row.bank_passbook_photo);
          setPancardno(params.row.pancard_no);
          setother_id_proof_no(params.row.other_id_proof_no);
          setPancardno(params.row.pancard_no);
          setState(params.row.runner_state);
          setDistrict(params.row.runner_district);
          setTehsil(params.row.runner_taluka);
          setVillage(params.row.runner_village);
          setdob(params.row.dob);
          setage(params.row.age);
          setaddress(params.row.address);
          seteducation(params.row.education);
          setgender(params.row.gender);
          //pancard
          if (params.row.bank_passbook_photo == null) {
            setbank_passbook_photo(
              "https://storage.googleapis.com/android-mapping-backend.appspot.com/1660380245756.png"
            );
          } else {
            setbank_passbook_photo(params.row.bank_passbook_photo);
          }
          //pro

          if (params.row.profileImage == null) {
            setprofileImage(
              "https://storage.googleapis.com/android-mapping-backend.appspot.com/1660380297203.png"
            );
          } else {
            setprofileImage(params.row.profileImage);
          }
          //pancard
          if (params.row.pancard_image == null) {
            setPancardImages(
              "https://storage.googleapis.com/android-mapping-backend.appspot.com/1660380245756.png"
            );
          } else {
            setPancardImages(params.row.pancard_image);
          }
          //pancard
          if (params.row.other_Id_proof_image == null) {
            setother_Id_proof_image(
              "https://storage.googleapis.com/android-mapping-backend.appspot.com/1660380245756.png"
            );
          } else {
            setother_Id_proof_image(params.row.other_Id_proof_image);
          }

          setOpen(true);

          return;
          // console.log(id);
          //<div className='hello'>{alert(JSON.stringify(thisRow, null, 4))}</div>;
        };
        return (
          <GridActionsCellItem
            disabled={disabled}
            style={{ color: disabled ? "grey" : "#1c68eb" }}
            icon={<EditIcon />}
            label="Edit"
            onClick={handleClickOpen}
          />
        );
      },
    },
    { field: "name", headerName: "Name", width: 130, type: "string" },

    {
      field: "email",
      headerName: "Email",
      type: "string",
      width: 130,
    },
    {
      field: "phone_number",
      headerName: "Number  ",
      type: "string",
      width: 120,
    },
    {
      field: "age",
      headerName: "Age",
      type: "string",
      width: 50,
    },
    {
      field: "dob",
      headerName: "DOB",
      type: "string",
      width: 110,
    },
    {
      field: "gender",
      headerName: "Gender",
      type: "string",
      width: 70,
    },
    {
      field: "education",
      headerName: "Education",
      type: "string",
      width: 120,
    },

    {
      field: "latlong_address",
      headerName: "GPS address",
      type: "string",
      width: 130,
    },
    {
      field: "latlong",
      headerName: "GPS",
      type: "string",
      width: 200,
    },
    {
      field: "last_active",
      headerName: "Last Active",
      type: "date",
      width: 180,
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleString() : "";
      },
    },
    {
      field: "created_at",
      headerName: "Created At",
      type: "date",
      width: 180,
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleString() : "";
      },
    },
    {
      field: "App_version",
      headerName: "App Version",
      type: "string",
      width: 120,
    },
    {
      field: "acct_holder_name",
      headerName: "Account Holder Name",
      type: "string",
      width: 130,
    },
    {
      field: "bank_name",
      headerName: "Bank Name",
      type: "string",
      width: 130,
    },
    {
      field: "bank_acct_no",
      headerName: "Account Number",
      type: "string",
      width: 130,
    },
    {
      field: "bank_ifsc_code",
      headerName: "IFSC Code",
      type: "string",
      width: 120,
    },
    {
      field: "is_crm_bank_details",
      headerName: "Is CRM Bank Details",
      type: "boolean",
      width: 100,
      valueFormatter: (params) => {
        return params.value == "Y" ? true : false;
      },
    },
    {
      field: "pancard_no",
      headerName: "Pancard Number",
      type: "string",
      width: 130,
    },

    {
      field: "other_id_proof_no",
      headerName: "Other ID Proof Number",
      type: "string",
      width: 130,
    },
    {
      field: "runner_state",
      headerName: "Runner State",
      type: "string",
      width: 130,
    },
    {
      field: "runner_district",
      headerName: "Runner District",
      type: "string",
      width: 130,
    },
    {
      field: "runner_taluka",
      headerName: "Runner Taluka",
      type: "string",
      width: 130,
    },
    {
      field: "runner_village",
      headerName: "Runner Village",
      type: "string",
      width: 130,
    },

    {
      field: "updated_by",
      headerName: "Updated By",
      type: "string",
      width: 160,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      type: "date",
      width: 180,
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleString() : "";
      },
    },
    {
      field: "is_profile_updatable",
      headerName: "Is Profile Updatable",
      width: 80,
      renderCell: (params) => {
        return (
          <input
            name="is_profile_updatable"
            disabled={disabled}
            type="checkbox"
            checked={params.row.is_profile_updatable === "Y" ? true : false}
            onChange={(e) => chnage(e, params.id)}
          />
        );
      },
    },
    {
      field: "is_bank_updatable",
      headerName: "Is Bank Detalis Updatable",
      width: 80,
      renderCell: (params) => {
        return (
          <input
            name="is_bank_updatable"
            disabled={disabled}
            type="checkbox"
            checked={params.row.is_bank_updatable === "Y" ? true : false}
            onChange={(e) => chnage(e, params.id)}
          />
        );
      },
    },
    {
      field: "is_village_updatable",
      headerName: "Is location Updatable",
      width: 80,
      renderCell: (params) => {
        return (
          <input
            name="is_village_updatable"
            disabled={disabled}
            type="checkbox"
            checked={params.row.is_village_updatable === "Y" ? true : false}
            onChange={(e) => chnage(e, params.id)}
          />
        );
      },
    },
    {
      field: "isUserDisabled",
      headerName: "Active Status",
      width: 120,
      renderCell: (params) => {
        return (
          <select
            style={{
              width: "70px",
              height: "30px",
              borderRadius: "5px",
              border: "1px solid #33A2B5",
              outline: "none",
            }}
            disabled={disabled}
            value={
              params.row.isUserDisabled === "n" ||
              params.row.isUserDisabled === null
                ? "n"
                : "y"
            }
            onChange={(e) => {
              setSelectvalue(e.target.value);
              setReason(params.row.reason);

              setID(params.row.id);
              handleAllOpen();
            }}
          >
            <option value={"n"}> Active</option>
            <option value={"y"}>Disabled</option>
          </select>
        );
      },
    },
    {
      field: "reason",
      headerName: "Reason",
      type: "string",
      width: 150,
    },
  ];
  const updated_by = localStorage.getItem("user_email");
  var data = {
    name: name,
    // acct_holder_name: acct_holder_name,
    bank_name: bank_name,
    acct_holder_name: acct_holder_name,
    bank_acct_no: bank_acct_no,
    bank_ifsc_code: bank_ifsc_code,
    other_id_proof_no: other_id_proof_no,
    pancard_no: pancard_no,
    phone_number: phone_number,
    latlong_address: latlong_address,
    runner_state: runner_state,
    runner_district: runner_district,
    runner_taluka: runner_taluka,
    runner_village: runner_village,
    profileImage: profileImage,
    bank_passbook_photo: bank_passbook_photo,
    pancard_image: pancard_image,
    other_Id_proof_image: other_Id_proof_image,
    dob: dob,
    gender: gender,
    education: education,
    address: address,
    age: age,
    updated_by: updated_by,
  };
  // const updateAPIData = (event) => {
  //   event.preventDefault();
  //   console.log(data);
  //   UserRepository.UpdateRunners(id, data)
  //   .then((response) => {
  //     console.log(response);
  //     GetRunner();
  //     setOpen(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const changeProfileUpdatable = (e, id) => {
    console.log(localStorage.getItem("user_email"));
    const data = {
      [e.target.name]: e.target.checked ? "Y" : "N",
      updated_by: localStorage.getItem("user_email"),
    };
    // console.log(data, id)
    var updateaOption = EnableDisablePartnerAppProfileUpdation(id, data);
    updateaOption
      .then((response) => {
        // console.log("response@@@", response)
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const updateState = (key, value, id) => {
    setAPIData((prevObjects) => {
      // Find the object with the matching id
      const objectToUpdate = prevObjects.find((object) => object.id === id);
      // Create a copy of the object with the updated key value
      const updatedObject = { ...objectToUpdate, [key]: value ? "Y" : "N" };
      // Create a new array with the updated object
      const updatedObjects = prevObjects.map((object) =>
        object.id === id ? updatedObject : object
      );
      return updatedObjects;
    });
  };

  const chnage = (e, id) => {
    changeProfileUpdatable(e, id);
    updateState(e.target.name, e.target.checked, id);
  };

  const updateAPIData = (event) => {
    event.preventDefault();
    var UpdateRunnr = UpdateRunners(id, data);
    UpdateRunnr.then((response) => {
      if (response.status === 200) {
        GetRunner();
        console.log(response);
        setOpen(false);
      }
    }).catch((e) => {
      console.log(e);
    });
  };

  let file;
  let form_data = new FormData();

  const handleProfileImage = (event) => {
    file = event.target.files[0];
    form_data.append("file", file);
    UserRepository.UploadImageFile(form_data)
      .then((response) => {
        // console.log(response.data);
        setprofileImage(response.data.data.fileUrl);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlePancardImages = (event) => {
    file = event.target.files[0];
    form_data.append("file", file);
    UserRepository.UploadImageFile(form_data)
      .then((response) => {
        // console.log(response.data);
        setPancardImages(response.data.data.fileUrl);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleBank_passbook_photo = (event) => {
    file = event.target.files[0];
    form_data.append("file", file);
    UserRepository.UploadImageFile(form_data)
      .then((response) => {
        // console.log(response.data);
        setbank_passbook_photo(response.data.data.fileUrl);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handelother_Id_proof_image = (event) => {
    file = event.target.files[0];
    form_data.append("file", file);
    UserRepository.UploadImageFile(form_data)
      .then((response) => {
        // console.log(response.data);
        setother_Id_proof_image(response.data.data.fileUrl);
        setTableLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={2}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <div style={{ height: 510, width: "100%" }}>
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
                  rowsPerPageOptions={[50, 100]}
                  loading={tableLoading}
                  // disableSelectionOnClick
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                  columnBuffer={2}
                  columnThreshold={2}
                />
              </div>
            </Card>
          </Grid>
        </Grid>
        <Dialog open={open} TransitionComponent={Transition} maxWidth={"xl"}>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                style={{ marginTop: "-80px" }}
              >
                <CloseIcon />
              </IconButton>

              <Typography
                sx={{
                  ml: -3.6,
                  flex: 1,
                  fontSize: 25,
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
                  overflow: "hidden",
                  //ml: 3,
                  m: 2,
                  border: "2px solid #0000005e",
                }}
                onClick={imageshandleOpen}
                alt="upload profile image"
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
                    // inputProps={{accept:".png, .jpeg, .jpg"}}
                    accept=".png, .jpeg, .jpg"
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
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Age"
              value={age}
              onChange={(e) => setage(e.target.value)}
            />
            <TextField
              label="Address"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
            <TextField
              label="Education "
              value={education}
              onChange={(e) => seteducation(e.target.value)}
            />
            <TextField
              label="Gender"
              value={gender}
              onChange={(e) => setgender(e.target.value)}
            />
            <TextField
              label="DOB "
              value={dob}
              onChange={(e) => setdob(e.target.value)}
            />
            <TextField
              label="GPS Address"
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
              id="filled-read-only-input"
              label="Tehsil"
              value={runner_taluka}
              onChange={(e) => setTehsil(e.target.value)}
            />
            {/* <TextField
              id="filled-number"
              label="Tehsil"
              type="text"
              value={runner_taluka}
              onChange={(e) => setTehsil(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            /> */}
            <TextField
              id="filled-search"
              label="Village"
              type="text"
              value={runner_village}
              onChange={(e) => setVillage(e.target.value)}
            />

            <hr />

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

            <TextField
              id="standard-disabled"
              label="Bank Account no."
              value={bank_acct_no}
              onChange={(e) => setAccountno(e.target.value)}
            />

            <TextField
              id="standard-disabled"
              label="IFSC Code"
              type="text"
              value={bank_ifsc_code}
              onChange={(e) => setbank_ifsc_code(e.target.value)}
            />

            {/* bank_passbook_photo */}
            <div
              style={{
                display: "flex",
                flexDirection: window.innerWidth <= 800 ? "column" : "row",
              }}
            >
              <div style={{ display: "inline" }}>
                <Box
                  component="img"
                  sx={{
                    height: 100,
                    width: 219,
                    ml: 3.5,
                    mt: 2.5,
                    borderRadius: "10px",
                    boxShadow: 1,
                  }}
                  onClick={imagespasshandleOpen}
                  alt="The uploaded image."
                  src={bank_passbook_photo}
                  display="flex"
                  // / src={URL.createObjectURL(profileImage)}
                />{" "}
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
                      accept=".png, .jpeg, .jpg"
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
                  Bank Passbook Photo
                </span>
              </div>

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

              <div style={{}}>
                <Box
                  component="img"
                  sx={{
                    height: 100,
                    width: 219,
                    ml: 3.5,
                    mt: 2.5,

                    borderRadius: "10px",
                    boxShadow: 1,
                  }}
                  onClick={imagespancardhandleOpen}
                  alt="The uploaded image."
                  src={pancard_image}
                  display="flex"
                  // / src={URL.createObjectURL(profileImage)}
                />
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
                      accept=".png, .jpeg, .jpg"
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
                  Pancard Card Photo
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

              <div style={{}}>
                <Box
                  component="img"
                  sx={{
                    height: 100,
                    width: 219,
                    ml: 3.5,
                    mt: 2.5,
                    backgroundSize: "300px",

                    borderRadius: "10px",
                    boxShadow: 1,
                  }}
                  onClick={otherhandleOpen}
                  alt="Uploaded Photos."
                  src={other_Id_proof_image}
                  display="flex"

                  // backgroundImage:URL('https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg')
                  // / src={URL.createObjectURL(profileImage)}
                />{" "}
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
                      accept=".png, .jpeg, .jpg"
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

              <Modal
                open={otheropen}
                onClose={otherhandleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <img
                    src={other_Id_proof_image}
                    width="500px"
                    height="500px"
                  />
                </Box>
              </Modal>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: window.innerWidth <= 600 ? "column" : "row",
                marginTop: "110px",
              }}
            >
              <div className="mediaText">
                <TextField
                  id="standard-disabled"
                  label="Pan card no."
                  value={pancard_no}
                  onChange={(e) => setPancardno(e.target.value)}
                />
              </div>
              <div className="mediaText">
                <TextField
                  id="standard-helperText"
                  label="Other id proof no"
                  value={other_id_proof_no}
                  onChange={(e) => setother_id_proof_no(e.target.value)}
                />
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "-6%" }}>
              <Button
                sx={{
                  color: "#f0f2f5",
                  backgroundColor: "#33A2B5",
                  "&:hover": { backgroundColor: "#2A90A2", color: "white" },
                  width: "20%",
                }}
                type="submit"
                onClick={updateAPIData}
              >
                submit
              </Button>
            </div>
          </Box>
        </Dialog>
      </MDBox>
      {/* <Footer /> */}
      <Dialog maxWidth={maxWidth} open={allopen}>
        <div>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              setAllOpen(false);
            }}
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
          <DialogTitle>Reason for Active or Deactive </DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextareaAutosize
              minRows={10}
              aria-label="Type Here..."
              placeholder="Type Your Reason Here..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{ width: 300 }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              style={{ color: "black", backgroundColor: "#33A2B5" }}
              onClick={sumbitRunnerDisable}
              disabled={disabled}
            >
              Send
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </DashboardLayout>
  );
}
export default Tables;

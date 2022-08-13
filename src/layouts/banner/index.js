import { useState, useEffect } from "react";
// import "./style.css";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import { Navigate } from 'react-router-dom'
// import AdminRepository from "../../api/AdminRepository";
//Hooks
import useAdmin from "../../hooks/useAdmin";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";

//material UI
import Icon from "@mui/material/Icon";
import { DataGrid } from "@mui/x-data-grid";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MDTypography from "components/MDTypography";
import { Fullscreen } from "@mui/icons-material";
// import Banner from "./Banner";


function BanerAnouncement() {
  const {
    Banners, Banners_Anouncements,UpdateBanner
  } = useAdmin();
  const { successMessage } = useSelector((state) => state.auth);
  const { msg } = useSelector((state) => state.auth);
  const [employee_name, setEmployee_name] = useState("");
  const [users_name, setUsers_name] = useState("");
  const [users_email, setUsers_email] = useState("");
  const [user_type, setUser_type] = useState("0");
  const [user_id, setUser_id] = useState("");
  const [is_active, setIs_active] = useState("Y");
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const roleId = localStorage.getItem("roleId");

const [disabled, setDisabled] = useState(
  (roleId==1)? true : false
)
  const handleModal = () => {
    setUser_type("0");
    setOpenModal(true);
  };
  const closeModal = () => setOpenModal(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const closeEditUserModal = () => {
    setEditUserModal(false);
    setUsers_name("");
    setUsers_email("");
  };

  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("center");
  const [snackType, setSnackType] = useState("");
  const handleOpen = (snack) => {
    setSnackType(snack);
    setOpen(true);
  };
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //popup
  const [banneropen, setBannerOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState("md");
  const [anounceopen, setAnounceOpen] = useState(false);

  const handleBannerClickOpen = () => {
    setBannerOpen(true);
  };

  const handleBannerClose = () => {
    setBannerOpen(false);
  };
  const handleAnounceOpen = () => {
    setAnounceOpen(true);
  };

  const handleAnounceClose = () => {
    setAnounceOpen(false);
  };
  const [loading, setLoading] = useState(false);

  const GetBanner = () => {
    setLoading(true);
    var Banners_Anouncement = Banners_Anouncements();
    Banners_Anouncement.then((response) => {
      if (response.status === 200) {
        setLoading(false);
        setUsers(response.data.data);
      }
    }).catch((e) => {
      console.log(e);
    });
  };


  useEffect(() => {
    GetBanner();
  }, []);

  const columns = [
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      renderCell: function (params) {
        const onClick = function (e) {
          e.stopPropagation(); // don't select this row after clicking
          const api = params.api;
          const thisRow = {};
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          setUser_type(thisRow.roleId);
          setUser_id(params.id);
          seturl(thisRow.url);
          setDescription(thisRow.Description);
          setDescriptionIsEnglish(params.row.DescriptionIsEnglish);
          setAppVersion(params.row.AppVersion);
          setButtonText(params.row.ButtonText);
          setShowButton(params.row.ShowButton);
          setDisplayBannerOrNot(params.row.DisplayBannerOrNot);
          setEditUserModal(true);
          return console.log(thisRow);
        };
        return (
          <Button
            onClick={onClick}
            variant="contained"
            disabled={disabled}
            sx={{
              color: "#000",
              backgroundColor: "#33A2B5",
              "&:hover": {
                backgroundColor: "#378c9b",
                focus: { backgroundColor: "red" },
              },
            }}
          >
            Edit
          </Button>
        );
      },
    },
    { field: "id", headerName: "ID", width: 70 },
    { field: "url", headerName: "url", width: 200 },
    { field: "Description", headerName: "Hindi", width: 200 },
    { field: "DescriptionIsEnglish", headerName: "English", width: 200 },
    { field: "AppVersion", headerName: "App Version", width: 200 },
    { field: "ButtonText", headerName: "Button Text", width: 150 },
    { field: "ShowButton", headerName: "Show Button", width: 140 ,
    renderCell: function (params) {
      return params.row.ShowButton === 1 ? (
      <Button sx={{color:'green'}}>Yes</Button>
      ) : (
        <Button sx={{color:'red'}} >No</Button>
      );
    },
  },
    {
      field: "DisplayBannerOrNot",
      headerName: "Display Banner",
      width: 200,
      renderCell: function (params) {
        return params.row.DisplayBannerOrNot === 1 ? (
        <Button sx={{color:'green'}}>Yes</Button>
        ) : (
          <Button sx={{color:'red'}} >No</Button>
        );
      },
    },
 
    {
      field: "created_by",
      headerName: "created_by",
      width: 200,
    }, 
     {
      field: "created_at",
      headerName: "created_at",
      width: 200,
    },
    {
      field: "updated_by",
      headerName: "updated_by",
      width: 200,
    }, 
     {
      field: "updated_at",
      headerName: "updated_at",
      width: 200,
    },
  ];
  
  const [url, seturl] = useState("");
  const [Description, setDescription] = useState("");
  const [DescriptionIsEnglish, setDescriptionIsEnglish] = useState("");
  const [AppVersion, setAppVersion] = useState("");
  const [ButtonText, setButtonText] = useState("");
  const [ShowButton, setShowButton] = useState(false);
  const [DisplayBannerOrNot, setDisplayBannerOrNot] = useState(false);

  const admin_email = localStorage.getItem("user_email");


const data = {
 
  url:url,
  Description:Description,
  DescriptionIsEnglish:DescriptionIsEnglish,
  AppVersion:AppVersion,
  ButtonText:ButtonText,
  ShowButton:ShowButton,
  DisplayBannerOrNot:DisplayBannerOrNot,
  admin_email:admin_email
};



// const data_1={
//   AnnouncementText: AnnouncementText,
//   AnnouncementIsEnglish: AnnouncementIsEnglish,
//   DisplayAnnouncementTextOrNot: DisplayAnnouncementTextOrNot,
//   admin_email
// }

// update anounce
const handleSubmit= (event) => {
  event.preventDefault();
  var UpdateBannerSuccess = UpdateBanner(data, user_id);
  UpdateBannerSuccess.then((response) => {
    if (response.status === 200) {
      
       closeEditUserModal();GetBanner();
      // handleOpen();
    }
  }).catch((e) => {
    console.log(e);
  });
  seturl("");
  setDescription("");
  setDescriptionIsEnglish("");
  setAppVersion("");
  setButtonText("");
  setShowButton("");
  setDisplayBannerOrNot("");
 
};
const data3 = {
  url,
  Description,
  DescriptionIsEnglish,
  AppVersion,
  ButtonText,
  ShowButton,
  DisplayBannerOrNot,
  admin_email,
};

const handleBannerSubmit = (event) => {
  event.preventDefault();
  console.log(data3)
  var addBanners = Banners(data3);
  addBanners.then((response) => {
    if (response.status === 200) {
      GetBanner();
      handleBannerClose();
      
    }
  }).catch((e) => {
    console.log(e);
  })
  seturl("");
  setDescription("");
  setDescriptionIsEnglish("");
  setAppVersion("");
  setButtonText("");
  setShowButton("");
  setDisplayBannerOrNot("");
 
};
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/*  post Banner Notification */}
      <Dialog maxWidth={maxWidth} open={banneropen} >
        <div>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleBannerClose}
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
            "& .MuiTextField-root": { mx: 2, my: 1 },
          }}
        > 
        {/* <Banner/> */}
      
      <form  >
        <Card sx={{ px: 3, py: 2, pb: 1, width: "100%" }}> 
     <MDTypography align="center" variant="h3" sx={{ mx: 8 }}>
        Banner Notification
      </MDTypography>
          <TextField
            required
            id="outlined-required"
            value={url}
            onChange={(e) => seturl(e.target.value)}
            label="url"
          />
          <TextField
            id="outlined"
            label="Description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            id="outlined-input"
            label="DescriptionIsEnglish"
            type="text"
            required
            value={DescriptionIsEnglish}
            onChange={(e) => setDescriptionIsEnglish(e.target.value)}
          />
          <TextField
            id="Button Text"
            label="Button Text"
            value={ButtonText}
            onChange={(e) => setButtonText(e.target.value)}
            required
          />

          <TextField
            id="App Version"
            label="App Version"
            value={AppVersion}
            onChange={(e) => setAppVersion(e.target.value)}
            type='number'
            required
          />

          <div style={{ display: "flex" }}>
            <div style={{ margin: 8 }}>
              <MDTypography for="cars">show button</MDTypography>

              <Select
                // value={age}
                // onChange={handleChange}
                label="Age"
                required
                style={{ width: 150, height: 30, border: "2px solide red" }}
                value={ShowButton}
                onChange={(e) => setShowButton(e.target.value)}
              >
                <MenuItem value="None"></MenuItem>
                <MenuItem value={true}>yes</MenuItem>
                <MenuItem value={false}>no</MenuItem>
              </Select>
            </div>
            <div style={{ margin: 8 }}>
              <MDTypography for="cars">Display Banner</MDTypography>
              <Select
                // value={age}
                // onChange={handleChange}
                label="Age"
                required
                style={{ width: 150, height: 30, border: "2px solide red" }}
                DisplayBannerOrNot
                value={DisplayBannerOrNot}
                onChange={(e) => setDisplayBannerOrNot(e.target.value)}
              >
                <MenuItem value="None"></MenuItem>
                <MenuItem value={true}>yes</MenuItem>
                <MenuItem value={false}>no</MenuItem>
              </Select>
            </div>
          </div>

<Button
          type="submit"
          variant="contained"
          value="Submit"
          style={{ background: "#33A2B5", color: "white" }}
          onClick={handleBannerSubmit}

        >
          Send
        </Button>
          </Card>  </form>
        </Box>
      </Dialog>

      
       
      {/* Edit Banner */}

      <Dialog
        maxWidth={maxWidth}
        open={editUserModal}
        onClose={closeEditUserModal}
      >
        <div>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closeEditUserModal}
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
            "& .MuiTextField-root": { mx: 3, my: 1 },
          }}
        >
            <MDTypography align="center" variant="h3" sx={{ pb: "10px" }}>
              Anouncement & Banner
            </MDTypography>
          <Card sx={{ px: 5, py: 1, pb: 4, width: "100%" }}>
         
       
       
        <TextField
            required
            id="outlined-required"
            value={url}
            onChange={(e) => seturl(e.target.value)}
            label="url"
          />
          <TextField
            id="outlined"
            label="Description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            id="outlined-input"
            label="DescriptionIsEnglish"
            type="text"
            required
            value={DescriptionIsEnglish}
            onChange={(e) => setDescriptionIsEnglish(e.target.value)}
          />
          <TextField
            id="Button Text"
            label="Button Text"
            value={ButtonText}
            onChange={(e) => setButtonText(e.target.value)}
            required
          />

          <TextField
            id="App Version"
            label="App Version"
            value={AppVersion}
            onChange={(e) => setAppVersion(e.target.value)}
            type='number'
            required
          />

          <div style={{ display: "flex" }}>
            <div style={{ margin: 8 }}>
              <MDTypography for="cars">show button</MDTypography>

              <Select
                // value={age}
                // onChange={handleChange}
                label="Age"
                required
                style={{ width: 150, height: 30, border: "2px solide red" }}
                value={ShowButton}
                onChange={(e) => setShowButton(e.target.value)}
              >
                <MenuItem value="None"></MenuItem>
                <MenuItem value={1}>yes</MenuItem>
                <MenuItem value={0}>no</MenuItem>
              </Select>
            </div>
            <div style={{ margin: 8 }}>
              <MDTypography for="cars">Display Banner</MDTypography>
              <Select
                // value={age}
                // onChange={handleChange}
                label="Age"
                required
                style={{ width: 150, height: 30, border: "2px solide red" }}
                DisplayBannerOrNot
                value={DisplayBannerOrNot}
                onChange={(e) => setDisplayBannerOrNot(e.target.value)}
              >
                <MenuItem value="None"></MenuItem>
                <MenuItem value={1}>yes</MenuItem>
                <MenuItem value={0}>no</MenuItem>
              </Select>
            </div>
          </div>
    

            <Button
              type="submit"
              variant="contained"
              style={{ background: "#33A2B5", color: "white" }}
              onClick={handleSubmit} 
            >
              Send
            </Button>
          </Card>
        </Box>
      </Dialog>

      <div style={{ float: "right", display: "flex" }}>
        <Button
          type="submit"
          variant="contained"
          style={{
            background: "#33A2B5",
            color: "white",
            margin: "10px",
            color: "#000",
          }}
          onClick={handleBannerClickOpen}
          disabled={disabled}
        >
          Add Banner
        </Button>

       
      </div>
      <br />
      <div style={{ height: 500, width: "100%", marginTop: "55px" }}>
        <DataGrid
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "ravi.main",
            "& .MuiDataGrid-cell:hover": {
              color: "ravi.main",
            },
            "& .MuiDataGrid-row:focus": {
              backgroundColor: "#33A2B5",
            },
          }}
          rows={users}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20, 50]}
          loading={loading}
        />
      </div>
    </DashboardLayout>
  );
  
}
export default BanerAnouncement;

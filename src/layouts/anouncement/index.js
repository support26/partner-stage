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

// import Anouncement from "./Anouncement";
// import Editbanner_announcement from "./Editbanner_anouncement"

function Anouncementbanner() {
  const {
       GetAnouncements,UpdateAnounce,Anouncements
  } = useAdmin();

  const [user_id, setUser_id] = useState("");

  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const [editUserModal, setEditUserModal] = useState(false);
  const closeEditUserModal = () => {
    setEditUserModal(false);
   
  };
// Anouncement text
const [AnnouncementText, setAnnouncementText] = useState(null);
const [AnnouncementIsEnglish, setAnnouncementIsEnglish] = useState(null);
const [DisplayAnnouncementTextOrNot, setDisplayAnnouncementTextOrNot] =
  useState(false);
const admin_email = localStorage.getItem("user_email");
const roleId = localStorage.getItem("roleId");
// const  = localStorage.getItem("user_email");
const [disabled, setDisabled] = useState(
  (roleId==1)? true : false
)
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
// get data
  const GetAnounce = () => {
    setLoading(true);
    var AllAdminUsers = GetAnouncements();
    AllAdminUsers.then((response) => {
      if (response.status === 200) {
        setLoading(false);
        setUsers(response.data.data);
      }
    }).catch((e) => {
      console.log(e);
    });
  };


 const data_1={
    AnnouncementText: AnnouncementText,
    AnnouncementIsEnglish: AnnouncementIsEnglish,
    DisplayAnnouncementTextOrNot: DisplayAnnouncementTextOrNot,
    admin_email
  }

// update anounce
const updateBanner= (event) => {
    event.preventDefault();
    var UpdateAnounceSuccess = UpdateAnounce(data_1, user_id);
    UpdateAnounceSuccess.then((response) => {
      if (response.status === 200) {
        
         closeEditUserModal();GetAnounce();
        // handleOpen();
      }
    }).catch((e) => {
      console.log(e);
    });
    setAnnouncementText("");
    setAnnouncementIsEnglish("");
    setDisplayAnnouncementTextOrNot("");
  };
  const data2 = {
    AnnouncementText,
    AnnouncementIsEnglish,
    DisplayAnnouncementTextOrNot,
    admin_email,
  };
  const postandleSubmit = (event) => {
    event.preventDefault();
    console.log(data2)
    var addAnnouncement = Anouncements(data2);
    addAnnouncement.then((response) => {
      if (response.status === 200) {
        GetAnounce();
        handleAnounceClose();
        
      }
    }).catch((e) => {
      console.log(e);
    })
      setAnnouncementText("");
      setAnnouncementIsEnglish("");
      setDisplayAnnouncementTextOrNot("");
    
   
  };

  useEffect(() => {
   
    GetAnounce();
   
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
       
        
          setUser_id(params.id);
          setAnnouncementText(thisRow.AnnouncementText);
          setAnnouncementIsEnglish(thisRow.AnnouncementIsEnglish);
          setDisplayAnnouncementTextOrNot(params.row.DisplayAnnouncementTextOrNot);
         

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
  
    { field: "AnnouncementText", headerName: "Announcement Text", width: 200 },
    {
      field: "AnnouncementIsEnglish",
      headerName: "AnuncementIsEnglish",
      width: 200,
    },
    {
      field: "DisplayAnnouncementTextOrNot",
      headerName: "Display Announcement",
      width: 200,  
        renderCell: function (params) {
        return params.row.DisplayAnnouncementTextOrNot === 1 ? (
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
      }, {
        field: "updated_at",
        headerName: "updated_at",
        width: 200,
      },
  
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/*  Banner Notification */}
    

      {/*  Post Notification */}
      <Dialog
        maxWidth={maxWidth}
        open={anounceopen}
      
      >
        <div>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleAnounceClose}
            aria-label="close"
            style={{ float: "right" }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Box
          sx={{
            "& .MuiTextField-root": { mx: 3, my: 2 },
          }}
        >
   <form onSubmit={postandleSubmit}> 
    
    <Card sx={{ px: 3, py: 2, pb: 4, width: "100%" }}>
       
       <MDTypography align="center" variant="h3" sx={{ pb: "20px" }}>
          Anouncement Notification
        </MDTypography>

       
        <TextField
          id="outlined"
          required
          value={AnnouncementText}
          onChange={(e) => setAnnouncementText(e.target.value)}
          label="Announcement Hindi"
        />

        <TextField
          id="outlined-input"
          label="AnnouncementIs English"
          type="text"
          value={AnnouncementIsEnglish}
          onChange={(e) => setAnnouncementIsEnglish(e.target.value)}
          required
        />
        <div style={{ marginLeft: 30, marginBottom: 20 }}>
          <MDTypography>Display Banner</MDTypography>
          <Select
            // value={age}
            // onChange={handleChange}
            label="Display"
            required
            style={{ width: 200, height: 30 }}
            value={DisplayAnnouncementTextOrNot}
            onChange={(e) => setDisplayAnnouncementTextOrNot(e.target.value)}
          >
            <MenuItem value="None">
              <em>None</em>
            </MenuItem>
            <MenuItem value= {true} >yes</MenuItem>
            <MenuItem value= {false} >no</MenuItem>
          </Select>
        </div>

     
        <Button
          type="submit"
          variant="contained"
          value="Submit"
          style={{ background: "#33A2B5", color: "white" }}
      
        >
          Send
        </Button>
          
      </Card>  </form>
        </Box>
      </Dialog>

      {/* Update Banner */}

      <Dialog
        maxWidth={maxWidth}
        open={editUserModal}
        
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
          sx={{
            "& .MuiTextField-root": { mx: 3, my: 2 },
          }}
        >
          <Card sx={{ px: 3, py: 2, pb: 4, width: "100%" }}>
       
       <MDTypography align="center" variant="h3" sx={{ pb: "20px" }}>
          Anouncement Notification
        </MDTypography>

       
        <TextField
          id="outlined"
          required
          value={AnnouncementText}
          onChange={(e) => setAnnouncementText(e.target.value)}
          label="Announcement Hindi"
        />

        <TextField
          id="outlined-input"
          label="AnnouncementIs English"
          type="text"
          value={AnnouncementIsEnglish}
          onChange={(e) => setAnnouncementIsEnglish(e.target.value)}
          required
        />
        <div style={{ marginLeft: 30, marginBottom: 20 }}>
          <MDTypography>Display Banner</MDTypography>
          <Select
            // value={age}
            // onChange={handleChange}
            label="Display"
            required
            style={{ width: 200, height: 30 }}
            value={DisplayAnnouncementTextOrNot}
            onChange={(e) => setDisplayAnnouncementTextOrNot(e.target.value)}
          >
            <MenuItem value="None">
              <em>None</em>
            </MenuItem>
            <MenuItem value= {1} >yes</MenuItem>
            <MenuItem value= {0} >no</MenuItem>
          </Select>
        </div>

        {/* <Box paddingLeft={10}>
            <MDTypography for="cars">DisplayAnnouncementTextOrNot</MDTypography>
            <select name="cars" id="cars">
              <option value="true">yes</option>
              <option value="false">No</option>
            </select>
          </Box> */}
        <Button
          type="submit"
          variant="contained"
          value="Submit"
          style={{ background: "#33A2B5", color: "white" }}
          onClick={updateBanner}
        >
          Send
        </Button>
  
      </Card> 
        </Box>
      </Dialog>

      <div style={{ float: "right", display: "flex" }}>
          

        <Button
          variant="contained"
          onClick={handleAnounceOpen}
          type="submit"
          disabled={disabled}
          style={{
            background: "#33A2B5",
            color: "white",
            margin: "10px",
            color: "#000",
          }}
        >
         Add Announcement
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
export default Anouncementbanner;

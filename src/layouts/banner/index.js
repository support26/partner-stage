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
import Banner from "./Banner";
import Anouncement from "./Anouncement";
import Editbanner_announcement from "./Editbanner_anouncement"

function BanerAnouncement() {
  const {
   
    Banners_Anouncements,
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

  const GetUsers = () => {
    setLoading(true);
    var AllAdminUsers = Banners_Anouncements();
    AllAdminUsers.then((response) => {
      if (response.status === 200) {
        setLoading(false);
        setUsers(response.data.data);
      }
    }).catch((e) => {
      console.log(e);
    });
  };


  useEffect(() => {
    GetUsers();
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
          setUsers_name(thisRow.users_name);
          setUsers_email(thisRow.users_email);
          setIs_active(params.row.is_active);
          setEmployee_name(params.row.employee_name);
          setEditUserModal(true);
          return console.log(thisRow);
        };
        return (
          <Button
            onClick={onClick}
            variant="contained"
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
    { field: "ShowButton", headerName: "Show Button", width: 140 },
    {
      field: "DisplayBannerOrNot",
      headerName: "DisplayBannerOrNot",
      width: 200,
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

    // {
    //   field: "is_active",
    //   headerName: "Status",
    //   width: 100,
    //   sortable: false,
    //   renderCell: function (params) {
    //     const handleActiveStatus = (event) => {
    //       event.preventDefault();
    //       const id = params.row.id;
    //       if (params.row.is_active === "Y") {
    //         const is_active = "N";
    //         ChangeAdminUserStatus(id, is_active);
    //       } else {
    //         const is_active = "Y";
    //         ChangeAdminUserStatus(id, is_active);
    //       }
    //       // GetUsers();
    //       console.log(id, is_active);
    //     };
    //     return params.row.is_active === "Y" ? (
    //       <Switch
    //         onChange={handleActiveStatus}
    //         defaultChecked
    //         color="success"
    //       />
    //     ) : (
    //       <Switch onChange={handleActiveStatus} color="success" />
    //     );
    //   },
    // },
  ];
  const data = {
    users_name: users_name,
    users_email: users_email,
    user_type: user_type,
    employee_name: employee_name,
  };

  // const addAdminUsers = (event) => {
  //   event.preventDefault();
  //   var UserAddedSuccessfully = AddAdminUser(data);
  //   UserAddedSuccessfully.then((response) => {
  //     if (response.status === 200) {
  //       GetUsers();
  //       closeModal();
  //       handleOpen();
  //     }
  //   }).catch((e) => {
  //     console.log(e);
  //   });
  //   setUsers_name("");
  //   setUsers_email("");
  //   setEmployee_name("");
  // };

  const data_1 = {
    users_name: users_name,
    users_email: users_email,
    user_type: user_type,
    employee_name: employee_name,
    is_active: is_active,
  // };
  // const updateUser = (event) => {
  //   event.preventDefault();
  //   var UserUpdatedSuccessfully = UpdateAdminUser(data_1, user_id);
  //   UserUpdatedSuccessfully.then((response) => {
  //     if (response.status === 200) {
  //       GetUsers();
  //       closeEditUserModal();
  //       handleOpen();
  //     }
  //   }).catch((e) => {
  //     console.log(e);
  //   });
  //   setUsers_name("");
  //   setUsers_email("");
  //   setEmployee_name("");
  // };
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/*  Banner Notification */}
      <Dialog maxWidth={maxWidth} open={banneropen} onClose={handleBannerClose}>
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
        <Banner/>
        </Box>
      </Dialog>

      {/*  Announcement Notification */}
      <Dialog
        maxWidth={maxWidth}
        open={anounceopen}
        onClose={handleAnounceClose}
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
          noValidate
          component="form"
          sx={{
            "& .MuiTextField-root": { mx: 3, my: 2 },
          }}
        >
         <Anouncement/>
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
            "& .MuiTextField-root": { mx: 3, my: 2 },
          }}
        >
          <Editbanner_announcement/>
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
        >
          Add Banner
        </Button>

        <Button
          variant="contained"
          onClick={handleAnounceOpen}
          type="submit"
          style={{
            background: "#33A2B5",
            color: "white",
            margin: "10px",
            color: "#000",
          }}
        >
          Announcement
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

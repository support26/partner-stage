import { useState, useEffect } from "react";
// import "./style.css";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import { Navigate } from 'react-router-dom'
// import AdminRepository from "../../api/AdminRepository";
//Hooks
import useAdmin from "../../hooks/useAdmin";
import AdminRepository from "api/AdminRepository";
import Cookies from "js-cookie";
import Card from "@mui/material/Card";

//material UI
// import Icon from "@mui/material/Icon";
import { DataGrid } from "@mui/x-data-grid";
// import Alert from "@mui/material/Alert";
// import Snackbar from "@mui/material/Snackbar";
// import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
// import Switch from "@mui/material/Switch";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MDTypography from "components/MDTypography";
// import { Fullscreen } from "@mui/icons-material";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
// import ListItemText from '@mui/material/ListItemText';
// import Checkbox from '@mui/material/Checkbox';
// import ListItemIcon from '@mui/material/ListItemIcon';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 20;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      width: 250,
      padding: 10,
    },
  },
};

const version = [
  "20.1"
];

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
  },
}));

function Anouncementbanner() {
  const { GetAnouncements, UpdateAnouncement, AddAnouncements} =
    useAdmin();

  const [user_id, setUser_id] = useState("");

  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const [editUserModal, setEditUserModal] = useState(false);
  const closeEditUserModal = () => {
    setEditUserModal(false);
    setAnnouncementText("");
    setAnnouncementIsEnglish("");
    setDisplayAnnouncementTextOrNot("");
    setAppVersion("");
  };
  // Anouncement text
  const [AnnouncementText, setAnnouncementText] = useState("");
  const [AnnouncementIsEnglish, setAnnouncementIsEnglish] = useState("");
  const [AppVersion, setAppVersion] = useState("");
  const [DisplayAnnouncementTextOrNot, setDisplayAnnouncementTextOrNot] =
    useState("");
  const admin_email = localStorage.getItem("user_email");
  const roleId = localStorage.getItem("roleId");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(roleId == 1 ? true : false);
  //popup
  // const [banneropen, setBannerOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState("md");
  const [anounceopen, setAnounceOpen] = useState(false);
  const [date, setDate] = useState("");

  const handleAnounceOpen = () => {
    setAnounceOpen(true);
  };

  const handleAnounceClose = () => {
    setAnounceOpen(false);
  };
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
    //check is user active or not
    AdminRepository.checkUserActive()
      .then((res) => {
        if (res.data.data.is_active === "N" ) {
          window.location.href = "/";
          localStorage.clear();
          Cookies.remove("token");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const data_1 = {
    AnnouncementText: AnnouncementText,
    AnnouncementIsEnglish: AnnouncementIsEnglish,
    DisplayAnnouncementTextOrNot: DisplayAnnouncementTextOrNot,
    AppVersion: AppVersion,
    admin_email,
    date,
  };

  // update anounce
  const updateBanner = (event) => {
    event.preventDefault();
    var UpdateAnounceSuccess = UpdateAnouncement(data_1, user_id);
    UpdateAnounceSuccess.then((response) => {
      if (response.status === 200) {
        closeEditUserModal();
        GetAnounce();
        // handleOpen();
      }
    }).catch((e) => {
      console.log(e);
    });
    setAnnouncementText("");
    setAnnouncementIsEnglish("");
    setDisplayAnnouncementTextOrNot("");
    setAppVersion("");
    setDate("");
  };
  const data2 = {
    AnnouncementText,
    AnnouncementIsEnglish,
    AppVersion,
    DisplayAnnouncementTextOrNot,
    admin_email,
    date,
  };
  const postandleSubmit = (event) => {
    event.preventDefault();
    // console.log(data2)
    var addAnnouncement = AddAnouncements(data2);
    addAnnouncement
      .then((response) => {
        if (response.status === 200) {
          GetAnounce();
          handleAnounceClose();
        }
      })
      .catch((e) => {
        console.log(e);
      });
    setAnnouncementText("");
    setAnnouncementIsEnglish("");
    setDisplayAnnouncementTextOrNot("");
    setAppVersion("");
    setDate("");
  };

  useEffect(() => {
      GetAnounce();
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;

    setAppVersion(value);
    console.log(AppVersion);
  };

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
          setDate(params.row.date === null ? "" : params.row.date);
          setDisplayAnnouncementTextOrNot(
            params.row.DisplayAnnouncementTextOrNot === 1 ? true : false
          );
          setAppVersion([params.row.AppVersion]);

          setEditUserModal(true);
          return;
          // console.log(thisRow);
        };
        return (
          <Button
            onClick={onClick}
            variant="contained"
            disabled={disabled}
            sx={{
              color: "#fff",
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
    // { field: "id", headerName: "ID", width: 50 },

    {
      field: "AnnouncementText",
      headerName: "Announcement in Hindi",
      width: 200,
    },
    {
      field: "AnnouncementIsEnglish",
      headerName: "Announcement in English",
      width: 200,
    },
    {
      field: "AppVersion",
      headerName: "App Version",
      width: 100,
    },
    {
      field: "DisplayAnnouncementTextOrNot",
      headerName: "Display Announcement",
      width: 185,
      renderCell: function (params) {
        return params.row.DisplayAnnouncementTextOrNot === 1 ? (
          <Button sx={{ color: "green" }}>Yes</Button>
        ) : (
          <Button sx={{ color: "red" }}>No</Button>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 110,
      renderCell: function (params) {
        return params.row.date === null ? "" : (
          new Date(params.row.date).toLocaleDateString()
        );
      }
    },
    {
      field: "created_by",
      headerName: "Created By",
      width: 200,
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 200,
    },
    {
      field: "updated_by",
      headerName: "Updated By",
      width: 200,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 200,
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/*  Banner Notification */}

      {/*  Post Notification */}
      <Dialog maxWidth={maxWidth} open={anounceopen}>
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
            "& .MuiTextField-root": { mx: 1, my: 1 },
          }}
        >
          {/* add Anouncement */}
          <form onSubmit={postandleSubmit}>
            <MDTypography align="center" variant="h3" sx={{ px: 10 }}>
              Add Anouncement
            </MDTypography>
            <Card sx={{ px: 3, py: 2, pb: 4, width: "100%" }}>
              {/* <TextField 
       value={AppVersion}
      onChange={handleChange}

      input={<BootstrapInput />}

      MenuProps={MenuProps}/> */}
              <InputLabel
                htmlFor="demo-customized-select-native"
                sx={{ pl: 1 }}
              >
                Select Version
              </InputLabel>
              <FormControl sx={{ mb: 0, p: 1 }} variant="standard">
                <Select
                required
                  id="demo-customized-select-native"
                  value={AppVersion}
                  onChange={(e) => setAppVersion(e.target.value)}
                  input={<BootstrapInput />}
                  MenuProps={MenuProps}
                  style={{
                    width: "100%",
                  }}
                >
                  {version.map((version) => (
                    <MenuItem key={version} value={version}>
                      {version}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="outlined"
                required
                value={AnnouncementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                label="Announcement Hindi"
              />

              <TextField
                id="outlined-input"
                label="Announcement English"
                type="text"
                value={AnnouncementIsEnglish}
                onChange={(e) => setAnnouncementIsEnglish(e.target.value)}
                required
              />

              <InputLabel
                htmlFor="demo-customized-select-native"
                sx={{ pl: 1 }}
              >
                Display Anouncement
              </InputLabel>
              <FormControl sx={{ m: 1, mb: 3 }} variant="standard">
                <Select
                required
                  id="demo-customized-select-native"
                  value={DisplayAnnouncementTextOrNot}
                  onChange={(e) =>
                    setDisplayAnnouncementTextOrNot(e.target.value)
                  }
                  input={<BootstrapInput />}
                >
                  {/* <MenuItem aria-label="None">Select</MenuItem> */}
                  <MenuItem value={true}>yes</MenuItem>
                  <MenuItem value={false}>no</MenuItem>
                </Select>
              </FormControl>
              <InputLabel
                htmlFor="demo-customized-select-native"
                sx={{ pl: 1 }}
              >
                Date
              </InputLabel>
              <TextField
                // id="outlined-input"
                // label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />

              <Button
                type="submit"
                variant="contained"
                value="Submit"
                style={{ background: "#33A2B5", color: "white" }}
              >
                Send
              </Button>
            <small style={{ color: "red", fontSize: "12px", marginTop: "8px" , textAlign: "center"}}>
              You can only add upto 100 rows of Announcement, if you exceed <br/> limit of 100,
              then oldest one will be deleted from this page.
              </small>
            </Card>
          </form>
        </Box>
      </Dialog>

      {/* Update Banner */}

      <Dialog maxWidth={maxWidth} open={editUserModal}>
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
            "& .MuiTextField-root": { mx: 1, my: 1 },
          }}
        >
          {" "}
          <MDTypography align="center" variant="h3" sx={{ px: 10 }}>
            Edit Anouncement
          </MDTypography>
          <Card sx={{ px: 3, py: 2, pb: 4, width: "100%" }}>
            {/* <TextField
       value={AppVersion}
       required
      
       onChange={(e) => setAppVersion(e.target.value)}
       label="VersionFilled "
       /> */}

            <InputLabel htmlFor="demo-customized-select-native" sx={{ pl: 1 }}>
              Select Version
            </InputLabel>
            <FormControl sx={{ mb: 0, p: 1 }} variant="standard">
              <Select
                id="demo-customized-select-native"
                value={AppVersion}
                onChange={handleChange}
                // onChange={(e) => setShowButton(e.target.value)}

                input={<BootstrapInput />}
                MenuProps={MenuProps}
                style={{
                  width: "100%",
                }}
              >
                {version.map((version) => (
                  <MenuItem key={version} value={version}>
                    {version}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <TextField
          id="outlined"
          required
          value={AppVersion}
          onChange={handleChange}
          label="AppVersion "
        /> */}
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

            <InputLabel htmlFor="demo-customized-select-native" sx={{ pl: 1 }}>
              Display Announcement
            </InputLabel>
            <FormControl sx={{ m: 1, mb: 3 }} variant="standard">
              <Select
                id="demo-customized-select-native"
                value={DisplayAnnouncementTextOrNot}
                onChange={(e) =>
                  setDisplayAnnouncementTextOrNot(e.target.value)
                }
                input={<BootstrapInput />}
              >
                {/* <MenuItem aria-label="None">Select</MenuItem> */}
                <MenuItem value={true}>yes</MenuItem>
                <MenuItem value={false}>no</MenuItem>
              </Select>
            </FormControl>
            <InputLabel
                htmlFor="demo-customized-select-native"
                sx={{ pl: 1 }}
              >
                Date
              </InputLabel>
              <TextField
                // id="outlined-input"
                // label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
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
            color: "#fff",
          }}
        >
          Add Announcement
        </Button>
      </div>
      <br />
      <div style={{ height: 420, width: "100%", marginTop: "55px" }}>
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
          rowsPerPageOptions={[10, 20, 50]}
          loading={loading}
        />
      </div>
    </DashboardLayout>
  );
}
export default Anouncementbanner;

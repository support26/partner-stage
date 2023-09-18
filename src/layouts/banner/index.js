import { useState, useEffect } from "react";
// import "./style.css";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
//Hooks
import useAdmin from "../../hooks/useAdmin";
import AdminRepository from "api/AdminRepository";
import Cookies from "js-cookie";
//material UI
import Card from "@mui/material/Card";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MDTypography from "components/MDTypography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import Form from "./Form";
import { Backdrop } from "@mui/material";
import { Popconfirm } from "antd";
import './index.css'
import Imageslider from "./slider";
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

// const version = [
//   "20.1"
// ];

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
function Banner() {
  
  const { GetBanner, GetSliderImage, AddSliderImage, AddBanner, UpdateBanner, DeleteBanner, GetVersionList } = useAdmin();
  const [user_id, setUser_id] = useState("");
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(50);
  const [loading, setLoading] = useState(false);
  const [banneropen, setBannerOpen] = useState(false);
  const [url, seturl] = useState("");
  const [version, setVersion] = useState([]);
  const [Description, setDescription] = useState("");
  const [DescriptionIsEnglish, setDescriptionIsEnglish] = useState("");
  const [AppVersion, setAppVersion] = useState("");
  const [ButtonText, setButtonText] = useState("");
  const [ShowButton, setShowButton] = useState("");
  const [DisplayBannerOrNot, setDisplayBannerOrNot] = useState("");
  const [date, setDate] = useState("");
  const [values, setValues] = useState([]);
  const [images, setImages] = useState([]);
  const [header, setHeader] = useState("");
  const handleClose = () => setOpen(false);
  //gif
  const [Gif_Url, setGif_Url] = useState(null);
  const [Gif_Visibility, setGif_Visibility] = useState(null);
  const [Gif_Url_to_be_opened, setGif_Url_to_be_opened] = useState(null);
  const [ButtonColor, setButtonColor] = useState(null);
  const [BackgroundColor, setBackgroundColor] = useState(null);
  const [TextColor, setTextColor] = useState(null);
  const [UrgentUpdate, setUrgentUpdate] = useState(null);
  const [open, setOpen] = useState(null);

  const [errormsg, setErrormsg] = useState(null);
  const roleId = localStorage.getItem("roleId");

  const [disabled, setDisabled] = useState(roleId == 1 ? true : false);
  const [editUserModal, setEditUserModal] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    height:"auto",
    transform: "translate(-50%, -50%)",
    width: "520px",
    maxWidth: "90%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 3,
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  };
  // const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const showPopconfirm = (id) => {
    // close another popconfirm if any open before opening this one
    const test = users.map((item) => {
      if (item.delete === true) {
        item.delete = false;
      }
      return item;
    });
    setUsers(test);
    const updatedData = users.map((item) => {
      if (item.id === id) {
        item.delete = true;
      }
      return item;
    });
    setUsers(updatedData);
  };
 
  const handleOk = (id) => {
    setConfirmLoading(true);
    var deletebanner = DeleteBanner(id);
    deletebanner.then((res) => {
      if (res.status === 200) {
        setConfirmLoading(false);
        // const updatedData = users.map((item) => {
        //       if (item.id === id) {
        //         item.delete = false;
        //       }
        //       return item;
        //     });
        //     setUsers(updatedData);
        GetBannerData();
      }
    })
    .catch((e) => {
      console.log(e);
    });

      
    // setTimeout(() => {
    //   setConfirmLoading(false);
    //   const updatedData = users.map((item) => {
    //     if (item.id === id) {
    //       item.delete = false;
    //     }
    //     return item;
    //   });
    //   setUsers(updatedData);
    // }, 2000);
  };
  const handleCancel = (id) => {
    const updatedData = users.map((item) => {
      if (item.id === id) {
        item.delete = false;
      }
      return item;
    });
    setUsers(updatedData);
  };
  const closeEditUserModal = () => {
    setEditUserModal(false);
    seturl("");
    setDescription("");
    setDescriptionIsEnglish("");
    setAppVersion("");
    setButtonText("");
    setShowButton("");
    setDisplayBannerOrNot("");
    setGif_Url(null);
    setGif_Visibility(null);
    setGif_Url_to_be_opened(null);
    setButtonColor(null);
    setBackgroundColor(null);
    setTextColor(null);
    setUrgentUpdate(null);
    setDate("");
    setHeader("");
  };

  //popup
  const [maxWidth, setMaxWidth] = useState("md");

  const handleBannerClickOpen = () => {
    setBannerOpen(true);
  };

  const handleBannerClose = () => {
    setBannerOpen(false);
    seturl("");
    setDescription("");
    setDescriptionIsEnglish("");
    setAppVersion("");
    setButtonText("");
    setShowButton("");
    setDisplayBannerOrNot("");
    setGif_Url("");
    setGif_Visibility("");
    setGif_Url_to_be_opened("");
    setButtonColor("");
    setBackgroundColor("");
    setTextColor("");
    setUrgentUpdate("");
    setErrormsg("");
    setDate("");
    setHeader("");
  };

  const getSliderImage = () => {
    var getSliderImage = GetSliderImage();
    getSliderImage
      .then((response) => {
        parseData(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
   
  };
  const parseData = (images) => {
    setImages(images);
  };
  useEffect(() => {
    getSliderImage();
  }, []);
  
  const GetBannerData = () => {
    setLoading(true);
    var getBanners = GetBanner();
    getBanners
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          //add delete key in response
          var data = response.data.data;
          data.map((item) => {
            item["delete"] = false;
            return item;
          });
          setUsers(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
      var getVersionList = GetVersionList();
      getVersionList
      .then((response) => {
        if (response.status === 200) {
          setVersion(response.data.data);
        }
      })
      .catch((e) => {
        console.log(e);
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
    GetBannerData();
  }, []);

  function CustomToolbar( ) {
    return (
      <GridToolbarContainer>
        <GridToolbarQuickFilter style={{ position: "relative", maxWidth: "150px" }} />
      </GridToolbarContainer>
    );
  }
  const handleChange = (event) => {
    const value = event.target.value;

    setAppVersion(value);
    // console.log(AppVersion)
  };

  const columns = [
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      width: 70,
      renderCell: function (params) {
        const onClick = function (e) {
          e.stopPropagation(); // don't select this row after clicking
          setUser_id(params.id);
          seturl(params.row.url);
          setDescription(params.row.Description);
          setDescriptionIsEnglish(params.row.DescriptionIsEnglish);
          setAppVersion(params.row.AppVersion);
          setButtonText(params.row.ButtonText);
          setShowButton(params.row.ShowButton === 1 ? true : false);
          setDisplayBannerOrNot(
            params.row.DisplayBannerOrNot === 1 ? true : false
          );
          setHeader(params.row.header);
          setGif_Url(params.row.Gif_Url);
          setGif_Visibility(
            params.row.Gif_Visibility === 1
              ? true
              : params.row.Gif_Visibility === 0
              ? false
              : null
          );
          setGif_Url_to_be_opened(params.row.Gif_Url_to_be_opened);
          setDate(params.row.date === null ? "" : params.row.date);
          setButtonColor(params.row.ButtonColor);
          setBackgroundColor(params.row.BackgroundColor);
          setTextColor(params.row.TextColor);
          setUrgentUpdate(
            params.row.UrgentUpdate === 1
              ? true
              : params.row.UrgentUpdate === 0
              ? false
              : null
          );
          setEditUserModal(true);
          return;
        };        
        return (
          <>
          <GridActionsCellItem
          disabled={disabled}
          style={{ color: disabled ? "grey" : "#1c68eb" }}
          icon={<EditIcon />}
            label="Edit"
            onClick={onClick}
          />
          <Popconfirm
            title="Are you sure to delete this banner?"
            placement="topLeft"
            open={params.row.delete}
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleOk(params.id)}
            okButtonProps={{
              loading: confirmLoading,
            }}
            onCancel={() => handleCancel(params.id)}
            >
          <GridActionsCellItem
          disabled={disabled}
          style={{ color: disabled ? "grey" : "#1c68eb" }}
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => showPopconfirm(params.id)}
          />
          </Popconfirm>
          </>
        );
      },
    },
    // { field: "id", headerName: "ID", width: 50 },
    { field: "url", headerName: "Url", width: 200 },
    { field: "header", headerName: "Header", width: 200},
    { field: "Description", headerName: "Hindi", width: 200 },
    { field: "DescriptionIsEnglish", headerName: "English", width: 200 },
    { field: "AppVersion", headerName: "App Version", width: 100 },
    { field: "ButtonText", headerName: "Button Text", width: 110 },
    {
      field: "ShowButton",
      headerName: "Show Button",
      width: 110,
      renderCell: function (params) {
        return params.row.ShowButton === 1 ? (
          <Button sx={{ color: "green" }}>Yes</Button>
        ) : (
          <Button sx={{ color: "red" }}>No</Button>
        );
      },
    },
    {
      field: "DisplayBannerOrNot",
      headerName: "Display Banner",
      width: 110,
      renderCell: function (params) {
        return params.row.DisplayBannerOrNot === 1 ? (
          <Button sx={{ color: "green" }}>Yes</Button>
        ) : (
          <Button sx={{ color: "red" }}>No</Button>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      width: 110,
      renderCell: function (params) {
        return params.row.date === null ? "" : (
          new Date(params.row.date).toLocaleDateString()
        );
      }
    },

    {
      field: "Gif_Url",
      headerName: "Gif Url ",
      width: 200,
    },
    {
      field: "Gif_Visibility",
      headerName: "Gif Visibility",
      width: 110,
      renderCell: function (params) {
        if (params.row.Gif_Visibility === 1) {
          return <Button sx={{ color: "green" }}>Yes</Button>;
        } else if (params.row.Gif_Visibility === 0) {
          return <Button sx={{ color: "red" }}>No</Button>;
        } else {
          return;
        }
      },
    },
    {
      field: "Gif_Url_to_be_opened",
      headerName: "Gif Url to be opened ",
      width: 150,
      // renderCell: function (params) {
      //   if (params.row.Gif_Url_to_be_opened === 1) {
      //     return <Button sx={{ color: "green" }}>Yes</Button>;
      //   } else if (params.row.Gif_Url_to_be_opened === 0) {
      //     return <Button sx={{ color: "red" }}>No</Button>;
      //   } else {
      //     return;
      //   }
        // return params.row.Gif_Url_to_be_opened === 1 ? (
        //   <Button sx={{ color: "green" }}>Yes</Button>
        // ) : (
        //   <Button sx={{ color: "red" }}>No</Button>
        // );
      // },
    },
    {
      field: "ButtonColor",
      headerName: "Button Color",
      width: 110,
      renderCell: function (params) {
        return (
          <Button
            sx={{
              color: "#fff",
              backgroundColor: params.row.ButtonColor,
              padding: "0px 0px",
              margin: "10px",
              "&:hover": {
                backgroundColor: params.row.ButtonColor,
                color: "#fff",
              },
            }}
          >
            {params.row.ButtonColor}
          </Button>
        );
      },
    },
    {
      field: "BackgroundColor",
      headerName: "Background Color",
      width: 110,
      renderCell: function (params) {
        return (
          <Button
            sx={{
              backgroundColor: params.row.BackgroundColor,
              color: "#fff",
              padding: "0px 0px",
              margin: "10px",
              "&:hover": {
                backgroundColor: params.row.BackgroundColor,
                color: "#fff",
              },
            }}
          >
            {params.row.BackgroundColor}
          </Button>
        );
      },
    },
    {
      field: "TextColor",
      headerName: "Text Color",
      width: 110,
      renderCell: function (params) {
        return (
          <Button
            sx={{
              backgroundColor: params.row.TextColor,
              color: "#fff",
              padding: "0px 0px 0px 0px",
              margin: "10px",
              "&:hover": {
                backgroundColor: params.row.TextColor,
                color: "#fff",
              },
            }}
          >
            {params.row.TextColor}
          </Button>
        );
      },
    },
    {
      field: "UrgentUpdate",
      headerName: "Urgent Update",
      width: 110,
      renderCell: function (params) {
        if (params.row.UrgentUpdate === 1) {
          return <Button sx={{ color: "green" }}>Yes</Button>;
        } else if (params.row.UrgentUpdate === 0) {
          return <Button sx={{ color: "red" }}>No</Button>;
        } else {
          return;
        }
        // return params.row.UrgentUpdate === 1 ? (
        //   <Button sx={{ color: "green" }}>Yes</Button>
        // ) : (
        //   <Button sx={{ color: "red" }}>No</Button>
        // );
      },
    },

    {
      field: "created_by",
      headerName: "Created By",
      width: 200,
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 180,
      type: 'date',
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleString();
      }
    },
    {
      field: "updated_by",
      headerName: "Updated By",
      width: 200,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 180,
      type: 'date',
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleString() : "";
      }
    },
  ];

  const admin_email = localStorage.getItem("user_email");

  const data = {
    url: url,
    Description: Description,
    DescriptionIsEnglish: DescriptionIsEnglish,
    AppVersion: AppVersion,
    ButtonText: ButtonText,
    ShowButton: ShowButton,
    DisplayBannerOrNot: DisplayBannerOrNot,
    Gif_Url: Gif_Url,
    Gif_Visibility: Gif_Visibility,
    Gif_Url_to_be_opened: Gif_Url_to_be_opened,
    ButtonColor: ButtonColor,
    BackgroundColor: BackgroundColor,
    TextColor: TextColor,
    UrgentUpdate: UrgentUpdate,
    admin_email: admin_email,
    date: date,
    header: header,
  };
// "^(https?://)?(((www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z‌​0-9]{0,61}[a-z0-9]\\‌​.[a-z]{2,6})|((\\d{1‌​,3}\\.){3}\\d{1,3}))‌​(:\\d{2,4})?((/|\\?)‌​(((%[0-9a-f]{2})|[-\‌​\w@\\+\\.~#\\?&/=])*‌​))?$"
  // update banner
  const handleSubmit = (event) => {
    event.preventDefault();
    //check url is valid or not
    var urlregex = new RegExp(
      "^(https?:\\/\\/)?" + // protocol (optional) (http:// or https://) (// is also accepted)
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name   (www.example.com)
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path (
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string (
        "(\\#[-a-z\\d_]*)?$",
      "i" // fragment locator (
    );
    if(!urlregex.test(url)){
      setErrormsg("Please enter valid url");
      return;
    }
    else{
    var UpdateBannerSuccess = UpdateBanner(data, user_id);
    UpdateBannerSuccess.then((response) => {
      if (response.status === 200) {
        GetBannerData();
        closeEditUserModal();
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
    setGif_Url("");
    setGif_Visibility("");
    setGif_Url_to_be_opened("");
    setButtonColor("");
    setBackgroundColor("");
    setTextColor("");
    setUrgentUpdate("");
    setErrormsg("");
    setDate("");
    setHeader("");
  }
  };

  //add banner
  const handleBannerSubmit = (event) => {
    event.preventDefault();
    if (
      url === "" ||
      Description === "" ||
      AppVersion === "" ||
      ButtonText === "" ||
      ShowButton === "" ||
      header === "" ||
      DisplayBannerOrNot === ""
    ) {
      setErrormsg("Please fill all the fields");
    } else {
      //check url is valid or not
      var urlregex = new RegExp(
        "^(https?:\\/\\/)?" + // protocol (optional) (http:// or https://) (// is also accepted)
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name   (www.example.com)
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path (
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string (
        "(\\#[-a-z\\d_]*)?$",
      "i" // fragment locator (
      );
      if (!urlregex.test(url)) {
        setErrormsg("Please enter valid url");
        return;
      } else {
        const data_1 = {
          url,
          Description,
          DescriptionIsEnglish,
          AppVersion,
          ButtonText,
          ShowButton,
          DisplayBannerOrNot,
          Gif_Url,
          Gif_Visibility,
          Gif_Url_to_be_opened,
          ButtonColor,
          BackgroundColor,
          TextColor,
          UrgentUpdate,
          admin_email,
          date,
          header,
        };
        if(data_1.Gif_Visibility === ""){
          delete data_1.Gif_Visibility;
        }
        if(data_1.UrgentUpdate === ""){
          delete data_1.UrgentUpdate;
        }

        // console.log(data_1);
        var addBanners = AddBanner(data_1);
        addBanners
          .then((response) => {
            if (response.status === 200) {
              GetBannerData();
              handleBannerClose();
            }
          })
          .catch((e) => {
            console.log(e);
          });
        seturl("");
        setDescription("");
        setDescriptionIsEnglish("");
        setAppVersion("");
        setButtonText("");
        setShowButton("");
        setDisplayBannerOrNot("");
        setGif_Url("");
        setGif_Visibility("");
        setGif_Url_to_be_opened("");
        setButtonColor("");
        setBackgroundColor("");
        setTextColor("");
        setUrgentUpdate("");
        setErrormsg("");
        setDate("");
        setHeader("");
      }
    }
  };
    
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/*  post Banner Notification */}
      <Dialog maxWidth={maxWidth} open={banneropen}>
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
          // noValidate
          // component="form"
          sx={{
            "& .MuiTextField-root": { mx: 1, my: 1 },
          }}
        >
          {/* < add Banner/> */}

          <form>
            <MDTypography align="center" variant="h3" sx={{ px: 18 }}>
              Add Banner
            </MDTypography>
            <Card sx={{ px: 3, pt: 0, pb: 2, width: "100%" }}>
              {errormsg && (
                <small style={{ color: "red", fontSize: "15px" }}>
                  {errormsg}
                </small>
              )}
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
                  displayEmpty
                  onChange={(e) => setAppVersion(e.target.value)}
                  input={<BootstrapInput />}
                  MenuProps={MenuProps}
                  label="Select Version"
                  style={{
                    width: "100%",
                  }}
                >
                  <MenuItem value="">
                   <em>None</em>
                    </MenuItem>
                  {version.map((version) => (
                    <MenuItem key={version} value={version}>
                      {version}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                required
                id="outlined-required"
                value={url}
                onChange={(e) => seturl(e.target.value)}
                label="Url"
              />

              <TextField 
              required
              id="outlined-required"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              label="Header"
              />
              <TextField              
                id="outlined-multiline-static"
                label="Description Hindi"
                multiline
                rows={6}
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <TextField
                id="outlined-multiline-static"
                label="Description English"
                type="text"
                multiline
                rows={6}
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

              <InputLabel
                htmlFor="demo-customized-select-native"
                sx={{ pl: 1 }}
              >
                Show Button
              </InputLabel>
              <FormControl sx={{ m: 1 }} variant="standard">
                <Select
                  id="demo-customized-select-native"
                  value={ShowButton}
                  onChange={(e) => setShowButton(e.target.value)}
                  input={<BootstrapInput />}
                  required
                >
                  <MenuItem aria-label="None">Select</MenuItem>
                  <MenuItem value={true}>yes</MenuItem>
                  <MenuItem value={false}>no</MenuItem>
                </Select>
              </FormControl>

              <InputLabel
                htmlFor="demo-customized-select-native"
                sx={{ pl: 1, pb: "1px" }}
              >
                Display Banner
              </InputLabel>
              <FormControl sx={{ m: 1 }} variant="standard">
                <Select
                  id="demo-customized-select-native"
                  value={DisplayBannerOrNot}
                  onChange={(e) => setDisplayBannerOrNot(e.target.value)}
                  input={<BootstrapInput />}
                  required
                >
                  <MenuItem aria-label="None">Select</MenuItem>
                  <MenuItem value={true}>yes</MenuItem>
                  <MenuItem value={false}>no</MenuItem>
                </Select>
              </FormControl>

              {/* gif  */}
              <TextField
                id="Gif_Url"
                label="Gif Url"
                value={Gif_Url}
                onChange={(e) => setGif_Url(e.target.value)}
              />

              <InputLabel htmlFor="uncontrolled-native" sx={{ pl: 1 }}>
                Gif Visibility
              </InputLabel>
              <FormControl sx={{ m: 1 }} variant="standard">
                <Select
                  id="demo-customized-select-native"
                  value={Gif_Visibility}
                  onChange={(e) => setGif_Visibility(e.target.value)}
                  input={<BootstrapInput />}
                >
                  <MenuItem aria-label="None">Select</MenuItem>
                  <MenuItem value={true}>yes</MenuItem>
                  <MenuItem value={false}>no</MenuItem>
                </Select>
              </FormControl>
                <TextField
                id="Gif_Url_to_be_opened"
                label="Gif Url to be opened"
                value={Gif_Url_to_be_opened}
                onChange={(e) => setGif_Url_to_be_opened(e.target.value)}
              />
              {/* <InputLabel
                htmlFor="demo-customized-select-native"
                sx={{ pl: 1 }}
              >
                Gif Url Open
              </InputLabel>
              <FormControl sx={{ m: 1 }} variant="standard">
                <Select
                  id="demo-customized-select-native"
                  value={Gif_Url_to_be_opened}
                  onChange={(e) => setGif_Url_to_be_opened(e.target.value)}
                  input={<BootstrapInput />}
                >
                  <MenuItem aria-label="None">Select</MenuItem>
                  <MenuItem value={true}>yes</MenuItem>
                  <MenuItem value={false}>no</MenuItem>
                </Select>
              </FormControl> */}

              <Grid container spacing={0}>
                <Grid item xs={12} md={6} lg={4} mt={0}>
                  <MDBox mb={0}>
                    <TextField
                      sx={{ width: "90%" }}
                      id="ButtonColor"
                      label="Button Color"
                      value={ButtonColor}
                      onChange={(e) => setButtonColor(e.target.value)}
                      type="color"
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={6} lg={4} mt={0}>
                  <MDBox mb={0}>
                    <TextField
                      sx={{ width: "90%" }}
                      id="BackgroundColor"
                      label="Background Color"
                      value={BackgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      type="color"
                    />
                  </MDBox>
                </Grid>

                <Grid item xs={12} md={6} lg={4} mt={0} ml={0}>
                  <MDBox mb={0}>
                    <TextField
                      sx={{ width: "90%" }}
                      id="TextColor"
                      label="Text Color"
                      value={TextColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      type="color"
                    />
                  </MDBox>
                </Grid>
              </Grid>

              <InputLabel
                htmlFor="demo-customized-select-native"
                sx={{ pl: 1, pb: 0.5 }}
              >
                Urgent Update
              </InputLabel>
              <FormControl sx={{ m: 1 }} variant="standard">
                <Select
                  id="demo-customized-select-native"
                  value={UrgentUpdate}
                  onChange={(e) => setUrgentUpdate(e.target.value)}
                  input={<BootstrapInput />}
                >
                  <MenuItem aria-label="None">Select</MenuItem>
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
                onClick={handleBannerSubmit}
                style={{
                  background: "#33A2B5",
                  color: "#fff",
                  marginTop: "5px",
                }}
              >
                Send
              </Button>
              <small
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "8px",
                  textAlign: "center",
                }}
              >
                You can only add upto 100 rows of Banner, if you exceed limit of
                100,
                <br />
                then oldest one will be deleted from this page.
              </small>
            </Card>
          </form>
        </Box>
      </Dialog>

      {/* Edit Banner */}

      <Dialog
        maxWidth={maxWidth}
        open={editUserModal}
        // onClose={closeEditUserModal}
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
          // component="form"
          sx={{
            "& .MuiTextField-root": { mx: 1, my: 1 },
          }}
        >
          <MDTypography align="center" variant="h3" sx={{ px: 18 }}>
            Edit Banner
          </MDTypography>
          <Card sx={{ px: 3, py: 1, width: "100%" }}>
          {errormsg && (
                <small style={{ color: "red", fontSize: "15px" }}>
                  {errormsg}
                </small>
              )}
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
            <TextField
              required
              id="outlined-required"
              value={url}
              onChange={(e) => seturl(e.target.value)}
              label="Url"
            />
             <TextField
              required
              id="outlined-required"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              label="Header"
            />
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={6}
              label="Description Hindi"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={6}
              label="Description English"
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

            {/* <TextField
              id="App Version"
              label="App Version"
              value={AppVersion}
              onChange={(e) => setAppVersion(e.target.value)}
              type="number"
              required
            /> */}

            <InputLabel htmlFor="demo-customized-select-native" sx={{ pl: 1 }}>
              Show Button
            </InputLabel>
            <FormControl sx={{ m: 1 }} variant="standard">
              <Select
                id="demo-customized-select-native"
                value={ShowButton}
                onChange={(e) => setShowButton(e.target.value)}
                input={<BootstrapInput />}
              >
                <MenuItem value={null}>Select</MenuItem>
                <MenuItem value={true}>yes</MenuItem>
                <MenuItem value={false}>no</MenuItem>
              </Select>
            </FormControl>

            <InputLabel htmlFor="demo-customized-select-native" sx={{ pl: 1, pb: "1px" }}>
              {" "}
              Display Banner
            </InputLabel>
            <FormControl sx={{ m: 1 }} variant="standard">
              <Select
                id="demo-customized-select-native"
                value={DisplayBannerOrNot}
                onChange={(e) => setDisplayBannerOrNot(e.target.value)}
                input={<BootstrapInput />}
              >
                <MenuItem aria-label="None">Select</MenuItem>
                <MenuItem value={true}>yes</MenuItem>
                <MenuItem value={false}>no</MenuItem>
              </Select>
            </FormControl>

            {/* gif  */}
            <TextField
              id="Gif_Url"
              label="Gif Url"
              value={Gif_Url}
              onChange={(e) => setGif_Url(e.target.value)}
              required
            />

            <InputLabel htmlFor="demo-customized-select-native" sx={{ pl: 1 }}>
              Gif Visibility
            </InputLabel>
            <FormControl sx={{ m: 1 }} variant="standard">
              <Select
                id="demo-customized-select-native"
                value={Gif_Visibility}
                onChange={(e) => setGif_Visibility(e.target.value)}
                input={<BootstrapInput />}
              >
                <MenuItem avalue={null}>Select</MenuItem>
                <MenuItem value={true}>yes</MenuItem>
                <MenuItem value={false}>no</MenuItem>
              </Select>
            </FormControl>
            <TextField
                id="Gif_Url_to_be_opened"
                label="Gif Url to be opened"
                value={Gif_Url_to_be_opened}
                onChange={(e) => setGif_Url_to_be_opened(e.target.value)}
              />

            <Grid container spacing={0}>
              <Grid item xs={12} md={6} lg={4} mt={0}>
                <MDBox mb={0}>
                  <TextField
                    sx={{ width: "90%" }}
                    id="ButtonColor"
                    label="Button Color"
                    value={ButtonColor}
                    onChange={(e) => setButtonColor(e.target.value)}
                    type="color"
                  />
                </MDBox>
              </Grid>

              <Grid item xs={12} md={6} lg={4} mt={0}>
                <MDBox mb={0}>
                  <TextField
                    sx={{ width: "90%" }}
                    id="BackgroundColor"
                    label="Background Color"
                    value={BackgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    type="color"
                  />
                </MDBox>
              </Grid>

              <Grid item xs={12} md={6} lg={4} mt={0} ml={0}>
                <MDBox mb={0}>
                  <TextField
                    sx={{ width: "90%", paddingRight: 0.5 }}
                    id="TextColor"
                    label="Text Color"
                    value={TextColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    type="color"
                  />
                </MDBox>
              </Grid>
            </Grid>
            <InputLabel
              htmlFor="demo-customized-select-native"
              sx={{ pl: 1, pb: 0.5 }}
            >
              Urgent Update
            </InputLabel>
            <FormControl sx={{ m: 1 }} variant="standard">
              <Select
                id="demo-customized-select-native"
                value={UrgentUpdate}
                onChange={(e) => setUrgentUpdate(e.target.value)}
                input={<BootstrapInput />}
              >
                <MenuItem aria-label="None">Select</MenuItem>
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
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
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
          onClick={handleOpen}
          style={{
            background: "#33A2B5",
            margin: "10px",
            color: "#fff",
          }}
        >
          Add App Slider Image
        </Button>
        <Button
          type="submit"
          variant="contained"
          style={{
            background: "#33A2B5",
            margin: "10px",
            color: "#fff",
          }}
          onClick={handleBannerClickOpen}
          disabled={disabled}
        >
          Add Banner
        </Button>
      </div>
      <br />
      <div style={{ height: 460, width: "100%", marginTop: "35px" }}>
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
          rowsPerPageOptions={[50, 100]}
          loading={loading}
          components={{ 
            Toolbar: column => <CustomToolbar {...column} />,
        }}
        />
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div
              style={{
                position: "sticky",
                top: "-25px",
                zIndex: "1",
                height: "auto",
                backgroundColor: "#fff",
                padding: "0px 0px",
                margin: "0px -7px",
                borderRadius: "10px 10px 10px 10px",
              }}
            >
              <div style={{ marginTop: "-6px" }}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="close"
                  style={{
                    display: "block",
                    float: "right",
                    marginTop: "-5px",
                    marginRight: "-10px",
                  }}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <h4
                id="transition-modal-title"
                style={{ textAlign: "center", marginTop: "0px" }}
              >
             Add App Slider Image
              </h4>
            </div>
            <div>
              <Form
                addImage={getSliderImage}
                handleClose={handleClose}
              />
            </div>
          </Box>
        </Fade>
      </Modal>

<br/>
      <div className="container">
        <Imageslider/>
      </div>

    </DashboardLayout>
  );
}
export default Banner;

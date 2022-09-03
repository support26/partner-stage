import { useState, useEffect } from "react";
// import "./style.css";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
//Hooks
import useAdmin from "../../hooks/useAdmin";

//material UI
import Card from "@mui/material/Card";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MDTypography from "components/MDTypography";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP =20;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      width: 250,
      padding:10
    },
  },
};

const version = ["1.1","1.2","1.3","1.6","1.7","1.8","17.0","17.1","17.2","17.3","17.4","17.5","17.6","17.7","17.8","17.9","18.4"];

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  
  },
}));
function Banner() {
  const { GetBanner, AddBanner, UpdateBanner } = useAdmin();
  const [user_id, setUser_id] = useState("");
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [banneropen, setBannerOpen] = useState(false);
  const [url, seturl] = useState("");
  
  const [Description, setDescription] = useState("");
  const [DescriptionIsEnglish, setDescriptionIsEnglish] = useState("");
  const [AppVersion, setAppVersion] = useState("");
  const [ButtonText, setButtonText] = useState("");
  const [ShowButton, setShowButton] = useState(false);
  const [DisplayBannerOrNot, setDisplayBannerOrNot] = useState(false);

//gif 
const [Gif_Url, setGif_Url] = useState(null);
const [Gif_Visibility, setGif_Visibility] = useState(null)
const [Gif_Url_to_be_opened, setGif_Url_to_be_opened] = useState(null)


  const [errormsg, setErrormsg] = useState(null);
  const roleId = localStorage.getItem("roleId");

  const [disabled, setDisabled] = useState(roleId == 1 ? true : false);
  const [editUserModal, setEditUserModal] = useState(false);
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
    setErrormsg("");
  };

  const GetBannerData = () => {
    setLoading(true);
    var getBanners = GetBanner();
    getBanners
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setUsers(response.data.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    GetBannerData();
  }, []);
  
const handleChange = (event) => {
  const value = event.target.value;
 
  setAppVersion(value);
  console.log(AppVersion)
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
          seturl(thisRow.url);
          setDescription(thisRow.Description);
          setDescriptionIsEnglish(params.row.DescriptionIsEnglish);
         setAppVersion(params.row.AppVersion);
          setButtonText(params.row.ButtonText);
          setShowButton(params.row.ShowButton);
          setDisplayBannerOrNot(params.row.DisplayBannerOrNot);
          setGif_Url(params.row.Gif_Url);
          setGif_Visibility(params.row.Gif_Visibility);
          setGif_Url_to_be_opened(params.row.Gif_Url_to_be_opened);
          setEditUserModal(true);
          return
          //  console.log(thisRow);
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
    { field: "url", headerName: "url", width: 200 },
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
      field: "Gif_Url",
      headerName: "Gif Url ",
      width: 200,
    }, {
      field: "Gif_Visibility",
      headerName: "Gif Visibility",
      width: 110,
      renderCell: function (params) {
        return params.row.Gif_Visibility === 1 ? (
          <Button sx={{ color: "green" }}>Yes</Button>
        ) : (
          <Button sx={{ color: "red" }}>No</Button>
        );
      },
    }, {
      field: "Gif_Url_to_be_opened",
      headerName: "Gif Url to be opened ",
      width: 110,
      renderCell: function (params) {
        return params.row.Gif_Url_to_be_opened === 1 ? (
          <Button sx={{ color: "green" }}>Yes</Button>
        ) : (
          <Button sx={{ color: "red" }}>No</Button>
        );
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

  const admin_email = localStorage.getItem("user_email");

  const data = {
    url: url,
    Description: Description,
    DescriptionIsEnglish: DescriptionIsEnglish,
    AppVersion: AppVersion,
    ButtonText: ButtonText,
    ShowButton: ShowButton,
    DisplayBannerOrNot: DisplayBannerOrNot,
    Gif_Url:Gif_Url,
    Gif_Visibility:Gif_Visibility,
    Gif_Url_to_be_opened:Gif_Url_to_be_opened,
    admin_email: admin_email,
  };

  // update banner
  const handleSubmit = (event) => {
    event.preventDefault();
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
      DisplayBannerOrNot === ""
    ) {
      setErrormsg("Please fill all the fields");
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
        admin_email,
      };
      console.log(data_1);
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
             <MDTypography align="center" variant="h3" sx={{ px:18}}>
              Add Banner
              </MDTypography>
            <Card sx={{ px: 3, pt: 0,pb:2, width: "100%" }}>
            {errormsg && (
                <small style={{ color: "red", fontSize: "15px" }}>
                  {errormsg}
                </small>
              )}    
                <FormControl sx={{mb :0,p:1}} variant="standard">
                <InputLabel htmlFor="demo-customized-select-native" sx={{pl:2}}>Select Version</InputLabel>
                <br/>
                <Select
                  id="demo-customized-select-native"
                  value={AppVersion}
                  onChange={(e) => setAppVersion(e.target.value)}

                  input={<BootstrapInput />}
                  MenuProps={MenuProps}
                  
                  style= {{
                    width:'100%',
                               
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
                label="url"
              />
              <TextField
                id="outlined"
                label="Description Hindi"
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
            
     
     <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="demo-customized-select-native">Show Button</InputLabel><br/>
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

            <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="demo-customized-select-native">Display Banner</InputLabel><br/>
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
              <hr/> 
{/* gif  */}
          <TextField
              id="Gif_Url"
              label="Gif Url"
              value={Gif_Url}
              onChange={(e) => setGif_Url(e.target.value)}
              required
            />
  
            <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="demo-customized-select-native">Gif Visibility</InputLabel><br/>
                <Select
                  id="demo-customized-select-native"
                  value={Gif_Visibility}
                  onChange={(e) => setGif_Visibility(e.target.value)}
                  input={<BootstrapInput />}
                >
                  <MenuItem aria-label="None" >Select</MenuItem>
                  <MenuItem value={true}>yes</MenuItem>
                  <MenuItem value={false}>no</MenuItem>
                  
                </Select>
              </FormControl>

            <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="demo-customized-select-native">Gif Url Open</InputLabel><br/>
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
              </FormControl>


            
              <Button
                type="submit"
                variant="contained"
                value="Submit"
                onClick={handleBannerSubmit}
                style={{ background: "#33A2B5",  color:'#fff',marginTop:"5px" }}
              >
                Send
              </Button>
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
            "& .MuiTextField-root": {mx: 1, my: 1},
          }}
        >
          <MDTypography align="center" variant="h3" sx={{px:18} } >
            Edit Banner
          </MDTypography>
          <Card sx={{ px: 3, py: 1, width: "100%" }}> 
          <FormControl sx={{mb :0,p:1}} variant="standard">
                <InputLabel htmlFor="demo-customized-select-native" sx={{pl:2}}>Select Version</InputLabel>
                <Select
                  id="demo-customized-select-native"
                  value={AppVersion}
                   onChange={handleChange}
                  // onChange={(e) => setShowButton(e.target.value)}

                  input={<BootstrapInput />}
                  MenuProps={MenuProps}
                 
                  style= {{
                    width:'100%',
                               
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
              label="url"
            />
            <TextField
              id="outlined"
              label="Description Hindi"
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

            {/* <TextField
              id="App Version"
              label="App Version"
              value={AppVersion}
              onChange={(e) => setAppVersion(e.target.value)}
              type="number"
              required
            /> */}
      
       
 <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="demo-customized-select-native">Show Button</InputLabel>
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

            <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="demo-customized-select-native">Display Banner</InputLabel>
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
              <hr/> 
{/* gif  */}
          <TextField
              id="Gif_Url"
              label="Gif Url"
              value={Gif_Url}
              onChange={(e) => setGif_Url(e.target.value)}
              required
            />
  
            <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="demo-customized-select-native">Gif Visibility</InputLabel>
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

            <FormControl sx={{ m: 1 ,mb :3}} variant="standard">
                <InputLabel htmlFor="demo-customized-select-native">Gif Open</InputLabel>
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
              </FormControl>
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
            color:'#fff'
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
          rowsPerPageOptions={[10, 20, 50]}
          loading={loading}
        />
      </div>
    </DashboardLayout>
  );
}
export default Banner;

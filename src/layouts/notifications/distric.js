import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import UserRepository from "api/UsersRepository";

import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import NativeSelect from "@mui/material/NativeSelect";
import LoadingButton from '@mui/lab/LoadingButton';

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { Navigate } from "react-router-dom";

//  React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { width } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";
import axios from "axios";
import useAdmin from "../../hooks/useAdmin";

// mui custom style

function Distric() {
  const [state, setState] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [sId, setsId] = useState(null);
  const [image, setImage] = useState(null);
  const [body, setBody] = useState(null);
  const [title, setTitle] = useState("");
  const [district, setDistrict] = useState(null);
  const [error, setError] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [sendBtn, setSendBtn] = useState('send');
  const [loading, setLoading] = useState(false);
  const {SendNotificationByDistrict} = useAdmin();
  const [open, setOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [value,setValue] =useState(0)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
   
    setOpen(false);
  };

  const getDistrict = (e) => {
    //setsId(e.target.value)
    const demo = e.target.value;
    console.log(demo);

    axios
      .get(`https://project-swarksha.uc.r.appspot.com/districts?sid=${demo}`)
      .then((response) => {
        setDistricts(response.data.districts);
        // setTableLoading(false);
        console.log(response.data);
      });
  };
  useEffect(() => {
    axios
      .get("https://project-swarksha.uc.r.appspot.com/states")
      .then((response) => {
        setState(response.data.states);

        console.log(response.data);
      });
  }, []);

  let file;
  let form_data = new FormData();
  const handelDistricImages = (event) => {
    setBtnDisabled(true);
    file = event.target.files[0];
    form_data.append("file", file);
    UserRepository.UploadImageFile(form_data)
      .then((response) => {
        console.log(response.data);
        setImage(response.data.data.fileUrl);
        setBtnDisabled(false);

      })
      .catch((e) => {
        console.log(e);
      });
  };

  const sendNotification = (event) => {
    event.preventDefault();
    
    if (district === null) {
      setError("Please select district");
    }
   else if (!title || !body) {
      setError("Please fill all the fields");
    } else {
      setSendBtn(null)
      setLoading(true);
      console.log("#####", district);
      const admin_email = localStorage.getItem("user_email");
      const notification = {
        title: title,
        body: body,
        image: image,
      };
      // console.log("@@@@@@", notification);
setSendBtn(null)
    setLoading(true);
    handleClickOpen()
    // setSendBtn("")s
    var timerun = 0;
    var progressInterval = setInterval(() => {
      setValue(prev => prev + 20);
      timerun +=1
      if (timerun === 6) {
        clearInterval(progressInterval);
        setValue(0)
      }    
      }, 800);
      var sendNotificationByDistrict = SendNotificationByDistrict(notification, admin_email,district);
      sendNotificationByDistrict.then((res) => {
          console.log("%%%%%%%%%", res);
          setLoading(false);
    setSendBtn("sent succesfully")
    setTimeout(() => {
      setSendBtn("send")
      handleClose();
    }, 2000);
        })
        .catch((err) => {
          console.log("err", err);
        });
        

    }
  };

  return (
    <Card sx={{ px: 5, py: 1, pb: 4, width: "100%" }}>
      <MDTypography align="center" variant="h3" sx={{ pb: "20px" }}>
        Distric Notification
      </MDTypography>
      <Box sx={{ pb: 2, minWidth: 120 }}>
        <FormControl sx={{ width: 160 }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            State
          </InputLabel>
          <NativeSelect value={sId} onChange={getDistrict}>
            <option> None </option>
            {state.map(({ name, sid }) => {
              return (
                <option key={name} value={sid} style={{ color: "black" }}>
                  {name}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>

        <FormControl sx={{ width: 120, ml: 3 }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            District
          </InputLabel>
          <NativeSelect
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option> None </option>
            {districts.map(({ name }) => {
              return (
                <option key={name} value={name} style={{ color: "black" }}>
                  {name}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </Box>
      <TextField
        type="text"
        label="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <MDInput
        label="Type here..."
        multiline
        rows={5}
        style={{ minWidth: "auto", maxWidth: "400px", marginBottom: "10px" }}
        value={body}
        onChange={(e) => setBody(e.target.value)}
         required
      />{" "}
      {error && (
        <small style={{ color: "red", fontSize: "15px" }}>{error}</small>
      )}
      <TextField
        helperText="image / upload"
        type="file"
        inputProps={{accept:".png, .jpeg, .jpg"}}
        onChange={handelDistricImages}
      />{" "}
      <br />
      {/* <Button
        type="submit"
        variant="contained"
        style= {(btnDisabled == true)? {background: "#a7c5c9",color: "white"} : {background: "#33A2B5",color: "white" }}
        onClick={sendNotification}
        disabled={btnDisabled}
      >
        Send
      </Button> */}
      <LoadingButton
        style= {(btnDisabled == true)? {background: "#a7c5c9",color: "white"} : {background: "#33A2B5",color: "white" }}

          size="small"
          onClick={sendNotification}
          
          loading={loading}
          loadingPosition="center"
          variant="contained"
          disabled={btnDisabled}
        >
          {sendBtn}
        </LoadingButton>
        <Dialog width='100px' open={open} >
        <div>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            style={{ float: "right" ,}}
          >
            <CloseIcon />
          </IconButton>
        </div>
        
     <span style={{color:'green' , padding:20 }}> <progress value={value} max="100" style={{backgroundColor:'red'}}></progress>  {value}</span>
         
       
      </Dialog>
    </Card>
  );
}

export default Distric;

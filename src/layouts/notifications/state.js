import { useState } from "react";
import UserRepository from "api/UsersRepository";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import NativeSelect from "@mui/material/NativeSelect";


//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import useAdmin from "../../hooks/useAdmin";
import Dialog from "@mui/material/Dialog";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

//  React example components
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LoadingButton from '@mui/lab/LoadingButton';

// mui custom style

function State() {
  const [state, setState] = useState(null);
  const [stateName, setStateName] = useState([]);
  const [body, setBody] = useState(null);
  const [title, setTitle] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [sendBtn, setSendBtn] = useState('send');
  const [loading, setLoading] = useState(false);
  const {SendNotificationByNumber} = useAdmin();

  const [open, setOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [value,setValue] =useState(0)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
   
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get("https://project-swarksha.uc.r.appspot.com/states")
      .then((response) => {
        setStateName(response.data.states);
        console.log(response.data);
      });
  }, []);

  let file;
  let form_data = new FormData();
  const handelstateImages = (event) => {
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
    if (state === null) {
      setError("Please select state");
    } else if (!title || !body) {
      setError("Please fill all the fields");
    } else {
      console.log("#####", state);
      setSendBtn(null)
      setLoading(true);
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
      var sendNotificationByNumber = SendNotificationByNumber(notification,admin_email)
      sendNotificationByNumber.then((res) => {
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
    <Card sx={{ px: 5, py: 1, pb: 2, width: "100%" }}>
      <MDTypography align="center" variant="h3" sx={{ pb: "5px" }}>
        State Notification
      </MDTypography>
      <Box sx={{ pb: 3, minWidth: 120, ml: 5 }}>
        <FormControl sx={{ width: 200 }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            State
          </InputLabel>
          <NativeSelect
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          >
            <option> None </option>
            {stateName.map(({ name }) => {
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
      <TextField helperText="Image " type="file" inputProps={{accept:".png, .jpeg, .jpg"}} onChange={handelstateImages} />{" "}
      <br />
      {/* <Button
        variant="contained"
        style={
          btnDisabled == true
            ? { background: "#a7c5c9", color: "white" }
            : { background: "#33A2B5", color: "white" }
        }
        href="#contained-buttons"
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

export default State;

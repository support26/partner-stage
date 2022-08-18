import { useState } from "react";
import UserRepository from "api/UsersRepository";
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// @mui material components
import Card from "@mui/material/Card";
//  React components
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import axios from "axios";
import useAdmin from "../../hooks/useAdmin";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
// mui custom style

function Allnotification() {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendBtn, setSendBtn] = useState('send');
  const {SendNotification} = useAdmin();

  const [open, setOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [value,setValue] =useState(0)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
   
    setOpen(false);
  };

  // function handleClick() {
  //   setLoading(true);
  // }
  let file;
  let form_data = new FormData();
  const handelstateImages = (event) => {
    setBtnDisabled(true);
    file = event.target.files[0];
    form_data.append("file", file);
    UserRepository.UploadImageFile(form_data)
      .then((response) => {
        // console.log(response.data);
        setImage(response.data.data.fileUrl);
        setBtnDisabled(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const sendNotification = (event) => {
    event.preventDefault();
    if (!title) {
      setError("Please fill title fields");
    }
    else if (!body) {
      setError("Please fill message fields");
    } else {
      setSendBtn(null)
    setLoading(true);
      const admin_email = localStorage.getItem("user_email");
      const notification = {
        title: title,
        body: body,
        image: image
      };
      handleClickOpen()
      

      // setSendBtn("")s
      var timerun = 0;
    var progressInterval = setInterval(() => {
      setValue(prev => prev + 20);
      timerun +=1
         
      }, 800);
        var SendNotifications = SendNotification(notification, admin_email);
        SendNotifications.then((res) => {
          // console.log("%%%%%%%%%", res);
    setLoading(false);
    if (timerun === 6) {
      clearInterval(progressInterval);
      setValue(100)
    } 
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
      <MDTypography align="center" variant="h3" sx={{ pb: "20px" }}>
        All Notification
      </MDTypography>
      <TextField
        required
        type="text"
        label="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <MDInput
        required
        label="Type here..."
        multiline
        rows={5}
        style={{ minWidth: "auto", maxWidth: "400px", marginBottom: "10px" }}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />{" "}
      {error && (
        <small style={{ color: "red", fontSize: "15px" }}>{error}</small>
      )}
      <TextField
        helperText="image"
        type="file"
        inputProps={{accept:".png, .jpeg, .jpg"}}
        onChange={handelstateImages}
      />
      <br />
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

export default Allnotification;
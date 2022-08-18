import { useState ,useEffect} from "react";
import * as XLSX from "xlsx";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
// @mui material components
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import LoadingButton from '@mui/lab/LoadingButton';

import UserRepository from "api/UsersRepository";

//  React components
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import axios from "axios";
import useAdmin from "../../hooks/useAdmin";


// mui custom style

function Number() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [phone_number, setPhone_number] = useState([]);
  const [error, setError] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [sendBtn, setSendBtn] = useState('send');
  const [loading, setLoading] = useState(false);
  const {SendNotificationByNumber} = useAdmin();
  const [maxWidth, setMaxWidth] = useState("sm");

  const [value,setValue] =useState(0)
  // let progressInterval = '0';
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
   
    setOpen(false);
  };
  var reqData;

  let file;
  let form_data = new FormData();
  const handelDistricImages = (event) => {
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

  const onChange = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      reqData = data.split("\n");
      // console.log(reqData[0]);
      if (/[a-zA-Z]+$/.test(reqData[0]) === true) {
        reqData.shift();
      }
      // console.log(">>>>>", reqData);
      setPhone_number(reqData);
    };
    reader.readAsBinaryString(file);
  };

  const sendNotification = (event) => {

  
    event.preventDefault();
    if (phone_number.length <= 0) {
      setError("Please upload phone numbers");
    } else if (!title || !body || title.length <= 0 || body.length <= 0) {
      setError("Please fill all the fields");
    } else {
      
      setSendBtn(null)
      setLoading(true);
      // console.log("#####", phone_number);
      const admin_email = localStorage.getItem("user_email");
      const notification = {
        title: title,
        body: body,
        image: image,
      };
      // console.log("@@@@@@", notification);
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
      var sendNotificationByNumber = SendNotificationByNumber(notification, admin_email,phone_number)
      sendNotificationByNumber.then((res) => {
          // console.log("%%%%%%%%%", res);
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
  // useEffect(() => {
  //   if (value >= 100) {
  //     clearInterval(progressInterval);
  //   }
  // }, []);

  return (
    <Card sx={{ px: 5, py: 3, width: "100%", height: "530px" }}>
      <MDTypography align="center" variant="h3" sx={{ pb: "20px" }}>
        Number Notification
      </MDTypography>
      <TextField
        helperText="Upload a excel file "
        type={"file"}
        inputProps={{accept:".csv, .xls, .xlsx"}}
        onChange={onChange}
        
      />
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        label="Title..."
      />
      <br />
      <MDInput
        label="Type here..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        multiline
        rows={5}
        style={{ minWidth: "auto", maxWidth: "400px", marginBottom: "10px" }}
      />
      {error && (
        <small style={{ color: "red", fontSize: "15px" }}>{error}</small>
      )}
      <TextField
        helperText="image "
        type="file"
        inputProps={{accept:".png, .jpeg, .jpg"}}
        onChange={handelDistricImages}
      />
      <br />
      {/* <Button
        onClick={sendNotification}
        variant="contained"
        style= {(btnDisabled == true)? {background: "#a7c5c9",color: "white"} : {background: "#33A2B5",color: "white" }}
        href="#contained-buttons"
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

export default Number;

import { useState, useEffect } from "react";
import UserRepository from "api/UsersRepository";

import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// @mui material components
// import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import Box from "@mui/material/Box";
// import NativeSelect from "@mui/material/NativeSelect";

//  React components
// import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
// import MDAlert from "components/MDAlert";
// import MDButton from "components/MDButton";
// import MDSnackbar from "components/MDSnackbar";
// import { Navigate } from "react-router-dom";
// import axios from "axios";
// import { useEffect } from "react";
import useAdmin from "../../hooks/useAdmin";
// import Dialog from "@mui/material/Dialog";

// import CloseIcon from "@mui/icons-material/Close";
// import IconButton from "@mui/material/IconButton";

//  React example components
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LoadingButton from "@mui/lab/LoadingButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import "./style.css";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import ListItemIcon from "@mui/material/ListItemIcon";

// mui custom style
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 11,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 20;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      width: 250,
      padding: 10,
      fontSize: 10,
    },
  },
};

function State() {
  const [state, setState] = useState([]);
  const [stateName, setStateName] = useState([]);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [sendBtn, setSendBtn] = useState("send");
  const [loading, setLoading] = useState(false);
  const { SendNotificationByState, GetStateList } = useAdmin();

  const GetStateListForNotification = () => {
    var stateList = GetStateList();
    stateList
      .then((res) => {
        // console.log(res);
        setStateName(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  useEffect(() => {
    GetStateListForNotification();
  }, []);

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
    if (state === [""] || state === [] || state.length === 0) {
      setError("Please select state");
    } else if (!title || !body) {
      setError("Please fill all the fields");
      
    } else {
      // console.log("#####", state);
      setSendBtn(null);
      setLoading(true);
      const admin_email = localStorage.getItem("user_email");
      const notification = {
        title: title,
        body: body,
        image: image,
      };
      // console.log("@@@@@@", notification);
      setSendBtn(null);
      setLoading(true);
      var sendNotificationByState = SendNotificationByState(
        notification,
        admin_email,
        state
      );
      sendNotificationByState
        .then((res) => {
          // console.log("%%%%%%%%%", res);
          setLoading(false);
          setSendBtn("sent succesfully");
          setTimeout(() => {
            setSendBtn("send");
          }, 2000);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };
  // const isAllstate =  stateName.length > 0 && state.length === stateName.length;
  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setState(state.length === stateName.length ? [] : stateName);
      return;
    }
    setState(value);
  };
  return (
    <Card sx={{ px: 5, py: 1, pb: 2, width: "100%" }}>
      <MDTypography align="center" variant="h3" sx={{ pb: "10px" }}>
        State Notification
      </MDTypography>
        <InputLabel htmlFor="demo-customized-select-native" sx={{py:1}}>
          Select State
        </InputLabel>
      <FormControl sx={{ mb: 2, p: 0 }} variant="standard">
        
        <Select
          id="demo-customized-select-native"
          value={state}
          onChange={handleChange}
          input={<BootstrapInput />}
          MenuProps={MenuProps}
          renderValue={(selected) => selected.join(", ")}
          style={{
            width: "100%",
          }}
          multiple
        >
    <MenuItem  value={null} style={{ color: "black", size: "5px !important"}}>
                <ListItemIcon>
                <Checkbox checked={state.indexOf(null) > -1} />
              </ListItemIcon>
             
                <p>{"NONE"} </p>
              </MenuItem>
          {stateName.map(({ name }) => (
            
              <MenuItem key={name} value={name} style={{ color: "black"}}>
                <ListItemIcon>
                <Checkbox checked={state.indexOf(name) > -1} />
              </ListItemIcon>
             
                <p>{name} </p>
              </MenuItem>  
          ))}
        </Select>
      </FormControl>
      <TextField
        type="text"
        label="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <MDInput
        label="Type here your message..."
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
        helperText="jpeg / jpg / png"
        type="file"
        inputProps={{ accept: ".png, .jpeg, .jpg" }}
        onChange={handelstateImages}
      />{" "}
      <br />
   
      <LoadingButton
        style={
          btnDisabled === true
            ? { background: "#a7c5c9", color: "white" }
            : { background: "#33A2B5", color: "white" }
        }
        size="small"
        onClick={sendNotification}
        loading={loading}
        loadingPosition="center"
        variant="contained"
        disabled={btnDisabled}
      >
        {sendBtn}
      </LoadingButton>
    </Card>
  );
}

export default State;

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
    fontSize: 16,
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
  const [open, setOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [value, setValue] = useState(0);
  const { SendNotificationByState, GetStateList } = useAdmin();

  const GetStateListForNotification = () => {
    var stateList = GetStateList();
    stateList
      .then((res) => {
        setStateName(res.data.states);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    GetStateListForNotification();
    // axios
    //   .get("https://project-swarksha.uc.r.appspot.com/states")
    //   .then((response) => {
    //     setStateName(response.data.states);
    //     // console.log(response.data);
    //   });
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
    if (state === null || state === "") {
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
      handleClickOpen();

      // setSendBtn("")s
      var timerun = 0;
      var progressInterval = setInterval(() => {
        setValue((prev) => prev + 20);
        timerun += 1;
        if (timerun === 6) {
          clearInterval(progressInterval);
          setValue(0);
        }
      }, 800);
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
            handleClose();
          }, 2000);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const isAllSelected = stateName.length > 0 && state.length === stateName.length;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setState(stateName.length === state.length ? [] : state);
      return;
    }
    setState(value);
    console.log(state);
  };
  // const handleChange = (event) => {
  //   const {
  //     target: { value }
  //   } = event;
  //   setState(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  //   console.log(state)
  // };

  return (
    <Card sx={{ px: 5, py: 1, pb: 2, width: "100%" }}>
      <MDTypography align="center" variant="h3" sx={{ pb: "5px" }}>
        State Notification
      </MDTypography>
      <FormControl sx={{ mb: 2, p: 0 }} variant="standard">
        <InputLabel htmlFor="demo-customized-select-native">
          State...
        </InputLabel>
        <br />
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
          <MenuItem value="all">
            <ListItemIcon>
              <Checkbox
                checked={isAllSelected}
                indeterminate={
                  state.length > 0 && state.length < stateName.length
                }
              />
            </ListItemIcon>
            <ListItemText primary="Select All" />
          </MenuItem>

          {stateName.map(({ name }) => {
            return (
              <MenuItem key={name} value={name} style={{ color: "black" }}>
                <ListItemIcon>
                <Checkbox checked={state.indexOf(name) > -1} />
              </ListItemIcon>
             
                <ListItemText primary={name} />
              </MenuItem>



            );
          })}
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
        helperText="Image "
        type="file"
        inputProps={{ accept: ".png, .jpeg, .jpg" }}
        onChange={handelstateImages}
      />{" "}
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
        style={
          btnDisabled == true
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
      <Dialog width="100px" open={open}>
        <div>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            style={{ float: "right" }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <span style={{ color: "green", padding: 20 }}>
          {" "}
          <progress
            value={value}
            max="100"
            style={{ backgroundColor: "red" }}
          ></progress>{" "}
          {value}
        </span>
      </Dialog>
    </Card>
  );
}

export default State;

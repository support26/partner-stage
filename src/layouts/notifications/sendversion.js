import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
// @mui material components
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import LoadingButton from "@mui/lab/LoadingButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import UserRepository from "api/UsersRepository";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
//  React components
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import axios from "axios";
import useAdmin from "../../hooks/useAdmin";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import ListItemIcon from "@mui/material/ListItemIcon";

import { height } from "@mui/system";
import "./style.css";
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

const version = ["17.8", "17.9", "18.0", "18.1", "1.6", "1.7", "1.8", "null"];

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

function Version() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [AppVersion, setAppVersion] = useState([]);
  const [error, setError] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [sendBtn, setSendBtn] = useState("send");
  const [loading, setLoading] = useState(false);
  const { SendNotificationByVersion } = useAdmin();
  const [maxWidth, setMaxWidth] = useState("sm");

  const [value, setValue] = useState(0);
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
  const handelVersion = (event) => {
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
    if (!title || !body || title.length <= 0 || body.length <= 0) {
      setError("Please fill all the fields");
    } else {
      setSendBtn(null);
      setLoading(true);
      // console.log("#####", version);
      const admin_email = localStorage.getItem("user_email");
      const notification = {
        title: title,
        body: body,
        image: image,
      };
      // console.log("@@@@@@", notification);
      setLoading(true);
      handleClickOpen();

      // setSendBtn("")
      var timerun = 0;
      var progressInterval = setInterval(() => {
        setValue((prev) => prev + 20);
        timerun += 1;
        if (timerun === 6) {
          clearInterval(progressInterval);
          setValue(0);
        }
      }, 800);
      var sendNotificationByVersion = SendNotificationByVersion(
        notification,
        admin_email,
        AppVersion
      );
      sendNotificationByVersion
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
  const isAllSelected = version.length > 0 && AppVersion.length === version.length;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setAppVersion(AppVersion.length === version.length ? [] : version);
      return;
    }
    setAppVersion(value);
    console.log(AppVersion);
  };

  return (
    <div>
      <MDTypography align="center" variant="h3" sx={{ pb: "20px" }}>
        Send By Version
      </MDTypography>
      <Card sx={{ px: 5, py: 2, width: "100%" }}>
        <FormControl sx={{ mb: 3 }} variant="standard">
          <InputLabel htmlFor="demo-customized-select-native">
            Version...
          </InputLabel>
          <br />
          <Select
            id="demo-customized-select-native"
            value={AppVersion}
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
                    AppVersion.length > 0 && AppVersion.length < version.length
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Select All" />
            </MenuItem>
            {version.map((version) => (
              <MenuItem key={version} value={version}>
                <ListItemIcon>
                  <Checkbox checked={AppVersion.indexOf(version) > -1} />
                </ListItemIcon>
                <ListItemText primary={version} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          inputProps={{ accept: ".png, .jpeg, .jpg" }}
          onChange={handelVersion}
        />
        <br />

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
    </div>
  );
}

export default Version;

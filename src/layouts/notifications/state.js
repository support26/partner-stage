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

//  React example components
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// mui custom style

function State() {
  const [state, setState] = useState(null);
  const [stateName, setStateName] = useState([]);
  const [body, setBody] = useState(null);
  const [title, setTitle] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);

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
      const admin_email = localStorage.getItem("user_email");
      const notification = {
        title: title,
        body: body,
        image: image,
      };
      console.log("@@@@@@", notification);
      axios
        .post("http://localhost:8001/users/notification", {
          state,
          notification,
          admin_email
        })
        .then((res) => {
          console.log("%%%%%%%%%", res);
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
      <Button
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
      </Button>
    </Card>
  );
}

export default State;

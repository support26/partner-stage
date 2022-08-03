import { useState } from "react";
import UserRepository from "api/UsersRepository";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import axios from "axios";
import { useEffect } from "react";

// mui custom style

function Allnotification() {
  const [body, setBody] = useState(null);
  const [title, setTitle] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);


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
    if (!title) {
      setError("Please fill title fields");
    }
    else if (!body) {
      setError("Please fill message fields");
    } else {
      const notification = {
        title: title,
        body: body,
        image: image,
      };
      console.log("@@@@@@", notification);
      axios
        .post("http://localhost:8001/users/notification", {
          notification,
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
      <Button
        variant="contained"
        style= {(btnDisabled == true)? {background: "#a7c5c9",color: "white"} : {background: "#33A2B5",color: "white" }}
        href="#contained-buttons"
        onClick={sendNotification}
        disabled={btnDisabled}
      >
        Send
      </Button>
    </Card>
  );
}

export default Allnotification;

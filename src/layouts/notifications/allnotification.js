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


  let file;
  let form_data = new FormData();
  const handelstateImages = (event) => {
    file = event.target.files[0];
    form_data.append("file", file);
    UserRepository.UploadImageFile(form_data)
      .then((response) => {
        console.log(response.data);
        setImage(response.data.data.fileUrl);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const sendNotification = (event) => {
    event.preventDefault();
    
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
  };

  return (
    <Card sx={{ px: 5, py: 1, pb: 2, width: "100%" }}>
      <MDTypography align="center" variant="h3" sx={{ pb: "20px" }}>
        All Notification
      </MDTypography>
  
      <TextField
        type="text"
        label="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <MDInput
        label="Type here..."
        multiline
        rows={5}
        style={{ minWidth: "auto", maxWidth: "400px" }}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <br />
      <TextField
        helperText="Any ID Proof Photo(Aadhar/Voter ID) "
        type="file"
        onChange={handelstateImages}
        // src={stateImages}
      />
      <br />
      <Button
        variant="contained"
        style={{ background: "#33A2B5", color: "white" }}
        href="#contained-buttons"
        onClick={sendNotification}
      >
        Send
      </Button>
    </Card>
  );
}

export default Allnotification;

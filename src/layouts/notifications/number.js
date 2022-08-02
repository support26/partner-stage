import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import NativeSelect from "@mui/material/NativeSelect";
import UserRepository from "api/UsersRepository";

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
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { width } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import * as XLSX from "xlsx";

// mui custom style

function Number() {
  const [state, setState] = useState([]);
  const [stateId, setStateId] = useState(null);
  const [nubmber, setNumberImages] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [phone_number, setPhone_number] = useState([])
  var reqData;

  let file;
  let form_data = new FormData();
  const handelDistricImages = (event) => {
    file = event.target.files[0];
    form_data.append("file", file);
    UserRepository.UploadImageFile(form_data)
      .then((response) => {
        console.log(response.data);
        setNumberImages(response.data.data.fileUrl);
       setImage(response.data.data.fileUrl);
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
      reqData.shift();
      console.log(">>>>>", reqData);
      setPhone_number(reqData)
    };
    reader.readAsBinaryString(file);
  };
  
  const sendNotification = (event) => {
  
  console.log("#####", phone_number);
    event.preventDefault();
    const notification = {
      title: title,
      body: body,
      image: image,
    };
   console.log("@@@@@@",notification);
    axios
      .post("http://localhost:8001/users/notification", {phone_number, notification})
      .then((res) => {
        console.log("%%%%%%%%%", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <Card sx={{ px: 5, py: 3, width: "100%" }}>
      <MDTypography align="center" variant="h3" sx={{ pb: "20px" }}>
        Number Notification
      </MDTypography>
      <TextField
        helperText="Upload a excel file "
        type="file"
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
        style={{ minWidth: "auto", maxWidth: "400px" }}
      />
      <br />
      <TextField
        helperText="Any ID Proof Photo(Aadhar/Voter ID) "
        type="file"
        onChange={handelDistricImages}
      />{" "}
      <br />
      <Button
        onClick={sendNotification}
        variant="contained"
        style={{ background: "#33A2B5", color: "white" }}
        href="#contained-buttons"
      >
        Send
      </Button>
    </Card>
  );
}

export default Number;

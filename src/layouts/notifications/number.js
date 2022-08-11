import { useState } from "react";
import * as XLSX from "xlsx";

// @mui material components
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import UserRepository from "api/UsersRepository";

//  React components
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import axios from "axios";

// mui custom style

function Number() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [phone_number, setPhone_number] = useState([]);
  const [error, setError] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);

  var reqData;

  let file;
  let form_data = new FormData();
  const handelDistricImages = (event) => {
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
      console.log(reqData[0]);
      if (/[a-zA-Z]+$/.test(reqData[0]) === true) {
        reqData.shift();
      }
      console.log(">>>>>", reqData);
      setPhone_number(reqData);
    };
    reader.readAsBinaryString(file);
  };

  const sendNotification = (event) => {
    event.preventDefault();
    if (phone_number.length <= 0) {
      setError("Please upload phone numbers");
    } else if (!title || !body) {
      setError("Please fill all the fields");
    } else {
      console.log("#####", phone_number);
      const admin_email = localStorage.getItem("user_email");
      const notification = {
        title: title,
        body: body,
        image: image,
      };
      console.log("@@@@@@", notification);
      axios
        .post("http://localhost:8001/users/notification", {
          phone_number,
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
      <Button
        onClick={sendNotification}
        variant="contained"
        style= {(btnDisabled == true)? {background: "#a7c5c9",color: "white"} : {background: "#33A2B5",color: "white" }}
        href="#contained-buttons"
        disabled={btnDisabled}
      >
        Send
      </Button>
    </Card>
  );
}

export default Number;

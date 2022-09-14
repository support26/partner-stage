import { useState } from "react";
import * as XLSX from "xlsx";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import LoadingButton from "@mui/lab/LoadingButton";
import UserRepository from "api/UsersRepository";
//  React components
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import useAdmin from "../../hooks/useAdmin";

// mui custom style

function Number() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [phone_number, setPhone_number] = useState([]);
  const [error, setError] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [sendBtn, setSendBtn] = useState("send");
  const [loading, setLoading] = useState(false);
  const { SendNotificationByNumber } = useAdmin();

  // const [open, setOpen] = useState(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {

  //   setOpen(false);
  // };
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
      setSendBtn(null);
      setLoading(true);
      // console.log("#####", phone_number);
      const admin_email = localStorage.getItem("user_email");
      const notification = {
        title: title,
        body: body,
        image: image,
      };
      // console.log("@@@@@@", notification);
      var sendNotificationByNumber = SendNotificationByNumber(
        notification,
        admin_email,
        phone_number
      );
      sendNotificationByNumber
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

  return (
    <Card sx={{ px: 5, py: 1, width: "100%" }}>
      <MDTypography align="center" variant="h3">
        Send By Number
      </MDTypography>
      <TextField
        helperText="Upload a excel file "
        type={"file"}
        inputProps={{ accept: ".csv, .xls, .xlsx" }}
        onChange={onChange}
        sx={{py:1}}
      />
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        label="Title..."
        />
        <br/>
      
      <MDInput
        label="Type here your message..."
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
        helperText="jpeg / jpg / png"
        type="file"
        inputProps={{ accept: ".png, .jpeg, .jpg" }}
        onChange={handelDistricImages}
      />
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

export default Number;

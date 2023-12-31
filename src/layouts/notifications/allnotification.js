import { useState } from "react";
import UserRepository from "api/UsersRepository";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
// @mui material components
import Card from "@mui/material/Card";
//  React components
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import useAdmin from "../../hooks/useAdmin";

function Allnotification() {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendBtn, setSendBtn] = useState("send");
  const { SendNotification } = useAdmin();

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
    if (!title) {
      setError("Please fill title fields");
    } else if (!body) {
      setError("Please fill message fields");
    } else {
      setSendBtn(null);
      setLoading(true);
      const admin_email = localStorage.getItem("user_email");
      const notification = {
        title: title,
        body: body,
        image: image,
      };
      var SendNotifications = SendNotification(notification, admin_email);
      SendNotifications.then((res) => {
        // console.log("%%%%%%%%%", res);
      setSendBtn(null);
        setLoading(false);
        setSendBtn("sent succesfully");
        setTimeout(() => {
          setSendBtn("send");
        }, 2000);
      }).catch((err) => {
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
        label="Type here your message..."
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
        helperText="jpeg / jpg / png"
        type="file"
        inputProps={{ accept: ".png, .jpeg, .jpg" }}
        onChange={handelstateImages}
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
    </Card>
  );
}

export default Allnotification;

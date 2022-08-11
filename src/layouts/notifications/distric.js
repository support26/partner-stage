import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import UserRepository from "api/UsersRepository";

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

//  React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { width } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";
import axios from "axios";

// mui custom style

function Distric() {
  const [state, setState] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [sId, setsId] = useState(null);
  const [image, setImage] = useState(null);
  const [body, setBody] = useState(null);
  const [title, setTitle] = useState(null);
  const [district, setDistrict] = useState(null);
  const [error, setError] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);


  const getDistrict = (e) => {
    //setsId(e.target.value)
    const demo = e.target.value;
    console.log(demo);

    axios
      .get(`https://project-swarksha.uc.r.appspot.com/districts?sid=${demo}`)
      .then((response) => {
        setDistricts(response.data.districts);
        // setTableLoading(false);
        console.log(response.data);
      });
  };
  useEffect(() => {
    axios
      .get("https://project-swarksha.uc.r.appspot.com/states")
      .then((response) => {
        setState(response.data.states);

        console.log(response.data);
      });
  }, []);

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

  const sendNotification = (event) => {
    event.preventDefault();
    
    if (district === null) {
      setError("Please select district");
    }
   else if (!title || !body) {
      setError("Please fill all the fields");
    } else {
      console.log("#####", district);
      const admin_email = localStorage.getItem("user_email");
      const notification = {
        title: title,
        body: body,
        image: image,
      };
      console.log("@@@@@@", notification);
      axios
        .post("http://localhost:8001/users/notification", {
          district,
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
    <Card sx={{ px: 5, py: 1, pb: 4, width: "100%" }}>
      <MDTypography align="center" variant="h3" sx={{ pb: "20px" }}>
        Distric Notification
      </MDTypography>
      <Box sx={{ pb: 2, minWidth: 120 }}>
        <FormControl sx={{ width: 160 }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            State
          </InputLabel>
          <NativeSelect value={sId} onChange={getDistrict}>
            <option> None </option>
            {state.map(({ name, sid }) => {
              return (
                <option key={name} value={sid} style={{ color: "black" }}>
                  {name}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>

        <FormControl sx={{ width: 120, ml: 3 }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            District
          </InputLabel>
          <NativeSelect
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option> None </option>
            {districts.map(({ name }) => {
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
      <TextField
        helperText="image / upload"
        type="file"
        inputProps={{accept:".png, .jpeg, .jpg"}}
        onChange={handelDistricImages}
      />{" "}
      <br />
      <Button
        type="submit"
        variant="contained"
        style= {(btnDisabled == true)? {background: "#a7c5c9",color: "white"} : {background: "#33A2B5",color: "white" }}
        onClick={sendNotification}
        disabled={btnDisabled}
      >
        Send
      </Button>
    </Card>
  );
}

export default Distric;

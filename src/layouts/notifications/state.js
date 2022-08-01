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
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { width } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


// mui custom style

function State() {
  const [state, setState] = useState([]);
  const [stateId,setStateId] = useState(null);
  const [stateName,setStateName] = useState(null);
  const [stateImages,setStateImages] = useState(null);
 
  // useEffect(() => {
  //     const res =  axios.get('https://project-swarksha.uc.r.appspot.com/states', {
  //          headers:{

  //           'Accept': "application/json",

  //          }
  //        })
  //        console.log(res);
  //    }, []);
  const stateNamefun =e =>{
      const state = e.target.value
      console.log(state);
  }

  useEffect(() => {
    axios
      .get("https://project-swarksha.uc.r.appspot.com/states")
      .then((response) => {
        setState(response.data.states);
        // setTableLoading(false);
        console.log(response.data);
      });
  }, []);

  let file;
  let form_data = new FormData();
  const handelstateImages = (event) => {
    file = event.target.files[0];
    form_data.append("file", file);
    UserRepository.UploadImageFile(form_data)
      .then((response) => {
        console.log(response.data);
        setStateImages(response.data.data.fileUrl);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Card sx={{ px: 5, py: 1, pb:4, width: "100%" }}>
      <MDTypography align="center" variant="h3" sx={{ pb: "20px" }}>
        State Notification
      </MDTypography>
      <Box sx={{ pb: 3, minWidth: 120, ml: 5 }}>
        <FormControl sx={{ width: 200 }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            State
          </InputLabel>
          <NativeSelect
             value = {stateName}
             onChange={stateNamefun}
          > <option >   None      </option>
            {state.map(({name}) => {
              return (
                <option key={name} value={name} style={{color:'black'}}>
                  {name}
                  
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </Box>
      <MDInput
        label="Type here..."
        multiline
        rows={5}
        style={{ minWidth: "auto", maxWidth: "400px" }}
      />{" "}
      <br />
      <TextField
        helperText="Any ID Proof Photo(Aadhar/Voter ID) "
        type="file"
        onChange={handelstateImages}
       // src={stateImages}
      />{" "}
      <br />
      <Button
        variant="contained"
        style={{ background: "#33A2B5", color: "white" }}
        href="#contained-buttons"
      >
        Send
      </Button>
    </Card>
  );
}

export default State;

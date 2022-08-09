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
import useAdmin from "../../hooks/useAdmin";

// mui custom style

function Anouncement() {
  const [AnnouncementText, setAnnouncementText] = useState("");
  const [AnnouncementIsEnglish, setAnnouncementIsEnglish] = useState("");
  const [DisplayAnnouncementTextOrNot, setDisplayAnnouncementTextOrNot] =
    useState(false);
  const admin_email = localStorage.getItem("user_email");
  const { Anouncements } = useAdmin();
  const data = {
    AnnouncementText,
    AnnouncementIsEnglish,
    DisplayAnnouncementTextOrNot,
    admin_email,
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data)
    var addAnnouncement = Anouncements(data);
    addAnnouncement.then((response) => {
      setAnnouncementText("");
      setAnnouncementIsEnglish("");
      setDisplayAnnouncementTextOrNot("");
      console.log(response)
    });
  };
  return (
   <form >  <Card sx={{ px: 3, py: 2, pb: 4, width: "100%" }}>
        <MDTypography align="center" variant="h3" sx={{ pb: "20px" }}>
          Anouncement Notification
        </MDTypography>

       
        <TextField
          id="outlined"
          required
          value={AnnouncementText}
          onChange={(e) => setAnnouncementText(e.target.value)}
          label="Announcement Hindi"
        />

        <TextField
          id="outlined-input"
          label="AnnouncementIs English"
          type="text"
          value={AnnouncementIsEnglish}
          onChange={(e) => setAnnouncementIsEnglish(e.target.value)}
          required
        />
        <div style={{ marginLeft: 30, marginBottom: 20 }}>
          <MDTypography>Display Banner</MDTypography>
          <Select
            // value={age}
            // onChange={handleChange}
            label="Display"
            required
            style={{ width: 200, height: 30 }}
            value={DisplayAnnouncementTextOrNot}
            onChange={(e) => setDisplayAnnouncementTextOrNot(e.target.value)}
          >
            <MenuItem value="None">
              <em>None</em>
            </MenuItem>
            <MenuItem value= {true} >yes</MenuItem>
            <MenuItem value= {false} >no</MenuItem>
          </Select>
        </div>

        {/* <Box paddingLeft={10}>
            <MDTypography for="cars">DisplayAnnouncementTextOrNot</MDTypography>
            <select name="cars" id="cars">
              <option value="true">yes</option>
              <option value="false">No</option>
            </select>
          </Box> */}
        <Button
          type="submit"
          variant="contained"
          value="Submit"
          style={{ background: "#33A2B5", color: "white" }}
          onClick={handleSubmit}
        >
          Send
        </Button>
  
      </Card>  </form>
  );
}

export default Anouncement;

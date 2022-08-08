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

function Editbanner_announcement(props) {

// mui custom style
const [AnnouncementText, setAnnouncementText] = useState("");
const [AnnouncementIsEnglish, setAnnouncementIsEnglish] = useState("");
const [DisplayAnnouncementTextOrNot, setDisplayAnnouncementTextOrNot] =
  useState(false);


  const [url, seturl] = useState("");
  const [Description, setDescription] = useState("");
  const [DescriptionIsEnglish, setDescriptionIsEnglish] = useState("");
  const [AppVersion, setAppVersion] = useState("");
  const [ButtonText, setButtonText] = useState("");
  const [ShowButton, setShowButton] = useState(false);
  const [DisplayBannerOrNot, setDisplayBannerOrNot] = useState(false);

  const admin_email = localStorage.getItem("user_email");


const { Anouncements } = useAdmin();
const data = {
  AnnouncementText,
  AnnouncementIsEnglish,
  DisplayAnnouncementTextOrNot,
  url,
  Description,
  DescriptionIsEnglish,
  AppVersion,
  ButtonText,
  ShowButton,
  DisplayBannerOrNot,
  admin_email,
};

    return (

<div>
  
<MDTypography align="center" variant="h3" sx={{ pb: "20px" }}>
              Anouncement & Banner
            </MDTypography>
          <Card sx={{ px: 5, py: 1, pb: 4, width: "100%" }}>
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
        <TextField
            required
            id="outlined-required"
            value={url}
            onChange={(e) => seturl(e.target.value)}
            label="url"
          />
          <TextField
            id="outlined"
            label="Description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            id="outlined-input"
            label="DescriptionIsEnglish"
            type="text"
            required
            value={DescriptionIsEnglish}
            onChange={(e) => setDescriptionIsEnglish(e.target.value)}
          />
          <TextField
            id="Button Text"
            label="Button Text"
            value={ButtonText}
            onChange={(e) => setButtonText(e.target.value)}
            required
          />

          <TextField
            id="App Version"
            label="App Version"
            value={AppVersion}
            onChange={(e) => setAppVersion(e.target.value)}
            type='number'
            required
          />

          <div style={{ display: "flex" }}>
            <div style={{ margin: 8 }}>
              <MDTypography for="cars">show button</MDTypography>

              <Select
                // value={age}
                // onChange={handleChange}
                label="Age"
                required
                style={{ width: 150, height: 30, border: "2px solide red" }}
                value={ShowButton}
                onChange={(e) => setShowButton(e.target.value)}
              >
                <MenuItem value="None"></MenuItem>
                <MenuItem value={true}>yes</MenuItem>
                <MenuItem value={false}>no</MenuItem>
              </Select>
            </div>
            <div style={{ margin: 8 }}>
              <MDTypography for="cars">Display Banner</MDTypography>
              <Select
                // value={age}
                // onChange={handleChange}
                label="Age"
                required
                style={{ width: 150, height: 30, border: "2px solide red" }}
                DisplayBannerOrNot
                value={DisplayBannerOrNot}
                onChange={(e) => setDisplayBannerOrNot(e.target.value)}
              >
                <MenuItem value="None"></MenuItem>
                <MenuItem value={true}>yes</MenuItem>
                <MenuItem value={false}>no</MenuItem>
              </Select>
            </div>
          </div>
            {/* <TextField required id="outlined-required" label="url" />
            <TextField id="outlined" label="Description" />
            <TextField
              id="outlined-input"
              label="DescriptionIsEnglish"
              type="text"
            />
            <TextField id="Button Text" label="Button Text" />

            <TextField id="App Version" label="App Version" />

            <div style={{ display: "flex" }}>
              <div style={{ margin: 8 }}>
                <MDTypography for="cars">show button</MDTypography>

                <Select
                  // value={age}
                  // onChange={handleChange}
                  label="Age"
                  style={{ width: 150, height: 30, border: "2px solide red" }}
                >
                  <MenuItem value="None">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="true">yes</MenuItem>
                  <MenuItem value="false">no</MenuItem>
                </Select>
              </div>
              <div style={{ margin: 8 }}>
                <MDTypography for="cars">Display Banner</MDTypography>
                <Select
                  // value={age}
                  // onChange={handleChange}
                  label="Age"
                  style={{ width: 150, height: 30, border: "2px solide red" }}
                >
                  <MenuItem value="None">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="true">yes</MenuItem>
                  <MenuItem value="false">no</MenuItem>
                </Select>
              </div>
            </div>

            <TextField id="outlined" label="Announcement Hindi" />
            <TextField
              id="outlined-input"
              label="AnnouncementIs English"
              type="text"
            />
            <div style={{ marginLeft: 30, marginBottom: 20 }}>
              <MDTypography>Display Text</MDTypography>
              <Select
                // value={age}
                // onChange={handleChange}
                label=""
                style={{ width: 200, height: 30 }}
              >
                <MenuItem value="None">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="true">yes</MenuItem>
                <MenuItem value="false">no</MenuItem>
              </Select>
            </div> */}

            <Button
              type="submit"
              variant="contained"
              style={{ background: "#33A2B5", color: "white" }}
            >
              Send
            </Button>
          </Card>   
</div>



        );
    }

export default Editbanner_announcement;
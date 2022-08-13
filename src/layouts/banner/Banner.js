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

function Banner() {
  const [url, seturl] = useState("");
  const [Description, setDescription] = useState("");
  const [DescriptionIsEnglish, setDescriptionIsEnglish] = useState("");
  const [AppVersion, setAppVersion] = useState("");
  const [ButtonText, setButtonText] = useState("");
  const [ShowButton, setShowButton] = useState(false);
  const [DisplayBannerOrNot, setDisplayBannerOrNot] = useState(false);
  const admin_email = localStorage.getItem("user_email");
  const { Banners } = useAdmin();
  const data = {
    url,
    Description,
    DescriptionIsEnglish,
    AppVersion,
    ButtonText,
    ShowButton,
    DisplayBannerOrNot,
    admin_email,
  };

  const handleBannerSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    var addBanners = Banners(data);
    addBanners.then((response) => {
      seturl("");
      setDescription("");
      setDescriptionIsEnglish("");
      setAppVersion("");
      setButtonText("");
      setShowButton("");
      setDisplayBannerOrNot("");

      console.log(response);
    });
  };

  return (
    <div>
      <MDTypography align="center" variant="h3" sx={{ mx: 8 }}>
        Banner Notification
      </MDTypography>
      <form  onSubmit={handleBannerSubmit}>
        <Card sx={{ px: 3, py: 2, pb: 1, width: "100%" }}>
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

          <Button
            type="submit"
            variant="contained"
            style={{ background: "#33A2B5", color: "white" }}
           
          >
            Send
          </Button>
        </Card>
      </form>
    </div>
  );
}

export default Banner;

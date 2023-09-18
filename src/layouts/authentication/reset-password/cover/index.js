import React, { useState, useEffect } from "react";
// import ReactDOM from 'react-dom'
// import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// import Alert from '@mui/material/Alert'

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/Ellipse 1 (1).svg";

//sign css
import "layouts/authentication/sign-in/sign.css";
import useAdmin from "../../../../hooks/useAdmin";
import { useDispatch, useSelector } from "react-redux";

function Cover() {
  const nav = useNavigate();
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [message, setMessage] = useState(<p style={{ fontSize: "10px", color: "red" }}>
    Password must be at least 8 characters long, contain at least one number, one uppercase letter, one lowercase letter and one special character.
  </p>);

  // const [msg, setMsg] = useState()
  const { msg } = useSelector((state) => state.auth);

  // const {GetUserProfile} = useAdmin()
  const { Reset } = useAdmin();
  const Regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  //console.log(GetUserProfile);
  // console.log(document.cookie);
  const handleReset = (event) => {
    event.preventDefault();
    if (newPassword.length >= 8) {
      setMessage("");
      if (newPassword !== oldPassword) {
        if (!Regex.test(newPassword)) {
          setMessage(
            <p style={{ fontSize: "10px", color: "red" }}>
              <b>Must</b> include at least <b>one</b> number, <b>one</b> uppercase letter, <b>one</b> lowercase letter and <b>one</b> special character.
            </p>
          );
        } else {
          if (newPassword === confirmpassword) {
            Reset({ oldPassword, newPassword });
          } else {
            setMessage(
              <p style={{ fontSize: "10px", color: "red" }}>
                Password does not match
              </p>
            );
          }
        }
      } else {
        setMessage(
          <p style={{ fontSize: "10px", color: "red" }}>
            New password cannot be same as old password
          </p>
        );
      }
    } else {
      setMessage(
        <p style={{ fontSize: "10px", color: "red" }}>
          Password must be of 8 characters
        </p>
      );
    }
    // if(!localStorage.getItem('token')){
    //     return <Navigate to='/' />
    //   }
  };

  return (
    <>
      <BasicLayout className="banner-sign ">
        <div className="logo-img">
          <img
            src={bgImage}
            width="100px"
            height="100px"
            className="sign-img "
          />
        </div>

        <Card className="cardName">
          <MDBox
            className="cardName"
            variant="gradient"
            p={2}
            pt={5}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="black" mt={1}>
              Please Update Your Password
            </MDTypography>
          </MDBox>

          <form onSubmit={handleReset}>
            <MDBox mb={2} px={4}>
              <MDInput
                className="sign-input"
                autoFocus
                id="name"
                value={oldPassword}
                type="password"
                name="OldPassword"
                placeholder="Old Password"
                onChange={(e) => setoldPassword(e.target.value)}
                required
                fullWidth
              />
              <small style={{ color: "red", fontSize: "15px" }}>{msg}</small>
            </MDBox>
            <MDBox mb={2} px={4}>
              <MDInput
                className="sign-input"
                type="password"
                name="password"
                value={newPassword}
                placeholder="New Password"
                onChange={(e) => setnewPassword(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={5} px={4}>
              <MDInput
                className="sign-input"
                type="password"
                name="ConfirmPassword"
                value={confirmpassword}
                placeholder="Confirm Password"
                onChange={(e) => setconfirmpassword(e.target.value)}
                fullWidth
              />
              <small style={{ color: "red", fontSize: "15px" }}>
                {message}
              </small>
            </MDBox>
            <MDBox mb={0} px={3}>
              <MDButton
                className="sign-button"
                type="submit"
                value="Submit"
                // onClick={createPost}
              >
                Submit
              </MDButton>{" "}
              <MDTypography
                my={2}
                fontSize="small"
                fontWeight="medium"
                textAlign="center"
              ></MDTypography>
            </MDBox>
          </form>
        </Card>
      </BasicLayout>
    </>
  );
}

export default Cover;

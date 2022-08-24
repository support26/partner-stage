import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

import Hide from 'assets/images/hide1.png';
import Show from 'assets/images/eye.png';
// @mui material components
import Card from "@mui/material/Card";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/Ellipse 1 (1).svg";

//sign css
import "./sign.css";
import Cookies from 'js-cookie'
import useAdmin from '../../../hooks/useAdmin'
import { Redirect } from "react-router-dom";
import  {error} from 'api/AuthRepository';
import { margin } from "@mui/system";
 
function Basic () {
  const nav = useNavigate()
 
  const [admin_name, setadmin_name] = useState('')
  const [password, setPassword] = useState('')
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  // const [msg, setMsg] = useState()
  const {login, isLogin} = useAdmin()
 
    const {msg}= useSelector((state)=>state.auth)
     const dispatch = useDispatch();
  const handleSubmit = event => {
    event.preventDefault();
  
    login({admin_name, password})
    // axios
    //   .post('http://localhost:8001/admin/login', { admin_name, password })
    //   .then(response => {
        
    //       nav('/dashboard')
    //       sessionStorage.setItem(
    //         'session_token',
    //         response.data.data.session_token
    //       )
    //       sessionStorage.setItem('login_id', response.data.data.id)
    //       sessionStorage.setItem('login_count', response.data.data.login_count)
    //       sessionStorage.setItem('user_email', response.data.data.user_email)
    //       sessionStorage.setItem('users_name', response.data.data.users_name)
    //       console.log(response)
    //       if (response.data.data.roleId === 1) {
    //         sessionStorage.setItem('role_id', 'Support')
    //       } else {
    //         sessionStorage.setItem('role_id', 'Admin')
    //       }
        
    //   })
    //   .catch(e => {
    //     // console.log(e.response.data.data)
    //     setMsg(e.response.data.data)
    //   })
    setadmin_name('')
    setPassword('')
  }
  useEffect(() => {
    const session_token = Cookies.get('token') ;
  if (session_token) {
   nav("/dashboard");
  }
  
  }, [])
  
 
  // if (session_token) {
  //   return <Navigate to="/dashboard" />;
  // }
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

        <Card className="cardName" >
          <MDBox
            className="cardName"
            variant="gradient"
            p={2}
            pt={5}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="black" mt={1}>
              Sign in
            </MDTypography>
          </MDBox>

          <form onSubmit={handleSubmit}>
            <MDBox mb={2} px={4}>
              <MDInput
                className="sign-input"
               
                id="name"
                value={admin_name}
                onChange={(e) => setadmin_name(e.target.value)}
                type="text"
                name="admin_name"
                placeholder="username"
                required
                fullWidth
              />
            </MDBox>
            <MDBox mb={5} px={4}>
              <MDInput
                className="sign-input"
            
                type={isRevealPwd ? "text" : "password"}
                name="password"
                value={password}
                required
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
         <img
          title={isRevealPwd ? "Hide password" : "Show password"}
          src={isRevealPwd ? Hide : Show}
          style={{width:'20px',height:'20px',float:'right',position:'relative',top:'-30px' , right:'20px'}}
          onClick={() => setIsRevealPwd(prevState => !prevState)}
        />
              <small style={{ color: "red", fontSize: "15px" }}>{msg}</small>
            </MDBox>
            <MDBox mb={0} px={3}>
              <MDButton
                className="sign-button"
                type="submit"
                value="Submit"
               
                // onClick={createPost}
              >
                Sign in
              </MDButton>{" "}
              <MDTypography
                my={2}
                fontSize="small"
                fontWeight="medium"
                textAlign="center"
              >
                Forgot Password ?
              </MDTypography>
            </MDBox>
          </form>
        </Card>
      </BasicLayout>
    </>
  );
}

export default Basic;

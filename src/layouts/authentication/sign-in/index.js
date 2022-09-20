import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import axios from "axios";
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
// import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/Ellipse 1 (1).svg";

//sign css
import "./sign.css";
import Cookies from 'js-cookie'
import useAdmin from '../../../hooks/useAdmin'
import useUsers from '../../../hooks/useUsers'
// import { Redirect } from "react-router-dom";
import  {error} from 'api/AuthRepository';
import { Box, margin } from "@mui/system";
// forget password
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import { Button, Typography } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

 
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
    setadmin_name('')
    setPassword('')
  }
  useEffect(() => {
    const session_token = Cookies.get('token') ;
  if (session_token) {
   nav("/dashboard");
  }
  
  }, [])


  // forget password
  const [open, setOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState("sm");
  const {SendForgetNotification} =useUsers();


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setError(null)
   
    setErrors(null)
  };

  const [email, setEmail] = useState(null)
  const [errors, setErrors] = useState(null)
  const [error,setError] = useState(null)
  
 
  const handelEmail = (event) => {
    event.preventDefault();
   
    if (!email) {
      setError("Please fill email fields");
      setErrors('')
    }else{
    var sendForgetNotification = SendForgetNotification(email);
    sendForgetNotification.then((response) => {
      console.log(response.data.data)
      setErrors(response.data.data);
      setError('')
      // handleClose();

    }).catch((e) => {
      console.log(e);
      setError(e.data.data);

    })
     setEmail(null);
     
  };
}
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
                onClick={handleClickOpen}
                style={{cursor:'pointer'}}
              >
                Forgot Password ?
              </MDTypography>
            </MDBox>
          </form>
        </Card>
      </BasicLayout>

     
<Dialog maxWidth={maxWidth} open={open} >
        <div>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            style={{ float: "right" }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Box
          noValidate
          component="form"
          sx={{
            width:'350px',
            padding:2.5
          }}
        >
     
          <DialogTitle id="responsive-dialog-title" sx= {{textAlign:'center'}}>
          {"Forget Password ?"}
        </DialogTitle>
        <Typography  sx= {{textAlign:'center',color:'#7b809a'}}>Just provide your email
and we can do the rest</Typography>
      <br/>
       <TextField name="email" value={email}  onChange={(e) => setEmail(e.target.value)}
       label = "email" fullWidth  />
       <small style={{ color: "red", fontSize: "15px" }}>{errors}</small>  
       <small style={{ color: "red", fontSize: "15px" }}>{error}</small>  
       
        <DialogActions>
               
         <Button variant="contained" fullWidth className="forgetButton" onClick={handelEmail} >Reset</Button>

       
          </DialogActions>
   
        </Box>
      </Dialog>
    </>
  );
}

export default Basic;

import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';
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
  const [loading, setLoading] = useState(false)
 
    const {msg}= useSelector((state)=>state.auth)
     const dispatch = useDispatch();
  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true)
    var Login = login({admin_name, password})
    Login
    .then((response) => {
      setLoading(false)
    })
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
  const [open, setOpen] = useState(false); //for opening forget password dialog
  const [maxWidth, setMaxWidth] = useState("sm");
  const {SendForgetNotification} =useUsers(); //for sending forget password mail to user

//to open forget password dialog
  const handleClickOpen = () => {
    setOpen(true);
  };
  //to close forget password dialog
  const handleClose = () => {
    setOpen(false);
    setError(null)
   
    setErrors(null)
  };

  const [email, setEmail] = useState(null) //for storing email of user
  const [errors, setErrors] = useState(null)
  const [error,setError] = useState(null)
  const [forgetSubmitBtn, setForgetSubmitBtn] = useState("Reset Password") //for changing button text
  
 
  const handelEmail = (event) => {
    event.preventDefault();
   
    if (!email || email === "" || email === null) {
      setError("Please enter your email");
      setErrors('')
    }else{
      setForgetSubmitBtn("Sending...")
    var sendForgetNotification = SendForgetNotification(email);
    sendForgetNotification.then((response) => {
      if (response.status === 200) {
        setErrors(response.data.data);
        setError('')
        setForgetSubmitBtn("Reset Password")
      }
      else {
        console.log(response);
        setError(response.response.data.data);
        setErrors('')
        setForgetSubmitBtn("Reset Password")
      }
      // handleClose();

    }).catch((e) => {
      console.log(e);
      setError(e.data.data);

    })
     setEmail('');

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
              {/* <MDButton
                className="sign-button"
                type="submit"
                value="Submit"
               
                // onClick={createPost}
              >
                Sign in
              </MDButton>{" "} */}
              <LoadingButton
              className="sign-button"
              type="submit"
          loading={loading}
        >
          Sign in
        </LoadingButton>
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
          // noValidate
          component="form"
          sx={{
            width:'326px',
            padding:2.5,
            
          }}
        >
     
          <DialogTitle id="responsive-dialog-title" sx= {{textAlign:'center'}}>
          {"Forget Password ?"}
        </DialogTitle>
        <Typography  sx= {{textAlign:'center',color:'#7b809a'}}>Just provide your email
and we can do the rest</Typography>
      <br/>
       <TextField required name="email" type="email" value={email}  onChange={(e) => setEmail(e.target.value)}
       label = "email" fullWidth  />
       <small style={{ color: "green", fontSize: "15px", paddingLeft: "5px" }}>{errors}</small>  
       
       <small style={{ color: "red", fontSize: "15px", paddingLeft: "8px"}}>{error}</small>  
       
        <DialogActions>
               
         <Button type="submit" variant="contained" fullWidth className="forgetButton" onClick={handelEmail} >{forgetSubmitBtn}</Button>

       
          </DialogActions>
   
        </Box>
      </Dialog>
    </>
  );
}

export default Basic;

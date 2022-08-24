import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

// @mui material components
import Card from '@mui/material/Card'

//  React components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDInput from 'components/MDInput'
import MDButton from 'components/MDButton'
import Alert from '@mui/material/Alert'

// Authentication layout components
import BasicLayout from 'layouts/authentication/components/BasicLayout'

// Images
import bgImage from 'assets/images/Ellipse 1 (1).svg'

//sign css
import 'layouts/authentication/sign-in/sign.css'
import useAdmin from '../../../../hooks/useAdmin'
import { useDispatch, useSelector } from "react-redux";


function Cover () {
  const nav = useNavigate()
  const [oldPassword, setoldPassword] = useState('')
  const [newPassword, setnewPassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  const [message , setMessage] = useState(<p style ={{fontSize:'10px' ,color:''}}><b>Must</b> include at least <b>one</b> number,<b>special characterone </b>,letter and of <b></b>.</p>)
  // const [msg, setMsg] = useState()
  const {msg}= useSelector((state)=>state.auth)

  const {GetUserProfile} = useAdmin()
  const {Reset} = useAdmin()
  //console.log(GetUserProfile);
  // console.log(document.cookie);
  const handleReset = event => {
    event.preventDefault()
    // Reset({oldPassword,newPassword})
    
 // console.log(Reset);
     
 if(newPassword.length > 8 ){
   setMessage('')
  if(newPassword !==oldPassword){
    if( newPassword===confirmpassword ){
      setMessage('')
      Reset({oldPassword,newPassword})
    
    }else{
      // console.log('does not match');
   setMessage('Does Not Match password')

    }}else{
      setMessage('Not use old Password ')
    }
  }else{
    setMessage('Must be 8 digit')
  }
    

    if(!localStorage.getItem('token')){
      return <Navigate to='/' />
    }

  };


  
  
  return (
    <>
      <BasicLayout className='banner-sign '>
        <div className='logo-img'>
          <img
            src={bgImage}
            width='100px'
            height='100px'
            className='sign-img '
          />
        </div>

        <Card className='cardName' >
          <MDBox
            className='cardName'
            variant='gradient'
            p={2}
            pt={5}
            mb={1}
            textAlign='center'
          >
            <MDTypography variant='h4' fontWeight='medium' color='black' mt={1}>
              Reset Password
            </MDTypography>
          </MDBox>

          <form onSubmit={handleReset}>
     <MDBox mb={2} px={4}>
              <MDInput
                className='sign-input'
                autoFocus
                id='name'
                value={oldPassword}
               
                type='text'
                name='Old-Password'
                placeholder='Old Password'
                onChange={(e) => setoldPassword(e.target.value)}
                required
                fullWidth
              />
            <small style={{ color: 'red', fontSize: '15px' }}>{msg}</small>

            </MDBox>
            <MDBox mb={2} px={4}>
              <MDInput
                className='sign-input'
                type='newpassword'
                name='newpassword'
                value={newPassword}
                placeholder='New Password'
                onChange={(e) => setnewPassword(e.target.value)}
                fullWidth
              />
             
            </MDBox>
            <MDBox mb={5} px={4}>
              <MDInput
                className='sign-input'
                type='password'
                name='Confirm-password'
                value={confirmpassword}
                placeholder='Confirm Password'
                onChange={(e) => setconfirmpassword(e.target.value)}
                fullWidth
              />
              <small style={{ color: 'red', fontSize: '15px' }}>{message}</small>
            </MDBox>
            <MDBox mb={0} px={3}>
              <MDButton
                className='sign-button'
                type='submit'
                value='Submit'
                // onClick={createPost}
              >
                Submit
              </MDButton>{' '}
              <MDTypography
                my={2}
                fontSize='small'
                fontWeight='medium'
                textAlign='center'
              >
             
              </MDTypography>
            </MDBox>
             
          </form>
        </Card>
      </BasicLayout>
    </>
  )
}

export default Cover

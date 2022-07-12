import { useState, useEffect } from 'react'

// react-router components
import { useLocation, Link, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types'

// @material-ui core components
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Icon from '@mui/material/Icon'

//  React components
import MDBox from 'components/MDBox'
import MDInput from 'components/MDInput'

//  React example components
import Breadcrumbs from 'examples/Breadcrumbs'
import NotificationItem from 'examples/Items/NotificationItem'

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu
} from 'examples/Navbars/DashboardNavbar/styles'

//  React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { responsiveFontSizes } from "@material-ui/core";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import {useSelector} from 'react-redux'
import useAdmin from '../../../hooks/useAdmin'

//import {useNavigate} from 'react-router-dom';
function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const {auth}= useSelector((state)=>state.auth)
  
  const Ravi=auth;

  const {logout} = useAdmin()


    //  console.log(auth)
  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType('sticky')
    } else {
      setNavbarType('static')
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar () {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      )
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener('scroll', handleTransparentNavbar)

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar()

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleTransparentNavbar)
  }, [dispatch, fixedNavbar])

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const nav= useNavigate();
        
  const logOut=()=>{
   // sessionStorage.removeItem('session_token')
   logout();
   //console.log(logout);
    nav('/sign-in')
      //  localStorage.removeItem('session_token')
    }
  // Render the notifications menu

  const renderMenu = () => ( 

   
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem  icon={<PersonOutlineIcon>username</PersonOutlineIcon>}  title={'employ name'} />
    
      <NotificationItem  icon={<PersonOutlineIcon>username</PersonOutlineIcon>}  title={Ravi.users_name} />
  
      <NotificationItem   icon={<SupervisorAccountIcon>role id</SupervisorAccountIcon>}   title={(Ravi.roleId==0)? 'Admin':'Support'}/>
      <NotificationItem icon={<EmailIcon>Email</EmailIcon>}  title={Ravi.user_email}/>

      <NotificationItem icon={<LogoutIcon>Log out</LogoutIcon>} onClick= {logOut} title="Log Out " />
    </Menu>
  )

  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba }
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main
      }

      return colorValue
    }
  })

  return (
    <AppBar
      position={absolute ? 'absolute' : navbarType}
      color='inherit'
      sx={theme =>
        navbar(theme, { transparentNavbar, absolute, light, darkMode })
      }
    >
      <Toolbar sx={theme => navbarContainer(theme)}>
        <MDBox
          color='inherit'
          mb={{ xs: 1, md: 0 }}
          sx={theme => navbarRow(theme, { isMini })}
        >
          <Breadcrumbs
            icon='home'
            title={route[route.length - 1]}
            route={route}
            light={light}
          />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={theme => navbarRow(theme, { isMini })}>
            <MDBox pr={1}>
              <MDInput label='Search here' />
            </MDBox>
            <MDBox color={light ? "white" : "inherit"}>
              {/* <Link to="/authentication/sign-in/basic">
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle}>account_circle</Icon>
                  
                </IconButton>
              </Link> */}

              <IconButton
                size='small'
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
               <Icon sx={iconsStyle} className= "fontSizess">account_circle</Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize='medium'>
                  {miniSidenav ? 'menu_open' : 'menu'}
                </Icon>
              </IconButton>
              {/* <IconButton
                size="small"
                disableRipple
                color='inherit'
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton> */}
              {/* <IconButton
                size="small"
                disableRipple
                color='inherit'
                sx={navbarIconButton}
                aria-controls='notification-menu'
                aria-haspopup='true'
                variant='contained'
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton> */}
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  )
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false
}

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool
}

export default DashboardNavbar

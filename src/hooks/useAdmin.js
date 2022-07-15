import AuthRepository from "../api/AuthRepository";
import AdminRepository from "../api/AdminRepository";
import UsersRepository from "../api/UsersRepository";
import { useDispatch } from "react-redux";
import { errorMessage, login, logout, updateUserProfile, Reset, AlladminUser,Runner } from "../store/auth/action";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";


export default function useAdmin() {
  const dispatch = useDispatch();
  const [cookies, setCookie,getCookie] = useCookies();
  const nav = useNavigate()




  return {
    login: async (data) => {
      var responseData = await AuthRepository.UserLogin(data);
      if (responseData.status === 200) {
        // console.log(responseData.data.data.session_token)
        setCookie(responseData.data.data.session_token, 'token');
        // console.log(responseData.data.data.login_count)
       
       
        if(responseData.data.data.login_count == 0  ){
          localStorage.setItem('token',responseData.data.data.session_token);
          
          dispatch(errorMessage(''))
          nav('/reset');

        }else {
          dispatch(login(responseData.data));
          localStorage.setItem('token',responseData.data.data.session_token);
          localStorage.setItem('user_email',responseData.data.data.user_email);
          localStorage.setItem('users_name',responseData.data.data.users_name);
          localStorage.setItem('roleId',responseData.data.data.roleId);
          localStorage.setItem('employee_name',responseData.data.data.employee_name);
          console.log(responseData.data)
        
        nav('/dashboard');
      }
    
      }  else{
        // alert(responseData.data.data)
        dispatch(errorMessage(responseData.data.data))
      }
      return responseData.data;
    },

    //get all admin users
    getAlladminUser: async () => {
      var responseData = await AdminRepository.GetAlladminUser();
      if (responseData.status === 200) {
        console.log(responseData.data);
      dispatch(AlladminUser(responseData.data.data));
      }
    },
//add admin user
    AddAdminUser: async (data) => {
      var responseData = await AdminRepository.addAdminUser(data);
      if (responseData.status === 200) {
        console.log(responseData.data);
      }
      else {
        console.log(responseData.data);
      }
    },

 //reset api 
    Reset: async (data) => {
      var responseData = await AuthRepository.userReset(data);
      if (responseData.status === 200) {
        // localStorage.getItem('token');
        // console.log(localStorage.getItem('token'))
        // dispatch(Reset(responseData.data));
       
        // console.log(responseData.data.data.login_count)
      
        localStorage.removeItem('token')
          nav('/sign-in' )
          dispatch(errorMessage(''))
            }  else{
              // alert(responseData.data.data)
              dispatch(errorMessage(responseData.data.data))
            }
            return responseData.data;
      },



    // isLogin: async () => {
    //   var responseData = await AuthRepository.isLogin();
    //   if (responseData.status === 200) {
    //     dispatch(login(responseData));
    //     return responseData;
    //   } else {
    //     return responseData;
    //   }
    // },

    logout: async () => {
    //  var responseData = await AuthRepository.logout();
       localStorage.clear() ; 
      // localStorage.removeItem('userData') ; 

        nav('/sign-in');
        //removeCookie("token");
   ///  Response.Cookies.Clear();
      dispatch(logout());
      return true;
    },

    GetUserProfile: async (username) => {
      var responseData = await AuthRepository.getUserPrifile(username);
      if (responseData.status === 200) {
        dispatch(updateUserProfile(responseData.data.data));
        return responseData.data.data;
      }
      return false;
    },
    IsValidUser: async (id) => {
      var responseData = await AuthRepository.isValidUser(id);
      if (responseData.status === 200) {
        return responseData.data;
      }
      return false;
    },
    GetUserProfile: async (username) => {
      var responseData = await AuthRepository.getUserPrifile(username)
      if (responseData.status === 200) {
        dispatch(updateUserProfile(responseData.data.data))
        return responseData.data.data;
      }
      return false;
    },
    subscriberCount: async () => {
      var responseData = await AuthRepository.subscriberCount();
      if (responseData.status === 200) {
        return responseData.data.data
      }
      return false;
    },

    updateFollowerStatus: async (id, data) => {
      var responseData = await AuthRepository.updateFollowerStatus(id, data);
      if (responseData.status === 200) {
        return responseData.data.data
      }
      return false;
    },
        
    updateFollowerStatus:async(id,data)=>{
        var responseData = await AuthRepository.updateFollowerStatus(id,data);
        if(responseData.status === 200){               
            return responseData.data.data
        }
        return false;
    },  
    GetUserProfile: async (username) => {
      var responseData = await AuthRepository.getUserPrifile(username)
      if (responseData.status === 200) {
        dispatch(updateUserProfile(responseData.data.data))
        return responseData.data.data;
      }
      return false;
    },
    

    getAlladminUser: async () => {
      var responseData = await AdminRepository.GetAlladminUser();
      if (responseData.status === 200) {
        console.log(responseData.data);
      dispatch(AlladminUser(responseData.data.data));
      }
    },

    
    // Runner: async () => {
    //   var responseData = await UsersRepository.GetAllUser();
    //   if (responseData.status === 200) {
    //      console.log(responseData.data);
    //   }  else{
    //     // alert(responseData.data.data)
    //     dispatch(errorMessage(responseData.data.data))

    //   }
    //   // console.log(responseData);
    //   return responseData.data;
    // },

  // //add admin user
  //     AddAdminUser: async (data) => {
  //       var responseData = await AdminRepository.addAdminUser(data);
  //       if (responseData.status === 200) {
  //         console.log(responseData.data);
  //       }
  //       else {
  //         console.log(responseData.data);
  //       }
  //     },

  }
};
import AuthRepository from "../api/AuthRepository";
import AdminRepository from "../api/AdminRepository";
import { useDispatch } from "react-redux";
import { errorMessage, login, logout, updateUserProfile, successMsg } from "../store/auth/action";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";


export default function useAdmin() {
  const dispatch = useDispatch();
  const [cookies, setCookie, getCookie, removeCookie] = useCookies();
  const nav = useNavigate()




  return {
    login: async (data) => {
      var responseData = await AuthRepository.UserLogin(data);
      if (responseData.status === 200) {
        // console.log(responseData.data.data.session_token)
        setCookie(responseData.data.data.session_token, 'token');
        // console.log(responseData.data.data.login_count)
        if (responseData.data.data.login_count == 0) {
          localStorage.setItem('token', responseData.data.data.session_token);
          dispatch(errorMessage(''))
          nav('/reset');

        } else {
          dispatch(login(responseData.data));
          localStorage.setItem('token', responseData.data.data.session_token);

          nav('/dashboard');
        }

      } else {
        // alert(responseData.data.data)
        dispatch(errorMessage(responseData.data.data))
      }
      return responseData.data;
    },



    // //get all admin users
    // getAlladminUser: async () => {
    //   var responseData = await AdminRepository.GetAlladminUser();
    //   if (responseData.status === 200) {
    //     console.log(responseData.data.data);
    //     dispatch(AlladminUser(responseData.data.data));
    //   }
      
    //   return responseData.data.data;
      

    // },


    //add admin user
    AddAdminUser: async (data) => {
      var responseData = await AdminRepository.addAdminUser(data);
      if (responseData.status === 200) {
        // AdminRepository.GetAlladminUser()
        console.log(responseData.data);
        dispatch(errorMessage(''))
        dispatch(successMsg(responseData.data.data));

      }
      else {
        console.log(responseData.data);
        dispatch(successMsg(''))
        dispatch(errorMessage(responseData.data.message))
      }
    },

    //update admin user
    UpdateAdminUser: async (data, userId) => {
      var responseData = await AdminRepository.updateAdminUser(data, userId);
      if (responseData.status === 200) {
        // AdminRepository.GetAlladminUser()
        console.log(responseData.data);
        dispatch(errorMessage(''))
        dispatch(successMsg(responseData.data.data));
      }
      else {
        console.log(responseData.data);
        dispatch(successMsg(''))
        dispatch(errorMessage(responseData.data.message))
      }
    },
//change admin_user active status
    ChangeAdminUserStatus: async (userId, is_active) => {
      var responseData = await AdminRepository.changeAdminUserStatus(userId, is_active);
      if (responseData.status === 200) {
        // AdminRepository.GetAlladminUser()
        console.log(responseData.data);
        dispatch(errorMessage(''))
        dispatch(successMsg(responseData.data.data));
      }
      else {
        console.log(responseData.data);
        dispatch(successMsg(''))
        dispatch(errorMessage(responseData.data.message))
      }

    },

    //reset api 
    Reset: async (data) => {
      var responseData = await AuthRepository.userReset(data);
      if (responseData.status === 200) {
        localStorage.removeItem('token')
        nav('/sign-in')
        dispatch(errorMessage(''))
      } else {
        // alert(responseData.data.data)
        dispatch(errorMessage(responseData.data.data))
      }
      return responseData.data;
    },


    logout: async () => {
      //  var responseData = await AuthRepository.logout();
      removeCookie("token");
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

    updateFollowerStatus: async (id, data) => {
      var responseData = await AuthRepository.updateFollowerStatus(id, data);
      if (responseData.status === 200) {
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

    //reset api 
    // Runner: async (data) => {
    //   var responseData = await AuthRepository.runnerTable(data);
    //   if (responseData.status === 200) {
    //      console.log(responseData.data);



    //   }  else{
    //     // alert(responseData.data.data)
    //     dispatch(errorMessage(responseData.data.data))

    //   }
    //   // console.log(responseData);
    //   return responseData.data;
    // },



  }
};
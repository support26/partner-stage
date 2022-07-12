import AuthRepository from "../api/AuthRepository";
import AdminRepository from "../api/AdminRepository";
import { useDispatch } from "react-redux";
import { errorMessage, login, logout, updateUserProfile, Reset, AlladminUser } from "../store/auth/action";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";


export default function useAdmin() {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();
  const nav = useNavigate()




  return {
    login: async (data) => {
      var responseData = await AuthRepository.UserLogin(data);
      if (responseData.status === 200) {
        localStorage.setItem("session_token", responseData.data.data.session_token);
        setCookie(responseData.data.data.session_token, 'token');
        if (responseData.data.data.login_count == 0) {
          nav('/reset');
        } else {
          dispatch(login(responseData.data));
          nav('/dashboard');
        }
      } else {
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
        setCookie(responseData.data.data.session_token, 'token');
        dispatch(Reset(responseData.data));
      } else {
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
      // var responseData = await AuthRepository.logout();
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




  }
};
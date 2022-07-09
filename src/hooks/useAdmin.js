import AuthRepository from "../api/AuthRepository";
import { useDispatch } from "react-redux";
import { login, logout, updateUserProfile } from "../store/auth/action";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'


export default function useAdmin() {
  const dispatch = useDispatch();
  const nav = useNavigate()

  const [cookies, setCookie, removeCookie] = useCookies();
  return {
    login: async (data) => {
      var responseData = await AuthRepository.UserLogin(data);
      if (responseData.status === 200) {
        dispatch(login(responseData.data));
        setCookie(responseData.data.data.session_token, "token");
        nav('/dashboard')
      }
      else{
        alert(responseData.data.data);
      }
      // console.log(responseData);
      return responseData.data;
    },
    isLogin: async () => {
      var responseData = await AuthRepository.isLogin();
      if (responseData.status === 200) {
        dispatch(login(responseData));
        return responseData;
      } else {
        return responseData;
      }
    },

    logout: async () => {
      var responseData = await AuthRepository.logout();
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
  }
};
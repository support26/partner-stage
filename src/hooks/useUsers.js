import AuthRepository from "../api/AuthRepository";
import AdminRepository from "../api/AdminRepository";
import UsersRepository from "../api/UsersRepository";
import { useDispatch } from "react-redux";
import {
  errorMessage,
  login,
  logout,
  updateUserProfile,
  Reset,
  AlladminUser,
  Runner,
  successMsg,
} from "../store/auth/action";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";

export default function useUsers() {
  const dispatch = useDispatch();
  const [cookies, setCookie, getCookie] = useCookies();
  const nav = useNavigate();
  return {
    //change admin_user active status
    ChangeUserStatus: async (userId, isUserActiveOrNot) => {
      var responseData = await AdminRepository.changeAdminUserStatus(
        userId,
        isUserActiveOrNot
      );
      if (responseData.status === 200) {
        // console.log(responseData.data);
        dispatch(errorMessage(""));
        dispatch(successMsg(responseData.data.data));
      } else {
        console.log(responseData.data);
        dispatch(successMsg(""));
        dispatch(errorMessage(responseData.data.message));
      }
    },
    //change admin_user active status
    ChangeRunnerDisable: async (userId, data) => {
      var responseData = await UsersRepository.changeRunnerDisable(
        userId,
        data
      );
      if (responseData.status === 200) {
        // console.log(responseData);
        return responseData;
        // dispatch(errorMessage(""));
        // dispatch(successMsg(responseData.data.data));
      } else {
        console.log(responseData.data);
        // dispatch(successMsg(""));
        // dispatch(errorMessage(responseData.data.message));
      }
    },

    //get notification  data
    GetAllRunner: async () => {
      var responseData = await UsersRepository.getAllRunner();
      if (responseData.status === 200) {
        return responseData;
      } else {
        // console.log(responseData.data);
      }
      return responseData;
    },
    //change admin_user active status
    UpdateRunners: async (userId, data) => {
      var responseData = await UsersRepository.updateRunners(userId, data);
      if (responseData.status === 200) {
        console.log(responseData);
        return responseData;
        // dispatch(errorMessage(""));
        // dispatch(successMsg(responseData.data.data));
      } else {
        console.log(responseData.data);
        // dispatch(successMsg(""));
        // dispatch(errorMessage(responseData.data.message));
      }
    },
// post forget notification
  
SendForgetNotification: async (email) => {
    var responseData = await UsersRepository.sendForgetNotification(email);
    return responseData;
  },


  };
}

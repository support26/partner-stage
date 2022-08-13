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

export default function useAdmin() {
  const dispatch = useDispatch();
  const [cookies, setCookie, getCookie] = useCookies();
  const nav = useNavigate();

  return {
    login: async (data) => {
      var responseData = await AuthRepository.UserLogin(data);
      if (responseData.status === 200) {
        setCookie(responseData.data.data.session_token, "token");
        if (responseData.data.data.login_count == 0) {
          sessionStorage.setItem("token", responseData.data.data.session_token);

          dispatch(errorMessage(""));
          nav("/reset");
        } else {
          dispatch(login(responseData.data));
          localStorage.setItem("token", responseData.data.data.session_token);
          localStorage.setItem("user_email", responseData.data.data.user_email);
          localStorage.setItem("users_name", responseData.data.data.users_name);
          localStorage.setItem("roleId", responseData.data.data.roleId);
          localStorage.setItem(
            "employee_name",
            responseData.data.data.employee_name
          );
          console.log(responseData.data);

          nav("/dashboard");
        }
      } else {
        dispatch(errorMessage(responseData.data.data));
      }
      return responseData.data;
    },

    //get all admin users
    GetAlladminUser: async () => {
      var responseData = await AdminRepository.getAlladminUser();
      if (responseData.status === 200) {
        return responseData;
      } else {
        console.log(responseData.data);
      }
      return responseData;
    },
    //add admin user
    AddAdminUser: async (data) => {
      var responseData = await AdminRepository.addAdminUser(data);
      if (responseData.status === 200) {
        console.log(responseData.data);
        dispatch(errorMessage(""));
        dispatch(successMsg(responseData.data.data));
        return responseData;
      } else {
        console.log(responseData.data);
        dispatch(successMsg(""));
        dispatch(errorMessage(responseData.data.message));
      }
      return responseData;
    },

    //update admin user
    UpdateAdminUser: async (data, userId) => {
      var responseData = await AdminRepository.updateAdminUser(data, userId);
      if (responseData.status === 200) {
        console.log(responseData.data);
        dispatch(errorMessage(""));
        dispatch(successMsg(responseData.data.data));
        return responseData;
      } else {
        console.log(responseData.data);
        dispatch(successMsg(""));
        dispatch(errorMessage(responseData.data.message));
      }
      return responseData;
    },
    //change admin_user active status
    ChangeAdminUserStatus: async (userId, is_active) => {
      var responseData = await AdminRepository.changeAdminUserStatus(
        userId,
        is_active
      );
      if (responseData.status === 200) {
        console.log(responseData.data);
        dispatch(errorMessage(""));
        dispatch(successMsg(responseData.data.data));
      } else {
        console.log(responseData.data);
        dispatch(successMsg(""));
        dispatch(errorMessage(responseData.data.message));
      }
    },

    //reset api
    Reset: async (data) => {
      var responseData = await AuthRepository.userReset(data);
      if (responseData.status === 200) {
        sessionStorage.removeItem("token");
        nav("/sign-in");
        dispatch(errorMessage(""));
      } else {
        // alert(responseData.data.data)
        dispatch(errorMessage(responseData.data.data));
      }
      return responseData.data;
    },

    logOut: async () => {
      //  var responseData = await AuthRepository.logout();
      // localStorage.removeItem('userData') ;

      nav("/sign-in");
      localStorage.clear();
      //removeCookie("token");
      ///  Response.Cookies.Clear();
      // dispatch(logout());
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
      var responseData = await AuthRepository.getUserPrifile(username);
      if (responseData.status === 200) {
        dispatch(updateUserProfile(responseData.data.data));
        return responseData.data.data;
      }
      return false;
    },
    subscriberCount: async () => {
      var responseData = await AuthRepository.subscriberCount();
      if (responseData.status === 200) {
        return responseData.data.data;
      }
      return false;
    },

    updateFollowerStatus: async (id, data) => {
      var responseData = await AuthRepository.updateFollowerStatus(id, data);
      if (responseData.status === 200) {
        return responseData.data.data;
      }
      return false;
    },

    updateFollowerStatus: async (id, data) => {
      var responseData = await AuthRepository.updateFollowerStatus(id, data);
      if (responseData.status === 200) {
        return responseData.data.data;
      }
      return false;
    },
    GetUserProfile: async (username) => {
      var responseData = await AuthRepository.getUserPrifile(username);
      if (responseData.status === 200) {
        return responseData.data.data;
      }
      return false;
    },
    //Banner
    Banners: async (data) => {
      var responseData = await AdminRepository.banner(data);
      if (responseData.status === 200) {
        return responseData;
        console.log(responseData);
      }
      return false;
    },
    //get banner data
    Banners_Anouncements: async () => {
      var responseData = await AdminRepository.banners_Anouncements();
      if (responseData.status === 200) {
        return responseData;
      } else {
        console.log(responseData.data);
      }
      return responseData;
    },
    //update updateBanner user
    UpdateBanner: async (data, userId) => {
      var responseData = await AdminRepository.updateBanner(data, userId);
      if (responseData.status === 200) {
        console.log(responseData.data);
        dispatch(errorMessage(""));
        dispatch(successMsg(responseData.data.data));
        return responseData;
      } else {
        console.log(responseData.data);
        dispatch(successMsg(""));
        dispatch(errorMessage(responseData.data.message));
      }
      return responseData;
    },
    //get anounce  data
    GetAnouncements: async () => {
      var responseData = await AdminRepository.getanouncements();
      if (responseData.status === 200) {
        return responseData;
      } else {
        console.log(responseData.data);
      }
      return responseData;
    },
    // add anouncement
    Anouncements: async (data) => {
      var responseData = await AdminRepository.anouncement(data);
      if (responseData.status === 200) {
        return responseData;
        console.log(responseData);
      }
      return false;
    },
     //update admin user
     UpdateAnounce: async (data, userId) => {
      var responseData = await AdminRepository.updateAnounce(data, userId);
      if (responseData.status === 200) {
        console.log(responseData.data);
        dispatch(errorMessage(""));
        dispatch(successMsg(responseData.data.data));
        return responseData;
      } else {
        console.log(responseData.data);
        dispatch(successMsg(""));
        dispatch(errorMessage(responseData.data.message));
      }
      return responseData;
    },
 //get notification  data
 GetNotification: async () => {
  var responseData = await AdminRepository.getNotification();
  if (responseData.status === 200) {
    return responseData;
  } else {
    console.log(responseData.data);
  }
  return responseData;
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
  };
}

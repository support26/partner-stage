import AuthRepository from "../api/AuthRepository";
import AdminRepository from "../api/AdminRepository";
import { useDispatch } from "react-redux";
import { errorMessage, login, successMsg } from "../store/auth/action";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function useAdmin() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  return {
    login: async (data) => {
      var responseData = await AuthRepository.UserLogin(data);
      if (responseData.status === 200) {
        if (responseData.data.data.login_count == 0) {
          sessionStorage.setItem("token", responseData.data.data.session_token);
          dispatch(errorMessage(""));
          nav("/reset");
        } else {
          dispatch(login(responseData.data));
          Cookies.set("token", responseData.data.data.session_token, {
            expires: 1,
          });
          localStorage.setItem("token", responseData.data.data.session_token);
          localStorage.setItem("user_email", responseData.data.data.user_email);
          localStorage.setItem("users_name", responseData.data.data.users_name);
          localStorage.setItem("roleId", responseData.data.data.roleId);
          localStorage.setItem(
            "employee_name",
            responseData.data.data.employee_name
          );
          // console.log(responseData.data);

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
        // console.log(responseData.data);
      }
      return responseData;
    },

    //add admin user
    AddAdminUser: async (data) => {
      var responseData = await AdminRepository.addAdminUser(data);
      if (responseData.status === 200) {
        // console.log(responseData.data);
        dispatch(errorMessage(""));
        dispatch(successMsg(responseData.data.data));
        return responseData;
      } else {
        // console.log(responseData.data);
        dispatch(successMsg(""));
        dispatch(errorMessage(responseData.data.message));
      }
      return responseData;
    },

    //update admin user
    UpdateAdminUser: async (data, userId) => {
      var responseData = await AdminRepository.updateAdminUser(data, userId);
      if (responseData.status === 200) {
        // console.log(responseData.data);
        dispatch(errorMessage(""));
        dispatch(successMsg(responseData.data.data));
        return responseData;
      } else {
        // console.log(responseData.data);
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
        // console.log(responseData.data);
        dispatch(errorMessage(""));
        dispatch(successMsg(responseData.data.data));
        return responseData;
      } else {
        // console.log(responseData.data);
        dispatch(successMsg(""));
        dispatch(errorMessage(responseData.data.message));
      }
      return responseData;
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
    //logout
    logOut: async () => {
      nav("/");
      localStorage.clear();
      Cookies.remove("token");
      return true;
    },

    //add Banner
    AddBanner: async (data) => {
      var responseData = await AdminRepository.addBanner(data);
      if (responseData.status === 200) {
        // console.log(responseData);
        return responseData;
      }
      return responseData;
    },
    //get banner data
    GetBanner: async () => {
      var responseData = await AdminRepository.getBanner();
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
        // console.log(responseData.data);
        return responseData;
      }
      return responseData;
    },
    //get anouncement  data
    GetAnouncements: async () => {
      var responseData = await AdminRepository.getAnouncements();
      if (responseData.status === 200) {
        return responseData;
      }
      return responseData;
    },
    // add anouncement
    AddAnouncements: async (data) => {
      var responseData = await AdminRepository.addAnouncement(data);
      if (responseData.status === 200) {
        return responseData;
      }
      return false;
    },
    //update announcement
    UpdateAnouncement: async (data, userId) => {
      var responseData = await AdminRepository.updateAnouncement(data, userId);
      if (responseData.status === 200) {
        // console.log(responseData.data);
      }
      return responseData;
    },
    //delete announcement
    DeleteAnouncement: async (announcementId) => {
      var responseData = await AdminRepository.deleteAnouncement(
        announcementId
      );
      if (responseData.status === 200) {
        // console.log(responseData.data);
      }
      return responseData;
    },

    //delete banner
    DeleteBanner: async (bannerId) => {
      var responseData = await AdminRepository.deleteBanner(bannerId);
      if (responseData.status === 200) {
        // console.log(responseData.data);
      }
      return responseData;
    },

    //delete opportunityCard
    DeleteOpportunityCard: async (id) => {
      var responseData = await AdminRepository.deleteOpportunityCard(id);
      if (responseData.status == 200) {
        console.log(responseData.data);
      }
      return responseData;
    },

    //get state list
    GetStateList: async () => {
      var responseData = await AdminRepository.getStateList();
      if (responseData.status === 200) {
        return responseData;
      }
      return responseData;
    },
    //get district list
    GetDistrictList: async (stateId) => {
      var responseData = await AdminRepository.getDistrictList(stateId);
      if (responseData.status === 200) {
        return responseData;
      }
      return responseData;
    },
    //get notification  data
    GetNotification: async () => {
      var responseData = await AdminRepository.getNotification();
      if (responseData.status === 200) {
        return responseData;
      }
      return responseData;
    },
    //send notification to all
    SendNotification: async (notification, admin_email) => {
      var responseData = await AdminRepository.sendNotification(
        notification,
        admin_email
      );
      if (responseData.status === 200) {
        return responseData;
      }
      return responseData;
    },
    // send notification by number
    SendNotificationByNumber: async (
      notification,
      admin_email,
      phone_number
    ) => {
      var responseData = await AdminRepository.sendNotificationByNumber(
        notification,
        admin_email,
        phone_number
      );
      if (responseData.status === 200) {
        return responseData;
      }
      return responseData;
    },
    //send notification by state
    SendNotificationByState: async (notification, admin_email, state) => {
      var responseData = await AdminRepository.sendNotificationByState(
        notification,
        admin_email,
        state
      );
      if (responseData.status === 200) {
        return responseData;
      }
      return responseData;
    },
    //send notification by district
    SendNotificationByDistrict: async (notification, admin_email, district) => {
      var responseData = await AdminRepository.sendNotificationByDistrict(
        notification,
        admin_email,
        district
      );
      if (responseData.status === 200) {
        return responseData;
      }
      return responseData;
    },

    //send notification by version
    SendNotificationByVersion: async (
      notification,
      admin_email,
      AppVersion
    ) => {
      var responseData = await AdminRepository.sendNotificationByVersion(
        notification,
        admin_email,
        AppVersion
      );
      if (responseData.status === 200) {
        return responseData;
      }
      return responseData;
    },

    //get all opportunity
    GetAllOpportunity: async () => {
      var responseData = await AdminRepository.getAllOpportunity();
      if (responseData.status === 200) {
        return responseData;
      }
      return responseData;
    },

    //add opportunity
    AddOpportunity: async (data) => {
      var responseData = await AdminRepository.addOpportunity(data);
      if (responseData.status === 200) {
        return responseData;
      }
      return false;
    },

    //update opportunity
    UpdateOpportunity: async (data, userId) => {
      var responseData = await AdminRepository.updateOpportunity(data, userId);
      if (responseData.status === 200) {
        // console.log(responseData.data);
      }
      return responseData;
    },

    //get version list
    GetVersionList: async () => {
      var responseData = await AdminRepository.getVersionList();
      if (responseData.status === 200) {
        return responseData;
      }
      return responseData;
    },

    //change opportunity status
    ChangeOpportunityStatus: async (id, status) => {
      var responseData = await AdminRepository.changeOpportunityStatus(
        id,
        status
      );
      if (responseData.status === 200) {
        // console.log(responseData.data);
      }
      return responseData;
    },

    //opportunities sequence list
    OpportunitySequenceList: async () => {
      var responseData = await AdminRepository.getOpportunitiesSequenceList();
      if (responseData.status === 200) {
        return responseData;
      }
      return responseData;
    },

    //get direct application list
    GetDirectApplicationList: async () => {
      var responseData = await AdminRepository.getDirectApplicationList();
      if (responseData.status === 200) {
        return responseData;
      }
      return responseData;
    },

    //get opportunity card clicks list
    GetCardClicks: async () => {
      var responseData = await AdminRepository.getCardClicks();
      if (responseData.status === 200) {
        return responseData;
      }
      return responseData;
    },

    //get Tickets raised by users
    GetAllTickets: async () => {
      var responseData = await AdminRepository.getAllTickets();
      if (responseData.status === 200) {
        return responseData;
      }
      return responseData;
    },

    //Update tickets
    UpdateTickets: async (data, ticketId) => {
      var responseData = await AdminRepository.updateTickets(data, ticketId);
      if (responseData.status === 200) {
        // console.log(responseData.data);
        return responseData;
      }
      return responseData;
    },

    GetSliderImage: async () => {
      var responseData = await AdminRepository.getSliderImage();
      if (responseData.status === 200) {
        return responseData;
      }
      return responseData;
    },
    //Add Slider
    AddSliderImage: async (data) => {
      var responseData = await AdminRepository.addSliderImage(data);
      if (responseData.status === 200) {
        return responseData;
      }
      return responseData;
    },

    //Change Image Status
    ChangeImageStatus: async (id, is_active) => {
      var responseData = await AdminRepository.changeImageStatus(id, is_active);
      if (responseData.status === 200) {
        // console.log(responseData.data);
      }
      return responseData;
    },

    //Delete Image
    DeleteImage: async (id) => {
      var responseData = await AdminRepository.deleteImage(id);
      if (responseData.status == 200) {
        console.log(responseData.data);
      }
      return responseData;
    },

    AddUserRole: async (data) => {
      var responseData = await AdminRepository.addSliderImage(data);
      if (responseData.status === 200) {
        return responseData;
      }
      return responseData;
    },
  };
}

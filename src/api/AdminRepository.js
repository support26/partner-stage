import Api, { baseUrl } from "./config";
class AdminRepository {
  // get all admin users
  async getAlladminUser() {
    const token = localStorage.getItem("token");
    // console.log("@@@",token);
    const reponse = await Api.get(`${baseUrl}admin/allUsers`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }
  // add admin user
  async addAdminUser(data) {
    const token = localStorage.getItem("token");
    const reponse = await Api.post(`${baseUrl}admin/create`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }
  // update admin user
  async updateAdminUser(data, userId) {
    const token = localStorage.getItem("token");
    const reponse = await Api.put(`${baseUrl}admin/update/${userId}`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }
  // change admin_user active status
  async changeAdminUserStatus(userId, is_active) {
    const token = localStorage.getItem("token");
    const reponse = await Api.put(
      `${baseUrl}admin/active/${userId}`,
      { is_active },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }

  //add  banner
  async addBanner(data) {
    const token = localStorage.getItem("token");
    const reponse = await Api.post(`${baseUrl}admin/addBanner`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        // console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }
  //get banner api
  async getBanner() {
    const token = localStorage.getItem("token");
    const reponse = await Api.get(`${baseUrl}admin/banner`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }

  //  update Banner api
  async updateBanner(data, userId) {
    const token = localStorage.getItem("token");
    const reponse = await Api.put(
      `${baseUrl}admin/updateBanner/${userId}`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }

  //add  Anouncement api
  async addAnouncement(data) {
    const token = localStorage.getItem("token");
    const reponse = await Api.post(`${baseUrl}admin/addAnnouncement`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }
  // get announcement api
  async getAnouncements() {
    const token = localStorage.getItem("token");
    const reponse = await Api.get(`${baseUrl}admin/announcement`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }
  // update anounce api
  async updateAnouncement(data, userId) {
    const token = localStorage.getItem("token");
    const reponse = await Api.put(
      `${baseUrl}admin/updateAnnouncement/${userId}`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }

  //delete announcement api
  async deleteAnouncement(announcementId) {
    const token = localStorage.getItem("token");
    const reponse = await Api.delete(
      `${baseUrl}admin/deleteAnnouncement/${announcementId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }

  //delete banner api
  async deleteBanner(bannerId) {
    const token = localStorage.getItem("token");
    const reponse = await Api.delete(
      `${baseUrl}admin/deleteBanner/${bannerId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }


  //delete Opportunitycard api
  async deleteOpportunityCard (id) {
    const token = localStorage.getItem("token");
    const reponse = await Api.delete(
      `${baseUrl}opt/webapp/deleteOpportunity/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }



  // get notification api
  async getNotification() {
    const token = localStorage.getItem("token");
    // console.log("@@@",token);
    const reponse = await Api.get(`${baseUrl}admin/notificationLogs`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        // console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }
  // get state list for notification
  async getStateList() {
    const reponse = await Api.get(`${baseUrl}sd/states`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }

  //get district list by state id for notification
  async getDistrictList(sid) {
    const reponse = await Api.get(`${baseUrl}sd/districts/${sid}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }
  //send notification to all
  async sendNotification(notification, admin_email) {
    const reponse = await Api.post(`${baseUrl}users/notification`, {
      notification,
      admin_email,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }

  //send notification by number
  async sendNotificationByNumber(notification, admin_email, phone_number) {
    const reponse = await Api.post(`${baseUrl}users/notification`, {
      notification,
      admin_email,
      phone_number,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }
  //send version notification
  async sendNotificationByVersion(notification, admin_email, AppVersion) {
    const reponse = await Api.post(`${baseUrl}users/notification`, {
      notification,
      admin_email,
      AppVersion,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }
  //send notification by state
  async sendNotificationByState(notification, admin_email, state) {
    const reponse = await Api.post(`${baseUrl}users/notification`, {
      notification,
      admin_email,
      state,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }
  //send notification by district
  async sendNotificationByDistrict(notification, admin_email, district) {
    const reponse = await Api.post(`${baseUrl}users/notification`, {
      notification,
      admin_email,
      district,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }
  //check is user active or not
  async checkUserActive() {
    const userData = localStorage.getItem("userData");
    const { token } = JSON.parse(userData);
    return await Api.get(`${baseUrl}admin/is-active/${token.id}`, {
      headers: {
        Authorization: "Bearer " + token.session_token,
      },
    });
  }
 
  //get all opportunity
  async getAllOpportunity() {
    const token = localStorage.getItem("token");
    const reponse = await Api.get(`${baseUrl}opt/webapp/opportunities`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }

  // add new opportunity
  async addOpportunity(data) {
    const token = localStorage.getItem("token");
    const reponse = await Api.post(`${baseUrl}opt/webapp/addOpportunity`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      }
      );
    return reponse;
  }

  //update opportunity
  async updateOpportunity(data, id) {
    const token = localStorage.getItem("token");
    const reponse = await Api.put(
      `${baseUrl}opt/webapp/updateOpportunity/${id}`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }

  // get version list
  async getVersionList() {
    const token = localStorage.getItem("token");
    const reponse = await Api.get(`${baseUrl}admin/versions`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }

  //change opportunity status
  async changeOpportunityStatus(id, status) {
    const token = localStorage.getItem("token");
    const reponse = await Api.put(
      `${baseUrl}opt/webapp/changeOpportunityStatus/${id}`,
      { status },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        return response;
      }
      )
      .catch((error) => {
        console.log(error.response);
        return error.response;
      }
      );
    return reponse;
  }

  //opportunities sequence list
  async getOpportunitiesSequenceList() {
    const token = localStorage.getItem("token");
    const reponse = await Api.get(`${baseUrl}opt/webapp/opportunitiesSequence`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }

  //get direct application list
  async getDirectApplicationList() {
    const token = localStorage.getItem("token");
    const reponse = await Api.get(`${baseUrl}opt/webapp/directApplications`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }

  //get opportunity card clicks list
  async getCardClicks() {
    const token = localStorage.getItem("token");
    const reponse = await Api.get(`${baseUrl}opt/webapp/opportunityCardClicks`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }

  async getAllTickets() {
    const token = localStorage.getItem("token");
    const response = await Api.get(`${baseUrl}ticket/webapp/V1/getAllTickets`,
    {
      headers:{
        Authorization:"Bearer " + token,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error.response);
      return error.response;
    });
    return response;
  }

  async updateTickets(data, ticketId) {
    const token = localStorage.getItem("token");
    const reponse = await Api.put(
      `${baseUrl}ticket/webapp/V1/updateTicket/${ticketId}`, 
      data,
      {
        headers:{
          Authorization:"Bearer " + token,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.message)
        return error.response;
      });
    return reponse;
  }

  async getSliderImage(){
    const token = localStorage.getItem("token");
    const response = await Api.get(
      `${baseUrl}admin/slider`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.message)
        return error.response;
      });
      return response;
  }

  async addSliderImage(data) {
    const token = localStorage.getItem("token");
    const response = await Api.post(
      `${baseUrl}admin/addSlider`, 
      data,
      {
        headers:{
          Authorization:"Bearer " + token,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.message)
        return error.response;
      });
    return response;
  }

    //change image status
    async changeImageStatus(id, is_active) {
      const token = localStorage.getItem("token");
      const reponse = await Api.put(
        `${baseUrl}admin/changeSliderStatus/${id}`,
        { is_active },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          return response;
        }
        )
        .catch((error) => {
          console.log(error.response);
          return error.response;
        }
        );
      return reponse;
    }

    //Delete Image
    async deleteImage (id) {
      const token = localStorage.getItem("token");
      const reponse = await Api.delete(
        `${baseUrl}admin/deleteSlider/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log(error.response);
          return error.response;
        });
      return reponse;
    }
  

}
export default new AdminRepository();

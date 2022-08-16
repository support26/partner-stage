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
        console.log(response);
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
        console.log(response);
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
}

export default new AdminRepository();

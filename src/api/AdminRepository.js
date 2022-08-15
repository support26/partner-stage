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
  //  GetAlladminUser = () => {
  //   return Api.get(`${baseUrl}admin/allUsers`, {
  //     headers: {
  //       'Authorization': 'Bearer ' + token
  //     }
  //   });
  // }
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

  //add  Anouncement
  async bannersPost(data) {
    const token = localStorage.getItem("token");
    const reponse = await Api.post(`${baseUrl}admin/addBanner`, data, {
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
  async banners_Anouncements() {
    const token = localStorage.getItem("token");
    // console.log("@@@",token);
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

    //  updateBanner
    async updateBanner(data, userId) {
      const token = localStorage.getItem("token");
      const reponse = await Api.put(`${baseUrl}admin/updateBanner/${userId}`, data, {
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

  //add  Anouncement
  async anouncement(data) {
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

  async getanouncements() {
    const token = localStorage.getItem("token");
    // console.log("@@@",token);
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
    // update anounce
    async updateAnounce(data, userId) {
      const token = localStorage.getItem("token");
      const reponse = await Api.put(`${baseUrl}admin/updateAnnouncement/${userId}`, data, {
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


    // get notification 
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
}

export default new AdminRepository();

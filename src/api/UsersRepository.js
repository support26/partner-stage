import Api, { baseUrl } from "./config";

class UsersRepository {

    async getAllRunner() {
      const token = localStorage.getItem("token");
      const reponse = await Api.get(`${baseUrl}users/allusers`, {
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

  async updateRunners(id, data) {
    const token = localStorage.getItem("token");
    const reponse = await Api.put(`${baseUrl}users/profile/${id}`, data, {
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


  UploadImageFile = (ImageFile) => {
    const token = localStorage.getItem("token");
    return Api.put(`${baseUrl}users/uploadFile`, ImageFile, {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
  };

  TotalUsers = () => {
    const token = localStorage.getItem("token");
    return Api.get(`${baseUrl}users/app/totalUsers`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };
  ActiveUsers = () => {
    const token = localStorage.getItem("token");
    return Api.get(`${baseUrl}users/app/activeUsers`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };
  usersByState = () => {
    const token = localStorage.getItem("token");
    return Api.get(`${baseUrl}users/app/usersByState`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  supportUsers = () => {
    const token = localStorage.getItem("token");
    return Api.get(`${baseUrl}admin/support_users`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };
  // change runner  disable status
  async changeRunnerDisable(userId, data) {
    const token = localStorage.getItem("token");
    const reponse = await Api.put(
      `${baseUrl}users/disableRunner/${userId}`,
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
// post forget password

  async sendForgetNotification(email) {
    const reponse = await Api.post(`${baseUrl}auth/reset-password`, {
        email,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    return reponse;
  }

  //enable or disable partner app profile updation by id
  async enableOrDisablePartnerAppProfileUpdation(id, data) {
    const token = localStorage.getItem("token");
    const reponse = await Api.put(
      `${baseUrl}users/enableProfileUpdate/${id}`,
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
        // return error.response;
      });
    return reponse;
  }


}

export default new UsersRepository();

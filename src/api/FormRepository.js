import Api, { baseUrl } from "./config";

class FormRepository {
  async addRole(data) {
    let token = localStorage.getItem("token");
    const reponse = await Api.post(`${baseUrl}forms/addUserRole`, data, {
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
  // show all user  using project Id
  async showAllRolesByProjectId(project_Id) {
    let token = localStorage.getItem("token");
    const reponse = await Api.get(
      `${baseUrl}forms/showAllRoles/${project_Id}`,
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

  async enableDisableUserRole(data) {
    let token = localStorage.getItem("token");
    const reponse = await Api.post(
      `${baseUrl}forms/enableDisableUserRole`,
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

  async deleteUserRole(role_id) {
    let token = localStorage.getItem("token");
    const reponse = await Api.delete(
      `${baseUrl}forms/deleteUserRole/${role_id}`,
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

  async updateUserTrainingStatusById(data, ID) {
    let token = localStorage.getItem("token");
    const resp = await Api.put(
      `${baseUrl}forms/updateUserTrainingStatus/${ID}`,
      data,
      {
        header: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error.response);
        return error.response;
      });
    return resp;
  }

  async approveUserById(data, ID) {
    let token = localStorage.getItem("token");
    const resp = await Api.put(`${baseUrl}forms/approveUser/${ID}`, data, {
      header: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error.response);
        return error.response;
      });
    return resp;
  }

  async assignRoleToUser(data) {
    let token = localStorage.getItem("token");
    const resp = Api.post(`${baseUrl}forms/assignRoleToUser`, data, {
      header: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error.response);
        return error.response;
      });
    return resp;
  }

  async getAllActiveUserRoles() {
    let token = localStorage.getItem("token");
    const resp = await Api.get(`${baseUrl}forms/getAllActiveUserRoles`, {
      header: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error.response);
        return error.response;
      });
    return resp;
  }

  async uploadCasesfromXlxsFile(data) {
    let token = localStorage.getItem("token");
    const resp = await Api.post(`${baseUrl}forms/uploadUserDataSheet`, data, {
      header: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error.response);
        return error.response;
      });
    return resp;
  }

  async uploadVillageDataSheetXlxsFile(data) {
    let token = localStorage.getItem("token");
    const resp = await Api.post(
      `${baseUrl}forms/uploadVillageDataSheet`,
      data,
      {
        header: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error.response);
        return error.response;
      });
    return resp;
  }
}

export default new FormRepository();

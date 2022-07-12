import Api, { baseUrl } from "./config";
const token = localStorage.getItem('token');
class AdminRepository {
  async GetAlladminUser() {
    const reponse = await Api.get(`${baseUrl}admin/allUsers/${0}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
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
  async addAdminUser(data) {
    const reponse = await Api.post(`${baseUrl}admin/create`, data, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
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

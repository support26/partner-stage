import Api, { baseUrl } from "./config";
const token = localStorage.getItem('token');
class AdminRepository {

   GetAlladminUser = () => {
    return Api.get(`${baseUrl}admin/allUsers/${40}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
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
  async updateAdminUser(data, userId) {
    const reponse = await Api.put(`${baseUrl}admin/update/${userId}`, data, {
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

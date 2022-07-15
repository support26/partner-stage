import Api, { baseUrl } from "./config";
const token = localStorage.getItem('token');
class AdminRepository {
// get all admin users
   GetAlladminUser = () => {
    return Api.get(`${baseUrl}admin/allUsers/${40}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }
  // add admin user
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
  // update admin user
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
  // change admin_user active status 
  async changeAdminUserStatus(userId, is_active) {
    const reponse = await Api.put(`${baseUrl}admin/active/${userId}`, {is_active}, {
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

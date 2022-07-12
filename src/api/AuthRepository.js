import Api, { baseUrl } from "./config";
import cookies from "js-cookie";
import axios from "axios";
var token = cookies.get("token");
Api.defaults.headers.common["Authorization"] = "Bearer " + token;
class AuthRepository {

  async UserLogin(params) {
    // console.log("token", token);
    const reponse = await Api.post(`${baseUrl}admin/login/`, params)
      .then((response) => {
        return response;
      })
      .catch((error) => {
       
        return error.response;
      });
    return reponse;
  }

  // async isLogin() {
  //   var token = cookies.get("token");
  //   Api.defaults.headers.common["Authorization"] = "Bearer " + token;
  //   const reponse = await Api.get(`${baseUrl}admin/is-login/`)
  //     .then((response) => {
  //       return response;
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //       return error.response;
  //     });
  //   return reponse;
  // }

  async logout() {
    const reponse = await Api.post(`${baseUrl}admin/logout/`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }

  async uploadUserImage(data) {
    const reponse = await Api.post(`${baseUrl}user/user-image/`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
      
    return reponse;
  }
  

  async userReset() {
     var token = cookies.get("token");
    console.log(token);
    Api.defaults.headers.common["Authorization"] = "Bearer " + token;
    const reponse = await Api.post(`${baseUrl}admin/login/passwordreset/`)
      .then((response) => { 
        console.log(response)
        return response;
       
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    return reponse;
  }

}
export default new AuthRepository();

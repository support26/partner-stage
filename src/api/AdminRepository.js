import Api, { baseUrl } from "./config";
import cookies from "js-cookie";
import axios from "axios";
class AdminRepository {
  async GetAlladminUser() {
    var token = cookies.get("token");
    console.log("@@@ inside token admin", token);
    Api.defaults.headers.common["Authorization"] = "Bearer " + token;
    const reponse = await Api.post(`${baseUrl}admin/allUsers/${0}`)
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

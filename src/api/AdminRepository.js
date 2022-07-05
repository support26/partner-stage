import Api, { baseUrl } from "./config";

class AdminRepository {
  async GetAlladminUser() {
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

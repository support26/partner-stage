import Api, { baseUrl } from "./config";
const token = localStorage.getItem("token");

class UsersRepository {
  GetAllRunner = () => {
    const token = localStorage.getItem("token");
    return Api.get(`${baseUrl}users/allusers`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };
  UpdateRunners = (id, data) => {
    const token = localStorage.getItem("token");
    return Api.put(`${baseUrl}users/profile/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };
  UploadImageFile = (ImageFile) => {
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
}

export default new UsersRepository();

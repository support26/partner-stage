import Api, { baseUrl } from "./config";
const token = localStorage.getItem('token');

class UsersRepository {
     GetAllRunner = () => {
const token = localStorage.getItem('token');
   return Api.get(`${baseUrl}users/${10}`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
        
           
    }
    UploadImageFile = (ImageFile) =>{
      return Api.put(`${baseUrl}users/uploadFile`, ImageFile,
      {
        headers: {
          'Authorization': 'Bearer ' + token,
          "content-type": "multipart/form-data",
        }
        })
    }
    TotalUsers = () => {
const token = localStorage.getItem('token');
      return Api.get(`${baseUrl}users/app/totalUsers`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
    }
    ActiveUsers = () => {
const token = localStorage.getItem('token');
      return Api.get(`${baseUrl}users/app/activeUsers`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
    }
}


export default new UsersRepository();

import Api, { baseUrl } from "./config";
const token = localStorage.getItem('token');

class UsersRepository {
     GetAllRunner = () => {
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
}


export default new UsersRepository();

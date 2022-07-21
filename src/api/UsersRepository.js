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
}


export default new UsersRepository();

import Api, { baseUrl } from "./config";

class UsersRepository {
    async GetAllUser() {
        const reponse = await Api.get(`${baseUrl}users/${20}`)
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


export default new UsersRepository();

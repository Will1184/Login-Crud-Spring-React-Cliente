import axios from "axios";

const USER_API_BASE_URL = "/api/v2/usuarios/";
const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    }
};
class UserService {
    
     changeEmail(user){        
        return axios.post(USER_API_BASE_URL+"changeEmail",user)
    }    

     changePass(user){
        return axios.post(LOGIN_API_BASE_URL+"changePassword",user)
     }

}

export default new UserService();
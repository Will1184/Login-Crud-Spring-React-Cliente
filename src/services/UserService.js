import axios from "axios";
import HeaderConfig from "../config/HeaderConfig";

const USER_API_BASE_URL = "/api/v2/usuarios/";

class UserService {

     findUsers(){
      return axios.get(USER_API_BASE_URL,HeaderConfig.config)
     }

     findUserById(userId){
      return axios.get(USER_API_BASE_URL + '/' + userId, HeaderConfig.config);
     }

     createUser(user){
      return axios.post(USER_API_BASE_URL+user,HeaderConfig.config);
     }

     changeEmail(user){        
        return axios.post(USER_API_BASE_URL+"/changeEmail",user, HeaderConfig.config)
      }

     changePass(user){
        return axios.post(LOGIN_API_BASE_URL+"/changePassword",user, HeaderConfig.config)
      }

      changeUsername(user){
        return axios.post(LOGIN_API_BASE_URL+"/changeUsername",user, HeaderConfig.config)
      }

       changeRol(user){
        return axios.post(LOGIN_API_BASE_URL+"/changeRol",user, HeaderConfig.config)
      }
     
      deleteUser(user){
        return axios.post(LOGIN_API_BASE_URL,user, HeaderConfig.config)
      }
}

export default new UserService();
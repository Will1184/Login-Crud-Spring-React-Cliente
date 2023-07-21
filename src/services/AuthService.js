import axios from "axios";

const LOGIN_API_BASE_URL = "/api/v1/auth/";
const config = {
   headers: {
     'Authorization': 'Bearer ' + localStorage.getItem('token') 
   }
 };
  
class AuthService {
    userLogin(user){
        return axios.post(LOGIN_API_BASE_URL+"authenticate",user)
    }

    saveToken(data) {
    localStorage.setItem('token',data.token) 
    localStorage.setItem('username', data.username);
    localStorage.setItem('email', data.email);
    localStorage.setItem('role', data.role);
    }
     registerUser(user){
        return axios.post(LOGIN_API_BASE_URL+"register",user)
     }

     userLogout() {                                                              
            return  axios.post(LOGIN_API_BASE_URL+"logout",null,config);                             
     }
}

export default new AuthService();
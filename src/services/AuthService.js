import axios from "axios";

const LOGIN_API_BASE_URL = "http://localhost:8090/api/v1/auth/";
  
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
    
     changeEmail(user){        
        return axios.post(LOGIN_API_BASE_URL+"changeEmail",user)
    }    

     changePass(user){
        return axios.post(LOGIN_API_BASE_URL+"changePassword",user)
     }

     registerUser(user){
        return axios.post(LOGIN_API_BASE_URL+"register",user)
     }

     userLogout(username) {   
        console.log(username)                                                    
            return  axios.post(LOGIN_API_BASE_URL+"userlogout",username);                             
     }
}

export default new AuthService();
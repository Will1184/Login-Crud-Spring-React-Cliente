import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import'../../styles/Login.css';


export default function Login(){

    const[modalDeniedLogin,setModalDeniedLogin]=useState(false);
    const[username,setUser]=useState("");
    const[password,setPass]=useState("");    
    const navigate=useNavigate();
    
    useEffect(()=>{
        modalLogin();
        AuthService.userLogout();
        localStorage.removeItem("token"); 
        localStorage.removeItem("Token")
        localStorage.removeItem("email")
        localStorage.removeItem("username")
        localStorage.removeItem("role")   
    },[])    
    const onSubmit =(e) =>{
        e.preventDefault();        
        const userLog={username,password};
        AuthService.userLogin(userLog).then((response)=>{           
           localStorage.setItem("Token","true")
           AuthService.saveToken(response.data)                       
            navigate("/home");                                    
        }).catch(error =>{
            console.log(error)                    
            setModalDeniedLogin(true);        
        })
    }


    const modalLogin=()=>{
        if(modalDeniedLogin){
            return<div className="alert-login show ">
            <span className="material-symbols-outlined" id="error">error</span>
            <span className="msg">Usuario y/o contraseña invalidas</span>
            <span  className="close-btn" onClick={()=> {setModalDeniedLogin(false)}}>
               <span className="material-symbols-outlined">close</span>
            </span>
            </div>
        }
    }
    return(
        <div className="principal-login">                          
        <header className='header-login'>
            <h1>Login</h1>
        </header>        
        <span className="material-symbols-outlined icon-account">account_circle</span>
        <form  onSubmit={(e)=>onSubmit(e)} method="POST" className="login">
            <div className="inputs">
                <span className="material-symbols-outlined icon-username">person</span>
            <input
                 type="text" 
                 name="user" 
                 id="user" 
                 placeholder="USERNAME"
                 value={username} onChange={(e)=>setUser(e.target.value)}
                 />            
            </div>               
            <div className="inputs">
                <span className="material-symbols-outlined icon-pass">key</span>
            <input 
            type="password" 
            name="pass" 
            id="pass" 
            placeholder="PASSWORD"
            value={password} onChange={(e)=>setPass(e.target.value)}
            />
            <br/>
            </div>                                                      
            <button type="submit" id="enviar" >LOG-IN</button> 
        </form>                      
        {modalLogin()}
        </div>   
    )
}
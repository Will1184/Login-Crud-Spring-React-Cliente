import React,{ Fragment, useEffect, useState} from "react";
import { Link} from "react-router-dom";
import Reloj from "../shared/Reloj";
import AuthService from "../../services/AuthService";

const Menu =()=>{    
    const [openMenu,setOpenMenu]=useState(false)     
    const [userLogout,setUserLogout]=useState(false)      

    useEffect(()=>{
        buttonMenu();
        menuModal();        
    })
    useEffect(()=>{
        if(userLogout){
            logout();       
            window.location.reload();
        }
        
    })

    const logout = () => {           
                AuthService.userLogout().then((response)=>{
                    console.log(response.data)                    
                    localStorage.removeItem("role")   
                    localStorage.removeItem('token') 
                    localStorage.removeItem('Token') 
                    localStorage.removeItem('username');
                    localStorage.removeItem('email');
                    localStorage.removeItem('role');  
                    setUserLogout(true)                                                          
                }).catch(error=>{
                    console.log(error)
                })                              
      };      

    const buttonMenu=()=>{        
        if(openMenu){
            return<li className="remove-btn-menu" onClick={()=>{setOpenMenu(false)}}>
                    <span className="material-symbols-outlined close-menu">
                    close
                    </span>
                </li>                                                         
        }else{
            return <li className="btn-menu" onClick={()=>{setOpenMenu(true)}}>
                        <span className="material-symbols-outlined menu">
                            menu
                        </span>
                     </li> 
        }
    }
    const menuModal=()=>{
        if(openMenu){
            return   <div id="nav-menu">
            <ul className="nav-menu show">
                <h1>MENU</h1>                            
                <li>
                    <span className="btn-email">
                        <span className="material-symbols-outlined send-email">
                            mail 
                        </span>&nbsp; EMAIL
                    </span>                                                                    
                </li> 
                <li>                    
                        <Link to={'/options'} className="btn-options">
                        <span className="material-symbols-outlined setting">
                        settings
                       </span>&nbsp; OPTIONS
                        </Link>                                          
                </li> 
                <li>
                    <span className="btn-logout" onClick={()=>{logout()}}>
                       <span  className="material-symbols-outlined logout">
                         Logout
                       </span> &nbsp;LOGOUT
                    </span>                           
                    
                </li>                                         
            </ul>   
        </div>
        }

      

    }    
        return (                     
    <Fragment>        
         <header className="header-nav">        
            <nav className="navegacion">            
            <ul id="nav-options">                                                       
                         <li>
                         <Reloj/>
                         </li>                                                   
            </ul>
                <ul id="nav-options">                        
                    <li className="home">
                        <Link to={'/home'}>
                            <span className="material-symbols-outlined home">home</span>
                        </Link>
                    </li>               
                    {buttonMenu()}                                                             
                    {menuModal()}                    
                </ul>
            </nav>                
    </header>      
    </Fragment>
);
};
export default Menu;
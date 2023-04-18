import React, { Fragment, useEffect, useState } from 'react'
import Menu from './Menu';
import '../Styles/Options.css'
import AuthService from '../services/AuthService';
const Options=()=>{
    const[oldpassword,setOldPass]=useState("");
    const[newpassword,setNewPass]=useState("");
    const[confirmPass,setConfirmPass]=useState("");

    const[newemail,setChangeMail]=useState("");
    const[passEmail,setPassEmail]=useState("");
    
    const[firstname,setFirstName]=useState("");
    const[lastname,setLastName]=useState("");
    const[email,setEmail]=useState("");
    const[username,setUser]=useState("");
    const[password,setPass]=useState("");  

    const[modalPass,setModalPass]=useState(false);
    const[modalMail,setModalMail]=useState(false);
    const[modalUser,setModalUser]=useState(false);
    const[modalOptions,setModalOptions]=useState();
    const[numberModal,setNumberModal]=useState();

    const onSubmitPass =(e) =>{
      e.preventDefault();
      let username=localStorage.getItem('username');
      const user={username,oldpassword,newpassword};
      if(newpassword!==oldpassword){
        if (newpassword===confirmPass){
          
          AuthService.changePass(user).then((response)=>{
            console.log(response.data);
            setModalOptions(2);
            setNumberModal("Password Cambiado");
          }).catch(error=>{
            console.log(error);           
            setModalOptions(true);
            setNumberModal("Datos Invalidos");
          })

        }else{
          console.log("Las Contraseñas Nuevas No Coinciden");
          setModalOptions(1);
          setNumberModal("Las Contraseñas Nuevas No Coinciden");
        } 
      }else{
        console.log("La Contraseña Debe Ser Diferente Al Anterior")
        setModalOptions(1);
        setNumberModal("La Contraseña Debe Ser Diferente Al Anterior");
      }   
    }
    
    
    const onSubmitMail =(e) =>{
      e.preventDefault();      
      let oldMail=localStorage.getItem('email');
      let username=localStorage.getItem('username');    
      let password=passEmail;
      const user={username,password,newemail};
      if(oldMail!==newemail){        
       
        AuthService.changeEmail(user).then((response)=>{
          console.log(response.data);     
          localStorage.setItem('email',newemail);  
          setModalOptions(2);
          setNumberModal("Email Cambiado");
        }).catch(error=>{
          console.log(error);
        })
      }else{
        console.log("Email No debe ser  igual al anterior");
        setModalOptions(1);
        setNumberModal("Email No Debe Ser Igual Al Anterior");
      }
      
    }
    
    const onSubmitUser =(e) =>{
      e.preventDefault();
      let newUser={firstname,lastname,email,username,password};
      console.log(newUser.firstname)
      if(newUser.firstname!==""&&newUser.lastname!==""&&newUser.email!==""&&newUser.username!==""&&newUser.password!==""){

        AuthService.registerUser(newUser).then((response)=>{
          console.log(response.data);
          setModalOptions(2);
          setNumberModal("Usuario Registrado");
        }).catch(error=>{
          console.log(error);
        })

      }else{
        console.log('El formulario contiene datos vacios');
        setModalOptions(1);
        setNumberModal("Ingrese Todos Los Datos");
      }

    }

    const userInformation=()=>{
        let username=localStorage.getItem("username");
        let userMail=localStorage.getItem("email");
        return<div className='userInformation'>
        <span className="material-symbols-outlined setting-account">
            account_circle
            </span>
            <div className='user-contacts'>
            <h1>{username}</h1>
            <p>{userMail}</p>
            </div>            
        </div>
    }

    useEffect(()=>{
      modal();
    })

    const modal=()=>{
      let message=numberModal;      

      if(modalOptions===1){               
          return<div className="alert-options show ">
          <span className="material-symbols-outlined" id="error">error</span>
          <span className="msg">{message}</span>
          <span  className="close-btn" onClick={()=> {setModalOptions(false)}}>
             <span className="material-symbols-outlined">close</span>
          </span>
          </div>
      }
      if(modalOptions===2){       
        return<div className="alert-options check show ">
        <span className="material-symbols-outlined" id="check">check</span>
        <span className="msg check">{message}</span>
        <span  className="close-btn check" onClick={()=> {setModalOptions(false)}}>
           <span className="material-symbols-outlined">close</span>
        </span>
        </div>
    }
  }
    const optionSelected=()=>{
        if(modalPass){
            return <div className='modal-pass'>
                <form onSubmit={(e)=>onSubmitPass(e)} method='post' className='form-options'>
                <div className="inputs-options">
                  <span className="material-symbols-outlined icon-pass">key</span>
                  <input
                    type="password" 
                    name="oldpassword" 
                    id="old-password"
                    placeholder='Old Password'
                    value={oldpassword} onChange={(e)=>setOldPass(e.target.value)}
                    />
                  </div>
                  <div className="inputs-options">
                  <span className="material-symbols-outlined icon-pass">key</span>
                  <input
                    type="password" 
                    name="newpassword" 
                    id="new-password"
                    placeholder='New Password'
                    value={newpassword} onChange={(e)=>setNewPass(e.target.value)}
                    />
                  </div>
                  <div className='inputs-options'>
                  <span className="material-symbols-outlined icon-pass">key</span>
                    <input
                    type="password" 
                    name="confirmPass" 
                    id="repeat-password"
                    placeholder='Repeat password'
                    value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)}
                    />
                  </div>     
                  <div className='btns-options'>
                  <button type="submit" id="enviar-options" >SAVE</button>            
                  <button  id="cancel-options" onClick={()=>{setModalPass(false)}}>EXIT </button>            
                    </div>                    
              </form>                
            </div>
        }

        if(modalMail){
              return <div className='modal-pass'>
            <form onSubmit={(e)=>onSubmitMail(e)} method='post' className='form-options'>
            <div className="inputs-options">
                  <span className="material-symbols-outlined icon-pass">key</span>
                  <input
                    type="password" 
                    name="passEmail" 
                    id="pass-email"
                    placeholder='Password'
                    value={passEmail} onChange={(e)=>setPassEmail(e.target.value)}
                    />
                  </div>
              <div className="inputs-options">
              <span className="material-symbols-outlined icon-email">mail</span>
              <input
                type="email" 
                name="new-email" 
                id="new-email"
                placeholder='New Email'
                value={newemail} onChange={(e)=>setChangeMail(e.target.value)}
                />
              </div>            
              <div className='btns-options'>
              <button type="submit" id="enviar-options" >SAVE</button>            
              <button  id="cancel-options" onClick={()=>{setModalMail(false)}}>EXIT </button>            
              </div>
            </form>
        </div>
        }

        if(modalUser){
            return<div className='modal-pass'>
            <form onSubmit={(e)=>onSubmitUser(e)} method='post' className='form-options'>
            <div className="inputs-options">
              <span className="material-symbols-outlined icon-person">person</span>
              <input
                type="text" 
                name="firstname" 
                id="firstname"
                placeholder='First Name'
                value={firstname} onChange={(e)=>setFirstName(e.target.value)}
                />
              </div>
              <div className="inputs-options">
              <span className="material-symbols-outlined icon-person">person</span>
              <input
                type="text" 
                name="lastname" 
                id="lastname"
                placeholder='Last Name'
                value={lastname} onChange={(e)=>setLastName(e.target.value)}
                />
              </div>
              <div className="inputs-options">
              <span className="material-symbols-outlined icon-person">person</span>
              <input
                type="text" 
                name="username" 
                id="username"
                placeholder='Username'
                value={username} onChange={(e)=>setUser(e.target.value)}
                />
              </div>
              <div className="inputs-options">
              <span className="material-symbols-outlined icon-email">mail</span>
              <input
                type="email" 
                name="user-email" 
                id="user-email"
                placeholder='Email'                
                value={email} onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div className='inputs-options'>
              <span className="material-symbols-outlined icon-pass">key</span>
                <input
                type="password" 
                name="user-password" 
                id="user-password"
                placeholder='Password'
                value={password} onChange={(e)=>setPass(e.target.value)}
                />
              </div>     
              <div className='btns-options'>
              <button type="submit" id="enviar-options" >SAVE</button>            
              <button  id="cancel-options" onClick={()=>{setModalUser(false)}}>EXIT </button>            
              </div>
            </form>
        </div>
        }
    }

    return(
        <Fragment>
            <Menu/>
            <div id='options-principal'>
               {userInformation()}
                <div className='list-options'>
                    <div className='options' onClick={()=>{setModalPass(true);setModalMail(false);setModalUser(false)}}>
                    <span className="material-symbols-outlined change-password">
                        password
                    </span> &nbsp; Cambiar Contraseña 
                    </div>
                    <div className='options'  onClick={()=>{setModalPass(false);setModalMail(true);setModalUser(false)}}>
                    <span className="material-symbols-outlined change-mail">
                        mail
                        </span> &nbsp; Cambiar Correo
                    </div>
                    <div className='options'  onClick={()=>{setModalPass(false);setModalMail(false);setModalUser(true)}}>
                    <span className="material-symbols-outlined new-user">
                        person_add</span> &nbsp; Crear Nuevo usuario
                    </div>
                </div>
                {optionSelected()}
                {modal()}
            </div>
        </Fragment>        
    );
}
export default Options;
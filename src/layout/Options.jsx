import React, { 
  Fragment,
  useEffect,
  useState } from 'react'
import Menu from './Menu';
import '../styles/Options.css'
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

const Options=()=>{
    const[oldpassword,setOldPass]=useState("");
    const[newpassword,setNewPass]=useState("");
    const[confirmPass,setConfirmPass]=useState("");

    const[newEmail,setChangeMail]=useState("");
    const[passEmail,setPassEmail]=useState("");
    
    const[firstname,setFirstName]=useState("");
    const[lastname,setLastName]=useState("");
    const[email,setEmail]=useState("");
    const[username,setUsername]=useState("");
    const[password,setPass]=useState("");

    const[newUsername,setNewUsername]=useState()

    const[modalPass,setModalPass]=useState(false);
    const[modalEmail,setModalEmail]=useState(false);
    const[modalUser,setModalUser]=useState(false);
    const[modalUsername,setModalUsername]=useState(false);
    const[modalOptions,setModalOptions]=useState();
    const[numberModal,setNumberModal]=useState();


    const ChangePasswordForm =(e) =>{
      e.preventDefault();
      let username=localStorage.getItem('username');
      const user={username,oldpassword,newpassword};
      if(newpassword!==oldpassword){
        if (newpassword===confirmPass){
          UserService.changePass(user).then((response)=>{
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

    const ChangeUsernameForm =(e) =>{
      e.preventDefault();
      let username=localStorage.getItem('username');
      const user={username,password,newUsername};
      if(newUsername!==username){
          UserService.changeUsername(user).then((response)=>{
            console.log(response.data);
            localStorage.setItem('username',newUsername);  
            setModalOptions(2);
            setNumberModal("Username Cambiado");
          }).catch(error=>{
            console.log(error);           
            setModalOptions(true);
            setNumberModal("Datos Invalidos");
          })
        }else{
        console.log("El Username Debe Ser Diferente Al Anterior")
        setModalOptions(1);
        setNumberModal("La Username Debe Ser Diferente Al Anterior");
      }   
    }
    
    const ChangeEmailForm =(e) =>{
      e.preventDefault();      
      let oldMail=localStorage.getItem('email');
      let username=localStorage.getItem('username');    
      let password=passEmail;
      const user={username,password,newEmail};
      if(oldMail!==newEmail){        
        UserService.changeEmail(user).then((response)=>{
          console.log(response.data);     
          localStorage.setItem('email',newEmail);  
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
    
    const CreateUserForm = (e) =>{
      e.preventDefault();
      let newUser={firstname,lastname,email,username,password};
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

    const toggleModalPass = () => {
      setModalPass((prevModalPass) => !prevModalPass);
      setModalEmail(false);
      setModalUser(false);
      setModalUsername(false)
    };

    const toggleModalEmail = () => {
      setModalEmail((prevModalPass) => !prevModalPass);
      setModalPass(false);
      setModalUser(false);
      setModalUsername(false)
    };

    const toggleModalUser = () => {
      setModalUser((prevModalPass) => !prevModalPass);
      setModalEmail(false);
      setModalPass(false);
      setModalUsername(false)
    };
    const toggleModalUserName = () => {
      setModalUsername((prevModalPass) => !prevModalPass);
      setModalUser(false)
      setModalEmail(false);
      setModalPass(false);
    };

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
  const pass=()=>{
    return<div className='modal-pass'>
    <form  onSubmit={(e)=>ChangePasswordForm(e)} method='post' className='form-options'>
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
    const optionSelected=()=>{
        if(modalPass){
            return <div className='modal-pass'>
                <form  onSubmit={(e)=>ChangePasswordForm(e)} method='post' className='form-options'>
                <div className="inputs-options">
                  <span className="material-symbols-outlined icon-pass">key</span>
                  <input
                    type="password" 
                    name="oldpassword" 
                    id="old-password"
                    placeholder='Password'
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
                    placeholder='Repeat Password'
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

        if(modalEmail){
              return <div className='modal-pass'>
            <form  onSubmit={(e)=>ChangeEmailForm(e)} method='post' className='form-options'>
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
                value={newEmail} onChange={(e)=>setChangeMail(e.target.value)}
                />
              </div>            
              <div className='btns-options'>
              <button type="submit" id="enviar-options" >SAVE</button>            
              <button  id="cancel-options" onClick={()=>{setModalEmail(false)}}>EXIT </button>            
              </div>
            </form>
        </div>
        }

        if(modalUser){
            return<div className='modal-pass'>
            <form  onSubmit={(e)=>CreateUserForm(e)} method='post' className='form-options'>
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
                value={username} onChange={(e)=>setUsername(e.target.value)}
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
        if(modalUsername){
          return <div className='modal-pass'>
          <form  onSubmit={(e)=>ChangeUsernameForm(e)} method='post' className='form-options'>
          <div className="inputs-options">
            <span className="material-symbols-outlined icon-pass">key</span>
            <input
              type="text" 
              name="newUsername" 
              id="new-username"
              placeholder='Update Username'
              value={newUsername} onChange={(e)=>setNewUsername(e.target.value)}
              />
            </div>
            <div className="inputs-options">
            <span className="material-symbols-outlined icon-pass">key</span>
            <input
              type="password" 
              name="password" 
              id="password"
              placeholder='Password '
              value={password} onChange={(e)=>setPass(e.target.value)}
              />
            </div>
            <div className='btns-options'>
            <button type="submit" id="enviar-options" >SAVE</button>            
            <button  id="cancel-options" onClick={()=>{setModalUsername(false)}}>EXIT </button>            
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
                    <div className='options' onClick={()=>{toggleModalPass();pass()}}>
                    <span className="material-symbols-outlined change-password">
                        password
                    </span> &nbsp; Cambiar Contraseña 
                    </div>
                    <div className='options'  onClick={()=>{toggleModalEmail();}}>
                    <span className="material-symbols-outlined change-mail">
                        mail
                        </span> &nbsp; Cambiar Correo
                    </div>                
                    <div className='options'  onClick={()=>{toggleModalUserName();}}>
                    <span className="material-symbols-outlined new-user">
                        person</span> &nbsp; Cambiar Username
                    </div>
                    <div className='options'  onClick={()=>{toggleModalUser();}}>
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
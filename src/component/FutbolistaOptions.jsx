import React, {useEffect, useState} from 'react'
import'../styles/Futbolista.css';
import { useNavigate,useParams } from 'react-router-dom';
import PersonaService from '../services/PersonaService';


export default function Futbolista(){

    const[posicion,setPosicion]=useState("");
    const[nombres,setNombres]=useState("");
    const[apellidos,setApellidos]=useState("");
    const[fecha_nacimiento,setFecha_nacimiento]=useState("");
    const[email,setEmail]=useState("");
    const[telefono,setTelefono]=useState();
    const {id}=useParams("");
    const navigate=useNavigate();
    
    
    useEffect(() => {
        if (id) {
          PersonaService.getPersonaById(id)
            .then((response) => {
              setNombres(response.data.nombres);
              setApellidos(response.data.apellidos);            
              setFecha_nacimiento(response.data.fecha_nacimiento);
              setEmail(response.data.email);
              setTelefono(response.data.telefono);
              setPosicion(response.data.posicion);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }, [id]);
        

    const title =() =>{
        if(id){
            return <header className='header-update'>
                <h1 className="update">UPDATE</h1>
            </header>
        }else{
            return <header className='header-register'>
            <h1 className="register">REGISTER</h1>
            </header>
        }
    }
    const onSubmit=(e)=>{        
        e.preventDefault();
        const persona={nombres,apellidos,fecha_nacimiento,email,telefono,posicion};
            
            if(id){
                PersonaService.updatePersona(id,persona).then((response)=>{
                    console.log(response.data)
                    navigate("/futbolistas");
                }).catch(error => {
                    console.log(error)
                })
            }else{
                PersonaService.createPersona(persona).then((response)=>{
                    console.log(response.data)
                    navigate("/futbolistas")
                }).catch(error => {
                    console.log(error)
                })
            }       
    }
  
    return(

            <div className="principal">              
                {title()}            
            <form onSubmit={(e)=> onSubmit(e)} method="POST" id="formulario" className="form"> 
            <div className="inputs-options">
            <span className="material-symbols-outlined icon-person">person</span>
            <input 
            type="text" 
            name="nombres" 
            id="names" placeholder="Nombres"
            value={nombres} 
            onChange={(e)=> setNombres(e.target.value)}/>
            </div>        

            <div className="inputs-options">
            <span className="material-symbols-outlined icon-person">person</span>
            <input type="text" 
            name="apellidos" 
            id="lastnames" placeholder="Apellidos"
            value={apellidos} 
            onChange={(e)=> setApellidos(e.target.value)}/>
            </div>

            <div className="inputs-options">
            <span class="material-symbols-outlined icon-edad">123</span>
            <input type="date" 
            name="fecha_nacimiento" 
            id="age"
            placeholder="Edad" 
            value={fecha_nacimiento} 
            onChange={(e)=> setFecha_nacimiento(e.target.value)}/>
            </div>

            <div className="inputs-options">   
            <span className="material-symbols-outlined icon-email">mail</span>      
            <input type="email" 
            name="email" 
            id="email_user" placeholder="Example@gmail.com"
            value={email} 
            onChange={(e)=> setEmail(e.target.value)}/>       
            </div>
            
            <div className="inputs-options">    
            <span className="material-symbols-outlined icon-phone">smartphone</span>
            <input
            type="tel" 
            name="telefono" 
            id="phone"
             placeholder="0000-0000"
            value={telefono}
            onChange={(e)=> setTelefono(e.target.value)}/>            
            </div>

            <div className="inputs-options">           
            <select name="posicion" id="position"
            value={posicion} 
            onChange={(e)=> setPosicion(e.target.value)}>
                <option defaultValue={"None Data"}>Posicion</option>
                <option value="Portero">Portero</option>
                <option value="Central">Central</option>
                <option value="Carrilero">Carrilero</option>
                <option value="Libero">Libero</option>
                <option value="Lateral">Lateral</option>
                <option value="Pivote">Pivote</option>
                <option value="Interior">Interior</option>
                <option value="Volante">Volante</option>
                <option value="Mediapunta">Media Punta</option>
                <option value="Extremo">Extremo</option>
                <option value="Delantero Centro">Delantero Centro</option>
                <option value="Segundo Delantero">Segundo Delantero</option>
            </select>               
            </div>                                          
            <button id="guardar" type='submit'>SEND</button> 
          </form>
          </div>
        );
    }

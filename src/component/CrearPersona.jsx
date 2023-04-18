import React, {useEffect, useState} from 'react'
import'../Styles/CrearPersona.css';
import { useNavigate,useParams } from 'react-router-dom';
import PersonaService from '../services/PersonaService';


export default function CrearPersona(){

    const[posicion,setPosicion]=useState("");
    const[primer_nombre,setPrimerNombre]=useState("");
    const[segundo_nombre,setSegundoNombre]=useState("");
    const[primer_apellido,setPrimerApellido]=useState("");
    const[segundo_apellido,setSegundoApellido]=useState("");
    const[edad,setEdad]=useState("");
    const[correo_electronico,setCorreElectronico]=useState("");
    const[telefono,setTelefono]=useState();
    const {id}=useParams("");
    const navigate=useNavigate();
    
    
    useEffect(() => {
        if (id) {
          PersonaService.getPersonaById(id)
            .then((response) => {
              setPrimerNombre(response.data.primer_nombre);
              setSegundoNombre(response.data.segundo_nombre);
              setPrimerApellido(response.data.primer_apellido);
              setSegundoApellido(response.data.segundo_apellido);
              setEdad(response.data.edad);
              setCorreElectronico(response.data.correo_electronico);
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
        const persona={primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,
            edad,correo_electronico,telefono,posicion};
            
            if(id){
                PersonaService.updatePersona(id,persona).then((response)=>{
                    console.log(response.data)
                    navigate("/home");
                }).catch(error => {
                    console.log(error)
                })
            }else{
                PersonaService.createPersona(persona).then((response)=>{
                    console.log(response.data)
                    navigate("/home")
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
            name="primer_nombre" 
            id="firstName" placeholder="Primer nombre"
            value={primer_nombre} 
            onChange={(e)=> setPrimerNombre(e.target.value)}/>
            </div>        

            <div className="inputs-options">
            <span className="material-symbols-outlined icon-person">person</span>
            <input type="text" 
            name="segundo_nombre" 
            id="secondName" placeholder="Segundo nombre"
            value={segundo_nombre} 
            onChange={(e)=> setSegundoNombre(e.target.value)}/>
            </div>

            <div className="inputs-options">
            <span className="material-symbols-outlined icon-person">person</span>
            <input 
            type="text" 
            name="primer_apellido"
            id="lastName1" placeholder="Primer apellido"
            value={primer_apellido}
            onChange={(e)=> setPrimerApellido(e.target.value)}/>
            </div>

            <div className="inputs-options">
            <span className="material-symbols-outlined icon-person">person</span>
            <input 
            type="text" 
            name="segundo_apellido" 
            id="lastName2" placeholder="Segundo apellido "
            value={segundo_apellido} 
            onChange={(e)=> setSegundoApellido(e.target.value)}/>
            </div>

            <div className="inputs-options">
            <span class="material-symbols-outlined icon-edad">123</span>
            <input type="number" 
            name="edad" 
            id="age"
            placeholder="Edad" 
            value={edad} 
            onChange={(e)=> setEdad(e.target.value)}/>
            </div>

            <div className="inputs-options">   
            <span className="material-symbols-outlined icon-email">mail</span>      
            <input type="email" 
            name="correo_electronico" 
            id="email" placeholder="Example@gmail.com"
            value={correo_electronico} 
            onChange={(e)=> setCorreElectronico(e.target.value)}/>       
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

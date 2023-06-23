import React, {useEffect,useState } from 'react'
import PersonaService from '../services/PersonaService'
import { Link } from 'react-router-dom'
import { CSVLink } from 'react-csv';
import Menu from './Menu';


const  Futbolistas=() =>{
    const[personas, setPersonas] =useState([]);
    const[openDelete,setOpenDelete]=useState(false);
    const[optionDelete,setOptionDelete]=useState(false);    
    const[idDelete,setIdDelete]=useState();
    const[search,setSearch]=useState("");
    const[estateModal,setEstateModal]=useState(false);
    
    useEffect(()=>{
        confirmation();       
        tokenExpired();
    })
    useEffect(()=>{
        getPersonas();
    },[])
 
    const tokenExpired=()=>{                   
        setInterval(()=>{              
            let isLogged=localStorage.getItem("Token");        
            if(isLogged && personas.length === 0){                
                    localStorage.removeItem("token"); 
                    localStorage.removeItem("Token");
                }
            },300000);
    }

    const getPersonas = async () => {           
            try {                        
                const response = await PersonaService.getPersonas();
                setPersonas(response.data);
              } catch (error) {
                console.log(error);                     
              }
        }
        const handlerClick=()=>{
            setEstateModal(!estateModal)
        }
        const searcher=(e)=>{
            setSearch(e.target.value)            
        }
        let results = [];
        if (!search) {
          results = personas;
        } else {
          results = personas.filter((data) =>
            data.nombres.toLowerCase().includes(search.toLocaleLowerCase())
          );
        }
        const findFutbolista=(futbolista)=>{
            let prueba=personas.filter(fut =>fut.id ===futbolista)
            console.log(prueba)
        }
        const acctions=(futbolista)=>{
            
            if(estateModal){    
                return<div id="tables-acctions show">
                        <button className='modificar'><Link to={`/futbolista/${futbolista}`}><span className="material-symbols-outlined edit">edit</span>&nbsp;&nbsp;</Link ></button>
                        <button className='eliminar' onClick={()=> {setIdDelete(futbolista);setOpenDelete(true)}}><span className="material-symbols-outlined delete">delete_forever</span></button>
                        <button className='email'><a href="/futbolista/:id"><span className="material-symbols-outlined mail">mail</span></a></button>
                    </div>
            }
            if(!estateModal){
                return  
            }
        }

        const table=()=>{
          
                return<div className="data-table">            
                 <nav className="table-options">                                   
                    <ul className='btn-options'>                     
                        <li className='input-busqueda'>                            
                        <input
                              type="text" 
                              name="busqueda" 
                              id="search" 
                              placeholder="Buscar" 
                              value={search} onChange={searcher}
                              />    
                        </li>                           
                        <li>
                            <button className="btn-new">
                            <a href="newfutbolista" >
                                <span className="material-symbols-outlined add">add
                                </span>ADD
                            </a>
                            </button>
                        </li>
                        <li>
                            <CSVLink className="btn-csv" data={personas} filename="Crud.csv">
                            <span className="material-symbols-outlined download">
                                download                                
                            </span>&nbsp;<p>CSV</p>
                            </CSVLink>
                        </li>                    
                    </ul>                                       
                 </nav>
                 <table className="table" id="table-inf">             
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOMBRES</th>                                
                    <th>APELLIDOS</th>
                    <th>NACIMIENTO</th>
                    <th>EMAIL</th>
                    <th>TELEFONO</th>
                    <th>POSICION</th>
                    <th>ACCIONES</th>
                </tr>
            </thead>
            <tbody>
            {
                results.map(
                    persona=>
                    <tr key={persona.id}>
                        <td>{persona.id}</td>
                        <td>{persona.nombres}</td>
                        <td>{persona.apellidos}</td>
                        <td>{persona.fecha_nacimiento}</td>
                        <td>{persona.email}</td>
                        <td>{persona.telefono}</td>
                        <td>{persona.posicion}</td>
                        <td> 
                        <span className="material-symbols-outlined btn-expand" onClick={()=>{acctions(persona.id);handlerClick()}}>expand_more</span>
                        <>{acctions()}</>
                        </td>                                                          
                    </tr>                                     
                )
            }                              
            </tbody>       
            {confirmation()}                                                                      
        </table>
    </div>
}

    
    const confirmation=()=>{
        deletePersona()
        if(openDelete){
            return<div className="alert show">
            <span className="msg">¿Quiere eliminar este registro?</span>
            <div className="alert-options-delete">
            <button className="btn confirmation" onClick={()=> {setOptionDelete(true);setOpenDelete(false)}}>
                 <span className="material-symbols-outlined check">check</span>
                <p>Yes</p>
            </button>    
            <button  className="btn close" onClick={()=> setOpenDelete(false)}>
            <span className="material-symbols-outlined btn-close-delete">close</span>                    
            <p>Cancel</p>
            </button>  
            </div>
            </div>
        }
    }

    const deletePersona=()=>{
        if(optionDelete){
            PersonaService.deleteEmployee(idDelete).then((response)=>{
                getPersonas();
                setOptionDelete(false)                              
              }).catch(error =>{
                  console.log(error);
                  setOptionDelete(false)
              })
            }
    }    
        return(
            <div>
                <Menu/>
                 <>{table()}</>                 
               
            </div>           
        )
    }
export default Futbolistas;

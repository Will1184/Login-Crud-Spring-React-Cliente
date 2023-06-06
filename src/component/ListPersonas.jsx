import React, {useEffect,useState } from 'react'
import PersonaService from '../services/PersonaService'
import { Link } from 'react-router-dom'
import { CSVLink } from 'react-csv';
import Menu from './Menu';


const  ListPersonas=() =>{
    const[personas, setPersonas] =useState([]);
    const[openDelete,setOpenDelete]=useState(false);
    const[optionDelete,setOptionDelete]=useState(false);    
    const[idDelete,setIdDelete]=useState();    
    const[search,setSearch]=useState("");    
     
    
    useEffect(()=>{
        confirmation();       
        tokenExpired();
    })   
    useEffect(()=>{
        getPersonas();
    })   
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
                console.log(response.data);
              } catch (error) {
                console.log(error);                     
              }
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
        


        const table=()=>{
            if(personas.length!==0){
                return<div className="data-table">            
                 <nav className="table-options">                                   
                    <ul className='btn-options'>                     
                        <li>                            
                        <input
                              type="text" 
                              name="busqueda" 
                              id="search" 
                              placeholder="Buscar" 
                              value={search} onChange={searcher}
                              />    
                        </li>         
                        <li>      
                            {mostrar()}                      
                        </li>                    
                        <li>
                            <button className="btn-new">
                            <a href="crearpersona" >
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
                    <th>EDAD</th>
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
                        <button className='modificar'><Link to={`/editPersona/${persona.id}`}><span className="material-symbols-outlined edit">edit</span>&nbsp;&nbsp; EDIT</Link ></button>
                        <button className='eliminar' onClick={()=> {setIdDelete(persona.id);setOpenDelete(true)}}><span className="material-symbols-outlined delete">delete_forever</span> DELETE</button>                           
                        <button className='email'><a href="/crearpersona/:id"><span className="material-symbols-outlined mail">mail</span> SEND</a></button>
                        </td>                                                          
                    </tr>                                      
                )
            }                              
            </tbody>       
            {confirmation()}                                                                      
        </table>
            </div>
                              
            }
        }


        const mostrar=()=>{
                const m=()=>{
                    window.location.reload();
                }
                if(personas.length === 0){                                                        
                return <button className='btn-mostrar' onClick={()=>{m()}}>
                    <span className="material-symbols-outlined table-rows">
                        table_rows
                        </span>TABLA
                       </button> 
                }
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
                 <>{mostrar()}</>
                 <>{table()}</>                 
               
            </div>           
        )
    }
export default ListPersonas;

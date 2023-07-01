import React from 'react'
import'../../styles/Home.css';
import Menu from '../layout/Menu';
import { Link } from 'react-router-dom';

const  Home=() =>{
    const tables =()=>{
            return<>
             <nav className="home-options">                                   
                    <ul className='btn-optionsHome'>                          
                        <Link to={'/futbolistas'}>      
                        <button className='btn-ShowTables'>
                    <span className="material-symbols-outlined table-rows">
                        table
                        </span>Futbolistas
                       </button>    
                        </Link>                                        
                    </ul>                                       
                 </nav>
            </>
}

        return(
            <div>
                 <Menu/>
                <>{tables()}</> 
            </div>           
        )
    }
export default Home;

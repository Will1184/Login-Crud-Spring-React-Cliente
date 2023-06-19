import React, {useState } from 'react'
import'../Styles/Home.css';
import Menu from './Menu';
import ListPersonas from './ListPersonas';
import { Link } from 'react-router-dom';

const  Home=() =>{
    const [showTables,setShowTables] = useState(0);

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

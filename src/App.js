import React,{Fragment }  from 'react';
import'./Styles/App.css';
import { BrowserRouter as Router ,Route,Routes} from 'react-router-dom';
import ListPersonas from './component/ListPersonas';
import CrearPersona from './component/CrearPersona';
import Login from './component/Login';
import ProtectedRoutes from './component/ProtectedRoutes';
import Options from './component/Options';



function App() {
  return (
    <Fragment>
      <Router>       
       <Routes>
       <Route path='/' element={<Login/>}/>                    
       <Route element={<ProtectedRoutes/>}>
       <Route path='/options' element={<Options/>}/>
       <Route path='/home' element={<ListPersonas/>}/>         
       <Route path='/crearpersona' element={<CrearPersona/>}/>
       <Route path='/editPersona/:id' element={<CrearPersona/>}/>        
      </Route>
       </Routes>             
      </Router>             
    </Fragment>    
  );
}

export default App;

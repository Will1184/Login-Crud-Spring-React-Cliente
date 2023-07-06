import React,{Fragment }  from 'react';
import'./styles/App.css';
import { 
  BrowserRouter as Router 
  ,Route
  ,Routes} from 'react-router-dom';

import Login from './layout/Login';
import ProtectedRoutes from './component/protectedroutes/ProtectedRoutes';
import Options from './layout/Options';
import Home from './layout/Home';
import Futbolistas from './component/TableFutbolistas';
import FutbolistaDetails from './pages/FutbolistaDetails';

function App() {
  return (
    <Fragment>
        
      <Router>       
      <Routes>
       <Route exact path='/' element={<Login/>}/>                    
       <Route element={<ProtectedRoutes/>}>
       <Route path='/options' element={<Options/>}/>
       <Route path='/home' element={<Home/>}/>
       <Route path='/futbolistas' element={<Futbolistas />}/>
       <Route path='/createfutbolista' element={<FutbolistaDetails/>}/>
       <Route path='/editfutbolista/:id' element={<FutbolistaDetails/>}/>        
      </Route>
       </Routes>
      </Router>                       
    </Fragment>    
  );
}

export default App;

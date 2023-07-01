import React,{Fragment }  from 'react';
import'./styles/App.css';
import { 
  BrowserRouter as Router 
  ,Route
  ,Routes} from 'react-router-dom';

import Login from './component/pages/Login';
import ProtectedRoutes from './component/protectedroutes/ProtectedRoutes';
import Options from './component/layout/Options';
import Home from './component/pages/Home';
import Futbolistas from './component/TableFutbolistas';
import FutbolistaDetails from './component/pages/FutbolistaDetails';

function App() {
  return (
    <Fragment>
        
      <Router>       
      <Routes>
       <Route exact path='/' element={<Login/>}/>                    
       <Route element={<ProtectedRoutes/>}>
       <Route path='/options' element={<Options/>}/>
       <Route path='/home' element={<Home/>}/>
       <Route path='/futbolistas'  element={
            <React.Fragment>
              <Futbolistas />
            </React.Fragment>
          }/>         
       <Route path='/createfutbolista' element={<FutbolistaDetails/>}/>
       <Route path='/editfutbolista/:id' element={<FutbolistaDetails/>}/>        
      </Route>
       </Routes>
      </Router>                       
    </Fragment>    
  );
}

export default App;

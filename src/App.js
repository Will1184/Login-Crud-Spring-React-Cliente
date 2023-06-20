import React,{Fragment }  from 'react';
import'./Styles/App.css';
import { BrowserRouter as Router ,Route,Routes} from 'react-router-dom';
import Futbolista from './component/Futbolista';
import Login from './pages/Login';
import ProtectedRoutes from './component/ProtectedRoutes';
import Options from './component/Options';
import Home from './pages/Home';
import ListPersonas from './component/ListPersonas';

function App() {
  return (
    <Fragment>
      <Router>       
       <Routes>
       <Route path='/' element={<Login/>}/>                    
       <Route element={<ProtectedRoutes/>}>
       <Route path='/options' element={<Options/>}/>
       <Route path='/home' element={<Home/>}/>   
       <Route path='/futbolistas' element={<ListPersonas/>}/>         
       <Route path='/newfutbolista' element={<Futbolista/>}/>
       <Route path='/futbolista/:id' element={<Futbolista/>}/>        
      </Route>
       </Routes>             
      </Router>             
    </Fragment>    
  );
}

export default App;

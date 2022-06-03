import { Route,Routes } from 'react-router-dom';
import './App.css';
//import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
      
    </div>
  );
}
 export default App;
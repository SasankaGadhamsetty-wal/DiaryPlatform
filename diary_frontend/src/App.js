import React from "react";
import { Route,Routes } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Credentials  from './components/Credentials';
import Signup from './components/Signup';
import Diary from './components/Diary';
import EditNote from './components/EditNote';
import EditCredentials from './components/EditCredentials';



function App() {
  return (
  
      <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path="/diary" element={<Diary/>}/>
        <Route path='/credentials' element={<Credentials/>}/>
        <Route path='/editNote' element={<EditNote/>}/>
        <Route path='/editCredentials' element={<EditCredentials/>}/>
      </Routes>
      <ToastContainer autoClose={3000}/>
      </div>  
 
      
  );
}
 export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './login';
import './index.css';
import Signup from './signup';
import Home from './home';
import Studentinfo from './info.jsx'
import{BrowserRouter,Route,Routes} from 'react-router-dom';

function App() {
  return (
    <>
       <div className="px-10  bg-white border rounded-md">
    <BrowserRouter>
   
    <Routes>
    <Route path="/" element={<Home/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/info" element={<Studentinfo/>}></Route>
    </Routes>

    </BrowserRouter>
   </div>
    </>
  );
}

export default App;

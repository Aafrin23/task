import { useNavigate } from 'react-router-dom';
import ReactImage from './assets/stud.jpeg'; 
import auth from './config/firebase'
import React, { useEffect } from 'react'
import { useState } from 'react';


function Home(){
    const navigate = useNavigate()
    const [log,setLog]=useState(false)

    useEffect(()=>{
        auth.onAuthStateChanged(function(user){
         if(user){
           setLog(true)
           console.log("User Logged In")
         }
         else{
           setLog(false)
           console.log("User Logged Out")
         }
        })
         },[])

         
    
      

    return(
        <>
    
        <div className="w-full h-full bg-gray-300 py-10 px-40"> 
            
            <h1 className='text-5xl font-extrabold  px-20 py-10 font-serif text-center'>STUDENT MANAGEMENT TASK </h1>
           
           
        
                 <img 
                src={ReactImage} 
                alt="Student"
                className="w-full h-96 object-fit"  // object-cover keeps the aspect ratio
            />
            <h2 className='text-2xl text-stone-900 py-10'>The Student Management Task Dashboard provides a centralized platform to manage comprehensive student details. It enables educators to monitor student progress, maintain updated records, and enhance communication with parents.</h2>
            <p  className="mx-80 flex justify-end"onClick={() => navigate("/login")}>
            
               <button className='button-style hidden md:block bg-red-400 text-black py-2 px-4 rounded border-black hover:bg-red-600 transition duration-200 ease-in-out"' onClick={()=>navigate("/login")}>Login</button>
            </p>
        </div>

        </>
    )
}
export default Home
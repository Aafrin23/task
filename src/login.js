import './index.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from './config/firebase';


function Login(){

    const navigate = useNavigate()
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[err,setErr]=useState('');

    useEffect(() => {
        window.scrollTo(0, 0);

        auth.onAuthStateChanged(function(user){
           
             if(user){
               
              navigate("/info")
             }
             
            })
        
    }, []);



    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErr("Please enter both email and password.");
            return; // Stop further execution if fields are empty
        }

        signInWithEmailAndPassword(auth,email,password).then((res)=>{
            console.log(res)
            navigate("/info")
        }).catch(()=>{
            setErr("Error signing in. Please check your email and password and try again.");
            console.log("Erro in Sigining in please try again :) ")

        })

       
    };

    return(
        <>
            <div className="flex justify-center items-center h-screen bg-gray-300">
            <form onSubmit={handleLogin}  className="p-10 bg-white rounded-lg shadow-md" style={{ width: "55%"}}>
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <p className='text-red-600 cursor-pointer my-2' >{err}</p>
                <p className='text-blue-600 cursor-pointer my-2' onClick={() => navigate("/signup")}>New user? Register here</p>
                
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out">
                    Login
                </button>
            </form>
        </div>
        </>
    )
}
export default Login
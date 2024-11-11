// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAAnOsvLznj3Al5zZjCpqG1P_zog7uzLNo",
  authDomain: "studentinfo-37480.firebaseapp.com",
  projectId: "studentinfo-37480",
  storageBucket: "studentinfo-37480.firebasestorage.app",
  messagingSenderId: "411777162920",
  appId: "1:411777162920:web:fbdcbd046d4ccba7366c9d",
  measurementId: "G-1B0JHPLK6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth
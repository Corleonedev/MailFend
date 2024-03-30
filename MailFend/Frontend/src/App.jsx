import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Landing from './Components/Landing'
import LoginForm from './Components/LoginForm'
import {BrowserRouter,Routes,Route} from "react-router-dom"


function App() {
 


  return (
    <>
{/*     

    <Navbar/>
  
    <Landing/> */}

    
    <BrowserRouter>
    <Navbar/>

    <Routes>
    <Route path="/" element={<Landing />} />  
     
        <Route path="/login" element={<LoginForm />} /> 
      </Routes>


    </BrowserRouter>
    </>
  )
}

export default App

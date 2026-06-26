// import './App.css'

import { useState } from 'react'
import {BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom"

import { useContext,  } from 'react';

import Signin from "./pages/Signin";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import AuthProvider from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


function App() {

  return (
    
    <> 
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        
        
        </Routes>
      </BrowserRouter>
    </AuthProvider>

    

    </>
  )
}

export default App

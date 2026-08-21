// import "./App.css"

import { useState } from 'react'
import {BrowserRouter, Routes, Route, Link, useNavigate, Outlet} from "react-router-dom"

import { useContext,  } from 'react';


import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Home from "../pages/public/Home";

import AppLayout from "../layout/AppLayout";

import AuthProvider from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import AppContextProvider from '../context/AppContext';
import AppShellUiContext from '../context/Ui/AppShellUiContext';

import Boards from '../pages/workspace/Boards'
import BoardLayout from '../layout/BoardLayout';
import Templates from '../pages/workspace/Templates'
import Stats from '../pages/workspace/Stats'
import Settings from '../pages/workspace/Settings'
import MainContentArea from '../components/AppShell/MainContentArea';
// import Boards from '../pages/workspace/Boards'

import BoardProvider from '../context/BoardContext';

function App() {

  return (
    
    <> 
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          {/* Protected Routes */}
         

         <Route element={<ProtectedRoute />}>
            <Route element={
                <AppContextProvider>
                  <AppShellUiContext>
                    <AppLayout />
                  </AppShellUiContext>
                </AppContextProvider>
              }
            >

              {/* workspaces/ element=resolver component, where it should direct users to */}
              {/* Normal content shell */}
            <Route element={<MainContentArea />}>

              <Route
                  path="/workspaces"
                  element={<Boards />}
              />

              <Route
                  path="/workspaces/:workspaceId/boards"
                  element={<Boards />}
              />

              <Route
                  path="/workspaces/:workspaceId/stats"
                  element={<Stats />}
              />

              <Route
                  path="/workspaces/:workspaceId/templates"
                  element={<Templates />}
              />

              <Route
                  path="/workspaces/:workspaceId/settings"
                  element={<Settings />}
              />
            </Route>


            {/* Board-specific shell */}
            <Route
              path="/workspaces/:workspaceId/boards/:boardId"
            element={<BoardProvider><BoardLayout /></BoardProvider>}
            />
            </Route>

          </Route>    
        
        </Routes>
      </BrowserRouter>
    </AuthProvider>

    </>
  )
}

export default App

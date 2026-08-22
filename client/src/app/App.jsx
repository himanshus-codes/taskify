// import "./App.css"
import {BrowserRouter, Routes, Route, Link, useNavigate, Outlet} from "react-router-dom"

import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Home from "../pages/public/Home";

import AppLayout from "../components/AppShell/AppLayout";

import AuthProvider from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import AppContextProvider from '../context/AppContext';
import AppShellUiContext from '../context/Ui/AppShellUiContext';

import Boards from '../pages/workspace/Boards'
import Templates from '../pages/workspace/Templates'
import Stats from '../pages/workspace/Stats'
import Settings from '../pages/workspace/Settings'
import MainPageLayout from '../components/AppShell/MainPageLayout';

import BoardPage from '../pages/workspace/BoardPage';
// import Boards from '../pages/workspace/Boards'

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
            <Route element={<MainPageLayout />}>

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
              element={<BoardPage />}
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

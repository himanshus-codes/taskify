import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import AppContextProvider from '../context/AppContext';
import AppShellUiContext from '../context/Ui/AppShellUiContext';

// function ProtectedRoute({children}){
function ProtectedRoute(){

    const {token} = useAuth()
    
    // if(!token){
    //     return <Navigate to="/signin" replace={true}></Navigate>
    // }
    // return children

    return token
        ? <Outlet />                        // ? <AppContextProvider><AppShellUiContext><Outlet /></AppShellUiContext></AppContextProvider>
        : <Navigate to="/signin" replace />;
}

export default ProtectedRoute;

// Outlet Syntax


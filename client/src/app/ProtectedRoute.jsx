import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Outlet } from "react-router-dom";


// function ProtectedRoute({children}){
function ProtectedRoute(){

    const {token,  isAuthLoading,} = useAuth()
    
    // if(!token){
    //     return <Navigate to="/signin" replace={true}></Navigate>
    // }
    // return children

    if (isAuthLoading) {
        return null;
    }

    return token
        ? <Outlet />                        // ? <AppContextProvider><AppShellUiContext><Outlet /></AppShellUiContext></AppContextProvider>
        : <Navigate to="/signin" replace />;
}

export default ProtectedRoute;




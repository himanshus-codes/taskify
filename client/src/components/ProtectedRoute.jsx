import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({children}){

    const {token} = useAuth()
    
    if(!token){
        return <Navigate to="/signin" replace={true}></Navigate>
    }
    return children
}


export default ProtectedRoute;

// Outlet Syntax

// return token
//     ? <Outlet />
//     : <Navigate to="/signin" replace />;
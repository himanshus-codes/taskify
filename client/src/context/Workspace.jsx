import { useState, useEffect, useContext, createContext } from "react";

export const WorkspaceContext = createContext();

function WorkspaceProvider({children}){

    const [workspaceData, setWorkspaceData] = useState(null);
    

}
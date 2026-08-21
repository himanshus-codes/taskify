// why this simple sidebar wsp tab change freature took so long, what are the factors involved and considered
//  and its is still pending, the wsp option tab proper closing logic is still left.



import { useState, useEffect, useContext, createContext } from "react";
import { fetchWorkspaces } from "../services/workspaceService";
import { useAuth } from "../hooks/useAuth"; 
import ProtectedRoute from "../app/ProtectedRoute";


export const AppDataContext = createContext();


function AppContextProvider({children}){

    // const [isInitializing, setIsInitializing] = useState(true);

    // // load application data...

    // if (isInitializing) {
    //     return <AppLoadingScreen />;
    // }

    const {token, user} = useAuth()

    // if(!token){
    //     return <ProtectedRoute></ProtectedRoute>
    // }
    // console.log(user._id)

    //App level Data State
    const[workspacesArray, setWorkspacesArray] = useState(null)
    const[currentWorkspaceId, setCurrentWorkspaceId] = useState(null)


    useEffect( ()=>{

        async function getWorkspaces(){
            try{
                let res = await fetchWorkspaces(token)
                // console.log(res)
                setWorkspacesArray(res.data.workspaces)
            } catch(e){
                console.log(e)
            }
        }

         getWorkspaces()

    },[token]) // why token is recommended as an dependency

    useEffect(()=>{
        if(!workspacesArray){
            return
        }

        let lastUsedWorkspaceId = localStorage.getItem(`lastUsedWorkspaceId${(user._id).toString()}`)
    

        if(!lastUsedWorkspaceId){
            localStorage.setItem(`lastUsedWorkspaceId${(user._id).toString()}`, (workspacesArray[0]._id))
            setCurrentWorkspaceId(workspacesArray[0]._id)
        } else{

            let stillExists = workspacesArray.find((w) => w._id == lastUsedWorkspaceId);
            
            if(!stillExists){
                lastUsedWorkspaceId = workspacesArray[0]._id
                localStorage.setItem(`lastUsedWorkspaceId${(user._id).toString()}`, lastUsedWorkspaceId );

            }

            setCurrentWorkspaceId(lastUsedWorkspaceId)
        }

    }, [workspacesArray])


    const currentWorkspaceIdSetter = (workspaceId) => {
        localStorage.setItem(`lastUsedWorkspaceId${(user._id).toString()}`, workspaceId);
        setCurrentWorkspaceId(workspaceId)
    }
    
    const currentWorkspaceGetter = (workspaceId) => {

        console.log("setter CWSPACE")

        if(!workspacesArray || workspacesArray.length === 0){
        console.log("setter CWSPACE 1")

            return null
        }
        // let currentWorkspace = workspacesArray.find((w) => w._id == workspaceId);
        
        // if(!currentWorkspace){ // logic if workspaceId doesnt match with that of any in workspacesArray, meaning that workspace was may be deleted and yet its id existed in localstorage
        //     localStorage.setItem(`lastUsedWorkspaceId${(user._id).toString()}`, (workspacesArray[0]._id))
        //     setCurrentWorkspaceId(workspacesArray[0]._id)
        //     return workspacesArray[0]
        // }
        // return currentWorkspace

       

        return workspacesArray.find(
            (workspace) => workspace._id === workspaceId
        ) ?? null;

        
    }

    console.log(workspacesArray)
    console.log(currentWorkspaceId)

    // console.log(currentWorkspaceGetter("6a7cc8049d2c064833c1b07e"))

    return <AppDataContext.Provider value={{
        workspacesArray: workspacesArray, 
        setWorkspacesArray:setWorkspacesArray,
        currentWorkspaceId: currentWorkspaceId, 
        currentWorkspaceIdSetter:currentWorkspaceIdSetter, 
        currentWorkspaceGetter,
    }} >{children}</AppDataContext.Provider>
}


export default AppContextProvider;
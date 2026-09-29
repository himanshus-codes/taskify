import { useState, useEffect } from "react";
import { createContext } from "react";

export const AppShellUiStateContext = createContext()

function AppShellUiProvider({children}){

    //App level Ui State
    const [isSidebarOpen, setSidebarState ]  = useState(() => {
        const saved = localStorage.getItem("sidebarOpen");
        
        return saved === null
            ? true
            : saved === "true";
    });
    
    const [isWorkspaceOptnsTabOpen, setWorkspaceOptnsTabState] = useState(false)
    const [isProfileOptnsTabOpen, setProfileOptnsTabState] = useState(false)
    const [isSearchOpen, setSearchOpen] = useState(false)

    const closeWorkspaceOtpnsTab = () => {
        if(!isWorkspaceOptnsTabOpen){
            return
        }
        setWorkspaceOptnsTabState(false)
    }
    const closeProfileOtpnsTab = () => {
        if(!isProfileOptnsTabOpen){
            return
        }
        setProfileOptnsTabState(false)
    }

    useEffect(() => {
        localStorage.setItem(
            "sidebarOpen",
            String(isSidebarOpen)
        );
    }, [isSidebarOpen]);


return <AppShellUiStateContext.Provider value={{

    isSidebarOpen : isSidebarOpen,
    setSidebarState : setSidebarState,

    isWorkspaceOptnsTabOpen : isWorkspaceOptnsTabOpen,
    setWorkspaceOptnsTabState : setWorkspaceOptnsTabState,

    isProfileOptnsTabOpen : isProfileOptnsTabOpen,
    setProfileOptnsTabState : setProfileOptnsTabState,

    isSearchOpen,
    setSearchOpen,

    closeProfileOtpnsTab,
    closeWorkspaceOtpnsTab,
    
 }}>{children}</AppShellUiStateContext.Provider>
}

export default AppShellUiProvider
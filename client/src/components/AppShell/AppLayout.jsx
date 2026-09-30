import Sidebar from "./Sidebar"
import MainContentArea from "./MainPageLayout"
import { Outlet } from "react-router-dom"
import { useState } from "react"

export default function AppLayout(){

    return <div 
            className="
                p-2 
                bg-[#1e1d1d]  
                overflow-hidden 
                h-dvh 
                box-border 
                flex        
                min-h-0
                min-w-0 "
            >
        
            <Sidebar/>
            <Outlet/>
    </div>
}

// return (
//     <div className="workspace-layout">
//         <Sidebar />

//         <MainWindow>
//             <Outlet />
//         </MainWindow>
//     </div>
// );
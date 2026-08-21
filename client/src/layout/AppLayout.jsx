import Sidebar from "../components/AppShell/Sidebar"
import MainContentArea from "../components/AppShell/MainContentArea"
import { Outlet } from "react-router-dom"
import { useState } from "react"

export default function AppLayout(){

    return <div className="p-3 bg-[#1e1d1d]  overflow-hidden h-dvh box-border flex ">
        
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
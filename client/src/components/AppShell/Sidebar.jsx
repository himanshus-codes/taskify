import { useAppShellUiContext } from "../../hooks/useAppShellUiContext"

import CollapsedSidebar from "./Sidebar/CollapsedSidebar"
import NormalSidebar from "./Sidebar/NormalSidebar"

export default function Sidebar() {

    const { isSidebarOpen, closeProfileOtpnsTab, closeWorkspaceOtpnsTab} = useAppShellUiContext()


    return <div className={`
                    ${isSidebarOpen? 
                    'box-border py-1 px-3 flex  gap-1 flex-col  text-[#939393] xl:w-58 lg:w-52 md:w-42 w-36' : 
                    
                    'w-12 box-border mr-1 flex  gap-1 flex-col  text-[#939393] items-center' }
                
                `} 
                
                onClick={(e)=>{ closeProfileOtpnsTab(); closeWorkspaceOtpnsTab()}}
            >

            { isSidebarOpen ? <NormalSidebar></NormalSidebar> 
                :   <CollapsedSidebar></CollapsedSidebar>
            }
        
    </div>
}




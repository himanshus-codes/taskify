
import { Outlet } from "react-router-dom";
import { useAppShellUiContext } from "../../hooks/useAppShellUiContext";

export default function MainPageLayout(){

const {  closeProfileOtpnsTab, closeWorkspaceOtpnsTab} = useAppShellUiContext()

// border-[#2f2d2d]

return <div 
        className="bg-[#181717] 
        text-[#d2cbcb] 
        min-h-0  
        pl-25 pr-20 
        grow 
        rounded-lg 
        overflow-y-auto 
        kanban-scrollbar 
        border-[0.1px]  
        border-[#2a2929]"
        onClick={()=>{ closeProfileOtpnsTab(); closeWorkspaceOtpnsTab()}} >
            
        <Outlet/>
    </div>
}


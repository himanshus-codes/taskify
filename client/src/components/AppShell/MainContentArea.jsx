import Boards from "../../pages/workspace/Boards";
import Templates from "../../pages/workspace/Templates";
import Settings from "../../pages/workspace/Settings";
import { Outlet } from "react-router-dom";
import { useAppShellUiContext } from "../../hooks/useAppShellUiContext";

export default function MainContentArea(){

const {  closeProfileOtpnsTab, closeWorkspaceOtpnsTab} = useAppShellUiContext()


return <div className="bg-[#181717] text-[#d2cbcb] py-10  pl-25 pr-20 grow rounded-lg overflow-y-auto border-[0.1px] border-[#2f2d2d]"
        onClick={(e)=>{ closeProfileOtpnsTab(); closeWorkspaceOtpnsTab()}} >
            
        {/* <Boards/> */}
        {/* <Templates/> */}
        {/* <Settings/> */}
        <Outlet/>
    </div>
}
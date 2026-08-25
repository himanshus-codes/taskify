
import { useAppShellUiContext } from "../../../hooks/useAppShellUiContext"
import ToggleSideBar from "./ToggleSidebar"

import ProfileOptionsMenu from "./menus/ProfileMenu"
import WorkspaceSelectionMenu from "./menus/WorkspaceMenu"

import WorkspaceSection from "./sections/WorkspaceSection"
import ProfileAndFeedbackSection from "./sections/Profile&Feedback"
import SidebarTooltip from "./shared/SidebarTooltip"

export default function NormalSidebar(){
    const {  isWorkspaceOptnsTabOpen, isProfileOptnsTabOpen} = useAppShellUiContext()
    return <>
        <div className="
            flex justify-between box-border items-center py-1">

            <div className="
                flex justify-between box-border 
                font-bold tracking-wide md:text-base text-sm   text-amber-50 cursor-default"
            >  
                Taskify 
            </div>

            <div className="relative group">
                    
                <div>
                    <ToggleSideBar></ToggleSideBar>
                </div>
                    
                <div className="hidden group-hover:block">
                    <SidebarTooltip>{"Collapse"}</SidebarTooltip>
                </div>
                       
            </div>


            {/* <div>   {'<T>'} </div> */}
        </div>

        <hr className="mt-2 mb-2 text-[#2f2d2d]" />

        {/* <Link to="/workspace/general">General</Link> */}
        <div className="py-1 px-2 hover:bg-[#242323] hover:rounded-sm hover:text-amber-50 md:text-sm text-xs text-left " > My Space </div>
        <div className="py-1 px-2 hover:bg-[#242323] hover:rounded-sm hover:text-amber-50 md:text-sm text-xs  text-left " > Recents </div>
        <div className="py-1 px-2 hover:bg-[#242323] hover:rounded-sm hover:text-amber-50 md:text-sm text-xs text-left"> My Tasks </div>

        {/* <div> Schedular | Calender </div>  */}
        {/* <div>Templates</div> */}
        {/* <div>Boards</div> */}
        {/* <div> Inbox/Msgs </div>  */}
        {/* <div> Notifs </div>  */}


        <hr className="mt-2 mb-2 text-[#2f2d2d]" />

        <WorkspaceSection ></WorkspaceSection>

        {isWorkspaceOptnsTabOpen &&
            <WorkspaceSelectionMenu></WorkspaceSelectionMenu>
        }

        <ProfileAndFeedbackSection ></ProfileAndFeedbackSection>

        {isProfileOptnsTabOpen && <ProfileOptionsMenu></ProfileOptionsMenu>}
    
    </>
}
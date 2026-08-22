import { Link } from "react-router-dom"

import ToggleSideBar from "./ToggleSidebar"
import ProfileOptionsMenu from "./menus/ProfileMenu"
import WorkspaceSelectionMenu from "./menus/WorkspaceMenu"

import { useAppData } from "../../../hooks/useAppData"
import { useAppShellUiContext } from "../../../hooks/useAppShellUiContext"
import { useAuth } from "../../../context/AuthContext"
import CollapsedProfileAndFeedbackSection from "./sections/CollapsedProfile&Feedback"
import CollapsedWorkspaceSection from "./sections/CollapsedWorkspaceSection"


export default function CollapsedSidebar(){
        const { isWorkspaceOptnsTabOpen, isProfileOptnsTabOpen} = useAppShellUiContext()
    
    return <>  

        {/* Top Collapsed */}
        <div className="flex flex-col items-center justify-center border-[#252424] border-[0.1px] rounded-md p-1 py-2 gap-2">
            <div >
                <ToggleSideBar></ToggleSideBar>
            </div>
            {/* <hr className="mt-2 text-[#712d2d] text-2xl" /> */}
            {/* <hr className="mt-1 mb-0 text-[#2f2d2d]" /> */}

            <div >
                <Link to={`/u/my-space`}>
                    <div className=" px-1 py-1  bg-[#25344b]   hover:bg-[#292828]  rounded-md hover:text-amber-50 ">

                    <svg width="22px" height="20px"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M2 17V7C2 4.79086 3.79086 3 6 3H9.9C10.2314 3 10.5 3.26863 10.5 3.6V20.4C10.5 20.7314 10.2314 21 9.9 21H6C3.79086 21 2 19.2091 2 17Z" stroke="#ffffff" stroke-width="1.5"></path><path d="M6.5 8C7.05228 8 7.5 7.55228 7.5 7C7.5 6.44772 7.05228 6 6.5 6C5.94772 6 5.5 6.44772 5.5 7C5.5 7.55228 5.94772 8 6.5 8Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.5 14C18.0523 14 18.5 13.5523 18.5 13C18.5 12.4477 18.0523 12 17.5 12C16.9477 12 16.5 12.4477 16.5 13C16.5 13.5523 16.9477 14 17.5 14Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 17V7C22 4.79086 20.2091 3 18 3H14.1C13.7686 3 13.5 3.26863 13.5 3.6V20.4C13.5 20.7314 13.7686 21 14.1 21H18C20.2091 21 22 19.2091 22 17Z" stroke="#ffffff" stroke-width="1.5"></path></svg>
                        {/* <div>My Space</div> */}
                    </div>
                    {/* <hr className="mt-1 mb-0 text-[#2f2d2d]" /> */}

                </Link>
            </div>
        </div>
        <br />
        {/* <hr className="m-2 w-full border-0 border-t border-[#252424]" /> */}
        
        {/* Search Collapsed */}
        <div className="  py-1 md:px-2 px-1 mb-1  rounded-md hover:bg-[#413d3d] hover:rounded-md  text-left bg-[#2a2a2a]">
            <div className=" w-fit">
                <svg width="14px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M17 17L21 21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                {/* <svg width="15px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M17 17L21 21" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> */}
            </div>
        
        </div>

        {/* Workspace Section Collapsed */}

        <CollapsedWorkspaceSection></CollapsedWorkspaceSection>

        {isWorkspaceOptnsTabOpen && <div className="absolute top-45 left-15 md:w-40 w-30">
                <WorkspaceSelectionMenu></WorkspaceSelectionMenu>
            </div>
        }

        
        
        {/* Profile & Feedback Collapsed */}
        
        <CollapsedProfileAndFeedbackSection></CollapsedProfileAndFeedbackSection>
            
        {isProfileOptnsTabOpen && 
            <ProfileOptionsMenu></ProfileOptionsMenu>
        }

    </>
}
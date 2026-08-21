import { Link } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { useAppShellUiContext } from "../../hooks/useAppShellUiContext"
import { useAppData } from "../../hooks/useAppData"

export default function Sidebar() {

    const { isSidebarOpen, setSidebarState, isWorkspaceOptnsTabOpen, isProfileOptnsTabOpen,setProfileOptnsTabState, closeProfileOtpnsTab, closeWorkspaceOtpnsTab,  setWorkspaceOptnsTabState} = useAppShellUiContext()
    const {currentWorkspaceId, currentWorkspaceGetter} = useAppData()
    const {user} = useAuth()

    return <div className={`
                     ${isSidebarOpen? 
                        
                        'box-border py-1 px-3 flex  gap-1 flex-col transition-all ease-in-out duration-300 text-[#939393] xl:w-58 lg:w-52 md:w-42 w-36' : 
                        
                        'w-12 box-border mr-1 flex  gap-1 flex-col transition-all ease-in-out duration-300 text-[#939393] items-center' }
                
                `} 
                
                onClick={(e)=>{ closeProfileOtpnsTab(); closeWorkspaceOtpnsTab()}}
            >

            { isSidebarOpen ? <>
                <div className="
                flex justify-between box-border items-center py-1">

                <div className="
                    flex justify-between box-border 
                    font-bold tracking-wide md:text-base text-sm   text-amber-50 cursor-default"
                >  
                    Taskify 
                </div>

                <ToggleSideBar></ToggleSideBar>


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
                <WorkspaceOptionsTab></WorkspaceOptionsTab>
            }

            <ProfileAndFeedbackSection ></ProfileAndFeedbackSection>

            {isProfileOptnsTabOpen && <ProfileOptionsTab></ProfileOptionsTab>}
            
            </>:
            <>
                <div >
                    <ToggleSideBar></ToggleSideBar>

                </div>
                {/* <hr className="mt-2 text-[#712d2d] text-2xl" /> */}
                {/* <hr className="mt-1 mb-0 text-[#2f2d2d]" /> */}

                <div >
                    <Link to={`/u/my-space`}>
                        <div className="hover:py-2 hover:px-2.5 p-0.5 rounded-sm bg-[#0c203e]   hover:bg-[#292828]  hover:rounded-md hover:text-amber-50 ">

                           <svg width="20px" height="18px"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M2 17V7C2 4.79086 3.79086 3 6 3H9.9C10.2314 3 10.5 3.26863 10.5 3.6V20.4C10.5 20.7314 10.2314 21 9.9 21H6C3.79086 21 2 19.2091 2 17Z" stroke="#ffffff" stroke-width="1.5"></path><path d="M6.5 8C7.05228 8 7.5 7.55228 7.5 7C7.5 6.44772 7.05228 6 6.5 6C5.94772 6 5.5 6.44772 5.5 7C5.5 7.55228 5.94772 8 6.5 8Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.5 14C18.0523 14 18.5 13.5523 18.5 13C18.5 12.4477 18.0523 12 17.5 12C16.9477 12 16.5 12.4477 16.5 13C16.5 13.5523 16.9477 14 17.5 14Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 17V7C22 4.79086 20.2091 3 18 3H14.1C13.7686 3 13.5 3.26863 13.5 3.6V20.4C13.5 20.7314 13.7686 21 14.1 21H18C20.2091 21 22 19.2091 22 17Z" stroke="#ffffff" stroke-width="1.5"></path></svg>
                            {/* <div>My Space</div> */}
                        </div>
                        {/* <hr className="mt-1 mb-0 text-[#2f2d2d]" /> */}

                    </Link>
                </div>
                <hr className="m-2 w-full border-0 border-t border-[#434141]" />

                   <div className="  py-1 md:px-2 px-1 mb-1  rounded-md hover:bg-[#413d3d] hover:rounded-md  text-left bg-[#2a2a2a]">
                    <div className=" w-fit">
                        <svg width="14px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M17 17L21 21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        {/* <svg width="15px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M17 17L21 21" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> */}
                    </div>
                
                </div>

                <div >

                    <div className="flex flex-row gap-2 py-2 px-2.5   hover:bg-[#292828]  hover:rounded-md hover:text-amber-50  text-white md:text-sm text-xs text-left cursor-pointer"
                        onClick={() => { setWorkspaceOptnsTabState(curr => !curr); console.log(isWorkspaceOptnsTabOpen) }
                    }>

                        <div className="bg-amber-300 rounded-sm md:w-5  w-4 text-center text-xs cursor-pointer ">
                            <div className=" text-black md:text-sm text-xs">{(currentWorkspaceGetter(currentWorkspaceId))?.title[0]}</div>
               
                        </div>
                        {/* <div className="  font-bold ">
                                {(currentWorkspaceGetter(currentWorkspaceId))?.title}
                            </div> */}
                    </div>
                </div>

                {isWorkspaceOptnsTabOpen && <div className="absolute top-45 left-15 md:w-40 w-30">
                <WorkspaceOptionsTab></WorkspaceOptionsTab>

                </div>
                }

                <div >
                    <Link to={`/workspaces/${currentWorkspaceId}/boards`}>
                        <div className="py-2 px-2.5   hover:bg-[#292828]  hover:rounded-md hover:text-amber-50 ">

                            <svg width="20px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M3 7.4V3.6C3 3.26863 3.26863 3 3.6 3H9.4C9.73137 3 10 3.26863 10 3.6V7.4C10 7.73137 9.73137 8 9.4 8H3.6C3.26863 8 3 7.73137 3 7.4Z" stroke="#ffffff" stroke-width="1.5"></path><path d="M14 20.4V16.6C14 16.2686 14.2686 16 14.6 16H20.4C20.7314 16 21 16.2686 21 16.6V20.4C21 20.7314 20.7314 21 20.4 21H14.6C14.2686 21 14 20.7314 14 20.4Z" stroke="#ffffff" stroke-width="1.5"></path><path d="M14 12.4V3.6C14 3.26863 14.2686 3 14.6 3H20.4C20.7314 3 21 3.26863 21 3.6V12.4C21 12.7314 20.7314 13 20.4 13H14.6C14.2686 13 14 12.7314 14 12.4Z" stroke="#ffffff" stroke-width="1.5"></path><path d="M3 20.4V11.6C3 11.2686 3.26863 11 3.6 11H9.4C9.73137 11 10 11.2686 10 11.6V20.4C10 20.7314 9.73137 21 9.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" stroke="#ffffff" stroke-width="1.5"></path></svg>
                            {/* <div>Boards</div> */}
                        </div>
                    </Link>
                </div>

                <div >
                    <Link  to={`/workspaces/${currentWorkspaceId}/templates`}>

                        <div className="py-2 px-2.5  hover:bg-[#292828]  hover:rounded-md hover:text-amber-50 ">
                            <svg width="20px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M9 3H3.6C3.26863 3 3 3.26863 3 3.6V20.4C3 20.7314 3.26863 21 3.6 21H9M9 3V21M9 3H15M9 21H15M15 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H15M15 3V21" stroke="#ffffff" stroke-width="1.5"></path></svg>
                            {/* <div>Templates</div> */}
                        </div>
                    </Link>
                </div>

                <div >
                    <Link  to={`/workspaces/${currentWorkspaceId}/stats`}>
                        <div className="py-2 px-2.5 hover:bg-[#292828]  hover:rounded-md hover:text-amber-50 ">
                            <svg width="20px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M20 20H4V4" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 16.5L12 9L15 12L19.5 7.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>

                            {/* <div>Stats</div> */}
                        </div>
                    </Link>
                </div>

                <div  >
                    {/* <div className="py-1   px-2 hover:bg-[#a2b1a2ce] hover:rounded-md">Members</div> */}

                    <Link  to={`/workspaces/${currentWorkspaceId}/settings`}>
                        <div className="py-2   px-2.5   hover:bg-[#292828]  hover:rounded-md hover:text-amber-50 ">
                            <svg width="20px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#f7f7f7"><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#f7f7f7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772L22 11L19.6224 10.3954Z" stroke="#f7f7f7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            {/* <div>Settings</div> */}
                        </div>
                    </Link>
                </div>

                <div className="mt-auto mb-0 flex flex-col gap-1 items-center">
                    <div className="cursor-pointer py-2   px-2.5   hover:bg-[#292828]  hover:rounded-md hover:text-amber-50 " onClick={()=>{setProfileOptnsTabState(curr=>!curr); console.log("profile opt clicked")}}>
                       <div className=" md:text-xs text-xs text-left flex flex-row items-center md:gap-2 gap-1" >
                
                            <svg  width="20px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M7 18V17C7 14.2386 9.23858 12 12 12V12C14.7614 12 17 14.2386 17 17V18" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path><path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="12" cy="12" r="10" stroke="#ffffff" stroke-width="1.5"></circle></svg>
                            
                            {/* <div>
                                {user.firstName +"" + user.lastName}
                                {user.firstName + " " + user.lastName[0] }
                            </div> */}

                        </div>
                    </div>

                    <div className="cursor-pointer  py-2 px-2.5  hover:bg-[#292828]  hover:rounded-md hover:text-amber-50 ">
                        {/* <div className="py-1   px-2 hover:bg-[#a2b1a2ce] hover:rounded-md">Members</div> */}
                        
                        <div className=" md:text-xs text-xs text-left flex flex-row items-center md:gap-2 gap-1">
                            <svg   width="20px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M9 9C9 5.49997 14.5 5.5 14.5 9C14.5 11.5 12 10.9999 12 13.9999" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 18.01L12.01 17.9989" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            {/* <div>
                                Help & Feedback
                            </div> */}
                        </div>
                     
                    </div>

                     
                    {/* <hr className="mt-2 mb-2 text-[#2f2d2d]" /> */}

                   
                </div>
                 {isProfileOptnsTabOpen && 
                    <ProfileOptionsTab></ProfileOptionsTab>
                }

            </>

        }
        
    </div>
}

function ToggleSideBar() {

    const { isSidebarOpen, setSidebarState } = useAppShellUiContext()


    return <div onClick={() => { console.log("clicked"); setSidebarState(x => !x);  }} className={`cursor-pointer ${isSidebarOpen ? 'flex w-full justify-end'  : 'mb-0 mt-0'}` }>
        {/* <svg className={  `${sidebarOpen? "rotate-180 scale-x-100" : ""}`} width="24px" stroke-width="1.5" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M19 21L5 21C3.89543 21 3 20.1046 3 19L3 5C3 3.89543 3.89543 3 5 3L19 3C20.1046 3 21 3.89543 21 5L21 19C21 20.1046 20.1046 21 19 21Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.5 21V3" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.5 10L7.25 12L5.5 14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> */}

        {isSidebarOpen ?
            <div className="p-2 px-2.5   hover:bg-[#292828]  hover:rounded-md hover:text-amber-50" ><svg md:width="24px" md:height="24px" width="18px" height="18px"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M19 21L5 21C3.89543 21 3 20.1046 3 19L3 5C3 3.89543 3.89543 3 5 3L19 3C20.1046 3 21 3.89543 21 5L21 19C21 20.1046 20.1046 21 19 21Z" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.25 10L5.5 12L7.25 14" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.5 21V3" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
            :
            <div className="p-2 px-2.5   hover:bg-[#292828]  hover:rounded-md hover:text-amber-50 " ><svg md:width="24px" md:height="24px" width="18px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M19 21L5 21C3.89543 21 3 20.1046 3 19L3 5C3 3.89543 3.89543 3 5 3L19 3C20.1046 3 21 3.89543 21 5L21 19C21 20.1046 20.1046 21 19 21Z" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.5 21V3" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.5 10L7.25 12L5.5 14" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
        }

        {/* <hr className="mt-1 mb-0 text-[#2f2d2d]" /> */}

    </div>
}

function WorkspaceSection(){
    
    const {currentWorkspaceId, currentWorkspaceGetter} = useAppData()
    const { isWorkspaceOptnsTabOpen, setWorkspaceOptnsTabState } = useAppShellUiContext()


    console.log(typeof currentWorkspaceId)
    // console.log(currentWorkspaceId)

    return <>
            <div className="flex justify-between mb-2 box-border md:text-sm text-xs">

            <div className="flex flex-row w-full items-center  gap-1 md:text-sm text-xs " >

                <div className="flex flex-row gap-2  text-white  grow py-1   px-2  hover:rounded-md hover:bg-[#242323]  hover:text-amber-50 md:text-sm text-xs text-left" onClick={() => { setWorkspaceOptnsTabState(curr => !curr) }}>
                    <div className="bg-amber-300 rounded-sm md:w-5  w-4 text-center text-xs ">
                        <div className=" text-black md:text-sm text-xs">{(currentWorkspaceGetter(currentWorkspaceId))?.title[0]}</div>
                    </div>
                    
                    <div className="  font-bold ">{(currentWorkspaceGetter(currentWorkspaceId))?.title}</div> 
                </div>

                <div className="    py-1 md:px-2 px-1  rounded-md hover:bg-[#413d3d] hover:rounded-md  text-left bg-[#2c2b2b]">
                    <div className=" w-fit">
                        <svg width="14px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M17 17L21 21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        {/* <svg width="15px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M17 17L21 21" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> */}
                    </div>
                </div>
            </div>

        </div>

        {!isWorkspaceOptnsTabOpen && 
        <>
            <Link className="py-1 px-2 hover:bg-[#242323] hover:rounded-sm hover:text-amber-50 md:text-sm text-xs text-left" to={`/workspaces/${currentWorkspaceId}/boards`}>
            <div className="flex flex-row items-center gap-2">
                {/* <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M3 7.4V3.6C3 3.26863 3.26863 3 3.6 3H9.4C9.73137 3 10 3.26863 10 3.6V7.4C10 7.73137 9.73137 8 9.4 8H3.6C3.26863 8 3 7.73137 3 7.4Z" stroke="#ffffff" stroke-width="1.1"></path><path d="M14 20.4V16.6C14 16.2686 14.2686 16 14.6 16H20.4C20.7314 16 21 16.2686 21 16.6V20.4C21 20.7314 20.7314 21 20.4 21H14.6C14.2686 21 14 20.7314 14 20.4Z" stroke="#ffffff" stroke-width="1.1"></path><path d="M14 12.4V3.6C14 3.26863 14.2686 3 14.6 3H20.4C20.7314 3 21 3.26863 21 3.6V12.4C21 12.7314 20.7314 13 20.4 13H14.6C14.2686 13 14 12.7314 14 12.4Z" stroke="#ffffff" stroke-width="1.1"></path><path d="M3 20.4V11.6C3 11.2686 3.26863 11 3.6 11H9.4C9.73137 11 10 11.2686 10 11.6V20.4C10 20.7314 9.73137 21 9.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" stroke="#ffffff" stroke-width="1.1"></path></svg> */}
                {/* <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fcfcfc"><path d="M3 7.4V3.6C3 3.26863 3.26863 3 3.6 3H9.4C9.73137 3 10 3.26863 10 3.6V7.4C10 7.73137 9.73137 8 9.4 8H3.6C3.26863 8 3 7.73137 3 7.4Z" stroke="#fcfcfc" stroke-width="1.8"></path><path d="M14 20.4V16.6C14 16.2686 14.2686 16 14.6 16H20.4C20.7314 16 21 16.2686 21 16.6V20.4C21 20.7314 20.7314 21 20.4 21H14.6C14.2686 21 14 20.7314 14 20.4Z" stroke="#fcfcfc" stroke-width="1.8"></path><path d="M14 12.4V3.6C14 3.26863 14.2686 3 14.6 3H20.4C20.7314 3 21 3.26863 21 3.6V12.4C21 12.7314 20.7314 13 20.4 13H14.6C14.2686 13 14 12.7314 14 12.4Z" stroke="#fcfcfc" stroke-width="1.8"></path><path d="M3 20.4V11.6C3 11.2686 3.26863 11 3.6 11H9.4C9.73137 11 10 11.2686 10 11.6V20.4C10 20.7314 9.73137 21 9.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" stroke="#fcfcfc" stroke-width="1.8"></path></svg> */}
                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M3 7.4V3.6C3 3.26863 3.26863 3 3.6 3H9.4C9.73137 3 10 3.26863 10 3.6V7.4C10 7.73137 9.73137 8 9.4 8H3.6C3.26863 8 3 7.73137 3 7.4Z" stroke="#ffffff" stroke-width="1.5"></path><path d="M14 20.4V16.6C14 16.2686 14.2686 16 14.6 16H20.4C20.7314 16 21 16.2686 21 16.6V20.4C21 20.7314 20.7314 21 20.4 21H14.6C14.2686 21 14 20.7314 14 20.4Z" stroke="#ffffff" stroke-width="1.5"></path><path d="M14 12.4V3.6C14 3.26863 14.2686 3 14.6 3H20.4C20.7314 3 21 3.26863 21 3.6V12.4C21 12.7314 20.7314 13 20.4 13H14.6C14.2686 13 14 12.7314 14 12.4Z" stroke="#ffffff" stroke-width="1.5"></path><path d="M3 20.4V11.6C3 11.2686 3.26863 11 3.6 11H9.4C9.73137 11 10 11.2686 10 11.6V20.4C10 20.7314 9.73137 21 9.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" stroke="#ffffff" stroke-width="1.5"></path></svg>
                    <div>Boards</div>
                </div>
            </Link>
            <Link className="py-1 px-2 hover:bg-[#242323] hover:rounded-sm hover:text-amber-50 md:text-sm text-xs  text-left" to={`/workspaces/${currentWorkspaceId}/templates`}>

                <div className="flex flex-row items-center gap-2">
                    <svg width="18px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M9 3H3.6C3.26863 3 3 3.26863 3 3.6V20.4C3 20.7314 3.26863 21 3.6 21H9M9 3V21M9 3H15M9 21H15M15 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H15M15 3V21" stroke="#ffffff" stroke-width="1.5"></path></svg>
                    <div>Templates</div>
                </div>
            </Link>
            <Link className="py-1 px-2 hover:bg-[#242323] hover:rounded-sm hover:text-amber-50 md:text-sm text-xs  text-left" to={`/workspaces/${currentWorkspaceId}/stats`}>
                <div className="flex flex-row items-center gap-2">
                    <svg width="20px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M20 20H4V4" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 16.5L12 9L15 12L19.5 7.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>

                    <div>Stats</div>
                </div>
            </Link>
            {/* <div className="py-1   px-2 hover:bg-[#a2b1a2ce] hover:rounded-md">Members</div> */}
            <Link className="py-1 px-2 hover:bg-[#242323] hover:rounded-sm hover:text-amber-50 md:text-sm text-xs  text-left" to={`/workspaces/${currentWorkspaceId}/settings`}>
                <div className="flex flex-row items-center gap-2">
                    <svg width="16px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#f7f7f7"><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#f7f7f7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772L22 11L19.6224 10.3954Z" stroke="#f7f7f7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    <div>Settings</div>
                </div>
            </Link> 
        </>}
    </>
}

function WorkspaceOptionsTab(){

    const {workspacesArray, currentWorkspaceId, currentWorkspaceIdSetter} = useAppData()
    const {  isWorkspaceOptnsTabOpen, setWorkspaceOptnsTabState } = useAppShellUiContext()


    // console.log(currentWorkspaceId)
    // rendering workspace list
    return <>


        {/* <div className={`flex flex-col rounded-sm bg-[#2d2c2c] py-1 px-1 gap-1 text-sm border-[#3b3a3a]         border-[0.25px] absolute z-50 top-58 ${wspSelectorTab ?  'block': 'hidden'}`}> */}

        <div className={`flex flex-col rounded-sm bg-[#2d2c2c] py-1 px-1 gap-1 text-sm border-[#3b3a3a]         border-[0.25px]  `}>

            {/* <div className="flex flex-row gap-2 text-white  grow py-1   px-2  hover:rounded-md hover:bg-[#3b3939]  hover:text-amber-50 text-sm  ">
                <div className="bg-amber-300 rounded-md text-sm  w-5 text-center">
                    <div className=" text-black">W</div>
                </div>
                <div className=" text-sm">WS Name </div>
            </div> */}

            {workspacesArray.length>0 && workspacesArray.map((workspace)=>{
                return <Link key={workspace._id} to={`/workspaces/${workspace._id}/boards`}>          

                <div  className="flex flex-row  text-white  grow py-1   md:px-2 px-1  hover:rounded-md hover:bg-[#3b3939]  hover:text-amber-50 md:text-sm text-xs items-center ">
                        
                         <div className="flex flex-row grow md:gap-2 gap-1.5 items-center" onClick={()=>{currentWorkspaceIdSetter(workspace._id)}}>
                            <div className="md:w-4 w-3.5  bg-amber-300 rounded-sm text-xs text-center">
                                <div className=" text-black md:text-sm text-xs text-center">{workspace.title[0]}</div>
                            </div>
                            <div className=" md:text-sm text-xs ">{workspace.title } </div>

                        </div>

                          <div className={workspace._id == currentWorkspaceId? `block` : `hidden`}>
                            <svg md:width="14px" md:height="16px" width="12px" height="14px"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M5 13L9 17L19 7" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </div>
                    </div>

                    </Link>
                
            })}
           

            <hr className="mt-1 text-[#434141]" />

            <div className="cursor-pointer flex flex-row md:gap-2 gap-1 text-white md:text-sm text-xs grow py-1   px-2  hover:rounded-md hover:bg-[#3b3939]  hover:text-amber-50 text-left">

                <div>Create New</div>
            </div>
          
        </div>

        </>
}


function ProfileAndFeedbackSection(){
    const {user} = useAuth()
    console.log(user)

    const { isProfileOptnsTabOpen, setProfileOptnsTabState } = useAppShellUiContext()


    return  <div className=" mt-auto box-border flex flex-col lg:text-xs text-xs   " >
            {/* <hr className="mt-2 mb-2 text-[#2f2d2d]" /> */}


            <div className="py-1 md:px-2 px-1 hover:bg-[#242323] hover:rounded-sm hover:text-amber-50 md:text-xs text-xs text-left flex flex-row items-center md:gap-2 gap-1" onClick={()=>{setProfileOptnsTabState(curr=>!curr)}}>
                {/* <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> */}
                <svg md:width="20px" md:height="18px" width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M7 18V17C7 14.2386 9.23858 12 12 12V12C14.7614 12 17 14.2386 17 17V18" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path><path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="12" cy="12" r="10" stroke="#ffffff" stroke-width="1.5"></circle></svg>
                
                <div>
                    {/* {user.firstName +"" + user.lastName} */}
                    {user.firstName + " " + user.lastName[0] }
                </div>

            </div>
            <hr className="mt-2 mb-2 text-[#2f2d2d]" />

            {/* Feedback/Support */}
            <div className="py-1 md:px-2 px-1 hover:bg-[#242323] hover:rounded-sm hover:text-amber-50 md:text-xs text-xs text-left flex flex-row items-center md:gap-2 gap-1">
                <svg  md:height="18px" width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M9 9C9 5.49997 14.5 5.5 14.5 9C14.5 11.5 12 10.9999 12 13.9999" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 18.01L12.01 17.9989" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <div>
                    Help & Feedback
                </div>
            </div>
        </div>
        {/* <hr className="mt-2 mb-2 text-[#2f2d2d]" /> */}
}


function ProfileOptionsTab(){

    const {setlogoutContext} = useAuth()
    const {isProfileOptnsTabOpen, isSidebarOpen} = useAppShellUiContext()

    return <>
     <div className={`cursor-pointer ${ isSidebarOpen? "absolute top-102 w-52" :"absolute top-108 left-15 w-40"} flex flex-col rounded-sm bg-[#2d2c2c] py-1 px-1 gap-1 text-sm border-[#3b3a3a]         border-[0.25px]  `}>

            <div className="flex flex-row gap-2 text-white  grow py-1   px-3  hover:rounded-md hover:bg-[#3b3939]  hover:text-amber-50 text-sm  text-left">

                <div>Shortcuts</div>
            </div>
            <div className="flex flex-row gap-2 text-white  grow py-1   px-3  hover:rounded-md hover:bg-[#3b3939]  hover:text-amber-50 text-sm  text-left">

                <div>Profile Settings</div>
            </div>
            <div className="flex flex-row gap-2 text-white  grow py-1   px-3  hover:rounded-md hover:bg-[#3b3939]  hover:text-amber-50 text-sm  text-left">

                <div>Workspace Settings</div>
            </div>
            
            <hr className="mt-1 text-[#434141]" />

            <div className="flex flex-row gap-2 text-white hover:text-red-400  grow py-1   px-3  hover:rounded-md hover:bg-[#3b3939] text-sm  text-left" onClick={()=>setlogoutContext()}>

                <div>Logout</div>
            </div>


        </div></>
}


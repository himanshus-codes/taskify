import { useAppData } from "../../../../hooks/useAppData"
import { useAppShellUiContext } from "../../../../hooks/useAppShellUiContext"
import NormalNavLink from "../shared/NormalNavLink"

export default function WorkspaceSection(){
    
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
          
            <NormalNavLink pageTitle={"Boards"} pageAddressName={"boards"}>
                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M3 7.4V3.6C3 3.26863 3.26863 3 3.6 3H9.4C9.73137 3 10 3.26863 10 3.6V7.4C10 7.73137 9.73137 8 9.4 8H3.6C3.26863 8 3 7.73137 3 7.4Z" stroke="#ffffff" stroke-width="1.5"></path><path d="M14 20.4V16.6C14 16.2686 14.2686 16 14.6 16H20.4C20.7314 16 21 16.2686 21 16.6V20.4C21 20.7314 20.7314 21 20.4 21H14.6C14.2686 21 14 20.7314 14 20.4Z" stroke="#ffffff" stroke-width="1.5"></path><path d="M14 12.4V3.6C14 3.26863 14.2686 3 14.6 3H20.4C20.7314 3 21 3.26863 21 3.6V12.4C21 12.7314 20.7314 13 20.4 13H14.6C14.2686 13 14 12.7314 14 12.4Z" stroke="#ffffff" stroke-width="1.5"></path><path d="M3 20.4V11.6C3 11.2686 3.26863 11 3.6 11H9.4C9.73137 11 10 11.2686 10 11.6V20.4C10 20.7314 9.73137 21 9.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" stroke="#ffffff" stroke-width="1.5"></path></svg>
            </NormalNavLink>
            
            <NormalNavLink pageTitle={"Templates"} pageAddressName={"templates"}>
                    <svg width="18px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M9 3H3.6C3.26863 3 3 3.26863 3 3.6V20.4C3 20.7314 3.26863 21 3.6 21H9M9 3V21M9 3H15M9 21H15M15 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H15M15 3V21" stroke="#ffffff" stroke-width="1.5"></path></svg>
            </NormalNavLink>
            
            <NormalNavLink pageTitle={"Stats"} pageAddressName={"stats"}>
                <svg width="20px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M20 20H4V4" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 16.5L12 9L15 12L19.5 7.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </NormalNavLink>

            <NormalNavLink pageTitle={"Settings"} pageAddressName={"settings"}>
                <svg width="16px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#f7f7f7"><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#f7f7f7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772L22 11L19.6224 10.3954Z" stroke="#f7f7f7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </NormalNavLink>
            

            
        </>}
    </>
}
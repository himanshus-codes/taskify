import { useAuth } from "../../../../context/AuthContext"
import { useAppShellUiContext } from "../../../../hooks/useAppShellUiContext"
import SidebarTooltip from "../shared/SidebarTooltip"

export default function CollapsedProfileAndFeedbackSection(){
    const {user} = useAuth()
    console.log(user)

    const {  isProfileOptnsTabOpen, setProfileOptnsTabState } = useAppShellUiContext()


    return  <div className="mt-auto mb-0 flex flex-col gap-1 items-center">
       <div className="relative group">
            <div className="cursor-pointer py-2 px-2.5   hover:bg-[#292828]  hover:rounded-md hover:text-amber-50 " onClick={()=>{setProfileOptnsTabState(curr=>!curr); console.log("profile opt clicked")}}>
                <div className=" md:text-xs text-xs text-left flex flex-row items-center md:gap-2 gap-1" >
        
                    <svg  width="20px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M7 18V17C7 14.2386 9.23858 12 12 12V12C14.7614 12 17 14.2386 17 17V18" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path><path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="12" cy="12" r="10" stroke="#ffffff" stroke-width="1.5"></circle></svg>
                    
                    {/* <div>
                        {user.firstName +"" + user.lastName}
                        {user.firstName + " " + user.lastName[0] }
                    </div> */}

                </div>
            </div>

            {!isProfileOptnsTabOpen &&
                <div className="hidden group-hover:block">
                    <SidebarTooltip>{"Profile"}</SidebarTooltip>
                </div>
            }
       </div>
       <div className="relative group">
            <div className="cursor-pointer  py-2 px-2.5  hover:bg-[#292828]  hover:rounded-md hover:text-amber-50 ">
                {/* <div className="py-1   px-2 hover:bg-[#a2b1a2ce] hover:rounded-md">Members</div> */}
                
                <div className=" md:text-xs text-xs text-left flex flex-row items-center md:gap-2 gap-1">
                    <svg   width="20px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M9 9C9 5.49997 14.5 5.5 14.5 9C14.5 11.5 12 10.9999 12 13.9999" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 18.01L12.01 17.9989" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    {/* <div>
                        Help & Feedback
                    </div> */}
                </div>
            
            </div>

            {!isProfileOptnsTabOpen &&
                <div className="hidden group-hover:block">
                    <SidebarTooltip>{"Support & Feedback"}</SidebarTooltip>
                </div>
            }
       </div>

        
    </div>
                
    {/* <hr className="mt-2 mb-2 text-[#2f2d2d]" /> */}
    {/* <hr className="mt-2 mb-2 text-[#2f2d2d]" /> */}
}


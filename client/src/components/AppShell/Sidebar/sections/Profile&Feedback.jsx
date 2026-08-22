import { useAppData } from "../../../../hooks/useAppData"
import { useAuth } from "../../../../context/AuthContext"
import { useAppShellUiContext } from "../../../../hooks/useAppShellUiContext"

export default function ProfileAndFeedbackSection(){
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


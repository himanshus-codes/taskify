import { useAuth } from "../../../../context/AuthContext"
import { useAppShellUiContext } from "../../../../hooks/useAppShellUiContext"


export default function ProfileOptionsMenu(){

    const {setlogoutContext} = useAuth()
    const { isSidebarOpen} = useAppShellUiContext()

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


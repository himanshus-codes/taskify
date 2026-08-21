import { useAppShellUiContext } from "../../../hooks/useAppShellUiContext";

export default function ToggleSideBar() {

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
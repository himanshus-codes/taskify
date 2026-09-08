import { useState } from "react";
import { useBoardDisplayContext } from "../../../hooks/useBoardDisplayContext";

export function SortMenuBtn() {

    const {viewType, setViewType, openMenu, setOpenMenu} = useBoardDisplayContext()

    const isOpen = openMenu === "sort"

    function toggleMenu(){
        setOpenMenu( isOpen ? null : "sort")
    }

    return(

    <button onClick={toggleMenu} className="p-1.5 hover:bg-[#252424]  rounded-sm group relative" >
            <div>
                <svg width="18px" height="17px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fafafa"><path d="M10 14H2" stroke="#fafafa" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 10H2" stroke="#fafafa" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 6H2" stroke="#fafafa" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 18H2" stroke="#fafafa" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19 20V4M19 20L22 17M19 20L16 17M19 4L22 7M19 4L16 7" stroke="#fafafa" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
            {/* <div className="absolute hidden group-hover:block p-1 top-full right-0 text-xs ">
                Sort
            </div> */}
    </button>
    )
}

export function SortMenu() {
    const {viewType, setViewType, openMenu, setOpenMenu} = useBoardDisplayContext()


    return <div
        className="
            relative
            group
        
            w-full
         
            rounded-sm
            border
            border-[#363434]
            bg-[#292828]
            shadow-xl
            p-2
            "
        >
            <button
                type="button"
                aria-label="Close"
                className="
                    absolute
                    right-1
                    top-1
                    p-1
                    rounded-sm
                    hover:bg-white/5
                    group-hover:block hidden
                    "
                // onClick={() => toggleMenu(null)}
                onClick={() => setOpenMenu(null)}
            >
                <svg
                    width="14px"
                    height="14px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
                        stroke="#e3e3e3"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>                

        {/* Menu heading */}
        <div className="
            px-3
            py-2
            text-xs
            text-[#8f8b8b]
        ">
            Select Sort
        </div>
        

        {/* Options */}

        <div className=" px-3 py-2  text-xs text-[#e6dede]">
            Upcoming feature!
        </div>
            
    </div>

}
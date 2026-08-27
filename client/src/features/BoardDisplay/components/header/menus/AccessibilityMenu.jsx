import { useState } from "react";
import { useBoardDisplayContext } from "../../../hooks/useBoardDisplayContext";

export default function AccessiblityMenu() {

    const {viewType, setViewType, openMenu, setOpenMenu} = useBoardDisplayContext()

    const isOpen = openMenu === "accessibililty"

    function toggleMenu(){
        setOpenMenu( isOpen ? null : "accessibililty")
    }

    return (
        <div className="relative ">

            {/* Trigger */}
           <button onClick={toggleMenu} className="flex justify-center items-center  hover:bg-[#252424] p-1 rounded-sm gap-1" >
                <div>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M1 20V19C1 15.134 4.13401 12 8 12V12C11.866 12 15 15.134 15 19V20" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"></path><path d="M13 14V14C13 11.2386 15.2386 9 18 9V9C20.7614 9 23 11.2386 23 14V14.5" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"></path><path d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 7.65685 16.3431 9 18 9Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    
                </div>
               
            </button>


            {/* Menu */}
            {isOpen && (

                <div
                    className="
                        absolute
                        group
                        top-full
                        left-0
                        mt-2
                        w-72
                        z-50
                        rounded-lg
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
                            onClick={() => toggleMenu(null)}
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
                        Select Accessibility Option
                    </div>
                    

                    {/* Options */}

                    <div className=" px-3 py-2  text-xs text-[#e6dede]">
                        Upcoming feature!
                    </div>
                    
                </div>

            )}

        </div>
    );
}
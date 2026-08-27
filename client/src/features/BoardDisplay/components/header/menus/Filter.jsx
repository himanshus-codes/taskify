import { useState } from "react";
import { useBoardDisplayContext } from "../../../hooks/useBoardDisplayContext";

export default function FilterMenu() {

    const {viewType, setViewType, openMenu, setOpenMenu} = useBoardDisplayContext()

    const isOpen = openMenu === "filter"

    function toggleMenu(){
        setOpenMenu( isOpen ? null : "filter")
    }

    return (
        <div className="relative ">

            {/* Trigger */}
           <button onClick={toggleMenu} className="flex justify-center items-center  hover:bg-[#252424] p-1 rounded-sm gap-1" >
                {/* <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M3 3.6V20.4C3 20.7314 3.26863 21 3.6 21H20.4C20.7314 21 21 20.7314 21 20.4V3.6C21 3.26863 20.7314 3 20.4 3H3.6C3.26863 3 3 3.26863 3 3.6Z" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 6L6 16" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 6V9" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 6V13" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 6V11" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path></svg> */}
                {/* <svg width="24px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ebebeb"><path d="M3 3.6V20.4C3 20.7314 3.26863 21 3.6 21H20.4C20.7314 21 21 20.7314 21 20.4V3.6C21 3.26863 20.7314 3 20.4 3H3.6C3.26863 3 3 3.26863 3 3.6Z" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 6L6 16" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 6V9" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 6V13" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 6V11" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg> */}
                <div>
                    <svg width="20px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M3.99961 3H19.9997C20.552 3 20.9997 3.44764 20.9997 3.99987L20.9999 5.58569C21 5.85097 20.8946 6.10538 20.707 6.29295L14.2925 12.7071C14.105 12.8946 13.9996 13.149 13.9996 13.4142L13.9996 19.7192C13.9996 20.3698 13.3882 20.8472 12.7571 20.6894L10.7571 20.1894C10.3119 20.0781 9.99961 19.6781 9.99961 19.2192L9.99961 13.4142C9.99961 13.149 9.89425 12.8946 9.70672 12.7071L3.2925 6.29289C3.10496 6.10536 2.99961 5.851 2.99961 5.58579V4C2.99961 3.44772 3.44732 3 3.99961 3Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
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
                        Select filter
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
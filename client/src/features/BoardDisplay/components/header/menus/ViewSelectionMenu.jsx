import { useState } from "react";
import { useBoardDisplayContext } from "../../../hooks/useBoardDisplayContext";

export default function ViewSelectionMenu() {

    const {viewType, setViewType, openMenu, setOpenMenu} = useBoardDisplayContext()

    const isOpen = openMenu === "view"

    function toggleMenu(){
        setOpenMenu( isOpen ? null : "view")
    }

    return (
        <div className="relative">

            {/* Trigger */}
           <button onClick={toggleMenu} className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm gap-1" >
                {/* <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M3 3.6V20.4C3 20.7314 3.26863 21 3.6 21H20.4C20.7314 21 21 20.7314 21 20.4V3.6C21 3.26863 20.7314 3 20.4 3H3.6C3.26863 3 3 3.26863 3 3.6Z" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 6L6 16" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 6V9" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 6V13" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 6V11" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path></svg> */}
                {/* <svg width="24px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ebebeb"><path d="M3 3.6V20.4C3 20.7314 3.26863 21 3.6 21H20.4C20.7314 21 21 20.7314 21 20.4V3.6C21 3.26863 20.7314 3 20.4 3H3.6C3.26863 3 3 3.26863 3 3.6Z" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 6L6 16" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 6V9" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 6V13" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 6V11" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg> */}
                <div>
                    <svg width="20px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ebebeb"><path d="M3 3.6V20.4C3 20.7314 3.26863 21 3.6 21H20.4C20.7314 21 21 20.7314 21 20.4V3.6C21 3.26863 20.7314 3 20.4 3H3.6C3.26863 3 3 3.26863 3 3.6Z" stroke="#ebebeb" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 6L6 16" stroke="#ebebeb" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 6V9" stroke="#ebebeb" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 6V13" stroke="#ebebeb" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 6V11" stroke="#ebebeb" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
                <div>
                    <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#e3e3e3"><path d="M6 9L12 15L18 9" stroke="#e3e3e3" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
            </button>


            {/* Menu */}
            {isOpen && (
                <div
                    className="
                        absolute
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

                    {/* Menu heading */}
                    <div className="
                        px-3
                        py-2
                        text-xs
                        text-[#8f8b8b]
                    ">
                        Select view
                    </div>


                    {/* Board */}
                    <button onClick={()=>{console.log(viewType);setViewType("kanban")}} aria-pressed={viewType === "kanban"}
                        className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-3
                            py-2.5
                            rounded-md
                            text-sm
                            text-[#d2cbcb]
                            hover:bg-[#343333]
                            text-left
                        "
                    >   
                        <span>▦</span>
                        <span >Kanban</span>
                    </button>


                    {/* Table */}
                    <button
                        className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-3
                            py-2.5
                            rounded-md
                            text-sm
                            text-[#d2cbcb]
                            hover:bg-[#343333]
                            text-left
                        "
                    >
                        <span>▤</span>
                        <span>Table</span>
                    </button>


                    {/* Calendar */}
                    <button
                        className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-3
                            py-2.5
                            rounded-md
                            text-sm
                            text-[#d2cbcb]
                            hover:bg-[#343333]
                            text-left
                        "
                    >
                        <span>□</span>
                        <span>Calendar</span>
                    </button>

                </div>
            )}

        </div>
    );
}
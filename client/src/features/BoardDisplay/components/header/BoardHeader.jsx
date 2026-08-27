import { useState } from "react";
import ViewSelectionMenu from "./menus/ViewSelectionMenu";
import { useBoardDisplayContext } from "../../hooks/useBoardDisplayContext";
import FilterMenu from "./menus/Filter";
import SortMenu from "./menus/Sort";
import AccessibilityMenu from "./menus/AccessibilityMenu";
import ShareMenu from "./menus/ShareMenu";
import MoreMenu from "./menus/MoreMenu";

function BoardHeader(){


    const {boardData} = useBoardDisplayContext()

    return <div className="flex justify-center items-center 
                pt-7
                pl-7
                pr-7">
        
        <div className=" flex grow  items-center gap-5">
            <div className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm"> 
                {boardData?.title}
            </div>
            <ViewSelectionMenu></ViewSelectionMenu>
        </div>
        
        
        <div className="flex items-center gap-2">

            <div className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#feeeff" className="size-4.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>

            <div className="flex justify-center items-center  p-1 rounded-sm">
                <FilterMenu></FilterMenu>
            </div>
            
            <div className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm">
                <SortMenu></SortMenu>
            </div>
            {/* <div className="flex justify-center items-center">
               <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M3 6H21" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 12L17 12" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 18L13 18" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div> */}
           
           
            <div className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm">
                <svg width="20px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
            
            <div className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm">
                <ShareMenu></ShareMenu>
            </div>
           
            <div className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm">
                <AccessibilityMenu></AccessibilityMenu>
            </div>

            <div className="flex justify-center items-center gap-0.5 bg-blue-950  pr-2 text-sm hover:bg-[#252424] p-1 rounded-sm">
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <div>New List</div>
            </div>

            <div className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm">
                <MoreMenu></MoreMenu>
            </div>

        </div>
    </div>
}

export default BoardHeader;




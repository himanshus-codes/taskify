import ViewSelectionMenu from "./menus/ViewSelectionMenu";
import { useBoardDisplayContext } from "../hooks/useBoardDisplayContext";
import { FilterMenu, FilterMenuBtn } from "./menus/Filter";
import {SortMenu, SortMenuBtn} from "./menus/Sort";
import { AccessibilityMenu, AccessibilityMenuBtn} from "./menus/AccessibilityMenu";
import { ShareMenu, ShareMenuBtn } from "./menus/ShareMenu";
import { MoreMenu, MoreMenuBtn } from "./menus/MoreMenu";
import Search from "./Search";
import { useState } from "react";

function BoardHeader(){


    const {
        board,
        updateBoardTitle,
        openMenu,
        setOpenMenu
    } = useBoardDisplayContext();

    const [isEditing, setIsEditing] = useState(false);
    const [draftBoardTitle, setDraftBoardTitle] = useState("");

    function startEditing() {
        setDraftBoardTitle(board?.title ?? "");
        setIsEditing(true);
    }
    function closeEditing() {
        setIsEditing(false);
    }

    async function saveBoardTitle() {

        const newTitle = draftBoardTitle.trim();

        if (!newTitle) {
            setDraftBoardTitle(board?.title ?? "");
            setIsEditing(false);
            return;
        }

        try {
            await updateBoardTitle(newTitle);
            setIsEditing(false);
        } catch (e) {
            console.log(e);
        }
    }


    return <div className="flex justify-center items-center 
                pt-7
                pl-9
                pr-9">
        
        <div className=" flex grow  items-center gap-2 relative ">
            
            { !isEditing ? 
                
                (<div onClick={startEditing} className="flex justify-center  cursor-default text-md tracking-wider items-center hover:bg-[#252424] p-1 font-medium rounded-sm"> 
                    {board?.title }
                </div>)
                
                :
                
                (<div onDoubleClick={closeEditing}  className="flex justify-center  cursor-default text-md tracking-wider items-center p-1 font-medium rounded-sm"> 
                    <input 
                        
                        autoFocus 
                        value={draftBoardTitle} 
                        onBlur={()=>{closeEditing(); saveBoardTitle()} }
                        onChange={(e) => setDraftBoardTitle(e.target.value) } 
                        
                        onKeyDown={(e) => {
                        
                            if (e.key === "Enter") {
                                saveBoardTitle();
                            }

                            if (e.key === "Escape") {
                                setDraftBoardTitle(
                                    board?.title ?? ""
                                );
                                setIsEditing(false);
                            }
                        }}  
                        
                        className="field-sizing-content min-w-10 outline-none" >

                    </input>
                </div>)
            }

            <ViewSelectionMenu></ViewSelectionMenu>
        </div>
        
        
        <div className="relative">
            
            <div className="flex items-center gap-2">

            
                <Search></Search>

                <FilterMenuBtn></FilterMenuBtn>
            
                <SortMenuBtn></SortMenuBtn>

            
                <div className="flex justify-center items-center hover:bg-[#252424] p-1.5 rounded-sm">
                    <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
                
                <ShareMenuBtn></ShareMenuBtn>
        
                <AccessibilityMenuBtn></AccessibilityMenuBtn>

                <div >
                </div>

                <button className="flex justify-center items-center gap-0.5 bg-blue-950  pr-2 text-sm hover:bg-[#252424] p-1 rounded-sm" onClick={()=>{setOpenMenu(()=> openMenu !== "newlistform" ? "newlistform" : "null" ); console.log("list list btn")}}>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    New List
                </button>
                <MoreMenuBtn></MoreMenuBtn>

            </div>

              {openMenu !== null && (
                    <div
                        className="
                            absolute
                            right-0
                            top-full
                            mt-3
                            z-50
                            w-80
                        "
                    >

                        {openMenu === "filter" && (
                            <FilterMenu
                            />
                        )}

                        {openMenu === "sort" && (
                            <SortMenu
                            />
                        )}

                        {openMenu === "share" && (
                            <ShareMenu
                               
                            />
                        )}

                        {openMenu === "accessibility" && (
                            <AccessibilityMenu
                           
                            />
                        )}

                        {openMenu === "more" && (
                            <MoreMenu
                               
                            />
                        )}

                    </div>
                )}
        </div>


    </div>
}

export default BoardHeader;




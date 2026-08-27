
import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useAppData } from "../../hooks/useAppData"
import { getBoards } from "../../services/boardService"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

export default function Boards(){

    const {token} = useAuth()
    const {currentWorkspaceId} = useAppData()
    const [boards, setBoards] = useState([])
    const [menuOpen, setMenuOpen] = useState(null);

    function toggleMenu(menuName) {
        setMenuOpen(current =>
            current === menuName ? null : menuName
        );
    }

    const { workspaceId } = useParams();

    async function fetchWorkspaceBoards() {

        if (!currentWorkspaceId) {
            return;
        }

        try {

            const res = await getBoards(
                token,
                currentWorkspaceId
            );

            setBoards(res.data.boards);

        } catch (e) {

            console.log(e);

        }
    }


    useEffect(() => {

        fetchWorkspaceBoards();

    }, [
        token,
        currentWorkspaceId,
        workspaceId
    ]);

    console.log(menuOpen)

    return <div className="flex flex-col relative ">

            { menuOpen==="newboardform" && <NewBoardForm  toggleMenu={toggleMenu} onBoardCreated={fetchWorkspaceBoards}></NewBoardForm>}

            <div className="sticky flex flex-col gap-10 pt-10 top-0  z-10 bg-[#181717] pb-6 ">
                <div className="flex items-center justify-between   ">
                    <div  className=" text-lg font-medium   text-[#f1eeee] cursor-pointer">
                            <div >
                                Boards
                            </div>
                    </div>
                    
                     
                    <div className="flex items-center gap-2.5 relative">
                        
                        <div className="relative">
                            <button   aria-label="Search boards" onClick={() => toggleMenu("search")} className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#feeeff" className="size-4.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>

                            {menuOpen === "search" && (
                                <div className="absolute top-full right-0 mt-2 z-50">
                                    {/* Search menu */}
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button onClick={() => toggleMenu("filter")} className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm">
                                <svg width="20px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M3.99961 3H19.9997C20.552 3 20.9997 3.44764 20.9997 3.99987L20.9999 5.58569C21 5.85097 20.8946 6.10538 20.707 6.29295L14.2925 12.7071C14.105 12.8946 13.9996 13.149 13.9996 13.4142L13.9996 19.7192C13.9996 20.3698 13.3882 20.8472 12.7571 20.6894L10.7571 20.1894C10.3119 20.0781 9.99961 19.6781 9.99961 19.2192L9.99961 13.4142C9.99961 13.149 9.89425 12.8946 9.70672 12.7071L3.2925 6.29289C3.10496 6.10536 2.99961 5.851 2.99961 5.58579V4C2.99961 3.44772 3.44732 3 3.99961 3Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </button>

                            {menuOpen === "filter" && (
                                <div className="absolute top-full right-0 mt-2 z-50">
                                    {/* FilterMenu */}
                                </div>
                            )}
                        </div>
                      
                        <div className="relative">
                            <button onClick={() => toggleMenu("sort")} className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm">
                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fafafa"><path d="M10 14H2" stroke="#fafafa" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 10H2" stroke="#fafafa" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 6H2" stroke="#fafafa" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 18H2" stroke="#fafafa" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19 20V4M19 20L22 17M19 20L16 17M19 4L22 7M19 4L16 7" stroke="#fafafa" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </button>

                            {menuOpen === "sort" && (
                                <div className="absolute top-full right-0 mt-2 z-50">
                                    {/* SortMenu */}
                                </div>
                            )}
                            
                        </div>
                        <div className="relative">
                            {/* <button className="flex justify-center items-center">
                            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M3 6H21" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 12L17 12" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 18L13 18" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </button> */}
                            
                            <button onClick={() => { toggleMenu("newboardform");console.log("new board btn") } }   className="flex justify-center items-center gap-1 bg-blue-950  pr-2 text-sm hover:bg-[#252424] p-1 rounded-sm">
                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                <div>New Board</div>
                            </button>

                        </div>
                        <div className="relative">
                            <button onClick={() => toggleMenu("more")} className="flex justify-center items-center hover:bg-[#252424] p-1 rounded-sm">
                                <svg width="18px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M20 12.5C20.2761 12.5 20.5 12.2761 20.5 12C20.5 11.7239 20.2761 11.5 20 11.5C19.7239 11.5 19.5 11.7239 19.5 12C19.5 12.2761 19.7239 12.5 20 12.5Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.7239 12.5 12 12.5Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 12.5C4.27614 12.5 4.5 12.2761 4.5 12C4.5 11.7239 4.27614 11.5 4 11.5C3.72386 11.5 3.5 11.7239 3.5 12C3.5 12.2761 3.72386 12.5 4 12.5Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </button>

                            {menuOpen === "more" && (
                                <div className="absolute top-full right-0 mt-2 z-50">
                                    {/* MoreMenu */}
                                </div>
                            )}
                        </div>
                        
                    </div>
                </div>
            
                <div className="flex gap-20 mb-8">
                    <div className="text-sm hover:text-[#f0eaea] cursor-pointer">Active</div>
                    {/* <div className="text-sm">Starred</div> */}
                    <div className="text-sm hover:text-[#f2ecec] cursor-pointer ">Archived</div>
                </div>
            </div>

            <div className={`grid  grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10 mb-8 min-h-0 ${boards.length>0 ? "block" : "hidden"}`}  >            
                { boards.length != 0 &&

                    boards.map((board) => {

                        return <Link key={board._id} to={`/workspaces/${currentWorkspaceId}/boards/${board._id}`}>
                            <div  className="w-full min-h-30  text-white  bg-[#3b3a65] rounded-md flex flex-col items-center p-px hover:shadow-[#2a2a34] hover:shadow-[2px_1px_2px_0px_rgba(0,0,0,0.3)]
                        hover:border-[#3b3a65] hover:border-[0.5px] cursor-pointer">

                        {/* return <div className="w-full min-h-30 max-h-fit text-white bg-[#72767a] rounded-md flex flex-col items-center p-px "> */}
                            
                            <div className="flex flex-row w-full h-8 text-base bg-[#16232e] text-center items-center rounded-md rounded-bl-2xl gap-2 justify-end pr-2 ">
                                
                                <div>
                                    <svg width="16px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 12V15C21 18.3137 18.3137 21 15 21H9C5.68629 21 3 18.3137 3 15V9C3 5.68629 5.68629 3 9 3H12" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                </div>
                                
                                <div className=""></div>
                                
                                <div>
                                    <svg width="16px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                </div>
                            
                            </div>

                            {/* <div className="w-full grow text-base bg-[#3b3a65] text-center rounded-md">{board.description}</div> */}
                            
                            {/* <div className=" flex w-full grow  bg-[#3b3a65] text-center rounded-md items-end justify-center"> */}
                            <div className=" flex w-full grow  bg-[#3b3a65] text-center rounded-md items-center justify-center">
                                <div>{board.title}</div>
                            </div>
                        </div>
                        </Link>
                    
                    })

                } 
            
           
            </div>
            

            {
                boards.length==0 &&
                <div className=" h-88 flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-4 w-100  text-center items-center  min-h-50 min-w-50  ">

                        <div className="flex flex-col gap-2 items-center  ">
                            <div>
                                <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#707070"><path d="M9.99998 15L9.99999 19C10 20.1046 9.10457 21 7.99999 21H4C2.89543 21 2 20.1046 2 19V15C2 13.8954 2.89543 13 4 13H7.99998C9.10455 13 9.99998 13.8954 9.99998 15Z" stroke="#707070" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 4.99999L16 8.99999C16 10.1046 15.1046 11 14 11H10C8.89543 11 8 10.1046 8 9V5C8 3.89543 8.89543 3 10 3H14C15.1045 3 16 3.89543 16 4.99999Z" stroke="#707070" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 15L22 19C22 20.1046 21.1046 21 20 21H16C14.8954 21 14 20.1046 14 19V15C14 13.8954 14.8954 13 16 13H20C21.1045 13 22 13.8954 22 15Z" stroke="#707070" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 16V13" stroke="#707070" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 6V3" stroke="#707070" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 16V13" stroke="#707070" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </div>
                            
                            <div className="text-gray-300 text-lg font-medium">
                                No Boards
                            </div>
                        </div>

                        <div className="text-gray-300 text-sm font-medum">
                            Get started by creating a new board
                        </div>

                        <div className="text-gray-700 text-sm font-medium bg-white p-1 rounded-sm mt-4 px-3 cursor-pointer hover:bg-amber-50"  >
                            Create New Board
                        </div>

                    </div>
                </div>
            }

    </div>
}

import { createBoard } from "../../services/boardService"

// import { useState } from "react";
// import { createBoard } from "../../services/boardService";
// import { useAuth } from "../../context/AuthContext";
// import { useAppData } from "../../hooks/useAppData";

function NewBoardForm({ toggleMenu, onBoardCreated }) {

    const { token } = useAuth();

    const {
        currentWorkspaceId,
        currentWorkspace,
    } = useAppData();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (!trimmedTitle) {
            setError("Board title is required.");
            return;
        }

        try {
            setIsCreating(true);

            const data = await createBoard(
                token,
                currentWorkspaceId,
                {
                    title: trimmedTitle,
                    description: trimmedDescription,
                }
            );

            // Tell Boards.jsx that creation succeeded
            onBoardCreated?.(data);

            // Close the form
            toggleMenu(null);

        } catch (e) {
            setError(e.message || "Unable to create board.");
        } finally {
            setIsCreating(false);
        }
    }

    return (
        <div
            className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                z-70
                pointer-events-none
                rounded-lg
                top-20  
                h-full       
                bg-blue-500/2 
            "
        >
            <div
                className="
                    relative
                    w-140
                    rounded-lg
                    flex
                    flex-col
                    gap-5
                    p-6
                    pointer-events-auto
                    border
                    border-[#3b3939]
                    bg-[#292828]
                    shadow-xl
                    group 
                "
            >

                {/* Close */}
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
                        width="20px"
                        height="20px"
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


                {/* Heading */}
                <div className="pr-8">
                    <div className="text-[13px] text-[#969292]">
                        {currentWorkspace?.title}
                    </div>

                    <h2 className="text-lg font-medium text-[#f1eeee]">
                        Create New Board
                    </h2>
                </div>


                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >

                    {/* Title */}
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="board-title"
                            className="text-sm text-[#d2cbcb]"
                        >
                            Title
                        </label>

                        <input
                            id="board-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter board title"
                            autoFocus
                            disabled={isCreating}
                            className="
                                w-full
                                rounded-md
                                border
                                border-[#464343]
                                bg-[#202020]
                                px-3
                                py-2
                                text-sm
                                text-[#eeeeee]
                                outline-none
                                placeholder:text-[#686464]
                                focus:border-[#6662a8]
                            "
                        />
                    </div>


                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                        
                        <div className="flex items-center gap-2">
                            <label
                                htmlFor="board-description"
                                className="text-sm text-[#d2cbcb]"
                            >
                            Description
                            </label>
                            <span className="text-xs text-[#8b8a8a] font-medium">
                                (Optional)
                            </span>
                        </div>

                        <textarea
                            id="board-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe what this board is for"
                            disabled={isCreating}
                            rows={4}
                            className="
                                w-full
                                resize-none
                                rounded-md
                                border
                                border-[#464343]
                                bg-[#202020]
                                px-3
                                py-2
                                text-sm
                                text-[#eeeeee]
                                outline-none
                                placeholder:text-[#686464]
                                focus:border-[#6662a8]
                            "
                        />
                    </div>


                    {/* Error */}
                    {error && (
                        <div className="text-sm text-red-400">
                            {error}
                        </div>
                    )}


                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2">

                        <button
                            type="button"
                            disabled={isCreating}
                            onClick={() => toggleMenu(null)}
                            className="
                                rounded-md
                                px-4
                                py-2
                                text-sm
                                text-[#d2cbcb]
                                hover:bg-[#353333]
                                disabled:opacity-50
                            "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isCreating || !title.trim()}
                            className="
                                rounded-md
                                bg-[#243b78]
                                px-4
                                py-2
                                text-sm
                                text-white
                                hover:bg-[#2d498f]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            {isCreating ? "Creating..." : "Create Board"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}

// export default NewBoardForm;
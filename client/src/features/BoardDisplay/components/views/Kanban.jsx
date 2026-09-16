// bg-[#181717]
// bg-[#1e1d1d]


import { useAuth } from "../../../../context/AuthContext";
import { useAppData } from "../../../../hooks/useAppData";
import { useState, useRef, useEffect } from "react";
import { useBoardDisplayContext } from "../../hooks/useBoardDisplayContext";
import Column from "./Kanban/Column";


export default function Kanban() {

    const {viewType, setViewType, openMenu, setOpenMenu, board, tasks, columns, createNewColumn } = useBoardDisplayContext()

    // const columns = dashboardData?.columns ?? [];

    const isOpen = openMenu === "newlistform"

    function toggleMenu(){
        setOpenMenu( isOpen ? null : "newlistform")
    }

    const kanbanScrollRef = useRef(null);
    const shouldScrollToEndColumn = useRef(false);
    
    useEffect(() => {

        if (!shouldScrollToEndColumn.current) {
            return;
        }

        const container = kanbanScrollRef.current;

        if (!container) {
            return;
        }

        requestAnimationFrame(() => {

            container.scrollTo({
                left: container.scrollWidth + container.clientWidth, 
                behavior: "smooth"
            });

            shouldScrollToEndColumn.current = false;
        });

    }, [columns]);

    const isDragging = useRef(false); //is left mouse currently being held?
    const dragStartX = useRef(0);//where the mouse was when the drag started
    const scrollStartX = useRef(0);// where the scrollbar was when the drag started

    function handlePointerDown(e) {
        
        // no grab and drag if new list form is open
        if(isOpen){
            return
        }

        // Only left mouse button
        if (e.pointerType === "mouse" && e.button !== 0) {
            return;
        }

        // Don't activate grab scrolling on interactive elements
        // if (
        //     e.target.closest(
        //         "button, input, textarea, select, a, [contenteditable='true']"
        //     )
        // ) {
        //     return;
        // }

        // Only the actual Kanban container can start dragging
        const isInsideColumn =
            e.target.closest("[data-kanban-column]");
    

        if (isInsideColumn ) {
            return;
        }

        const container = kanbanScrollRef.current;

        if (!container) return;

        isDragging.current = true;

        dragStartX.current = e.clientX;
        scrollStartX.current = container.scrollLeft;

        // Prevent browser text selection from starting
        e.preventDefault();

        // Keep receiving pointer events even if mouse leaves container
        container.setPointerCapture(e.pointerId);

        container.style.cursor = "grabbing";
        container.style.userSelect = "none";
    }

    function handlePointerMove(e) {

        // no grab and drag if new list form is open
        if(isOpen){
            return
        }
        const container = kanbanScrollRef.current;

        if (!container) return;

        // Currently dragging
        if (isDragging.current) {

            e.preventDefault();

            const mouseMovement =
                e.clientX - dragStartX.current;

            container.scrollLeft =
                scrollStartX.current - mouseMovement;

            return;
        }

        // Not dragging.
        // Show grab only when directly over empty Kanban area.
       const isInsideColumn = e.target.closest("[data-kanban-column]");
       

        if (isInsideColumn ) {
            container.style.cursor = "";
        } else {
            container.style.cursor = "grab";
        }
    }
    function handlePointerUp(e) {
        

        const container = kanbanScrollRef.current;

        if (!container) return;

        isDragging.current = false;

        container.style.userSelect = "";

        if (container.hasPointerCapture(e.pointerId)) {
            container.releasePointerCapture(e.pointerId);
        }

        // Let pointer movement determine the correct cursor again.
        container.style.cursor = "";
    }
    function handlePointerCancel(e) {

        const container = kanbanScrollRef.current;

        if (!container) return;

        isDragging.current = false;

        container.style.cursor = "";
        container.style.userSelect = "";

        if (container.hasPointerCapture(e.pointerId)) {
            container.releasePointerCapture(e.pointerId);
        }
    }   
    useEffect(() => {

        const container = kanbanScrollRef.current;

        if (!container) return;

        if (isOpen) {
            isDragging.current = false;
            container.style.cursor = "";
            container.style.userSelect = "";
        }

    }, [isOpen]);
    
    return (
        <div
            ref={kanbanScrollRef}

            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}

            className="
                relative
                pt-7.5
                pl-9
                pr-9
                
                pb-7
                
                kanban-scrollbar
                flex-1
                min-h-0
                min-w-0
                overflow-x-auto
                overflow-y-hidden
            "
        >
            { (openMenu === "newlistform") && <NewListForm  toggleMenu={toggleMenu} createNewColumn={createNewColumn} shouldScrollToEndColumn={shouldScrollToEndColumn}></NewListForm>}
            {/* { openMenu==="newlistform" && <NewListForm  toggleMenu={toggleMenu} onListCreated={fetchBoardColumns}></NewListForm>} */}

            <div
                className="
                    grid
                    grid-flow-col
                    auto-cols-73
                    gap-6
                    max-h-full
                    items-start
                    w-max
                    
                "
            >

                {columns.map((column) => (
                    <Column
                        key={column._id}
                        column={column}
                        tasks={tasks}
                    />
                ))}

            </div>

        </div>
    );
}



import { createColumn } from "../../../../services/listService"
import { useParams } from "react-router-dom";

// import { useState } from "react";
// import { createColumn } from "../../services/boardService";
// import { useAuth } from "../../context/AuthContext";
// import { useAppData } from "../../hooks/useAppData";

function NewListForm({ toggleMenu, createNewColumn, shouldScrollToEndColumn }) {
    const { boardId } = useParams();
    // console.log(boardId)
    const { token } = useAuth();
    const {board} = useBoardDisplayContext()

    const [title, setTitle] = useState("");

    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState("");

    async function handleCreateNewColumn(e) {
        
        shouldScrollToEndColumn.current = true;
        e.preventDefault();

        setError("");

        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            setError("List title is required.");
            return;
        }

        try {
            setIsCreating(true);

            await createNewColumn({
                    title: trimmedTitle,
                })

            // Close the form
            toggleMenu(null);

        } catch (e) {
            setError(e.message || "Unable to create list.");
            shouldScrollToEndColumn.current = false;
        } finally {
            setIsCreating(false);
        }
    }

    return (
        <div
            data-kanban-newListForm
            className="
                
                absolute
                inset-0
                flex
                
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
                    min-h-20
                    top-15
                    h-fit
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
                        {board?.title}
                    </div>

                    <h2 className="text-lg font-medium text-[#f1eeee]">
                        Create New List
                    </h2>
                </div>


                {/* Form */}
                <form
                    onSubmit={handleCreateNewColumn}
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
                            placeholder="Enter list title"
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
                    {/* <div className="flex flex-col gap-1.5">
                        
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
                                px-4
                                py-3
                                text-sm
                                text-[#eeeeee]
                                outline-none
                                kanban-scrollbar
                                placeholder:text-[#686464]
                                focus:border-[#6662a8]
                            "
                        />
                    </div> */}

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
                                hover:text-[#ede9e9]
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
                            {isCreating ? "Creating..." : "Create List"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}
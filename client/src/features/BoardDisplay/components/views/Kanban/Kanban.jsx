// bg-[#181717]
// bg-[#1e1d1d]


import { useState, useRef, useEffect } from "react";
import { useBoardDisplayContext } from "../../../hooks/useBoardDisplayContext";
import Column from "./Column";
import NewTaskForm from "./components/NewTaskForm";
import NewListForm from "./components/NewListForm";


export default function Kanban() {

    const {viewType, setViewType, openMenu, setOpenMenu, board, tasks, columns, createNewColumn, createNewTask } = useBoardDisplayContext()

    // const columns = dashboardData?.columns ?? [];
    const [newTaskColumnId, setNewTaskColumnId] = useState(null);
    const [newTaskColumnTitle, setNewTaskColumnTitle] = useState(null);

    const isOpen = openMenu === "newlistform"
    const isTaskFormOpen = newTaskColumnId !== null;

    function toggleMenu(){
        setOpenMenu( isOpen ? null : "newlistform")
    }


    
    function openNewTaskForm(columnId, columnTitle) {
        setNewTaskColumnId(columnId);
        setNewTaskColumnTitle(columnTitle);
    }

    function closeNewTaskForm() {
        console.log("closing form ----------")
        setNewTaskColumnId(null);
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
        if (isOpen || isTaskFormOpen) {
            return;
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
        if (isOpen || isTaskFormOpen) {
            return;
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
        if (isOpen || isTaskFormOpen) {
            return;
        }

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
        if (isOpen || isTaskFormOpen) {
            return;
        }
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

    }, [isOpen, isTaskFormOpen ]);
    
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
                h-full
                pb-7
                kanban-scrollbar
                flex-1
                min-h-0
                min-w-0
                overflow-x-auto
                overflow-y-hidden
            "
        >   
                    
            {newTaskColumnId && (
                <NewTaskForm
                    columnId={newTaskColumnId}
                    closeForm={closeNewTaskForm}
                    openForm={openNewTaskForm}
                    createNewTask={createNewTask}
                    columnTitle={newTaskColumnTitle}
                />
            )}

            { (openMenu === "newlistform") && <NewListForm  toggleMenu={toggleMenu} createNewColumn={createNewColumn} shouldScrollToEndColumn={shouldScrollToEndColumn}></NewListForm>}
            {/* { openMenu==="newlistform" && <NewListForm  toggleMenu={toggleMenu} onListCreated={fetchBoardColumns}></NewListForm>} */}

            <div
                className="
                    grid
                    grid-flow-col
                    auto-cols-73
                    gap-6
                    h-full
                    items-start
                    w-max
                "
            >

               {columns.map((column) => (
                    <Column
                        key={column._id}
                        column={column}
                        tasks={tasks}
                        onAddTask={openNewTaskForm}
                    />
                ))}


            </div>



        </div>
    );
}




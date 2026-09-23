// import { useDroppable } from "@dnd-kit/core";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Card from "./Card";
import QuickAddTask from "./components/QuickAddTask";
import { useState, useEffect, useRef } from "react";
import { useBoardDisplayContext } from "../../../hooks/useBoardDisplayContext";
import ColumnMenu from "./components/ColumnMenu";
import { useKanbanContext } from "./KanbanContext";

// export default function Column({ 
//     column, 
//     tasks
// }) 

export default function Column({
    column,
    tasks,
    isDragOverlay = false
}) {

    const {

        currColumnIdforColMenuOpen,
        toggleColMoreMenu,

        toggleDeleteListPrompt,
        toggleEmptyListPrompt,

        currColumnIdforQuickAddTaskOpen,
        toggleQuickAddTask,

        setNewTaskFormMetaData,
        toggleNewTaskFormMenu,

        currColBeingEdited,
        toggleColEditing,
        
    } = useKanbanContext();

    const {openMenu,  setOpenMenu ,deleteColumn, deleteAllTasksByColumnId, updateColumnTitle, updateTaskOrder} = useBoardDisplayContext()
    
    const taskArray = tasks
    // console.log(taskArray)
    

    // Colum More (...) Menu Open

    const isColMenuOpen = (openMenu === "columnmoreoptions") && (currColumnIdforColMenuOpen === column._id)

    // Add New Task (Quick Add Task Method)
    const isQuickAddTaskOn = (openMenu === "quickaddtask") && (currColumnIdforQuickAddTaskOpen === column._id)
    console.log(isQuickAddTaskOn)
    const kanbanScrollRef = useRef(null);
    const previousTaskCount = useRef(taskArray.length);
    const isInitialRender = useRef(true);


    // Scroll to Bottom of a Column/List when a task gets added
    useEffect(() => {

        // Don't scroll when the column initially loads its tasks
        if (isInitialRender.current) {
            isInitialRender.current = false;
            previousTaskCount.current = taskArray.length;
            return;
        }

        // Only scroll when a task was added
        if (taskArray.length <= previousTaskCount.current) {
            previousTaskCount.current = taskArray.length;
            return;
        }

        const container = kanbanScrollRef.current;

        if (!container) {
            previousTaskCount.current = taskArray.length;
            return;
        }

        requestAnimationFrame(() => {

            container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth"
            });

        });

        previousTaskCount.current = taskArray.length;

    }, [taskArray.length]);

    // Scroll to Bottom of a Column/List when the bottom Quick-Add-Card/Task form is openened

    useEffect(()=>{
            
        if(isQuickAddTaskOn){
            const container = kanbanScrollRef.current;
            requestAnimationFrame(() => {

                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: "smooth"
                });

            });
        }
    },[isQuickAddTaskOn, taskArray])


    // Update Column Title

    const titleInputRef = useRef(null);
    const [draftColTitle, setDraftColTitle] = useState(column.title)
    
    const isEditingTitle = (openMenu === "coltitleediting") && (column._id == currColBeingEdited)

    async function handleColTitleEditing(e){
        if(e.key == "Enter"){
            console.log("Enter")

            if(column.title === draftColTitle){
                toggleColEditing(null)
                return
            }

            try {
                await updateColumnTitle(column._id, draftColTitle)
            } catch(e){
                console.log(e)
            } finally {
                toggleColEditing(null)
                setDraftColTitle(column.title)
            }
        }

        if(e.key == "Escape"){
            console.log("Escape")
            toggleColEditing(null)
        }
    }

    useEffect(() => {
        if (!isEditingTitle || !titleInputRef.current) {
            return;
        }

        const textarea = titleInputRef.current;


        // Setting the cursor after the last character
        //      Both start and end positions are the same:
        //      setSelectionRange(end, end)

        textarea.setSelectionRange(
            textarea.value.length,
            textarea.value.length
        );


        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [isEditingTitle]);


//  // DND droppable behavior


//     const {
//         setNodeRef,
//         isOver
//     } = useDroppable({
//         id: `column-${column._id}`,

//         data: {
//             type: "column",
//             columnId: column._id
//         }
//     });


    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: column._id,

        data: {
            type: "column",
            columnId: column._id
        },

        disabled: isDragOverlay
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging && !isDragOverlay ? 0 : 1
    };

   
    return (
        <div
            ref={setNodeRef}
            style={style}
            data-kanban-column
            className="
                flex
                flex-col
                min-h-0
                h-fit
                max-h-full
                bg-[#1c1b1b]
                rounded-md
                border-[0.1px]
                border-[#2f2d2d]
                p-2
                pt-3
                gap-2
                shadow-[#161414]
                shadow-xl
                relative
            "
        >
            {/* { !isEditingTitle &&

                    <div
                        {...attributes}
                        {...listeners}
                        className="
                            absolute
                            left-1/2
                            -translate-x-1/2
                            -top-1
                            hidden
                            group-hover:flex
                            shrink-0
                            cursor-grab
                            active:cursor-grabbing
                            text-white/40
                            hover:text-white/70
                            text-xs
                            pt-1
                            touch-none
                            w-fit
                        "
                    >
                        ⋮⋮⋮⋮⋮⋮ 
                    </div> 
                } */}
            {/* Column header */}
            <div className="flex mx-2 mb-1 items-start gap-3  group ">

                { !isEditingTitle &&

                    <div
                        {...attributes}
                        {...listeners}
                        className="
                            absolute
                            left-1/2
                            -translate-x-1/2
                            -top-1
                            hidden
                            group-hover:flex
                            shrink-0
                            cursor-grab
                            active:cursor-grabbing
                            text-white/40
                            hover:text-white/70
                            text-xs
                            pt-1
                            touch-none
                            w-fit
                        "
                    >
                        ⋮⋮⋮⋮⋮⋮ 
                    </div> 
                }

                {isColMenuOpen && 
                    <ColumnMenu toggleColMoreMenu={toggleColMoreMenu} toggleDeleteListPrompt={toggleDeleteListPrompt}
                        toggleEmptyListPrompt={toggleEmptyListPrompt} column={column} setNewTaskFormMetaData={setNewTaskFormMetaData} toggleNewTaskFormMenu={toggleNewTaskFormMenu}></ColumnMenu>

                    // <ColumnMenu toggleColMoreMenu={toggleColMoreMenu} toggleDeleteListPrompt={toggleDeleteListPrompt}
                    //     toggleEmptyListPrompt={toggleEmptyListPrompt} column={column}></ColumnMenu>
                }

                <div className="flex grow min-w-0 items-center text-sm font-medium gap-2">

                    {!isEditingTitle && (
                        <div
                            className="
                                min-w-0
                                flex-1
                                wrap-break-word
                            "
                        >   
                            <div onClick={() => toggleColEditing(column._id)}  className="w-fit">
                                {column.title}
                            </div>
                        </div>
                    )}

                    {isEditingTitle && (
                        <textarea
                            ref={titleInputRef}
                            onBlur={() => toggleColEditing(null)}
                            className="
                                
                                min-w-0
                                flex-1
                                resize-none
                                overflow-hidden
                                outline-none
                                bg-[#1e1d1d]
                                text-sm
                                font-medium
                                leading-6
                            "
                            onKeyDown={handleColTitleEditing}
                            autoFocus
                            rows={1}
                            value={draftColTitle}
                            onChange={(e) => {
                                setDraftColTitle(e.target.value);
                                e.target.style.height = "auto";
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                        />
                        // <input
                        //     onBlur={() => toggleColEditing(null)}
                        //     className="
                                
                        //         min-w-0
                        //         flex-1
                        //         outline-none
                        //         bg-[#1e1d1d]
                        //     "
                        //     onKeyDown={handleColTitleEditing}
                        //     autoFocus
                        //     type="text"
                        //     value={draftColTitle}
                        //     onChange={(e) => setDraftColTitle(e.target.value)}
                        // />
                    )}

                    {/* <div className="shrink-0 text-sm text-gray-500">
                        <span>
                            ({taskArray?.length})
                        </span>
                    </div> */}

                </div>

                <div className="flex items-center gap-1.5">

                    <div className="text-sm text-gray-500">
                        <span>
                            ({taskArray?.length})
                        </span>
                    </div>

                    {/* Add task */}
                    {/* <button
                        onClick={() =>{ setNewTaskFormMetaData(column._id, column.title);toggleNewTaskFormMenu()} }
                        className="
                            hover:bg-[#222121]
                            rounded-sm
                            p-0.5
                            cursor-pointer
                        "
                    >
                        <svg width="16px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff">
                            <path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>

                    </button> */}

                    {/* More */}
                    <button
                        onClick={() => toggleColMoreMenu(column._id)}
                        className="
                            hover:bg-[#222121]
                            rounded-sm
                            p-0.5
                            cursor-pointer
                        "
                    >

                        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff">
                            <path d="M20 12.5C20.2761 12.5 20.5 12.2761 20.5 12C20.5 11.7239 20.2761 11.5 20 11.5C19.7239 11.5 19.5 11.7239 19.5 12C19.5 12.2761 19.7239 12.5 20 12.5Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.7239 12.5 12 12.5Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M4 12.5C4.27614 12.5 4.5 12.2761 4.5 12C4.5 11.7239 4.27614 11.5 4 11.5C3.72386 11.5 3.5 11.7239 3.5 12C3.5 12.2761 3.72386 12.5 4 12.5Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>

                    </button>

                </div>

            </div>


            {/* Tasks */}
            <div
           
                ref={kanbanScrollRef}
                className="
                    flex
                    flex-col
                    pr-1
                    flex-1
                    min-h-0
                    overflow-y-auto
                    gap-2.5
                    rounded-md
                    kanban-scrollbar-col
                    text-white/70
                "
            >

                {taskArray.map(task => (
                    <Card
                        key={task._id}
                        task={task}

                    />
                ))}
                
                {isQuickAddTaskOn && <QuickAddTask
                        columnId={column._id} isAdding={isQuickAddTaskOn} toggleQuickAddTask={toggleQuickAddTask}
                    />
                }


            </div>

            {/* { taskArray.length == 0 &&
                <div className="text-xs border-dotted border p-2 flex flex-col justify-center items-center">
                    <div>Drag & Drop Cards</div>
                    <div>Or</div>
                </div>
            } */}

            {
                !isQuickAddTaskOn && <QuickAddTask
                    columnId={column._id} isAdding={isQuickAddTaskOn} toggleQuickAddTask={toggleQuickAddTask}
                />
            }

        </div>
    );
}
import Card from "./Card";
import QuickAddTask from "./components/QuickAddTask";
import { useState, useEffect, useRef } from "react";
import { useBoardDisplayContext } from "../../../hooks/useBoardDisplayContext";
import ColumnMenu from "./components/ColumnMenu";
import { useKanbanContext } from "./KanbanContext";

export default function Column({ 
    column, 
    tasks
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

    // =================================================================================================
    // Handle Drag and Reoder of TASKs position within the Column


    // ref for currently dragged task id
    const draggedTaskRef = useRef(null)

    // ref for currently dragged task card dom element
    const draggedTaskElementRef = useRef(null);

    // ref for currently dragged task's starting midpoint position on Y-axis
    const dragStartYRef = useRef(null);

    // ref for inserting dragged task before a task  calculated/determined based on dragged current position of midpoint of task
    const insertBeforeTaskIdRef = useRef(null);


    function handlePointerDown(e, task){

    // Push this dragged task before this task (insertBeforeTaskId) whose midpoint position value on y-axis is higher than current midpoint position of dragged task on y-axis
    // if no tasks midpoint position value if higher than current midpoint position  dragged tasks, than null(before taskId) meaninig that dragged task will go last in the column

        console.log(e.button)
        e.preventDefault()

        if(!(e.button === 0)){
            return
        }
        setOpenMenu(null)
        draggedTaskElementRef.current = e.currentTarget;

        dragStartYRef.current = e.clientY;

        draggedTaskRef.current = task._id


        // Keep receiving pointer events even after
        // pointer leaves the card.
        e.currentTarget.setPointerCapture(e.pointerId);

        // Visual indication
        e.currentTarget.style.zIndex = "10";
        e.currentTarget.style.position = "relative";
        e.currentTarget.style.opacity = "0.85";
        e.currentTarget.style.cursor = "grabbing";

    }

    function handlePointerMove(e) {

        if (!draggedTaskRef.current) {
            return;
        }

        e.preventDefault();

        // -----------------------------
        // Move dragged card visually
        // -----------------------------

        const deltaY =
            e.clientY - dragStartYRef.current;

        draggedTaskElementRef.current.style.transform =
            `translateY(${deltaY}px)`;


        // -----------------------------
        // Dragged task
        // -----------------------------

        const container = e.currentTarget;
        const draggedTaskId = draggedTaskRef.current
        const draggedTaskElement = container.querySelector(
            `[data-task-id="${draggedTaskId}"]`
        );

        if (!draggedTaskElement) {
            return;
        }

        const draggedRect =
            draggedTaskElement.getBoundingClientRect();

        const draggedCenterY =
            draggedRect.top +
            draggedRect.height / 2;


        // -----------------------------
        // Other task cards
        // -----------------------------

        const taskElements = [
            ...container.querySelectorAll("[data-task-id]")
        ].filter(
            element =>
                element.dataset.taskId !== draggedTaskId
        );


        // Push this dragged task before this task (insertBeforeTaskId) whose midpoint position value on y-axis is higher than current midpoint position of dragged task on y-axis
        // if no tasks midpoint position value if higher than current midpoint position  dragged tasks, than null(insertBeforeTaskId ) meaninig that dragged task will go last

        // -----------------------------
        // Find task to insert BEFORE
        // -----------------------------

        let insertBeforeTaskId = null;

        for (const taskElement of taskElements) {

            const taskRect =
                taskElement.getBoundingClientRect();

            const taskMidpoint =
                taskRect.top +
                taskRect.height / 2;

            if (draggedCenterY < taskMidpoint) {

                insertBeforeTaskId =
                    taskElement.dataset.taskId;

                break;
            }
        }

        insertBeforeTaskIdRef.current=insertBeforeTaskId
        console.log({
            draggedTaskId,
            insertBeforeTaskId
        });
    }

    
    async function handlePointerUp(e){
        e.preventDefault()

        console.log("pointer up happenned")
        
        if(draggedTaskRef.current === null){
            return
        }

        // if(taskArray.length == 1){
        //     console.log("only one task")
        //     return
        // }
        
        console.log(insertBeforeTaskIdRef.current)
        
        console.log(taskArray)
        const draggedTask = taskArray.find((task)=>{return task._id == draggedTaskRef.current })
        console.log(draggedTask)
        console.log(draggedTask.order)

        let currentOrders = taskArray.map((task) => task.order)
        let currentTaskIds = taskArray.map((task) => task._id)
        console.log(currentOrders)
        console.log(currentTaskIds)

        let currentTasksWithOrder={};
        
        for(let i=0; i<currentTaskIds.length; i++){
            currentTasksWithOrder[currentTaskIds[i]] = currentOrders[i]
        }

        console.log(currentTasksWithOrder)

        console.log("pointer turned up")



        if (insertBeforeTaskIdRef.current === null) {
            // move to last position or dont move at all

            const currLastTask = taskArray[taskArray.length - 1]
            console.log(currLastTask.order)
            
            // case A. if last task is being dragged downwards inside the itself column then no effective order change or
            // case B. if a column has only one task and that is being dragged, then no effective change should be there
                // in case b, obviously insert before task id check will give null as the only present task is being dragged inside the column itself
                //  and so on pointer up will reach below check, where we handle both Case A and Case B scenerios


            if(draggedTask._id === currLastTask._id ){
                console.log(draggedTask._id === currLastTask._id)
                console.log("No Effective Order Change")
            } else{

                let newOrder = currLastTask.order + 1000
                try{
                    await updateTaskOrder(draggedTask, draggedTask._id, newOrder)
                } catch(e){
                    console.log(e)
                    console.log(e.message)
                }
            }
        } else {
            // move before this specific task id

            const insertBeforeTask = taskArray.find((task) => {
                return task._id == insertBeforeTaskIdRef.current
            });
            console.log(insertBeforeTask.order)

            if(currentTaskIds[currentTaskIds.indexOf(draggedTask._id) + 1] == insertBeforeTask._id){
                console.log("No Effective Order Change")
            } else{
                let newOrder;
                console.log(currentTaskIds)
                console.log(currentTaskIds.indexOf(insertBeforeTask._id))
                let insertBeforeOrderVal = insertBeforeTask.order

                if(currentTaskIds.indexOf(insertBeforeTask._id) == 0){
                    newOrder = insertBeforeOrderVal/2
                }else{
                    let insertAfterPositon = currentTaskIds.indexOf(insertBeforeTask._id) - 1
                    console.log(insertAfterPositon )
                    let insertAfterTaskId = currentTaskIds[insertAfterPositon]
                    console.log(insertAfterTaskId)
                    
                    let insertAfterOrderVal = currentTasksWithOrder[insertAfterTaskId]
                    console.log(insertAfterOrderVal)
                    console.log(insertBeforeOrderVal)
                    
                    newOrder = (insertAfterOrderVal + insertBeforeOrderVal)/2
                }

                try{
                    await updateTaskOrder(draggedTask, draggedTask._id, newOrder)
                } catch(e){
                    console.log(e)
                    console.log(e.message)
                }
            }

        }


        const draggedElement =
        draggedTaskElementRef.current;

        if (draggedElement ) {
            draggedElement.style.transform = "";
            draggedElement.style.zIndex = "";
            draggedElement.style.position = "";
            draggedElement.style.opacity = "";
            draggedElement.style.cursor = "";
        }

        if (
            draggedElement &&
            draggedElement.hasPointerCapture(e.pointerId)
        ) {
            draggedElement.releasePointerCapture(e.pointerId);
        }

        draggedTaskRef.current = null;
        insertBeforeTaskIdRef.current = null;
        draggedTaskElementRef.current = null;
        dragStartYRef.current = null;

    }

    return (
        <div
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

            {/* Column header */}
            <div className="flex mx-2 mb-1 items-start gap-5">

                {isColMenuOpen && 
                    <ColumnMenu toggleColMoreMenu={toggleColMoreMenu} toggleDeleteListPrompt={toggleDeleteListPrompt}
                        toggleEmptyListPrompt={toggleEmptyListPrompt} column={column} setNewTaskFormMetaData={setNewTaskFormMetaData} toggleNewTaskFormMenu={toggleNewTaskFormMenu}></ColumnMenu>

                    // <ColumnMenu toggleColMoreMenu={toggleColMoreMenu} toggleDeleteListPrompt={toggleDeleteListPrompt}
                    //     toggleEmptyListPrompt={toggleEmptyListPrompt} column={column}></ColumnMenu>
                }

                <div className="flex grow min-w-0 items-center text-sm font-medium gap-2">

                    {!isEditingTitle && (
                        <div
                            onClick={() => toggleColEditing(column._id)}
                            className="
                                min-w-0
                                flex-1
                                wrap-break-word
                            "
                        >
                            {column.title}
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
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
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
                        onPointerDown={handlePointerDown}
                        // onPointerMove={handlePointerMove}
                        // onPointerUp={handlePointerUp}
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
import {
    closestCorners
} from "@dnd-kit/core";

import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";

import { useBoardDisplayContext } from "../../../hooks/useBoardDisplayContext";


const KanbanContext = createContext(null);


export function KanbanProvider({ children }) {

    const {
        openMenu,
        setOpenMenu,
        columns,

        tasks,
        tasksByColumnId,
        updateTaskOrder,
        updateColumnOrder,
        setTasks
    } = useBoardDisplayContext();


    // =========================================================
    // Column Title Editing
    // =========================================================


    const [currColBeingEdited, setCurrColBeingEdited ] = useState(null)

    function toggleColEditing(columnId){
        const isColEditingOn = openMenu === "coltitleediting"
        const isSameColumn = currColBeingEdited === columnId

        if(isColEditingOn && isSameColumn){
            setCurrColBeingEdited(null)
            setOpenMenu(null)
        }

        setCurrColBeingEdited(columnId)
        setOpenMenu("coltitleediting")
    }


    // =========================================================
    // Column More Menu
    // =========================================================

    const [
        currColumnIdforColMenuOpen,
        setColumnIdforMoreMenu
    ] = useState(null);


    function toggleColMoreMenu(columnId) {

        const isColumnMenuOpen =
            openMenu === "columnmoreoptions";

        const isSameColumn =
            currColumnIdforColMenuOpen === columnId;


        if (isColumnMenuOpen && isSameColumn) {
            setOpenMenu(null);
            setColumnIdforMoreMenu(null);
            return;
        }


        setColumnIdforMoreMenu(columnId);
        setOpenMenu("columnmoreoptions");
    }


    // =========================================================
    // Quick Add Task
    // =========================================================

    const [
        currColumnIdforQuickAddTaskOpen,
        setColumnIdforQuickAddTaskOpen
    ] = useState(null);


    function toggleQuickAddTask(columnId) {

        const isQuickAddTaskOpen =
            openMenu === "quickaddtask";

        const isSameColumn =
            currColumnIdforQuickAddTaskOpen === columnId;


        if (
            isQuickAddTaskOpen &&
            isSameColumn
        ) {
            setOpenMenu(null);
            setColumnIdforQuickAddTaskOpen(null);
            return;
        }


        setColumnIdforQuickAddTaskOpen(columnId);
        setOpenMenu("quickaddtask");
    }


    // =========================================================
    // New List Form
    // =========================================================

    const isNewListFormOpen =
        openMenu === "newlistform";


    function toggleNewListFormMenu() {

        setOpenMenu(
            isNewListFormOpen
                ? null
                : "newlistform"
        );
    }


    // =========================================================
    // New Task Form
    // =========================================================

    const [
        newTaskColumnId,
        setNewTaskColumnId
    ] = useState(null);

    const [
        newTaskColumnTitle,
        setNewTaskColumnTitle
    ] = useState(null);


    const isNewTaskFormOpen =
        openMenu === "newtaskform";


    function toggleNewTaskFormMenu() {

        setOpenMenu(
            isNewTaskFormOpen
                ? null
                : "newtaskform"
        );
    }


    function setNewTaskFormMetaData(
        columnId,
        columnTitle
    ) {
        setNewTaskColumnId(columnId);
        setNewTaskColumnTitle(columnTitle);
    }


    // =========================================================
    // Delete / Empty List Prompts
    // =========================================================

    const [
        deleteActionColumn,
        setDeleteActionColumn
    ] = useState(null);


    const isDeleteListPromptOpen =
        openMenu === "deletelistprompt";

    const isEmptyListPromptOpen =
        openMenu === "emptylistprompt";


    function toggleDeleteListPrompt(column) {

        setDeleteActionColumn(column);

        setOpenMenu(
            isDeleteListPromptOpen
                ? null
                : "deletelistprompt"
        );
    }


    function toggleEmptyListPrompt(column) {

        setDeleteActionColumn(column);

        setOpenMenu(
            isEmptyListPromptOpen
                ? null
                : "emptylistprompt"
        );
    }


    // =========================================================
    // Kanban Horizontal Scroll
    // =========================================================

    const kanbanScrollRef = useRef(null);

    const shouldScrollToEndColumn =
        useRef(false);


    useEffect(() => {

        if (!shouldScrollToEndColumn.current) {
            return;
        }


        const container =
            kanbanScrollRef.current;

        if (!container) {
            return;
        }


        requestAnimationFrame(() => {

            container.scrollTo({
                left:
                    container.scrollWidth +
                    container.clientWidth,

                behavior: "smooth"
            });


            shouldScrollToEndColumn.current = false;
        });

    }, [columns]);


    // =========================================================
    // Grab & Drag to Scroll
    // =========================================================

    const isDragging = useRef(false);

    const dragStartX = useRef(0);

    const scrollStartX = useRef(0);


    function handlePointerDown(e) {

        if (
            isNewListFormOpen ||
            isNewTaskFormOpen ||
            isDeleteListPromptOpen ||
            isEmptyListPromptOpen
        ) {
            return;
        }


        // Only left mouse button
        if (
            e.pointerType === "mouse" &&
            e.button !== 0
        ) {
            return;
        }


        // Don't start dragging from inside a column
        const isInsideColumn =
            e.target.closest(
                "[data-kanban-column]"
            );


        if (isInsideColumn) {
            return;
        }


        const container =
            kanbanScrollRef.current;

        if (!container) {
            return;
        }


        isDragging.current = true;

        dragStartX.current = e.clientX;

        scrollStartX.current =
            container.scrollLeft;


        e.preventDefault();

        container.setPointerCapture(
            e.pointerId
        );

        container.style.cursor = "grabbing";

        container.style.userSelect = "none";
    }


    function handlePointerMove(e) {

        if (
            isNewListFormOpen ||
            isNewTaskFormOpen ||
            isDeleteListPromptOpen ||
            isEmptyListPromptOpen
        ) {
            return;
        }


        const container =
            kanbanScrollRef.current;

        if (!container) {
            return;
        }


        // Currently dragging
        if (isDragging.current) {

            e.preventDefault();


            const mouseMovement =
                e.clientX -
                dragStartX.current;


            container.scrollLeft =
                scrollStartX.current -
                mouseMovement;


            return;
        }


        // Not dragging:
        // show grab only over empty Kanban space
        const isInsideColumn =
            e.target.closest(
                "[data-kanban-column]"
            );


        if (isInsideColumn) {
            container.style.cursor = "";
        } else {
            container.style.cursor = "grab";
        }
    }


    function handlePointerUp(e) {

        if (
            isNewListFormOpen ||
            isNewTaskFormOpen ||
            isDeleteListPromptOpen ||
            isEmptyListPromptOpen
        ) {
            return;
        }


        const container =
            kanbanScrollRef.current;

        if (!container) {
            return;
        }


        isDragging.current = false;

        container.style.userSelect = "";

        container.style.cursor = "";


        if (
            container.hasPointerCapture(
                e.pointerId
            )
        ) {
            container.releasePointerCapture(
                e.pointerId
            );
        }
    }


    function handlePointerCancel(e) {

        if (
            isNewListFormOpen ||
            isNewTaskFormOpen ||
            isDeleteListPromptOpen ||
            isEmptyListPromptOpen
        ) {
            return;
        }


        const container =
            kanbanScrollRef.current;

        if (!container) {
            return;
        }


        isDragging.current = false;

        container.style.cursor = "";

        container.style.userSelect = "";


        if (
            container.hasPointerCapture(
                e.pointerId
            )
        ) {
            container.releasePointerCapture(
                e.pointerId
            );
        }
    }


    // =========================================================
    // Disable Grab & Drag when overlay opens
    // =========================================================

    useEffect(() => {

        const container =
            kanbanScrollRef.current;

        if (!container) {
            return;
        }


        if (
            isNewListFormOpen ||
            isNewTaskFormOpen ||
            isDeleteListPromptOpen ||
            isEmptyListPromptOpen
        ) {

            isDragging.current = false;

            container.style.cursor = "";

            container.style.userSelect = "";
        }

    }, [
        isNewListFormOpen,
        isNewTaskFormOpen,
        isDeleteListPromptOpen,
        isEmptyListPromptOpen
    ]);

    // =========================================================
    // Drag & Drop & Reorder
    // =========================================================

   const [ activeColumnId, setActiveColumnId] = useState(null)
   const dragStartColumnRef = useRef(null);
    const dragStartColumnsRef = useRef(null);

    const [activeTaskId, setActiveTaskId] = useState(null);
    const dragStartTaskRef = useRef(null);
    const dragStartTasksRef = useRef(null);

    // function handleDragStart(event) {
    //     setOpenMenu(null);

    //     const { active } = event;

    //     const task = tasks.find(
    //         task => task._id === active.id
    //     );

    //     dragStartTaskRef.current = task;
    //     // Snapshot the COMPLETE state before any handleDragOver changes
    //     dragStartTasksRef.current = tasks;

    //     setActiveTaskId(active.id);
    // }


    function handleDragStart(event) {

        setOpenMenu(null);

        const { active } = event;

        const type =
            active.data.current?.type;


        // -------------------------
        // Column drag
        // -------------------------

        if (type === "column") {

            const column = columns.find(
                column => column._id === active.id
            );

            dragStartColumnRef.current = column;
            dragStartColumnsRef.current = columns;

            setActiveColumnId(active.id);

            return;
        }


        // -------------------------
        // Task drag
        // -------------------------

        if (type === "task") {

            const task = tasks.find(
                task => task._id === active.id
            );

            dragStartTaskRef.current = task;
            dragStartTasksRef.current = tasks;

            setActiveTaskId(active.id);
        }
    }

    // inter-column dragging.
    function handleDragOver(event) {

        const type =
            event.active.data.current?.type;

        if (type === "column") {
            return;
        }

        const {
            active,
            over
        } = event;
        

        if (!over) {
            return;
        }


        const activeTaskId = active.id;


        const activeTask = tasks.find(
            task => task._id === activeTaskId
        );

        if (!activeTask) {
            return;
        }


        let destinationColumnId = null;


        // Dragging over another task
        if (
            over.data.current?.type === "task"
        ) {

            destinationColumnId =
                over.data.current.columnId;

        }


        // Dragging over an empty column
        else if (
            over.data.current?.type === "column"
        ) {

            destinationColumnId =
                over.data.current.columnId;
        }


        if (!destinationColumnId) {
            return;
        }


        // Already belongs to this column
        if (
            activeTask.columnId ===
            destinationColumnId
        ) {
            return;
        }


        // Move it into the destination column
        setTasks(prev =>
            prev.map(task =>
                task._id === activeTaskId
                    ? {
                        ...task,
                        columnId: destinationColumnId
                    }
                    : task
            )
        );
    }

    async function handleColumnDragEnd(event) {

        const {
            active,
            over
        } = event;


        if (!over) {
            setActiveColumnId(null);
            dragStartColumnRef.current = null;
            dragStartColumnsRef.current = null;
            return;
        }


        const activeColumnId = active.id;


        const originalColumns =
            dragStartColumnsRef.current ?? columns;


        const activeIndex =
            originalColumns.findIndex(
                column =>
                    column._id === activeColumnId
            );


        const overIndex =
            originalColumns.findIndex(
                column =>
                    column._id === over.id
            );


        if (
            activeIndex === -1 ||
            overIndex === -1
        ) {
            setActiveColumnId(null);
            return;
        }


        // No actual movement
        if (activeIndex === overIndex) {
            setActiveColumnId(null);
            dragStartColumnRef.current = null;
            dragStartColumnsRef.current = null;
            return;
        }


        // Remove active column
        const remainingColumns =
            originalColumns.filter(
                column =>
                    column._id !== activeColumnId
            );


        let insertionIndex;


        if (activeIndex < overIndex) {

            // Moving right
            insertionIndex =
                remainingColumns.findIndex(
                    column =>
                        column._id === over.id
                ) + 1;

        } else {

            // Moving left
            insertionIndex =
                remainingColumns.findIndex(
                    column =>
                        column._id === over.id
                );
        }


        // -------------------------
        // Calculate new order
        // -------------------------

        let newOrder;


        if (remainingColumns.length === 0) {

            newOrder = 1000;

        } else if (insertionIndex === 0) {

            newOrder =
                remainingColumns[0].order / 2;

        } else if (
            insertionIndex >=
            remainingColumns.length
        ) {

            newOrder =
                remainingColumns[
                    remainingColumns.length - 1
                ].order + 1000;

        } else {

            const previousColumn =
                remainingColumns[
                    insertionIndex - 1
                ];

            const nextColumn =
                remainingColumns[
                    insertionIndex
                ];

            newOrder =
                (
                    previousColumn.order +
                    nextColumn.order
                ) / 2;
        }


        console.log(
            "COLUMN DRAG PERSIST DEBUG",
            {
                activeColumnId,
                activeIndex,
                overIndex,
                insertionIndex,
                newOrder
            }
        );


        // -------------------------
        // Remove overlay immediately
        // -------------------------

        setActiveColumnId(null);


        try {

            await updateColumnOrder(
                activeColumnId,
                newOrder,
                originalColumns
            );

        } catch (error) {

            console.error(
                "Failed to update column order:",
                error
            );

        } finally {

            dragStartColumnRef.current = null;
            dragStartColumnsRef.current = null;
        }
    }

    async function handleDragEnd(event) {


        const type =
            event.active.data.current?.type;

        if (type === "column") {
            await handleColumnDragEnd(event);
            return;
        }

        const {
            active,
            over
        } = event;


        if (!over) {
            return;
        }


        const activeTaskId = active.id;


        const draggedTask = tasks.find(
            task => task._id === activeTaskId
        );

        if (!draggedTask) {
            return;
        }


        // -----------------------------------------
        // Determine destination column
        // -----------------------------------------

        let destinationColumnId = null;


        if (
            over.data.current?.type === "task"
        ) {

            destinationColumnId =
                over.data.current.columnId;

        }

        else if (
            over.data.current?.type === "column"
        ) {

            destinationColumnId =
                over.data.current.columnId;
        }


        if (!destinationColumnId) {
            return;
        }


        // -----------------------------------------
        // Tasks currently in destination column
        // Remove dragged task because it may
        // already have been moved there by
        // handleDragOver.
        // -----------------------------------------

        const destinationTasks = (
            tasksByColumnId[destinationColumnId] ?? []
        ).filter(
            task => task._id !== activeTaskId
        );


        // -----------------------------------------
        // Find insertion position
        // -----------------------------------------
        let insertionIndex;

        if (over.data.current?.type === "task") {

            const originalTasks =
                tasksByColumnId[destinationColumnId] ?? [];

            const activeIndex =
                originalTasks.findIndex(
                    task => task._id === activeTaskId
                );

            const overIndex =
                originalTasks.findIndex(
                    task => task._id === over.id
                );

            if (over.id === activeTaskId) {

                insertionIndex =
                    activeIndex === -1
                        ? destinationTasks.length
                        : activeIndex;

            } else if (overIndex === -1) {

                insertionIndex =
                    destinationTasks.length;

            } else if (activeIndex === -1) {

                // Cross-column case
                insertionIndex =
                    destinationTasks.findIndex(
                        task => task._id === over.id
                    );

            } else if (activeIndex < overIndex) {

                // Moving downward
                insertionIndex =
                    destinationTasks.findIndex(
                        task => task._id === over.id
                    ) + 1;

            } else {

                // Moving upward
                insertionIndex =
                    destinationTasks.findIndex(
                        task => task._id === over.id
                    );
            }

        } else {

            // Dropped on the column itself
            insertionIndex =
                destinationTasks.length;
        }

        // -----------------------------------------
        // Calculate new order
        // -----------------------------------------

        let newOrder;

        // Empty column
        if (destinationTasks.length === 0) {

            newOrder = 1000;

        }


        // Before first task
        else if (insertionIndex === 0) {

            newOrder =
                destinationTasks[0].order / 2;

        }


        // After last task
        else if (
            insertionIndex >= destinationTasks.length
        ) {

            newOrder =
                destinationTasks[
                    destinationTasks.length - 1
                ].order + 1000;

        }


        // Between two tasks
        else {

            const previousTask =
                destinationTasks[insertionIndex - 1];

            const nextTask =
                destinationTasks[insertionIndex];


            newOrder =
                (
                    previousTask.order +
                    nextTask.order
                ) / 2;
        }


        // -----------------------------------------
        // Did the column actually change?
        // -----------------------------------------

        const originalColumnId =
            dragStartTaskRef.current?.columnId; 

        const columnChanged =
            originalColumnId !==
            destinationColumnId;

        
        // -----------------------------------------
        // Persist
        // -----------------------------------------

        console.log("DRAG PERSIST DEBUG", {
            activeTaskId,
            newOrder,
            originalColumnId,
            destinationColumnId,
            columnChanged,
            newColId: columnChanged
                ? destinationColumnId
                : null
        });

        try {

            await updateTaskOrder(
                activeTaskId,
                newOrder,
                columnChanged
                    ? destinationColumnId
                    : null,
                dragStartTasksRef.current
            );

        } catch (error) {
            setActiveTaskId(null)
            dragStartTaskRef.current = null
            console.error(
                "Failed to update task order:",
                error
            );
        } finally {
            dragStartTaskRef.current = null;
            dragStartTasksRef.current = null;
            setActiveTaskId(null)
        }
    }

    return (
        <KanbanContext.Provider
            value={{
                // Drag & Drop

                activeColumnId,

                activeTaskId,
                handleDragStart,
                handleDragOver,
                handleDragEnd,


                // Board Display coordination
                openMenu,

                //Column Title Editing

                currColBeingEdited,
                toggleColEditing,

                // Column menu
                currColumnIdforColMenuOpen,
                toggleColMoreMenu,

                // Quick Add
                currColumnIdforQuickAddTaskOpen,
                toggleQuickAddTask,

                // New List
                toggleNewListFormMenu,

                // New Task
                newTaskColumnId,
                newTaskColumnTitle,
                toggleNewTaskFormMenu,
                setNewTaskFormMetaData,

                // Delete / Empty prompts
                deleteActionColumn,
                toggleDeleteListPrompt,
                toggleEmptyListPrompt,

                // Horizontal Kanban scroll
                kanbanScrollRef,
                shouldScrollToEndColumn,

                // Drag scroll
                handlePointerDown,
                handlePointerMove,
                handlePointerUp,
                handlePointerCancel
            }}
        >
            {children}
        </KanbanContext.Provider>
    );
}


export function useKanbanContext() {

    const context =
        useContext(KanbanContext);


    if (!context) {
        throw new Error(
            "useKanbanContext must be used inside KanbanProvider"
        );
    }


    return context;
}
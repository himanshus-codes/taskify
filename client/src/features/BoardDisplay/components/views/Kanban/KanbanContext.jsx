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
        columns
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


    return (
        <KanbanContext.Provider
            value={{

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
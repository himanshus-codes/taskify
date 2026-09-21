// bg-[#181717]
// bg-[#1e1d1d]


import Column from "./Column";
import NewTaskForm from "./components/NewTaskForm";
import NewListForm from "./components/NewListForm";
import DeleteListPrompt from "./components/prompts/DeleteListPrompt";
import EmptyListPrompt from "./components/prompts/EmptyListPrompt";

import { useBoardDisplayContext } from "../../../hooks/useBoardDisplayContext";
import { useKanbanContext } from "./KanbanContext";


export default function Kanban() {

    const {
        openMenu,
        columns,
        tasks,
        tasksByColumnId,
        createNewColumn,
        createNewTask
    } = useBoardDisplayContext();


    const {
        currColumnIdforColMenuOpen,
        toggleColMoreMenu,

        currColumnIdforQuickAddTaskOpen,
        toggleQuickAddTask,

        toggleNewListFormMenu,

        newTaskColumnId,
        newTaskColumnTitle,
        toggleNewTaskFormMenu,
        setNewTaskFormMetaData,

        deleteActionColumn,
        toggleDeleteListPrompt,
        toggleEmptyListPrompt,

        kanbanScrollRef,
        shouldScrollToEndColumn,

        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        handlePointerCancel
    } = useKanbanContext();
    
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
                    
            {(openMenu === "newtaskform") && (
                <NewTaskForm
                    columnId={newTaskColumnId}
                    setColumnMetaData={setNewTaskFormMetaData}
                    toggleNewTaskForm={toggleNewTaskFormMenu}
                    createNewTask={createNewTask}
                    columnTitle={newTaskColumnTitle}
                />
            )}

            { (openMenu === "newlistform") && <NewListForm  toggleNewListFormMenu={toggleNewListFormMenu} createNewColumn={createNewColumn} shouldScrollToEndColumn={shouldScrollToEndColumn}></NewListForm>}
            {/* { openMenu==="newlistform" && <NewListForm  toggleNewListFormMenu={toggleNewListFormMenu} onListCreated={fetchBoardColumns}></NewListForm>} */}
            {(openMenu === "deletelistprompt") && <DeleteListPrompt toggleDeleteListPrompt={toggleDeleteListPrompt} column={deleteActionColumn}></DeleteListPrompt>}
            {(openMenu === "emptylistprompt") && <EmptyListPrompt toggleEmptyListPrompt={toggleEmptyListPrompt} column={deleteActionColumn}></EmptyListPrompt>}
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
                        // tasks={tasks}
                        tasks={tasksByColumnId[column._id]}
                    />
                ))}
            </div>
        </div>
    );
}




// bg-[#181717]
// bg-[#1e1d1d]


import Column from "./Column";
import NewTaskForm from "./components/NewTaskForm";
import NewListForm from "./components/NewListForm";
import DeleteListPrompt from "./components/prompts/DeleteListPrompt";
import EmptyListPrompt from "./components/prompts/EmptyListPrompt";

import { useBoardDisplayContext } from "../../../hooks/useBoardDisplayContext";
import { useKanbanContext } from "./KanbanContext";

import {
    DndContext,
    closestCorners,
    DragOverlay
} from "@dnd-kit/core";

import {
    SortableContext,
    verticalListSortingStrategy,
    horizontalListSortingStrategy
} from "@dnd-kit/sortable";

import Card from "./Card";

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
        handlePointerCancel,

        activeColumnId,

        activeTaskId,
        handleDragStart,
        handleDragOver,
        handleDragEnd
    } = useKanbanContext();

    const activeTask =
        tasks.find(
            task => task._id === activeTaskId
        );
    
    const activeColumn =
        columns.find(
            column => column._id === activeColumnId
        );    
    

    function collisionDetectionStrategy(args) {

        const activeType =
            args.active.data.current?.type;

        if (activeType === "column") {

            const columnContainers =
                args.droppableContainers.filter(
                    container =>
                        container.data.current?.type === "column"
                );

            return closestCorners({
                ...args,
                droppableContainers: columnContainers
            });
        }

        return closestCorners(args);
    }    

return (
        <DndContext
            collisionDetection={collisionDetectionStrategy}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >

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

                {/* ------------------------------------
                    Overlay Forms / Prompts
                ------------------------------------ */}

                {openMenu === "newtaskform" && (

                    <NewTaskForm
                        columnId={newTaskColumnId}
                        setColumnMetaData={
                            setNewTaskFormMetaData
                        }
                        toggleNewTaskForm={
                            toggleNewTaskFormMenu
                        }
                        createNewTask={
                            createNewTask
                        }
                        columnTitle={
                            newTaskColumnTitle
                        }
                    />

                )}


                {openMenu === "newlistform" && (

                    <NewListForm
                        toggleNewListFormMenu={
                            toggleNewListFormMenu
                        }
                        createNewColumn={
                            createNewColumn
                        }
                        shouldScrollToEndColumn={
                            shouldScrollToEndColumn
                        }
                    />

                )}


                {openMenu === "deletelistprompt" && (

                    <DeleteListPrompt
                        toggleDeleteListPrompt={
                            toggleDeleteListPrompt
                        }
                        column={
                            deleteActionColumn
                        }
                    />

                )}


                {openMenu === "emptylistprompt" && (

                    <EmptyListPrompt
                        toggleEmptyListPrompt={
                            toggleEmptyListPrompt
                        }
                        column={
                            deleteActionColumn
                        }
                    />

                )}


                {/* ------------------------------------
                    Columns
                ------------------------------------ */}
                <SortableContext
                    items={columns.map(column => column._id)}
                    strategy={horizontalListSortingStrategy}
                >
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

                        {columns.map(column => {

                            const columnTasks =
                                tasksByColumnId[
                                    column._id
                                ] ?? [];


                            return (

                                <SortableContext

                                    key={column._id}

                                    items={
                                        columnTasks.map(
                                            task =>
                                                task._id
                                        )
                                    }

                                    strategy={
                                        verticalListSortingStrategy
                                    }
                                >

                                    <Column
                                        column={column}
                                        tasks={columnTasks}
                                    />

                                </SortableContext>

                            );
                        })}

                    </div>
                </SortableContext>

            </div>


            {/* ----------------------------------------
                Drag Overlay
            ---------------------------------------- */}

            {/* <DragOverlay >

                {activeTask ? (

                    <Card
                        task={activeTask}
                        isDragOverlay
                    />

                ) : null}

            </DragOverlay> */}

            <DragOverlay>

                {activeTask ? (
                    <Card
                        task={activeTask}
                        isDragOverlay
                    />
                ) : activeColumn ? (
                    <Column
                        column={activeColumn}
                        tasks={
                            tasksByColumnId[activeColumn._id] ?? []
                        }
                        isDragOverlay
                    />
                ) : null}

            </DragOverlay>

            {/* However, there's one thing I'd change here: we don't actually need the full interactive Column as the overlay. That can cause unnecessary menus, scroll areas, etc.
            For now, I would make a tiny ColumnDragOverlay later if needed.
            Since you're trying to finish this quickly, though, we can initially use the actual Column and disable its sortable behavior when isDragOverlay. */}

        </DndContext>
    );
}




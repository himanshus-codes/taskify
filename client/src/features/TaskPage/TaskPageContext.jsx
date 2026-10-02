import React, {
    useState,
    useEffect,
    createContext,
    useContext
} from "react";

import { useParams } from "react-router-dom";

import {
    getTaskDetails as getTaskApi,
    updateTask as updateTaskApi
} from "../../services/taskService";

import {
    getColumnDetails as getColumnApi
} from "../../services/listService";

import {
    getBoard as getBoardApi
} from "../../services/boardService";

import {
    getLabels,
    createLabel,
    updateLabel as updateLabelApi,
    deleteLabel as deleteLabelApi
} from "../../services/labelService";
import { useAuth } from "../../context/AuthContext";

import {
    getChecklists as getChecklistsApi,
    getChecklistDetails as getChecklistDetailsApi,
    createChecklist as createChecklistApi,
    updateChecklist as updateChecklistApi,
    deleteChecklist as deleteChecklistApi,
    createChecklistItem as createChecklistItemApi,
    updateChecklistItem as updateChecklistItemApi,
    deleteChecklistItem as deleteChecklistItemApi,
} from "../../services/checklistService";


const TaskPageContext = createContext();


export function TaskPageProvider({ children }) {

    const { token } = useAuth();

    const {
        taskId,
        boardId
    } = useParams();

    // -----------------------------------------
    // Task Page data
    // -----------------------------------------

    const [task, setTask] = useState(null);

    const [parentBoard, setParentBoard] = useState(null);

    const [parentColumn, setParentColumn] = useState(null);

    const [labels, setLabels] = useState([]);

    const [checklists, setChecklists] = useState([]);
    const [isChecklistsLoading, setIsChecklistsLoading] = useState(false);

    // -----------------------------------------
    // Loading states
    // -----------------------------------------

    const [isTaskLoading, setTaskLoading] = useState(false);

    const [isLabelsLoading, setIsLabelsLoading] = useState(false);


    // -----------------------------------------
    // Sidebar state
    // -----------------------------------------

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const [activeSidebarTab, setActiveSidebarTab] =
        useState("checklist"); // properties


    function toggleSidebar() {

        setIsSidebarOpen(prev => !prev);
    }


    // =========================================================
    // INITIAL TASK PAGE DATA
    // =========================================================

    useEffect(() => {

        if (!token || !taskId) {
            return;
        }


        let cancelled = false;


        async function loadTaskPage() {

            setTaskLoading(true);

            setIsLabelsLoading(true);


            // -----------------------------------------
            // Clear old task-page state
            // -----------------------------------------

            setTask(null);

            setParentBoard(null);

            setParentColumn(null);

            setLabels([]);


            try {

                // -------------------------------------
                // 1. Get Task
                // -------------------------------------

                const taskResponse = await getTaskApi(
                    token,
                    taskId
                );


                const fetchedTask = taskResponse.data;


                if (cancelled) {
                    return;
                }


                setTask(fetchedTask);


                // -------------------------------------
                // Resolve IDs
                // -------------------------------------

                const resolvedBoardId =
                    fetchedTask.boardId || boardId;

                const resolvedColumnId =
                    fetchedTask.columnId;


                // -------------------------------------
                // 2. Fetch parent data in parallel
                // -------------------------------------

                const [
                    boardResponse,
                    columnResponse,
                    labelsResponse,
                    checklistsResponse
                ] = await Promise.all([

                    getBoardApi(
                        token,
                        resolvedBoardId
                    ),

                    getColumnApi(
                        token,
                        resolvedColumnId
                    ),

                    getLabels(
                        token,
                        resolvedBoardId
                    ),

                    getChecklistsApi(token, taskId),

                ]);


                if (cancelled) {
                    return;
                }


                // -------------------------------------
                // Store fetched metadata
                // -------------------------------------

                setParentBoard(
                    boardResponse.data
                );

                setParentColumn(
                    columnResponse.data
                );
                
                console.log("LABEL RESPONSE:", labelsResponse);
                console.log("LABEL DATA:", labelsResponse.data.labels);

                setLabels(
                    labelsResponse.data.labels
                );

                setChecklists(checklistsResponse.data.checklists);

            } catch (error) {

                console.error(
                    "Failed to load Task Page data:",
                    error
                );

            } finally {

                if (!cancelled) {

                    setTaskLoading(false);

                    setIsLabelsLoading(false);
                }
            }
        }


        loadTaskPage();


        return () => {
            cancelled = true;
        };

    }, [
        token,
        taskId,
        boardId
    ]);


    // =========================================================
    // UPDATE TASK PROPERTY
    // =========================================================

    async function updateTaskProperty(updates) {

        if (!task) {
            return;
        }


        // -----------------------------------------
        // Keep previous state for rollback
        // -----------------------------------------

        const previousTask = task;


        // -----------------------------------------
        // Build updated task
        // -----------------------------------------

        const updatedTask = {
            ...task,
            ...updates
        };


        // -----------------------------------------
        // Optimistic UI update
        // -----------------------------------------

        setTask(updatedTask);


        try {

            const response = await updateTaskApi(
                token,
                task._id,
                updates
            );


            // -------------------------------------
            // Use server representation
            // -------------------------------------

            if (response.data) {

                setTask(
                    response.data
                );
            }


            return response;

        } catch (error) {

            // -------------------------------------
            // Rollback
            // -------------------------------------

            setTask(
                previousTask
            );

            throw error;
        }
    }


    // =========================================================
    // ADD EXISTING LABEL TO TASK
    // =========================================================

    async function addLabelToTask(labelId) {

        if (!task) {
            return;
        }


        const currentLabels =
            task.labels || [];


        // -----------------------------------------
        // Prevent duplicate assignment
        // -----------------------------------------

        const alreadyAssigned =
            currentLabels.some(
                id => String(id) === String(labelId)
            );


        if (alreadyAssigned) {
            return;
        }


        // -----------------------------------------
        // Keep previous state for rollback
        // -----------------------------------------

        const previousTask = task;


        // -----------------------------------------
        // Build updated labels
        // -----------------------------------------

        const updatedLabels = [
            ...currentLabels,
            labelId
        ];


        const updatedTask = {
            ...task,
            labels: updatedLabels
        };


        // -----------------------------------------
        // Optimistic UI update
        // -----------------------------------------

        setTask(updatedTask);


        try {

            const response = await updateTaskApi(
                token,
                task._id,
                {
                    labels: updatedLabels
                }
            );


            // -------------------------------------
            // Use server representation
            // -------------------------------------

            if (response.data) {

                setTask(
                    response.data
                );
            }


            return response;

        } catch (error) {

            // -------------------------------------
            // Rollback
            // -------------------------------------

            setTask(
                previousTask
            );

            throw error;
        }
    }


    // =========================================================
    // REMOVE LABEL FROM TASK
    // =========================================================

    async function removeLabelFromTask(labelId) {

        if (!task) {
            return;
        }


        const previousTask = task;


        // -----------------------------------------
        // Build updated labels
        // -----------------------------------------

        const updatedLabels =
            (task.labels || []).filter(
                id =>
                    String(id) !== String(labelId)
            );


        const updatedTask = {
            ...task,
            labels: updatedLabels
        };


        // -----------------------------------------
        // Optimistic UI update
        // -----------------------------------------

        setTask(updatedTask);


        try {

            const response = await updateTaskApi(
                token,
                task._id,
                {
                    labels: updatedLabels
                }
            );


            // -------------------------------------
            // Use server representation
            // -------------------------------------

            if (response.data) {

                setTask(
                    response.data
                );
            }


            return response;

        } catch (error) {

            // -------------------------------------
            // Rollback
            // -------------------------------------

            setTask(
                previousTask
            );

            throw error;
        }
    }


    // =========================================================
    // CREATE BOARD LABEL + ASSIGN TO TASK
    // =========================================================

    async function createAndAddLabel(labelData) {

        if (!task) {
            return;
        }


        // -----------------------------------------
        // Create label at board level
        // -----------------------------------------

        const response = await createLabel(
            token,
            task.boardId,
            labelData
        );


        const newLabel =
            response.data;


        // -----------------------------------------
        // Immediately append new label
        // No refetch required
        // -----------------------------------------

        setLabels(prevLabels => [
            ...prevLabels,
            newLabel
        ]);


        // -----------------------------------------
        // Assign newly-created label to task
        // -----------------------------------------

        await addLabelToTask(
            newLabel._id
        );


        return newLabel;
    }

    // =========================================================
    // UPDATE BOARD LABEL
    // =========================================================

    async function updateBoardLabel(
        labelId,
        updates
    ) {

        // -----------------------------------------
        // Keep previous state for rollback
        // -----------------------------------------

        const previousLabels = labels;


        // -----------------------------------------
        // Optimistic update
        // -----------------------------------------

        const updatedLabels =
            labels.map(label =>
                String(label._id) ===
                String(labelId)

                    ? {
                        ...label,
                        ...updates
                    }

                    : label
            );


        setLabels(
            updatedLabels
        );


        try {

            const response =
                await updateLabelApi(
                    token,
                    labelId,
                    updates
                );


            // -------------------------------------
            // Use server representation
            // -------------------------------------

            if (response.data) {

                setLabels(
                    previousLabels =>
                        previousLabels.map(label =>
                            String(label._id) ===
                            String(labelId)

                                ? response.data

                                : label
                        )
                );
            }


            return response;

        } catch (error) {

            // -------------------------------------
            // Rollback
            // -------------------------------------

            setLabels(
                previousLabels
            );

            throw error;
        }
    }

    // =========================================================
    // DELETE BOARD LABEL
    // =========================================================

    async function deleteBoardLabel(
        labelId
    ) {

        // -----------------------------------------
        // Keep previous state for rollback
        // -----------------------------------------

        const previousLabels =
            labels;

        const previousTask =
            task;


        // -----------------------------------------
        // Optimistic label removal
        // -----------------------------------------

        setLabels(
            previousLabels =>
                previousLabels.filter(
                    label =>
                        String(label._id) !==
                        String(labelId)
                )
        );


        // -----------------------------------------
        // Keep current task UI consistent
        // -----------------------------------------

        setTask(
            previousTask => {

                if (!previousTask) {
                    return previousTask;
                }


                return {
                    ...previousTask,

                    labels: (
                        previousTask.labels ||
                        []
                    ).filter(
                        id =>
                            String(id) !==
                            String(labelId)
                    )
                };
            }
        );


        try {

            const response =
                await deleteLabelApi(
                    token,
                    labelId
                );


            return response;

        } catch (error) {

            // -------------------------------------
            // Rollback
            // -------------------------------------

            setLabels(
                previousLabels
            );

            setTask(
                previousTask
            );

            throw error;
        }
    }

    // =========================================================
    // Checklist
    // =========================================================

    async function createChecklist(
        title
    ) {

        // -----------------------------------------
        // Keep previous state for rollback
        // -----------------------------------------

        const previousChecklists =
            checklists;


        // -----------------------------------------
        // Create temporary checklist
        // -----------------------------------------

        const temporaryId =
            `temp-checklist-${Date.now()}`;

        const temporaryChecklist = {
            _id: temporaryId,

            taskId: task._id,

            title,

            completed: false,

            items: [],

        };


        // -----------------------------------------
        // Optimistic checklist creation
        // -----------------------------------------

        setChecklists(
            previousChecklists => [
                ...previousChecklists,
                temporaryChecklist
            ]
        );


        try {

            const response =
                await createChecklistApi(
                    token,
                    task._id,
                    {
                        title
                    }
                );


            const createdChecklist =
                response.data;


            // -----------------------------------------
            // Replace temporary checklist with
            // server-created checklist
            // -----------------------------------------

            setChecklists(
                previousChecklists =>
                    previousChecklists.map(
                        checklist =>
                            String(checklist._id) ===
                            String(temporaryId)

                                ? createdChecklist

                                : checklist
                    )
            );


            return response;

        } catch (error) {

            // -----------------------------------------
            // Rollback
            // -----------------------------------------

            setChecklists(
                previousChecklists
            );

            throw error;
        }
    }

    async function getChecklistDetails(
        checklistId
    ) {

        const response =
            await getChecklistDetailsApi(
                token,
                checklistId
            );


        const checklist =
            response.data;


        setChecklists(
            previousChecklists =>
                previousChecklists.map(
                    existingChecklist =>
                        String(existingChecklist._id) ===
                        String(checklistId)

                            ? checklist

                            : existingChecklist
                )
        );


        return response;
    }



    async function updateChecklist(
        checklistId,
        updates
    ) {

        // -----------------------------------------
        // Keep previous state for rollback
        // -----------------------------------------

        const previousChecklists =
            checklists;


        // -----------------------------------------
        // Optimistic checklist update
        // -----------------------------------------

        setChecklists(
            previousChecklists =>
                previousChecklists.map(
                    checklist => {

                        if (
                            String(checklist._id) !==
                            String(checklistId)
                        ) {
                            return checklist;
                        }


                        return {
                            ...checklist,
                            ...updates
                        };
                    }
                )
        );


        try {

            const response =
                await updateChecklistApi(
                    token,
                    checklistId,
                    updates
                );


            const updatedChecklist =
                response.data;


            // -----------------------------------------
            // Sync with server response
            // -----------------------------------------

            setChecklists(
                previousChecklists =>
                    previousChecklists.map(
                        checklist =>
                            String(checklist._id) ===
                            String(checklistId)

                                ? updatedChecklist

                                : checklist
                    )
            );


            return response;

        } catch (error) {

            // -----------------------------------------
            // Rollback
            // -----------------------------------------

            setChecklists(
                previousChecklists
            );

            throw error;
        }
    }


    async function deleteChecklist(
        checklistId
    ) {

        // -----------------------------------------
        // Keep previous state for rollback
        // -----------------------------------------

        const previousChecklists =
            checklists;


        // -----------------------------------------
        // Optimistic checklist removal
        // -----------------------------------------

        setChecklists(
            previousChecklists =>
                previousChecklists.filter(
                    checklist =>
                        String(checklist._id) !==
                        String(checklistId)
                )
        );


        try {

            const response =
                await deleteChecklistApi(
                    token,
                    checklistId
                );


            return response;

        } catch (error) {

            // -----------------------------------------
            // Rollback
            // -----------------------------------------

            setChecklists(
                previousChecklists
            );

            throw error;
        }
    }


    async function createChecklistItem(
        checklistId,
        itemData
    ) {

        // -----------------------------------------
        // Keep previous state for rollback
        // -----------------------------------------

        const previousChecklists =
            checklists;


        // -----------------------------------------
        // Create temporary item
        // -----------------------------------------

        const temporaryId =
            `temp-item-${Date.now()}`;

        const temporaryItem = {
            _id: temporaryId,

            text: itemData.text,

            checked:
                itemData.checked ?? false,

            order:
                itemData.order,

        };


        // -----------------------------------------
        // Optimistic item creation
        // -----------------------------------------

        setChecklists(
            previousChecklists =>
                previousChecklists.map(
                    checklist => {

                        if (
                            String(checklist._id) !==
                            String(checklistId)
                        ) {
                            return checklist;
                        }


                        return {
                            ...checklist,

                            items: [
                                ...(checklist.items || []),
                                temporaryItem
                            ]
                        };
                    }
                )
        );


        try {

            const response =
                await createChecklistItemApi(
                    token,
                    checklistId,
                    itemData
                );


            const createdItem =
                response.data;


            // -----------------------------------------
            // Replace temporary item with
            // server-created item
            // -----------------------------------------

            setChecklists(
                previousChecklists =>
                    previousChecklists.map(
                        checklist => {

                            if (
                                String(checklist._id) !==
                                String(checklistId)
                            ) {
                                return checklist;
                            }


                            return {
                                ...checklist,

                                items:
                                    (checklist.items || [])
                                        .map(
                                            item =>
                                                String(item._id) ===
                                                String(temporaryId)

                                                    ? createdItem

                                                    : item
                                        )
                            };
                        }
                    )
            );


            return response;

        } catch (error) {

            // -----------------------------------------
            // Rollback
            // -----------------------------------------

            setChecklists(
                previousChecklists
            );

            throw error;
        }
    }


    async function updateChecklistItem(
        checklistId,
        itemId,
        updates
    ) {

        // -----------------------------------------
        // Keep previous state for rollback
        // -----------------------------------------

        const previousChecklists =
            checklists;


        // -----------------------------------------
        // Optimistic item update
        // -----------------------------------------

        setChecklists(
            previousChecklists =>
                previousChecklists.map(
                    checklist => {

                        if (
                            String(checklist._id) !==
                            String(checklistId)
                        ) {
                            return checklist;
                        }


                        return {
                            ...checklist,

                            items:
                                (checklist.items || [])
                                    .map(
                                        item => {

                                            if (
                                                String(item._id) !==
                                                String(itemId)
                                            ) {
                                                return item;
                                            }


                                            return {
                                                ...item,
                                                ...updates
                                            };
                                        }
                                    )
                        };
                    }
                )
        );


        try {

            const response =
                await updateChecklistItemApi(
                    token,
                    checklistId,
                    itemId,
                    updates
                );


            const updatedItem =
                response.data;


            // -----------------------------------------
            // Sync with server response
            // -----------------------------------------

            setChecklists(
                previousChecklists =>
                    previousChecklists.map(
                        checklist => {

                            if (
                                String(checklist._id) !==
                                String(checklistId)
                            ) {
                                return checklist;
                            }


                            return {
                                ...checklist,

                                items:
                                    (checklist.items || [])
                                        .map(
                                            item =>
                                                String(item._id) ===
                                                String(itemId)

                                                    ? updatedItem

                                                    : item
                                        )
                            };
                        }
                    )
            );


            return response;

        } catch (error) {

            // -----------------------------------------
            // Rollback
            // -----------------------------------------

            setChecklists(
                previousChecklists
            );

            throw error;
        }
    }


    async function deleteChecklistItem(
        checklistId,
        itemId
    ) {

        // -----------------------------------------
        // Keep previous state for rollback
        // -----------------------------------------

        const previousChecklists =
            checklists;


        // -----------------------------------------
        // Optimistic item removal
        // -----------------------------------------

        setChecklists(
            previousChecklists =>
                previousChecklists.map(
                    checklist => {

                        if (
                            String(checklist._id) !==
                            String(checklistId)
                        ) {
                            return checklist;
                        }


                        return {
                            ...checklist,

                            items:
                                (checklist.items || [])
                                    .filter(
                                        item =>
                                            String(item._id) !==
                                            String(itemId)
                                    )
                        };
                    }
                )
        );


        try {

            const response =
                await deleteChecklistItemApi(
                    token,
                    checklistId,
                    itemId
                );


            return response;

        } catch (error) {

            // -----------------------------------------
            // Rollback
            // -----------------------------------------

            setChecklists(
                previousChecklists
            );

            throw error;
        }
    }
    
    // =========================================================
    // CONTEXT
    // =========================================================

    return (
        <TaskPageContext.Provider
            value={{

                // -------------------------------
                // Task page data
                // -------------------------------
                task,
                parentBoard,
                parentColumn,
                labels,

                // -------------------------------
                // Loading
                // -------------------------------

                isTaskLoading,
                isLabelsLoading,


                // -------------------------------
                // Task mutation
                // -------------------------------

                updateTaskProperty,
                addLabelToTask,
                removeLabelFromTask,
                createAndAddLabel,



                // Checklist state
                checklists,

                // Checklist handlers
                createChecklist,
                getChecklistDetails,
                updateChecklist,
                deleteChecklist,

                // Checklist item handlers
                createChecklistItem,
                updateChecklistItem,
                deleteChecklistItem,

                // -------------------------------
                // Board label mutation
                // -------------------------------

                updateBoardLabel,
                deleteBoardLabel,


                updateBoardLabel,
                deleteBoardLabel,


                // -------------------------------
                // Sidebar
                // -------------------------------

                isSidebarOpen,
                toggleSidebar,
                activeSidebarTab,
                setActiveSidebarTab

            }}
        >
            {children}
        </TaskPageContext.Provider>
    );
}


// =========================================================
// Hook
// =========================================================

export function useTaskPageContext() {

    const context =
        useContext(TaskPageContext);


    if (!context) {

        throw new Error(
            "useTaskPageContext must be used inside TaskPageProvider"
        );
    }


    return context;
}
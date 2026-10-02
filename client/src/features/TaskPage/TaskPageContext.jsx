import React, {
    createContext,
    useContext
} from "react";

import {
    useTaskPageData
} from "./hooks/useTaskPageData";

import {
    useTaskMutations
} from "./hooks/useTaskMutations";

import {
    useLabelManagement
} from "./hooks/useLabelManagement";

import {
    useChecklistManagement
} from "./hooks/useChecklistManagement";

import {
    useTaskPageUi
} from "./hooks/useTaskPageUi";


const TaskPageContext =
    createContext(null);


export function TaskPageProvider({
    children
}) {

    // =========================================================
    // DATA
    // =========================================================

    const taskPageData =
        useTaskPageData();


    // =========================================================
    // TASK MUTATIONS
    // =========================================================

    const taskMutations =
        useTaskMutations({
            task: taskPageData.task,
            setTask: taskPageData.setTask,
            setLabels: taskPageData.setLabels,
            token: taskPageData.token
        });


    // =========================================================
    // BOARD LABEL MANAGEMENT
    // =========================================================

    const labelManagement =
        useLabelManagement({
            task: taskPageData.task,
            labels: taskPageData.labels,
            setTask: taskPageData.setTask,
            setLabels: taskPageData.setLabels,
            token: taskPageData.token
        });


    // =========================================================
    // CHECKLIST MANAGEMENT
    // =========================================================

    const checklistManagement =
        useChecklistManagement({
            task: taskPageData.task,
            checklists: taskPageData.checklists,
            setChecklists: taskPageData.setChecklists,
            token: taskPageData.token
        });


    // =========================================================
    // TASK PAGE UI
    // =========================================================

    const taskPageUi =
        useTaskPageUi();


    // =========================================================
    // CONTEXT
    // =========================================================

    const value = {

        // -----------------------------------------
        // Data
        // -----------------------------------------

        ...taskPageData,


        // -----------------------------------------
        // Task mutations
        // -----------------------------------------

        ...taskMutations,


        // -----------------------------------------
        // Label management
        // -----------------------------------------

        ...labelManagement,


        // -----------------------------------------
        // Checklist management
        // -----------------------------------------

        ...checklistManagement,


        // -----------------------------------------
        // UI
        // -----------------------------------------

        ...taskPageUi

    };


    return (
        <TaskPageContext.Provider
            value={value}
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
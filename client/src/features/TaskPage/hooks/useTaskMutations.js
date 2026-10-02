import {
    updateTask as updateTaskApi
} from "../../../services/taskService";

import {
    createLabel
} from "../../../services/labelService";


export function useTaskMutations({
    task,
    setTask,
    setLabels,
    token
}) {

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

            const response =
                await updateTaskApi(
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
                id =>
                    String(id) ===
                    String(labelId)
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

            const response =
                await updateTaskApi(
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
                    String(id) !==
                    String(labelId)
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

            const response =
                await updateTaskApi(
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

        const response =
            await createLabel(
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

        setLabels(
            previousLabels => [
                ...previousLabels,
                newLabel
            ]
        );


        // -----------------------------------------
        // Assign newly-created label to task
        // -----------------------------------------

        await addLabelToTask(
            newLabel._id
        );


        return newLabel;
    }


    return {
        updateTaskProperty,
        addLabelToTask,
        removeLabelFromTask,
        createAndAddLabel
    };
}
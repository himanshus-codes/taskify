import {
    getChecklistDetails as getChecklistDetailsApi,
    createChecklist as createChecklistApi,
    updateChecklist as updateChecklistApi,
    deleteChecklist as deleteChecklistApi,
    createChecklistItem as createChecklistItemApi,
    updateChecklistItem as updateChecklistItemApi,
    deleteChecklistItem as deleteChecklistItemApi
} from "../../../services/checklistService";


export function useChecklistManagement({
    task,
    checklists,
    setChecklists,
    token
}) {

    // =========================================================
    // CREATE CHECKLIST
    // =========================================================

    async function createChecklist(title) {

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

            items: []
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


    // =========================================================
    // GET CHECKLIST DETAILS
    // =========================================================

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


    // =========================================================
    // UPDATE CHECKLIST
    // =========================================================

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


    // =========================================================
    // DELETE CHECKLIST
    // =========================================================

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


    // =========================================================
    // CREATE CHECKLIST ITEM
    // =========================================================

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
                itemData.order
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


    // =========================================================
    // UPDATE CHECKLIST ITEM
    // =========================================================

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


    // =========================================================
    // DELETE CHECKLIST ITEM
    // =========================================================

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


    return {
        createChecklist,
        getChecklistDetails,
        updateChecklist,
        deleteChecklist,

        createChecklistItem,
        updateChecklistItem,
        deleteChecklistItem
    };
}
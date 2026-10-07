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
                previousChecklists =>
                    previousChecklists.filter(
                        checklist =>
                            String(checklist._id) !==
                            String(temporaryId)
                    )
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
        const currentChecklist =
            checklists.find(
                checklist =>
                    String(checklist._id) ===
                    String(checklistId)
            );


        if (!currentChecklist) {
            return;
        }


        // -----------------------------------------
        // Capture ONLY fields being changed
        // -----------------------------------------

        const previousValues = {};

        Object.keys(updates).forEach(
            key => {
                previousValues[key] =
                    currentChecklist[key];
            }
        );


        // -----------------------------------------
        // Optimistic update
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


            // IMPORTANT:
            // Do NOT replace the optimistic entity
            // with response.data.


            return response;

        } catch (error) {

            // -----------------------------------------
            // Roll back ONLY our changed fields
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
                                ...previousValues
                            };
                        }
                    )
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

        const deletedIndex =
            checklists.findIndex(
                checklist =>
                    String(checklist._id) ===
                    String(checklistId)
            );

        const deletedChecklist =
            deletedIndex !== -1
                ? checklists[deletedIndex]
                : null;


        // -----------------------------------------
        // Optimistic removal
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
            // Restore only deleted checklist
            // -----------------------------------------

            if (deletedChecklist) {

                setChecklists(
                    previousChecklists => {

                        // Avoid restoring it twice.
                        const alreadyExists =
                            previousChecklists.some(
                                checklist =>
                                    String(checklist._id) ===
                                    String(checklistId)
                            );

                        if (alreadyExists) {
                            return previousChecklists;
                        }


                        const restored =
                            [...previousChecklists];

                        restored.splice(
                            Math.min(
                                deletedIndex,
                                restored.length
                            ),
                            0,
                            deletedChecklist
                        );

                        return restored;
                    }
                );
            }


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
        const temporaryId =
            `temp-item-${crypto.randomUUID()}`;

        const temporaryItem = {
            _id: temporaryId,

            text: itemData.text,

            checked:
                itemData.checked ?? false,

            order:
                itemData.order,

            isTemporary: true
        };


        // -----------------------------------------
        // Optimistic creation
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
            // Replace ONLY our temporary entity
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
            // Remove ONLY our failed temp entity
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
                                                String(temporaryId)
                                        )
                            };
                        }
                    )
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
        const currentChecklist =
            checklists.find(
                checklist =>
                    String(checklist._id) ===
                    String(checklistId)
            );


        if (!currentChecklist) {
            return;
        }


        const currentItem =
            (currentChecklist.items || []).find(
                item =>
                    String(item._id) ===
                    String(itemId)
            );


        if (!currentItem) {
            return;
        }


        // -----------------------------------------
        // Capture ONLY changed fields
        // -----------------------------------------

        const previousValues = {};

        Object.keys(updates).forEach(
            key => {
                previousValues[key] =
                    currentItem[key];
            }
        );


        // -----------------------------------------
        // Optimistic update
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


            // IMPORTANT:
            // Keep optimistic state.
            // Do not replace with response.data.


            return response;

        } catch (error) {

            // -----------------------------------------
            // Roll back ONLY changed fields
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
                                                    ...previousValues
                                                };
                                            }
                                        )
                            };
                        }
                    )
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

        const checklist =
            checklists.find(
                checklist =>
                    String(checklist._id) ===
                    String(checklistId)
            );


        if (!checklist) {
            return;
        }


        const deletedIndex =
            (checklist.items || []).findIndex(
                item =>
                    String(item._id) ===
                    String(itemId)
            );


        const deletedItem =
            deletedIndex !== -1
                ? checklist.items[deletedIndex]
                : null;


        // -----------------------------------------
        // Optimistic removal
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
            // Restore only deleted item
            // -----------------------------------------

            if (deletedItem) {

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


                                const alreadyExists =
                                    (checklist.items || [])
                                        .some(
                                            item =>
                                                String(item._id) ===
                                                String(itemId)
                                        );


                                if (alreadyExists) {
                                    return checklist;
                                }


                                const restoredItems =
                                    [
                                        ...(checklist.items || [])
                                    ];


                                restoredItems.splice(
                                    Math.min(
                                        deletedIndex,
                                        restoredItems.length
                                    ),
                                    0,
                                    deletedItem
                                );


                                return {
                                    ...checklist,
                                    items: restoredItems
                                };
                            }
                        )
                );
            }


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
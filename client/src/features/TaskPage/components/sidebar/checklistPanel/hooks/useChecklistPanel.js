import {
    useState
} from "react";

import {
    useTaskPageContext
} from "../../../../TaskPageContext";


export default function useChecklistPanel() {

    const {
        checklists,
        createChecklist,
        updateChecklist,
        createChecklistItem,
        updateChecklistItem,
        deleteChecklist,
        deleteChecklistItem,
    } = useTaskPageContext();

    // -----------------------------------------------------
    // Local UI operation state
    // -----------------------------------------------------

    const [
        operation,
        setOperation
    ] = useState(null);

    const [
        operationTargetId,
        setOperationTargetId
    ] = useState(null);


    // -----------------------------------------------------
    // Draft state
    // -----------------------------------------------------

    const [
        newChecklistTitle,
        setNewChecklistTitle
    ] = useState("");

    const [
        newItemText,
        setNewItemText
    ] = useState("");

    const [
        editingValue,
        setEditingValue
    ] = useState("");


    // -----------------------------------------------------
    // Helpers
    // -----------------------------------------------------

    function sameId(
        firstId,
        secondId
    ) {

        return String(firstId) ===
            String(secondId);
    }


    function resetOperation() {

        setOperation(null);

        setOperationTargetId(null);
    }


    function resetDrafts() {

        setNewChecklistTitle("");

        setNewItemText("");

        setEditingValue("");
    }


    function closeOperation() {

        resetOperation();

        resetDrafts();
    }


    // -----------------------------------------------------
    // Derived operation state
    // -----------------------------------------------------

    const isAddingChecklist =
        operation === "adding-checklist";


    const addingItemChecklistId =
        operation === "adding-item"
            ? operationTargetId
            : null;


    const isEditingChecklist =
        operation === "editing-checklist";


    const isEditingItem =
        operation === "editing-item";


    // -----------------------------------------------------
    // Find current editing item
    // -----------------------------------------------------

    const editingItemContext =
        isEditingItem

            ? checklists.reduce(
                (
                    found,
                    checklist
                ) => {

                    if (found) {
                        return found;
                    }

                    const item =
                        (checklist.items || []).find(
                            item =>
                                sameId(
                                    item._id,
                                    operationTargetId
                                )
                        );

                    if (!item) {
                        return null;
                    }

                    return {
                        checklist,
                        item
                    };
                },
                null
            )

            : null;


    // -----------------------------------------------------
    // Checklist / item status actions
    // -----------------------------------------------------

    async function toggleItem(
        checklistId,
        itemId,
        checked
    ) {

        // Do not perform status actions while
        // another UI operation is active.
        if (operation) {
            return;
        }


        try {

            await updateChecklistItem(
                checklistId,
                itemId,
                {
                    checked: !checked
                }
            );

        } catch (error) {

            console.error(
                "Failed to update checklist item:",
                error
            );
        }
    }


    async function toggleChecklist(
        checklistId,
        completed
    ) {

        if (operation) {
            return;
        }


        try {

            await updateChecklist(
                checklistId,
                {
                    completed: !completed
                }
            );

        } catch (error) {

            console.error(
                "Failed to update checklist:",
                error
            );
        }
    }


    // -----------------------------------------------------
    // Checklist title editing
    // -----------------------------------------------------

    function startChecklistEdit(
        checklist
    ) {

        setOperation(
            "editing-checklist"
        );

        setOperationTargetId(
            checklist._id
        );

        setEditingValue(
            checklist.title
        );

        setNewChecklistTitle("");

        setNewItemText("");
    }


    // -----------------------------------------------------
    // Checklist item editing
    // -----------------------------------------------------

    function startItemEdit(
        checklistId,
        item
    ) {

        setOperation(
            "editing-item"
        );

        setOperationTargetId(
            item._id
        );

        setEditingValue(
            item.text
        );

        setNewChecklistTitle("");

        setNewItemText("");
    }


    function cancelEdit() {

        closeOperation();
    }


    // -----------------------------------------------------
    // Save edit
    // -----------------------------------------------------

    function saveEdit() {

        if (!operation) {
            return;
        }


        const trimmedValue =
            editingValue.trim();


        if (!trimmedValue) {
            return;
        }


        // -----------------------------------------
        // Edit checklist title
        // -----------------------------------------

        if (
            operation ===
            "editing-checklist"
        ) {

            const checklist =
                checklists.find(
                    checklist =>
                        sameId(
                            checklist._id,
                            operationTargetId
                        )
                );


            if (!checklist) {
                closeOperation();
                return;
            }


            // No actual change.
            if (
                trimmedValue ===
                checklist.title
            ) {
                closeOperation();
                return;
            }


            const checklistId =
                operationTargetId;


            // UI operation ends NOW.
            closeOperation();


            updateChecklist(
                checklistId,
                {
                    title: trimmedValue
                }
            ).catch(error => {

                console.error(
                    "Failed to save checklist edit:",
                    error
                );
            });


            return;
        }


        // -----------------------------------------
        // Edit checklist item
        // -----------------------------------------

        if (
            operation ===
            "editing-item"
        ) {

            if (!editingItemContext) {
                closeOperation();
                return;
            }


            const {
                checklist,
                item
            } = editingItemContext;


            // No actual change.
            if (
                trimmedValue ===
                item.text
            ) {
                closeOperation();
                return;
            }


            const checklistId =
                checklist._id;

            const itemId =
                operationTargetId;


            // UI operation ends NOW.
            closeOperation();


            updateChecklistItem(
                checklistId,
                itemId,
                {
                    text: trimmedValue
                }
            ).catch(error => {

                console.error(
                    "Failed to save checklist item edit:",
                    error
                );
            });
        }
    }


    function handleEditKeyDown(
        event
    ) {

        if (
            event.key ===
            "Enter"
        ) {

            event.preventDefault();

            saveEdit();
        }


        if (
            event.key ===
            "Escape"
        ) {

            event.preventDefault();

            cancelEdit();
        }
    }


    // -----------------------------------------------------
    // Add checklist
    // -----------------------------------------------------

    function startAddingChecklist() {

        setOperation(
            "adding-checklist"
        );

        setOperationTargetId(null);

        setNewChecklistTitle("");

        setNewItemText("");

        setEditingValue("");
    }


    function cancelAddingChecklist() {

        closeOperation();
    }


    function saveNewChecklist() {

        const trimmedTitle =
            newChecklistTitle.trim();


        if (!trimmedTitle) {
            return;
        }


        // UI operation ends immediately.
        closeOperation();


        createChecklist(
            trimmedTitle
        ).catch(error => {

            console.error(
                "Failed to create checklist:",
                error
            );
        });
    }


    function handleAddChecklistKeyDown(
        event
    ) {

        if (
            event.key ===
            "Enter"
        ) {

            event.preventDefault();

            saveNewChecklist();
        }


        if (
            event.key ===
            "Escape"
        ) {

            event.preventDefault();

            cancelAddingChecklist();
        }
    }


    // -----------------------------------------------------
    // Add checklist item
    // -----------------------------------------------------

    function startAddingItem(
        checklistId
    ) {

        setOperation(
            "adding-item"
        );

        setOperationTargetId(
            checklistId
        );

        setNewItemText("");

        setNewChecklistTitle("");

        setEditingValue("");
    }


    function cancelAddingItem() {

        closeOperation();
    }


    function saveNewItem(
        checklist
    ) {

        const trimmedText =
            newItemText.trim();


        if (!trimmedText) {
            return;
        }


        const items =
            checklist.items || [];


        const nextOrder =
            items.reduce(
                (
                    maxOrder,
                    item
                ) =>
                    Math.max(
                        maxOrder,
                        Number(item.order) || 0
                    ),
                0
            ) + 1;


        const checklistId =
            checklist._id;


        // UI operation ends immediately.
        closeOperation();


        createChecklistItem(
            checklistId,
            {
                text: trimmedText,
                checked: false,
                order: nextOrder
            }
        ).catch(error => {

            console.error(
                "Failed to create checklist item:",
                error
            );
        });
    }


    function handleAddItemKeyDown(
        event,
        checklist
    ) {

        if (
            event.key ===
            "Enter"
        ) {

            event.preventDefault();

            saveNewItem(checklist);
        }


        if (
            event.key ===
            "Escape"
        ) {

            event.preventDefault();

            cancelAddingItem();
        }
    }


    // -----------------------------------------------------
    // Overall status
    // -----------------------------------------------------

    const totalItems =
        checklists.reduce(
            (
                total,
                checklist
            ) =>
                total +
                (checklist.items || []).length,
            0
        );


    const completedItems =
        checklists.reduce(
            (
                total,
                checklist
            ) =>
                total +
                (checklist.items || []).filter(
                    item => item.checked
                ).length,
            0
        );


    const overallProgress =
        totalItems === 0

            ? 0

            : Math.round(
                (completedItems / totalItems) * 100
            );


    return {

        checklists,

        // -----------------------------------------
        // Operation
        // -----------------------------------------

        operation,
        operationTargetId,

        // -----------------------------------------
        // Add checklist
        // -----------------------------------------

        isAddingChecklist,

        newChecklistTitle,
        setNewChecklistTitle,

        startAddingChecklist,
        cancelAddingChecklist,
        handleAddChecklistKeyDown,

        // -----------------------------------------
        // Add item
        // -----------------------------------------

        addingItemChecklistId,

        newItemText,
        setNewItemText,

        startAddingItem,
        cancelAddingItem,
        handleAddItemKeyDown,

        // -----------------------------------------
        // Editing
        // -----------------------------------------

        isEditingChecklist,
        isEditingItem,

        editingValue,
        setEditingValue,

        startChecklistEdit,
        startItemEdit,

        cancelEdit,
        handleEditKeyDown,

        // -----------------------------------------
        // Status
        // -----------------------------------------

        toggleItem,
        toggleChecklist,

        // -----------------------------------------
        // Delete
        // -----------------------------------------

        deleteChecklist,
        deleteChecklistItem,

        // -----------------------------------------
        // Derived status
        // -----------------------------------------

        totalItems,
        completedItems,
        overallProgress,

        // -----------------------------------------
        // Helper
        // -----------------------------------------

        sameId
    };
}
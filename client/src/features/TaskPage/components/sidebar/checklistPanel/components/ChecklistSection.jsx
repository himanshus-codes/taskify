import ChecklistHeader from "./ChecklistHeader";
import ChecklistItem from "./ChecklistItem";
import InlineInput from "./InlineInput";


export default function ChecklistSection({
    checklist,

    operation,
    operationTargetId,

    editingValue,
    setEditingValue,

    newItemText,
    setNewItemText,

    onEditKeyDown,

    onStartChecklistEdit,
    onStartItemEdit,

    onToggleChecklist,
    onToggleItem,

    onStartAddingItem,
    onAddItemKeyDown,

    onDeleteChecklist,
    onDeleteItem,
}) {

    const items =
        checklist.items || [];


    const completedCount =
        items.filter(
            item => item.checked
        ).length;


    const totalCount =
        items.length;


    const progress =
        totalCount === 0
            ? 0
            : Math.round(
                (completedCount / totalCount) * 100
            );


    // -----------------------------------------------------
    // Determine whether this checklist title is being edited
    // -----------------------------------------------------

    const isChecklistEditing =
        operation === "editing-checklist" &&
        String(operationTargetId) ===
            String(checklist._id);


    // -----------------------------------------------------
    // Determine whether this checklist is adding an item
    // -----------------------------------------------------

    const isAddingItem =
        operation === "adding-item" &&
        String(operationTargetId) ===
            String(checklist._id);


    return (

        <div className="space-y-1">

            {/* -----------------------------------------
                Checklist header
            ----------------------------------------- */}

            <ChecklistHeader

                onDelete={() =>
                    onDeleteChecklist(checklist._id)
                }
                
                checklist={checklist}

                progress={progress}

                completedCount={
                    completedCount
                }

                totalCount={
                    totalCount
                }

                isEditing={
                    isChecklistEditing
                }

                editingValue={
                    editingValue
                }

                setEditingValue={
                    setEditingValue
                }

                onEditKeyDown={
                    onEditKeyDown
                }

                onStartEdit={() =>
                    onStartChecklistEdit(
                        checklist
                    )
                }

                onToggle={() =>
                    onToggleChecklist(
                        checklist._id,
                        checklist.completed
                    )
                }

                onDelete={() =>
                    onDeleteChecklist(
                        checklist._id
                    )
                }
            />


            {/* -----------------------------------------
                Checklist items
            ----------------------------------------- */}

            <div className="ml-6 space-y-1">

                {items.map(item => {

                    const isItemEditing =
                        operation === "editing-item" &&
                        String(operationTargetId) ===
                            String(item._id);

                    return (
                        <ChecklistItem
                            key={item._id}

                            item={item}

                            isEditing={
                                isItemEditing
                            }

                            editingValue={
                                editingValue
                            }

                            setEditingValue={
                                setEditingValue
                            }

                            onEditKeyDown={
                                onEditKeyDown
                            }

                            onStartEdit={() =>
                                onStartItemEdit(
                                    checklist._id,
                                    item
                                )
                            }

                            onToggle={() =>
                                onToggleItem(
                                    checklist._id,
                                    item._id,
                                    item.checked
                                )
                            }

                            onDelete={() =>
                                onDeleteItem(
                                    checklist._id,
                                    item._id
                                )
                            }
                        />
                    );
                })}


                {/* -----------------------------------------
                    Add checklist item
                ----------------------------------------- */}

                {isAddingItem ? (

                    <div className="px-1 pt-1">

                        <InlineInput
                            value={
                                newItemText
                            }

                            onChange={
                                event =>
                                    setNewItemText(
                                        event.target.value
                                    )
                            }

                            onKeyDown={
                                event =>
                                    onAddItemKeyDown(
                                        event,
                                        checklist
                                    )
                            }

                            placeholder="Add checklist item"
                        />

                    </div>

                ) : (

                    <button
                        type="button"
                        onClick={() =>
                            onStartAddingItem(
                                checklist._id
                            )
                        }
                        className="
                            ml-0
                            rounded-md
                            px-1
                            py-1
                            text-[11px]
                            text-[#686363]
                            hover:bg-[#686363]/5
                            hover:text-[#858080]
                        "
                    >
                        + Add Item
                    </button>

                )}

            </div>

        </div>
    );
}
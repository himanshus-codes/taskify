import ProgressCircle from "./components/ProgressCirlce";
import InlineInput from "./components/InlineInput";
import ChecklistSection from "./components/ChecklistSection";
import useChecklistPanel from "./hooks/useChecklistPanel";


export default function ChecklistPanel() {

    const {
        checklists,

        operation,
        operationTargetId,

        newChecklistTitle,
        setNewChecklistTitle,

        newItemText,
        setNewItemText,

        editingValue,
        setEditingValue,

        startAddingChecklist,
        handleAddChecklistKeyDown,

        startAddingItem,
        handleAddItemKeyDown,

        startChecklistEdit,
        startItemEdit,
        handleEditKeyDown,

        toggleItem,
        toggleChecklist,

        deleteChecklist,
        deleteChecklistItem,

        totalItems,
        completedItems,
        overallProgress,
    } = useChecklistPanel();


    const isAddingChecklist = operation === "adding-checklist";

    return (
        <div className="space-y-5 px-5">

            {/* Header */}
            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-sm font-medium text-[#ddd8d8]">
                        Checklist
                    </h2>

                    <p className="mt-1 text-xs text-[#6f6a6a]">
                        Track smaller pieces of work.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={startAddingChecklist}
                    disabled={isAddingChecklist}
                    className="
                        rounded-md
                        border
                        border-[#2b2929]
                        px-2
                        py-1
                        text-xs
                        text-[#8f8989]
                        hover:bg-[#252323]
                        hover:text-[#d2cccc]
                        disabled:cursor-default
                        disabled:opacity-50
                    "
                >
                    + Add
                </button>

            </div>


            {/* Overall status */}
            <div className="flex items-center justify-between">

                <span className="text-xs text-[#777171]">
                    Status
                </span>

                <div className="flex h-5 items-center gap-2">

                    <span className="w-7 text-right text-xs text-[#777171]">
                        {completedItems}/{totalItems}
                    </span>

                    <ProgressCircle
                        progress={overallProgress}
                        size="h-5 w-5"
                    />

                    <span className="w-8 text-right text-xs text-[#777171]">
                        {overallProgress}%
                    </span>

                </div>

            </div>


            {/* Add checklist */}
            {isAddingChecklist && (
                <div className="px-1">

                    <InlineInput
                        value={newChecklistTitle}
                        onChange={event =>
                            setNewChecklistTitle(
                                event.target.value
                            )
                        }
                        onKeyDown={
                            handleAddChecklistKeyDown
                        }
                        placeholder="Checklist title"
                    />

                </div>
            )}


            {/* Checklists */}
            <div className="space-y-4">

                {checklists.map(checklist => (

                    <ChecklistSection
                        key={checklist._id}
                        checklist={checklist}

                        operation={operation}
                        operationTargetId={operationTargetId}

                        editingValue={editingValue}
                        setEditingValue={setEditingValue}

                        newItemText={newItemText}
                        setNewItemText={setNewItemText}

                        onEditKeyDown={
                            handleEditKeyDown
                        }

                        onStartChecklistEdit={
                            startChecklistEdit
                        }

                        onStartItemEdit={
                            startItemEdit
                        }

                        onToggleChecklist={
                            toggleChecklist
                        }

                        onToggleItem={
                            toggleItem
                        }

                        onStartAddingItem={
                            startAddingItem
                        }

                        onAddItemKeyDown={
                            handleAddItemKeyDown
                        }


                        onDeleteChecklist={
                            deleteChecklist
                        }

                        onDeleteItem={
                            deleteChecklistItem
                        }
                    />

                ))}

            </div>

        </div>
    );
}
import { useState } from "react";

import ProgressCircle from "./ProgressCirlce";
import StatusCheckbox from "./StatusCheckbox";
import EditIcon from "./EditIcon";
import InlineInput from "./InlineInput";


export default function ChecklistHeader({
    checklist,

    progress,
    completedCount,
    totalCount,

    isEditing,

    editingValue,
    setEditingValue,

    onEditKeyDown,
    onStartEdit,
    onToggle,

    onDelete,
}) {

    const [showMenu, setShowMenu] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    return (

        <div
            className="
                group
                flex
                items-center
                justify-between
                gap-3
                px-1
                py-1
            "
        >

            {/* -----------------------------------------
                Checklist title
            ----------------------------------------- */}

            <div
                className="
                    flex
                    min-w-0
                    flex-1
                    items-center
                    gap-1
                "
            >

                {isEditing ? (

                    <InlineInput
                        value={editingValue}

                        onChange={
                            event =>
                                setEditingValue(
                                    event.target.value
                                )
                        }

                        onKeyDown={
                            onEditKeyDown
                        }

                        placeholder="Checklist title"
                    />

                ) : (

                    <>
                        <span
                            className={`
                                min-w-0
                                break-words
                                text-xs
                                font-medium
                                leading-5
                                ${
                                    checklist.completed
                                        ? "text-[#817b7b]"
                                        : "text-[#b8b1b1]"
                                }
                            `}
                        >
                            {checklist.title}
                        </span>

                        <EditIcon
                            onClick={
                                onStartEdit
                            }
                        />
                    </>

                )}

            </div>


            {/* -----------------------------------------
                Checklist actions / status
            ----------------------------------------- */}

            <div
                className="
                    flex
                    h-5
                    shrink-0
                    items-center
                    gap-2
                "
            >

                <StatusCheckbox
                    checked={
                        checklist.completed
                    }

                    onClick={
                        onToggle
                    }
                />


                <ProgressCircle
                    progress={
                        progress
                    }

                    size="h-4 w-4"
                />


                <span
                    className="
                        w-7
                        text-right
                        text-[10px]
                        text-[#686363]
                    "
                >
                    {completedCount}/
                    {totalCount}
                </span>


                {/* -----------------------------------------
                    Checklist menu
                ----------------------------------------- */}

                <div className="relative">

                    {confirmDelete ? (

                        <div
                            className="
                                absolute
                                right-0
                                top-6
                                z-20
                                w-44
                                rounded
                                border
                                border-[#353131]
                                bg-[#211f1f]
                                p-2
                                shadow-lg
                            "
                        >

                            <p
                                className="
                                    mb-2
                                    text-[11px]
                                    text-[#aaa4a4]
                                "
                            >
                                Delete this checklist?
                            </p>

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-end
                                    gap-2
                                "
                            >

                                <button
                                    type="button"
                                    onClick={() => {
                                        setConfirmDelete(false);
                                        setShowMenu(false);
                                    }}
                                    className="
                                        rounded
                                        px-2
                                        py-1
                                        text-[10px]
                                        text-[#8f8989]
                                        hover:bg-[#302d2d]
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setConfirmDelete(false);
                                        setShowMenu(false);
                                        onDelete();
                                    }}
                                    className="
                                        rounded
                                        bg-[#5b2929]
                                        px-2
                                        py-1
                                        text-[10px]
                                        text-[#e7dada]
                                        hover:bg-[#713232]
                                    "
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ) : (

                        <>
                            <button
                                type="button"
                                aria-label="Checklist menu"
                                title="Checklist menu"
                                onClick={() =>
                                    setShowMenu(
                                        previous =>
                                            !previous
                                    )
                                }
                                className="
                                    flex
                                    h-5
                                    w-5
                                    items-center
                                    justify-center
                                    rounded
                                    text-[#777171]
                                    hover:bg-[#302d2d]
                                    hover:text-[#b8b1b1]
                                "
                            >
                                ⋯
                            </button>


                            {showMenu && (

                                <div
                                    className="
                                        absolute
                                        right-0
                                        top-6
                                        z-20
                                        w-36
                                        rounded
                                        border
                                        border-[#353131]
                                        bg-[#211f1f]
                                        py-1
                                        shadow-lg
                                    "
                                >

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowMenu(false);
                                            onStartEdit();
                                        }}
                                        className="
                                            w-full
                                            px-3
                                            py-2
                                            text-left
                                            text-[11px]
                                            text-[#aaa4a4]
                                            hover:bg-[#302d2d]
                                            hover:text-[#d0caca]
                                        "
                                    >
                                        Edit checklist
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() => {
                                            setConfirmDelete(true);
                                            setShowMenu(false);
                                        }}
                                        className="
                                            w-full
                                            px-3
                                            py-2
                                            text-left
                                            text-[11px]
                                            text-[#c47b7b]
                                            hover:bg-[#302d2d]
                                        "
                                    >
                                        Delete checklist
                                    </button>

                                </div>

                            )}

                        </>

                    )}

                </div>

            </div>

        </div>
    );
}
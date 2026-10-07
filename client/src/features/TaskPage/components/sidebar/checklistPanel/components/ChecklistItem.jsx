import StatusCheckbox from "./StatusCheckbox";
import EditIcon from "./EditIcon";

export default function ChecklistItem({
    item,
    isEditing,
    editingValue,
    setEditingValue,
    onEditKeyDown,
    onStartEdit,
    onToggle,
    onDelete,
}) {

    const isTemporary =
        item.isTemporary;


    return (
        <div
            className="
                group
                flex
                min-h-7
                items-center
                gap-2
                rounded-md
                px-1
                py-1
                hover:bg-[#211f1f]
            "
        >

            {/* Checkbox */}
            {!isEditing && (
                <StatusCheckbox
                    checked={item.checked}
                    disabled={isTemporary}
                    onClick={() => {
                        if (isTemporary) {
                            return;
                        }

                        onToggle();
                    }}
                />
            )}


            {/* Content */}
            {isEditing ? (

                <input
                    autoFocus
                    value={editingValue}
                    onChange={event =>
                        setEditingValue(event.target.value)
                    }
                    onKeyDown={onEditKeyDown}
                    className="
                        min-w-0
                        flex-1
                        bg-transparent
                        text-xs
                        leading-4
                        p-1
                        text-[#aaa4a4]
                        rounded-md
                        border
                        border-[#383434]
                        focus:border-[#514c4c]
                        outline-none
                    "
                />

            ) : (

                <span
                    className={`
                        min-w-0
                        flex-1
                        text-xs
                        leading-5
                        ${
                            item.checked
                                ? "text-[#686363]"
                                : "text-[#aaa4a4]"
                        }
                        ${
                            isTemporary
                                ? "opacity-60"
                                : ""
                        }
                    `}
                >
                    {item.text}
                </span>

            )}


            {/* Actions */}
            {!isEditing && !isTemporary && (

                <div
                    className="
                        flex
                        items-center
                        gap-1
                        opacity-0
                        transition-opacity
                        group-hover:opacity-100
                    "
                >

                    {/* Edit */}
                    <EditIcon
                        onClick={onStartEdit}
                    />


                    {/* Delete */}
                    <button
                        type="button"
                        aria-label="Delete item"
                        title="Delete item"
                        onClick={onDelete}
                        className="
                            flex
                            h-5
                            w-5
                            items-center
                            justify-center
                            rounded
                            text-[#777171]
                            hover:bg-[#382828]
                            hover:text-[#b87575]
                        "
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            className="h-3.5 w-3.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 6h18"
                            />

                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 6V4h8v2"
                            />

                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 6l-1 14H6L5 6"
                            />

                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 11v5M14 11v5"
                            />
                        </svg>
                    </button>

                </div>

            )}

        </div>
    );
}
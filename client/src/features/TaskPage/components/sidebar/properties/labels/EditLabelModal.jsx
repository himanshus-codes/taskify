import {
    createPortal
} from "react-dom";

import {
    useState
} from "react";

import {
    useTaskPageContext
} from "../../../../TaskPageContext";


const colorOptions = [

    "#14b8a6", // teal
    "#06b6d4", // cyan
    "#3b82f6", // blue
    "#6366f1", // indigo
    "#8b5cf6", // violet

    "#a855f7", // purple
    "#ec4899", // pink
    "#f43f5e", // rose
    "#ef4444", // red
    "#f97316", // orange

    "#f59e0b", // amber
    "#eab308", // yellow
    "#84cc16", // lime
    "#22c55e", // green
    "#10b981", // emerald

    "#64748b", // slate
    "#78716c", // stone
    "#6b7280", // gray
    "#475569", // dark slate
    "#334155", // deeper slate

];


export default function EditLabelModal({
    label,
    onClose,
}) {

    const {
        updateBoardLabel,
        deleteBoardLabel
    } = useTaskPageContext();


    // =====================================================
    // Local state
    // =====================================================

    const [
        name,
        setName
    ] = useState(label.name);


    const [
        color,
        setColor
    ] = useState(label.color);


    const [
        isColorPickerOpen,
        setIsColorPickerOpen
    ] = useState(false);


    const [
        isSaving,
        setIsSaving
    ] = useState(false);


    const [
        isDeleting,
        setIsDeleting
    ] = useState(false);


    // =====================================================
    // Update label
    // =====================================================

    async function handleUpdate() {

        const trimmedName =
            name.trim();


        if (!trimmedName) {
            return;
        }


        try {

            setIsSaving(true);


            await updateBoardLabel(
                label._id,
                {
                    name: trimmedName,
                    color
                }
            );


            onClose();

        } catch (error) {

            console.error(
                "Failed to update label:",
                error
            );

        } finally {

            setIsSaving(false);
        }
    }


    // =====================================================
    // Delete label
    // =====================================================

    async function handleDelete() {

        try {

            setIsDeleting(true);


            await deleteBoardLabel(
                label._id
            );


            onClose();

        } catch (error) {

            console.error(
                "Failed to delete label:",
                error
            );

        } finally {

            setIsDeleting(false);
        }
    }


    // =====================================================
    // Render
    // =====================================================

    return createPortal(

        <div
            className="
                fixed
                inset-0
                z-300
                flex
                items-center
                justify-center
                bg-black/60
                backdrop-blur-[1px]
            "
            onMouseDown={event => {

                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose();
                }

            }}
        >

            {/* ================================================= */}
            {/* Modal */}
            {/* ================================================= */}

            <div
                className="
                    w-105
                    overflow-hidden
                    rounded-xl
                    border
                    border-[#393737]
                    bg-[#1c1b1b]
                    text-[#ddd8d8]
                    shadow-2xl
                "
                onMouseDown={event =>
                    event.stopPropagation()
                }
            >

                {/* ================================================= */}
                {/* Header */}
                {/* ================================================= */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        px-6
                        py-5
                    "
                >

                    <h2 className="text-base font-medium">
                        Edit label
                    </h2>


                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            text-xl
                            text-[#777171]
                            hover:text-[#ddd8d8]
                        "
                        aria-label="Close"
                    >
                        ×
                    </button>

                </div>


                {/* ================================================= */}
                {/* Form */}
                {/* ================================================= */}

                <div
                    className="
                        space-y-5
                        px-6
                        pb-7
                    "
                >

                    {/* ----------------------------------------- */}
                    {/* Label name */}
                    {/* ----------------------------------------- */}

                    <input
                        type="text"
                        value={name}
                        onChange={event =>
                            setName(
                                event.target.value
                            )
                        }
                        className="
                            w-full
                            rounded-md
                            border
                            border-[#444141]
                            bg-[#242323]
                            px-3
                            py-2.5
                            text-sm
                            text-[#e5e0e0]
                            outline-none
                            focus:border-[#666161]
                        "
                        placeholder="Label name"
                    />


                    {/* ----------------------------------------- */}
                    {/* Color selector */}
                    {/* ----------------------------------------- */}

                    <div className="relative">

                        <button
                            type="button"
                            onClick={() =>
                                setIsColorPickerOpen(
                                    previous =>
                                        !previous
                                )
                            }
                            className="
                                flex
                                w-full
                                items-center
                                justify-between
                                rounded-md
                                border
                                border-[#444141]
                                bg-[#242323]
                                px-3
                                py-2.5
                                outline-none
                                hover:border-[#666161]
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >

                                <span
                                    className="
                                        h-3
                                        w-3
                                        rounded-full
                                    "
                                    style={{
                                        backgroundColor:
                                            color
                                    }}
                                />


                                <span
                                    className="
                                        text-sm
                                        text-[#9b9595]
                                    "
                                >
                                    Color
                                </span>

                            </div>


                            <span
                                className="
                                    text-sm
                                    text-[#777171]
                                "
                            >
                                {isColorPickerOpen
                                    ? "⌃"
                                    : "⌄"}
                            </span>

                        </button>


                        {/* ----------------------------------------- */}
                        {/* Color palette */}
                        {/* ----------------------------------------- */}

                        {isColorPickerOpen && (

                            <div
                                className="
                                    absolute
                                    left-0
                                    top-full
                                    z-20
                                    mt-2
                                    w-full
                                    rounded-md
                                    border
                                    border-[#393737]
                                    bg-[#242323]
                                    p-3
                                    shadow-xl
                                "
                            >

                                <div
                                    className="
                                        grid
                                        grid-cols-10
                                        gap-2
                                    "
                                >

                                    {colorOptions.map(
                                        option => {

                                            const isSelected =
                                                option.toLowerCase() ===
                                                color.toLowerCase();


                                            return (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => {

                                                        setColor(
                                                            option
                                                        );

                                                        setIsColorPickerOpen(
                                                            false
                                                        );

                                                    }}
                                                    className="
                                                        flex
                                                        h-7
                                                        w-7
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        hover:bg-[#333131]
                                                    "
                                                    aria-label={
                                                        `Select color ${option}`
                                                    }
                                                >

                                                    <span
                                                        className="
                                                            flex
                                                            h-4
                                                            w-4
                                                            items-center
                                                            justify-center
                                                            rounded-full
                                                        "
                                                        style={{
                                                            backgroundColor:
                                                                option
                                                        }}
                                                    >

                                                        {isSelected && (

                                                            <span
                                                                className="
                                                                    text-[8px]
                                                                    font-bold
                                                                    text-white
                                                                "
                                                            >
                                                                ✓
                                                            </span>

                                                        )}

                                                    </span>

                                                </button>
                                            );
                                        }
                                    )}

                                </div>

                            </div>
                        )}

                    </div>

                </div>


                {/* ================================================= */}
                {/* Footer */}
                {/* ================================================= */}

                <div
                    className="
                        flex
                        items-center
                        justify-end
                        gap-2
                        border-t
                        border-[#393737]
                        px-6
                        py-4
                    "
                >

                    {/* Delete */}

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={
                            isDeleting ||
                            isSaving
                        }
                        className="
                            rounded-md
                            border
                            border-[#3b3939]
                            bg-[#292727]
                            px-4
                            py-2
                            text-sm
                            text-[#ddd8d8]
                            hover:bg-[#333131]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {isDeleting
                            ? "Deleting..."
                            : "Delete"}
                    </button>


                    {/* Update */}

                    <button
                        type="button"
                        onClick={handleUpdate}
                        disabled={
                            isDeleting ||
                            isSaving
                        }
                        className="
                            rounded-md
                            bg-[#e8e8e8]
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-[#222]
                            hover:bg-[#d8d8d8]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {isSaving
                            ? "Updating..."
                            : "Update label"}
                    </button>

                </div>

            </div>

        </div>,

        document.body

    );
}
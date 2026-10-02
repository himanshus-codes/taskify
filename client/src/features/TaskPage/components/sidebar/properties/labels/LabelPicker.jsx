import {
    createPortal
} from "react-dom";

import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState
} from "react";

import {
    labelColors
} from "./labelColors";

import {
    useTaskPageContext
} from "../../../../TaskPageContext";

import EditLabelModal from "./EditLabelModal";

import CreateLabelColorPicker
    from "./CreateLabelColorPicker";


const VIEWPORT_MARGIN = 8;
const PICKER_GAP = 6;
const PICKER_WIDTH = 240;


export default function LabelPicker({
    labels,
    taskLabelIds,
    anchorRef,
    onClose,
}) {

    const {
        addLabelToTask,
        removeLabelFromTask,
        createAndAddLabel,
    } = useTaskPageContext();


    const [
        isCreatingLabel,
        setIsCreatingLabel
    ] = useState(false);


    const [
        newLabelName,
        setNewLabelName
    ] = useState("");


    const [
        newLabelColor,
        setNewLabelColor
    ] = useState(
        labelColors[0]
    );


    const [
        editingLabel,
        setEditingLabel
    ] = useState(null);


    const pickerRef =
        useRef(null);


    const [
        position,
        setPosition
    ] = useState({
        left: 0,
        top: 0,
        ready: false
    });


    // =========================================================
    // Picker positioning
    // =========================================================

    function updatePosition() {

        const anchor =
            anchorRef?.current;

        const picker =
            pickerRef.current;


        if (
            !anchor ||
            !picker
        ) {
            return;
        }


        const anchorRect =
            anchor.getBoundingClientRect();

        const pickerRect =
            picker.getBoundingClientRect();


        let left =
            anchorRect.left;

        let top =
            anchorRect.bottom +
            PICKER_GAP;


        // -----------------------------------------
        // Horizontal
        // -----------------------------------------

        if (
            left + pickerRect.width >
            window.innerWidth -
            VIEWPORT_MARGIN
        ) {

            left =
                window.innerWidth -
                pickerRect.width -
                VIEWPORT_MARGIN;
        }


        left = Math.max(
            VIEWPORT_MARGIN,
            left
        );


        // -----------------------------------------
        // Vertical
        // -----------------------------------------

        const spaceBelow =
            window.innerHeight -
            anchorRect.bottom;

        const spaceAbove =
            anchorRect.top;


        if (
            spaceBelow <
                pickerRect.height +
                VIEWPORT_MARGIN
            &&
            spaceAbove >=
                pickerRect.height +
                VIEWPORT_MARGIN
        ) {

            top =
                anchorRect.top -
                pickerRect.height -
                PICKER_GAP;
        }


        top = Math.max(
            VIEWPORT_MARGIN,
            Math.min(
                top,
                window.innerHeight -
                    pickerRect.height -
                    VIEWPORT_MARGIN
            )
        );


        setPosition({
            left,
            top,
            ready: true
        });
    }


    useLayoutEffect(() => {

        updatePosition();

    }, [
        labels.length,
        isCreatingLabel
    ]);


    useEffect(() => {

        function handleViewportChange() {

            updatePosition();
        }


        window.addEventListener(
            "resize",
            handleViewportChange
        );

        window.addEventListener(
            "scroll",
            handleViewportChange,
            true
        );


        return () => {

            window.removeEventListener(
                "resize",
                handleViewportChange
            );

            window.removeEventListener(
                "scroll",
                handleViewportChange,
                true
            );
        };

    }, [
        labels.length,
        isCreatingLabel
    ]);


    // =========================================================
    // Outside click
    // =========================================================

    useEffect(() => {

        function handleOutsideClick(
            event
        ) {

            const picker =
                pickerRef.current;

            const anchor =
                anchorRef?.current;


            if (
                picker &&
                picker.contains(
                    event.target
                )
            ) {
                return;
            }


            if (
                anchor &&
                anchor.contains(
                    event.target
                )
            ) {
                return;
            }


            onClose();
        }


        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };

    }, [onClose]);


    // =========================================================
    // Toggle task label
    // =========================================================

    async function handleToggleLabel(
        labelId
    ) {

        const alreadyAssigned =
            taskLabelIds.some(
                id =>
                    String(id) ===
                    String(labelId)
            );


        try {

            if (alreadyAssigned) {

                await removeLabelFromTask(
                    labelId
                );

            } else {

                await addLabelToTask(
                    labelId
                );
            }

        } catch (error) {

            console.error(
                "Failed to update task labels:",
                error
            );
        }
    }


    // =========================================================
    // Create board label
    // =========================================================

    async function handleCreateLabel(
        event
    ) {

        event.preventDefault();


        const name =
            newLabelName.trim();


        if (!name) {
            return;
        }


        try {

            await createAndAddLabel({

                name,

                color:
                    newLabelColor
            });


            setNewLabelName("");

            setNewLabelColor(
                labelColors[0]
            );

            setIsCreatingLabel(
                false
            );

        } catch (error) {

            console.error(
                "Failed to create label:",
                error
            );
        }
    }


    // =========================================================
    // Render
    // =========================================================

    return createPortal(

        <>
            <div
                ref={pickerRef}
                className="
                    fixed
                    z-200
                    w-60
                    max-w-[calc(100vw-16px)]
                    overflow-visible
                    rounded-lg
                    border
                    border-[#353333]
                    bg-[#242323]
                    p-1.5
                    shadow-xl
                "
                style={{
                    left:
                        `${position.left}px`,

                    top:
                        `${position.top}px`,

                    visibility:
                        position.ready
                            ? "visible"
                            : "hidden"
                }}
            >

                {/* ====================================== */}
                {/* Header */}
                {/* ====================================== */}

                <div
                    className="
                        px-2
                        pb-1.5
                        pt-1
                        text-[10px]
                        text-[#777171]
                    "
                >
                    Board labels
                </div>


                {/* ====================================== */}
                {/* Labels */}
                {/* ====================================== */}

                <div
                    className="
                        max-h-48
                        overflow-y-auto
                        kanban-scrollbar
                    "
                >

                    {labels.length === 0 ? (

                        <div
                            className="
                                px-2
                                py-2
                                text-[11px]
                                text-[#777171]
                            "
                        >
                            No labels yet.
                        </div>

                    ) : (

                        labels.map(label => {

                            const checked =
                                taskLabelIds.some(
                                    id =>
                                        String(id) ===
                                        String(label._id)
                                );


                            return (
                                <LabelPickerRow
                                    key={label._id}
                                    label={label}
                                    checked={checked}
                                    onToggle={() =>
                                        handleToggleLabel(
                                            label._id
                                        )
                                    }
                                    onEdit={() =>
                                        setEditingLabel(
                                            label
                                        )
                                    }
                                />
                            );

                        })
                    )}

                </div>


                {/* ====================================== */}
                {/* Create */}
                {/* ====================================== */}

                <div
                    className="
                        mt-1
                        border-t
                        border-[#353333]
                        pt-1
                    "
                >

                    {!isCreatingLabel ? (

                        <button
                            type="button"
                            onClick={() =>
                                setIsCreatingLabel(
                                    true
                                )
                            }
                            className="
                                flex
                                w-full
                                items-center
                                gap-2
                                rounded-md
                                px-2
                                py-1.5
                                text-left
                                text-[11px]
                                text-[#858080]
                                hover:bg-[#2b2929]
                                hover:text-[#d4cece]
                            "
                        >

                            <span className="text-sm">
                                +
                            </span>

                            Create new label

                        </button>

                    ) : (

                        <form
                            onSubmit={
                                handleCreateLabel
                            }
                            className="
                                space-y-2
                                p-1
                            "
                        >

                            {/* -------------------------------- */}
                            {/* Name */}
                            {/* -------------------------------- */}

                            <input
                                type="text"
                                value={
                                    newLabelName
                                }
                                onChange={
                                    event =>
                                        setNewLabelName(
                                            event.target.value
                                        )
                                }
                                placeholder="Label name"
                                autoFocus
                                className="
                                    w-full
                                    rounded-md
                                    border
                                    border-[#3a3838]
                                    bg-[#191818]
                                    px-2
                                    py-1.5
                                    text-[11px]
                                    text-[#e5e0e0]
                                    outline-none
                                "
                            />


                            {/* -------------------------------- */}
                            {/* Footer */}
                            {/* -------------------------------- */}

                            <div className="
                                relative
                                flex
                                items-center
                                gap-2
                            ">

                                <CreateLabelColorPicker
                                    color={
                                        newLabelColor
                                    }
                                    onChange={
                                        setNewLabelColor
                                    }
                                />


                                <button
                                    type="submit"
                                    className="
                                        rounded-md
                                        bg-[#e8e8e8]
                                        px-2.5
                                        py-1.5
                                        text-[10px]
                                        font-medium
                                        text-[#222]
                                    "
                                >
                                    Create
                                </button>


                                <button
                                    type="button"
                                    onClick={() => {

                                        setIsCreatingLabel(
                                            false
                                        );

                                        setNewLabelName("");

                                        setNewLabelColor(
                                            labelColors[0]
                                        );

                                    }}
                                    className="
                                        px-1.5
                                        py-1
                                        text-[10px]
                                        text-[#777171]
                                    "
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>
                    )}

                </div>

            </div>


            {/* ====================================== */}
            {/* Edit modal */}
            {/* ====================================== */}

            {editingLabel && (

                <EditLabelModal
                    label={editingLabel}
                    onClose={() =>
                        setEditingLabel(
                            null
                        )
                    }
                />

            )}

        </>,

        document.body
    );
}


// =============================================================
// Label picker row
// =============================================================

function LabelPickerRow({
    label,
    checked,
    onToggle,
    onEdit,
}) {

    return (
        <div
            className="
                group
                flex
                w-full
                items-center
                gap-2
                rounded-md
                px-2
                py-1.5
                hover:bg-[#2a2929]
            "
        >

            <button
                type="button"
                onClick={onToggle}
                className="
                    flex
                    min-w-0
                    flex-1
                    items-center
                    gap-2
                    text-left
                "
            >

                {/* Checkbox */}

                <span
                    className={`
                        flex
                        h-4
                        w-4
                        shrink-0
                        items-center
                        justify-center
                        rounded-sm
                        border
                        text-[9px]

                        ${
                            checked
                                ? `
                                    border-[#3b82f6]
                                    bg-[#3b82f6]
                                    text-white
                                `
                                : `
                                    border-[#666161]
                                    bg-transparent
                                `
                        }
                    `}
                >
                    {checked && "✓"}
                </span>


                {/* Color */}

                <span
                    className="
                        h-2.5
                        w-2.5
                        shrink-0
                        rounded-full
                    "
                    style={{
                        backgroundColor:
                            label.color
                    }}
                />


                {/* Name */}

                <span
                    className="
                        min-w-0
                        flex-1
                        truncate
                        text-[11px]
                        text-[#bdb7b7]
                    "
                >
                    {label.name}
                </span>

            </button>


            {/* Edit */}

            <button
                type="button"
                onClick={onEdit}
                className="
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    rounded
                    text-[#666161]
                    opacity-0
                    transition
                    group-hover:opacity-100
                    hover:bg-[#353333]
                    hover:text-[#d4cece]
                "
                aria-label={`Edit ${label.name}`}
            >
                ⋯
            </button>

        </div>
    );
}
import {
    useRef,
    useState
} from "react";

import {
    useTaskPageContext
} from "../../../TaskPageContext";

import PropertyRow from "./PropertyRow";

import LabelPicker from "./labels/LabelPicker";


export default function LabelsProperty() {

    const {
        task,
        labels
    } = useTaskPageContext();


    const [
        isOpen,
        setIsOpen
    ] = useState(false);


    const triggerRef =
        useRef(null);


    if (!task) {
        return null;
    }


    const taskLabelIds =
        task.labels || [];


    const taskLabels =
        labels.filter(label =>
            taskLabelIds.some(
                labelId =>
                    String(labelId) ===
                    String(label._id)
            )
        );


    function togglePicker() {

        setIsOpen(
            previous => !previous
        );
    }


    return (
        <>
            <PropertyRow
                label="Labels"

                icon={
                    <span className="text-[#777171] text-sm">
                        +
                    </span>
                }

                value={
                    <div
                        ref={triggerRef}
                        className="
                            flex
                            min-w-0
                            max-w-full
                            flex-wrap
                            items-center
                            gap-x-1.5
                            gap-y-1.5
                        "
                    >

                        {/* Assigned labels */}

                        {taskLabels.map(label => (

                            <span
                                key={label._id}
                                className="
                                    inline-flex
                                    max-w-32
                                    min-w-0
                                    shrink-0
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    border
                                    border-[#666161]
                                    px-2
                                    py-1
                                    text-[11px]
                                    text-[#d4cece]
                                "
                            >

                                <span
                                    className="
                                        h-2
                                        w-2
                                        shrink-0
                                        rounded-full
                                    "
                                    style={{
                                        backgroundColor:
                                            label.color
                                    }}
                                />

                                <span className="truncate">
                                    {label.name}
                                </span>

                            </span>

                        ))}


                        {/* Add label */}

                        <button
                            type="button"
                            onClick={togglePicker}
                            className="
                                inline-flex
                                shrink-0
                                items-center
                                gap-1.5
                                rounded-full
                                border
                                border-[#666161]
                                px-2.5
                                py-1
                                text-[11px]
                                text-[#aaa4a4]
                                hover:border-[#8b8585]
                                hover:text-[#ddd8d8]
                            "
                        >

                            <span className="text-sm">
                                +
                            </span>

                            <span>
                                Add label
                            </span>

                        </button>

                    </div>
                }

                muted={
                    taskLabels.length === 0
                }
            />


            {isOpen && (

                <LabelPicker
                    labels={labels}
                    taskLabelIds={taskLabelIds}
                    anchorRef={triggerRef}
                    onClose={() =>
                        setIsOpen(false)
                    }
                />

            )}
        </>
    );
}
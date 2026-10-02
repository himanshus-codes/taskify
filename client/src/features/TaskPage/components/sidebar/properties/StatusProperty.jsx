import {
    useRef,
    useState,
    useCallback
} from "react";

import { useTaskPageContext } from "../../../TaskPageContext";

import PropertyRow from "./PropertyRow";

import useClickOutside from "../../../hooks/useClickOutside";


const statusOptions = [
    {
        value: "pending",
        label: "Backlog",
    },
    {
        value: "in-progress",
        label: "In Progress",
    },
    {
        value: "under-review",
        label: "Under Review",
    },
    {
        value: "completed",
        label: "Completed",
    },
];


export default function StatusProperty() {

    const {
        task,
        updateTaskProperty,
    } = useTaskPageContext();


    const [
        isOpen,
        setIsOpen
    ] = useState(false);


    const containerRef =
        useRef(null);


    const closePicker =
        useCallback(() => {

            setIsOpen(false);

        }, []);


    useClickOutside(
        containerRef,
        closePicker,
        isOpen
    );


    if (!task) {
        return null;
    }


    const currentStatus =
        statusOptions.find(
            option =>
                option.value === task.status
        ) || statusOptions[0];


    async function handleStatusChange(
        status
    ) {

        setIsOpen(false);


        if (status === task.status) {
            return;
        }


        try {

            await updateTaskProperty({
                status
            });

        } catch (error) {

            console.error(
                "Failed to update task status:",
                error
            );
        }
    }


    return (
        <PropertyRow
            label="Status"

            icon={
                <span
                    className={`
                        h-3.5
                        w-3.5
                        rounded-full
                        border-2
                        border-dotted
                        ${getStatusColor(
                            currentStatus.value
                        )}
                    `}
                />
            }

            value={

                <div
                    ref={containerRef}
                    className="relative"
                >

                    <button
                        type="button"
                        onClick={() =>
                            setIsOpen(
                                previous =>
                                    !previous
                            )
                        }
                        className="
                            flex
                            w-full
                            items-center
                            justify-between
                            gap-2
                            text-left
                            text-[#e5e0e0]
                            outline-none
                        "
                        aria-expanded={isOpen}
                    >

                        <span>
                            {currentStatus.label}
                        </span>


                        <span className="text-[#666161]">
                            {isOpen
                                ? "⌃"
                                : "⌄"}
                        </span>

                    </button>


                    {isOpen && (

                        <div
                            className="
                                absolute
                                left-0
                                top-7
                                z-50
                                w-44
                                overflow-hidden
                                rounded-md
                                border
                                border-[#302e2e]
                                bg-[#1c1b1b]
                                p-1
                                shadow-xl
                            "
                        >

                            {statusOptions.map(
                                option => {

                                    const isSelected =
                                        option.value ===
                                        task.status;


                                    return (
                                        <button
                                            key={
                                                option.value
                                            }
                                            type="button"
                                            onClick={() =>
                                                handleStatusChange(
                                                    option.value
                                                )
                                            }
                                            className="
                                                flex
                                                w-full
                                                items-center
                                                gap-2
                                                rounded
                                                px-2
                                                py-2
                                                text-left
                                                text-xs
                                                text-[#c7c1c1]
                                                hover:bg-[#292727]
                                            "
                                        >

                                            <span
                                                className={`
                                                    h-3
                                                    w-3
                                                    shrink-0
                                                    rounded-full
                                                    border-2
                                                    border-dotted
                                                    ${getStatusColor(
                                                        option.value
                                                    )}
                                                `}
                                            />


                                            <span className="flex-1">
                                                {option.label}
                                            </span>


                                            {isSelected && (

                                                <span className="text-[#aaa4a4]">
                                                    ✓
                                                </span>

                                            )}

                                        </button>
                                    );
                                }
                            )}

                        </div>

                    )}

                </div>
            }
        />
    );
}


function getStatusColor(status) {

    switch (status) {

        case "completed":
            return "border-[#5fcf8f]";

        case "under-review":
            return "border-[#8d7bea]";

        case "in-progress":
            return "border-[#f2a33a]";

        case "pending":
        default:
            return "border-[#777171]";
    }
}
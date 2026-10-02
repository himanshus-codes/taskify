import {
    useRef,
    useState,
    useCallback
} from "react";

import { useTaskPageContext } from "../../../TaskPageContext";

import PropertyRow from "./PropertyRow";

import useClickOutside from "../../../hooks/useClickOutside";


const priorityOptions = [
    {
        value: "normal",
        label: "Normal",
    },
    {
        value: "low",
        label: "Low",
    },
    {
        value: "medium",
        label: "Medium",
    },
    {
        value: "high",
        label: "High",
    },
];


export default function PriorityProperty() {

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


    const currentPriority =
        priorityOptions.find(
            option =>
                option.value === task.priority
        ) || priorityOptions[0];


    async function handlePriorityChange(
        priority
    ) {

        setIsOpen(false);


        if (priority === task.priority) {
            return;
        }


        try {

            await updateTaskProperty({
                priority
            });

        } catch (error) {

            console.error(
                "Failed to update task priority:",
                error
            );
        }
    }


    return (
        <PropertyRow
            label="Priority"

            icon={
                <PriorityIcon
                    priority={
                        currentPriority.value
                    }
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
                            {currentPriority.label}
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

                            {priorityOptions.map(
                                option => {

                                    const isSelected =
                                        option.value ===
                                        task.priority;


                                    return (
                                        <button
                                            key={
                                                option.value
                                            }
                                            type="button"
                                            onClick={() =>
                                                handlePriorityChange(
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

                                            <PriorityIcon
                                                priority={
                                                    option.value
                                                }
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


function PriorityIcon({
    priority
}) {

    switch (priority) {

        case "high":

            return (
                <span className="text-[11px] text-[#e56b6f]">
                    ↑↑
                </span>
            );


        case "medium":

            return (
                <span className="text-[11px] text-[#d6a84f]">
                    ↑
                </span>
            );


        case "low":

            return (
                <span className="text-[11px] text-[#6f9bd6]">
                    ↓
                </span>
            );


        case "normal":

        default:

            return (
                <span className="tracking-[2px] text-[#777171]">
                    --
                </span>
            );
    }
}
import {
    useState
} from "react";

import {
    labelColors
} from "./labelColors";


export default function CreateLabelColorPicker({
    color,
    onChange,
}) {

    const [
        isOpen,
        setIsOpen
    ] = useState(false);


    function handleColorClick(
        selectedColor
    ) {

        onChange(
            selectedColor
        );

        // Intentionally stays open.
    }


    function handleColorDoubleClick(
        selectedColor
    ) {

        onChange(
            selectedColor
        );

        setIsOpen(false);
    }


    return (
        <div className="relative">

            {/* ====================================== */}
            {/* Selected color trigger */}
            {/* ====================================== */}

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
                    h-7
                    w-9
                    items-center
                    justify-center
                    rounded-md
                    border
                    border-[#444141]
                    bg-[#242323]
                    hover:border-[#666161]
                "
                aria-label="Choose label color"
            >

                <span
                    className="
                        h-3.5
                        w-3.5
                        rounded-full
                    "
                    style={{
                        backgroundColor: color
                    }}
                />

                <span className="
                    ml-1
                    text-[9px]
                    text-[#777171]
                ">
                    ✎
                </span>

            </button>


            {/* ====================================== */}
            {/* Palette */}
            {/* ====================================== */}

            {isOpen && (

                <div
                    className="
                        absolute
                        bottom-full
                        left-0
                        z-250
                        mb-2
                        w-58
                        rounded-lg
                        border
                        border-[#393737]
                        bg-[#242323]
                        p-2.5
                        shadow-xl
                    "
                >

                    {/* -------------------------------- */}
                    {/* Header */}
                    {/* -------------------------------- */}

                    <div
                        className="
                            mb-2
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <span className="
                            text-[10px]
                            text-[#777171]
                        ">
                            Choose color
                        </span>


                        <button
                            type="button"
                            onClick={() =>
                                setIsOpen(false)
                            }
                            className="
                                flex
                                h-5
                                w-5
                                items-center
                                justify-center
                                rounded
                                text-sm
                                text-[#666161]
                                hover:bg-[#333131]
                                hover:text-[#d4cece]
                            "
                            aria-label="Close color picker"
                        >
                            ×
                        </button>

                    </div>


                    {/* -------------------------------- */}
                    {/* Colors */}
                    {/* -------------------------------- */}

                    <div
                        className="
                            grid
                            grid-cols-10
                            gap-1.5
                        "
                    >

                        {labelColors.map(
                            selectedColor => {

                                const isSelected =
                                    selectedColor.toLowerCase() ===
                                    color.toLowerCase();


                                return (
                                    <button
                                        key={
                                            selectedColor
                                        }
                                        type="button"
                                        onClick={() =>
                                            handleColorClick(
                                                selectedColor
                                            )
                                        }
                                        onDoubleClick={() =>
                                            handleColorDoubleClick(
                                                selectedColor
                                            )
                                        }
                                        className="
                                            flex
                                            h-6
                                            w-6
                                            items-center
                                            justify-center
                                            rounded-full
                                            hover:bg-[#333131]
                                        "
                                        aria-label={
                                            `Select color ${selectedColor}`
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
                                                    selectedColor
                                            }}
                                        >

                                            {isSelected && (

                                                <span className="
                                                    text-[7px]
                                                    font-bold
                                                    text-white
                                                ">
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
    );
}
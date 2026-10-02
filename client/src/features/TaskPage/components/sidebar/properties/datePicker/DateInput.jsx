import {
    createPortal
} from "react-dom";

import {
    useEffect,
    useRef,
    useState
} from "react";

import DatePicker from "./DatePicker";

import {
    formatDisplayDate
} from "./dateUtils";


export default function DateInput({
    value,
    placeholder,
    onChange,
}) {

    const [
        isOpen,
        setIsOpen
    ] = useState(false);


    const [
        pickerPosition,
        setPickerPosition
    ] = useState(null);


    const triggerRef =
        useRef(null);


    function updatePickerPosition() {

        if (!triggerRef.current) {
            return;
        }


        const rect =
            triggerRef.current.getBoundingClientRect();


        const pickerWidth = 260;

        const pickerHeight = 370;

        const gap = 6;

        let left = rect.right - pickerWidth;

        let top = rect.bottom + gap;


        // Keep picker inside horizontal viewport.
        left = Math.max(
            8,
            Math.min(
                left,
                window.innerWidth -
                    pickerWidth -
                    8
            )
        );


        // Open above when there isn't enough
        // room below.
        if (
            top + pickerHeight >
            window.innerHeight - 8
        ) {

            top =
                rect.top -
                pickerHeight -
                gap;
        }


        top = Math.max(
            8,
            top
        );


        setPickerPosition({
            left,
            top
        });
    }


    function openPicker() {

        updatePickerPosition();

        setIsOpen(true);
    }


    function closePicker() {

        setIsOpen(false);
    }


    useEffect(() => {

        if (!isOpen) {
            return;
        }


        function handleOutsideClick(event) {

            if (
                triggerRef.current &&
                triggerRef.current.contains(
                    event.target
                )
            ) {
                return;
            }


            setIsOpen(false);
        }


        function handleEscape(event) {

            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }


        function handleViewportChange() {

            updatePickerPosition();
        }


        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );


        document.addEventListener(
            "keydown",
            handleEscape
        );


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

            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );


            document.removeEventListener(
                "keydown",
                handleEscape
            );


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

    }, [isOpen]);


    const displayValue =
        formatDisplayDate(value);


    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                onClick={() => {

                    if (isOpen) {
                        closePicker();
                    } else {
                        openPicker();
                    }

                }}
                className="
                    flex
                    items-center
                    gap-1.5
                    text-left
                    outline-none
                "
            >

                <span className="text-[#777171]">
                    ▣
                </span>

                <span
                    className={`
                        whitespace-nowrap
                        ${
                            displayValue
                                ? "text-[#aaa4a4]"
                                : "text-[#777171]"
                        }
                    `}
                >
                    {
                        displayValue ||
                        placeholder
                    }
                </span>

            </button>


            {isOpen &&
                pickerPosition &&
                createPortal(

                    <DatePicker
                        value={value}
                        position={pickerPosition}
                        onApply={async date => {

                            await onChange(date);

                            setIsOpen(false);
                        }}
                        onCancel={() =>
                            setIsOpen(false)
                        }
                    />,

                    document.body
                )
            }

        </>
    );
}
import {
    useState
} from "react";

import Calendar from "./Calendar.jsx";
import QuickActions from "./QuickActions.jsx";

import {
    addDays,
    formatForApi,
    getCalendarDays,
    parseDateValue,
    startOfDay,
    formatMonthYear,
} from "./dateUtils";


export default function DatePicker({
    value,
    position,
    onApply,
    onCancel,
}) {

    const initialDate =
        parseDateValue(value) ||
        new Date();


    const [
        viewedMonth,
        setViewedMonth
    ] = useState(
        new Date(
            initialDate.getFullYear(),
            initialDate.getMonth(),
            1
        )
    );


    const [
        draftDate,
        setDraftDate
    ] = useState(
        parseDateValue(value)
    );


    const calendarDays =
        getCalendarDays(viewedMonth);


    function goToPreviousMonth() {

        setViewedMonth(
            previous =>
                new Date(
                    previous.getFullYear(),
                    previous.getMonth() - 1,
                    1
                )
        );
    }


    function goToNextMonth() {

        setViewedMonth(
            previous =>
                new Date(
                    previous.getFullYear(),
                    previous.getMonth() + 1,
                    1
                )
        );
    }


    function handleDateSelect(date) {

        setDraftDate(date);
    }


    async function handleDateDoubleClick(date) {

        await onApply(
            formatForApi(date)
        );
    }


    async function handleToday() {

        const date =
            startOfDay(new Date());


        await onApply(
            formatForApi(date)
        );
    }


    async function handleTomorrow() {

        const date =
            addDays(
                startOfDay(new Date()),
                1
            );


        await onApply(
            formatForApi(date)
        );
    }


    async function handleOneWeek() {

        const date =
            addDays(
                startOfDay(new Date()),
                7
            );


        await onApply(
            formatForApi(date)
        );
    }


    async function handleClear() {

        await onApply(null);
    }


    return (
        <div
            onMouseDown={event =>
                event.stopPropagation()
            }
            className="
                fixed
                z-100
                w-65
                rounded-lg
                border
                border-[#2d2d2d]
                bg-[#1c1c1c]
                p-2.5
                text-[#aaa4a4]
                shadow-2xl
            "
            style={{
                left: `${position.left}px`,
                top: `${position.top}px`
            }}
        >

            {/* Header */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                    px-0.5
                    pb-2
                "
            >

                <button
                    type="button"
                    onClick={goToPreviousMonth}
                    className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded
                        text-lg
                        text-[#777171]
                        hover:bg-[#272626]
                        hover:text-[#ddd8d8]
                    "
                >
                    ‹
                </button>


                <div
                    className="
                        text-sm
                        font-semibold
                        text-[#dedada]
                    "
                >
                    {formatMonthYear(
                        viewedMonth
                    )}
                </div>


                <button
                    type="button"
                    onClick={goToNextMonth}
                    className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded
                        text-lg
                        text-[#777171]
                        hover:bg-[#272626]
                        hover:text-[#ddd8d8]
                    "
                >
                    ›
                </button>

            </div>


            <Calendar
                viewedMonth={viewedMonth}
                calendarDays={calendarDays}
                selectedDate={draftDate}
                onSelectDate={
                    handleDateSelect
                }
                onDoubleClickDate={
                    handleDateDoubleClick
                }
            />


            <QuickActions
                onToday={handleToday}
                onTomorrow={handleTomorrow}
                onOneWeek={handleOneWeek}
                onClear={handleClear}
                onCancel={onCancel}
            />

        </div>
    );
}
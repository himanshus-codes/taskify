import {
    isSameDay
} from "./dateUtils.js";


export default function Calendar({
    viewedMonth,
    calendarDays,
    selectedDate,
    onSelectDate,
    onDoubleClickDate,
}) {

    return (
        <>
            {/* Weekdays */}

            <div
                className="
                    grid
                    grid-cols-7
                    px-0.5
                "
            >

                {[
                    "Mo",
                    "Tu",
                    "We",
                    "Th",
                    "Fr",
                    "Sa",
                    "Su"
                ].map(day => (

                    <div
                        key={day}
                        className="
                            flex
                            h-6
                            items-center
                            justify-center
                            text-[10px]
                            text-[#777171]
                        "
                    >
                        {day}
                    </div>

                ))}

            </div>


            {/* Days */}

            <div
                className="
                    grid
                    grid-cols-7
                    gap-y-0.5
                "
            >

                {calendarDays.map(
                    (date, index) => {

                        const isCurrentMonth =
                            date.getMonth() ===
                            viewedMonth.getMonth();


                        const isSelected =
                            selectedDate &&
                            isSameDay(
                                date,
                                selectedDate
                            );


                        const isToday =
                            isSameDay(
                                date,
                                new Date()
                            );


                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() =>
                                    onSelectDate(date)
                                }
                                onDoubleClick={() =>
                                    onDoubleClickDate(
                                        date
                                    )
                                }
                                className={`
                                    flex
                                    h-7
                                    items-center
                                    justify-center
                                    rounded-md
                                    text-xs
                                    transition

                                    ${
                                        isSelected
                                            ? `
                                                bg-[#e8e8e8]
                                                text-[#222]
                                              `
                                            : isToday
                                                ? `
                                                    border
                                                    border-[#555]
                                                    text-[#ddd8d8]
                                                  `
                                                : `
                                                    text-[#aaa4a4]
                                                    hover:bg-[#282727]
                                                    hover:text-[#eee]
                                                  `
                                    }

                                    ${
                                        !isCurrentMonth &&
                                        !isSelected
                                            ? "text-[#444]"
                                            : ""
                                    }
                                `}
                            >
                                {date.getDate()}
                            </button>
                        );
                    }
                )}

            </div>
        </>
    );
}
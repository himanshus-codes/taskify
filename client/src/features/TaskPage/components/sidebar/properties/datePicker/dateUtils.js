export function getCalendarDays(month) {

    const year =
        month.getFullYear();

    const monthIndex =
        month.getMonth();


    const firstDay =
        new Date(
            year,
            monthIndex,
            1
        );


    // Monday = 0 ... Sunday = 6
    const firstWeekday =
        (firstDay.getDay() + 6) % 7;


    const startDate =
        new Date(
            year,
            monthIndex,
            1 - firstWeekday
        );


    return Array.from(
        { length: 42 },
        (_, index) =>
            new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate() + index
            )
    );
}


export function addDays(
    date,
    amount
) {

    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + amount
    );
}


export function startOfDay(date) {

    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
}


export function isSameDay(
    first,
    second
) {

    return (
        first &&
        second &&
        first.getFullYear() ===
            second.getFullYear() &&
        first.getMonth() ===
            second.getMonth() &&
        first.getDate() ===
            second.getDate()
    );
}


export function parseDateValue(value) {

    if (!value) {
        return null;
    }


    const dateString =
        String(value).slice(0, 10);


    const [
        year,
        month,
        day
    ] = dateString
        .split("-")
        .map(Number);


    if (
        !year ||
        !month ||
        !day
    ) {
        return null;
    }


    return new Date(
        year,
        month - 1,
        day
    );
}


export function formatForApi(date) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;
}


export function formatDisplayDate(value) {

    const date =
        parseDateValue(value);


    if (!date) {
        return "";
    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


export function formatMonthYear(date) {

    return date.toLocaleDateString(
        "en-IN",
        {
            month: "long",
            year: "numeric"
        }
    );
}
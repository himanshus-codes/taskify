export default function QuickActions({
    onToday,
    onTomorrow,
    onOneWeek,
    onClear,
    onCancel,
}) {

    return (
        <>
            <div
                className="
                    mt-2
                    flex
                    items-center
                    gap-1.5
                    border-t
                    border-[#2d2d2d]
                    pt-2
                "
            >

                <QuickAction
                    label="Today"
                    onClick={onToday}
                />

                <QuickAction
                    label="Tomorrow"
                    onClick={onTomorrow}
                />

                <QuickAction
                    label="1 week"
                    onClick={onOneWeek}
                />

            </div>


            <div
                className="
                    mt-2
                    flex
                    items-center
                    justify-between
                    border-t
                    border-[#2d2d2d]
                    pt-2
                "
            >

                <button
                    type="button"
                    onClick={onClear}
                    className="
                        text-[11px]
                        text-[#777171]
                        hover:text-[#c7c1c1]
                    "
                >
                    Clear
                </button>


                <button
                    type="button"
                    onClick={onCancel}
                    className="
                        rounded-md
                        px-2
                        py-1
                        text-[11px]
                        text-[#777171]
                        hover:bg-[#282727]
                        hover:text-[#c7c1c1]
                    "
                >
                    Cancel
                </button>

            </div>
        </>
    );
}


function QuickAction({
    label,
    onClick,
}) {

    return (
        <button
            type="button"
            onClick={onClick}
            className="
                rounded-md
                bg-[#252424]
                px-2
                py-1
                text-[10px]
                text-[#999393]
                hover:bg-[#2d2c2c]
                hover:text-[#ddd8d8]
            "
        >
            {label}
        </button>
    );
}
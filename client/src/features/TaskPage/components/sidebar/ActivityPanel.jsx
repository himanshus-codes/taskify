const activities = [
    {
        id: 1,
        text: "You created this task.",
        time: "Just now",
    },
    {
        id: 2,
        text: "Status changed to In Progress.",
        time: "2h ago",
    },
    {
        id: 3,
        text: "Priority changed to High.",
        time: "Yesterday",
    },
];

export default function ActivityPanel() {

    return (
        <div className="space-y-5 px-5 pl-7">

            <div>
                <h2 className="text-sm font-medium text-[#ddd8d8]">
                    Activity
                </h2>

                <p className="mt-1 text-xs text-[#6f6a6a]">
                    Recent changes to this task.
                </p>
            </div>


            <div className="relative">

                {/* timeline line */}
                <div
                    className="
                        absolute
                        bottom-0
                        left-1.25
                        top-2
                        w-px
                        bg-[#2b2929]
                    "
                />


                <div className="space-y-5">

                    {activities.map(activity => (

                        <div
                            key={activity.id}
                            className="
                                relative
                                pl-5
                            "
                        >

                            <div
                                className="
                                    absolute
                                    left-0
                                    top-1.5
                                    h-2.5
                                    w-2.5
                                    rounded-full
                                    border
                                    border-[#464141]
                                    bg-[#202020]
                                "
                            />

                            <div
                                className="
                                    text-xs
                                    leading-5
                                    text-[#aaa4a4]
                                "
                            >
                                {activity.text}
                            </div>

                            <div
                                className="
                                    mt-1
                                    text-[10px]
                                    text-[#605b5b]
                                "
                            >
                                {activity.time}
                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}
import { useTaskPageContext } from "../../TaskPageContext";

export default function PropertiesPanel() {
    const { task } = useTaskPageContext();

    return (
        <div className="px-4 pl-7 text-xs">

            <div className="mb-4">
                <h2 className="text-sm font-medium text-[#ddd8d8]">
                    Properties
                </h2>

                <p className="mt-1 text-xs text-[#6f6a6a]">
                    Task information and metadata.
                </p>
            </div>

            <PropertyRow
                label="Status"
                icon={
                    <span
                        className="
                            h-3.5
                            w-3.5
                            rounded-full
                            border-2
                            border-dotted
                            border-[#f2a33a]
                        "
                    />
                }
                value={task.status || "Backlog"}
            />

            <PropertyRow
                label="Priority"
                icon={
                    <span className="tracking-[2px] text-[#777171]">
                        --
                    </span>
                }
                value={task.priority || "No priority"}
            />

            <PropertyRow
                label="Labels"
                icon={
                    <span className="text-[#777171] text-sm">
                        +
                    </span>
                }
                value="Add label"
                muted
            />
            <PropertyRow
                label="List"
                icon={
                    <span className="text-[#777171] text-sm">
                        ^
                    </span>
                }
                value="Change List"
                muted
            />

            <PropertyRow
                label="Dates"
                icon={
                    <span className="text-[#777171] text-sm">
                        ▣
                    </span>
                }
                value={
                    <div className="flex items-center gap-4">

                        <PropertyValue
                            icon="▣"
                            text="Start"
                        />

                        <span className="text-[#777171]">
                            →
                        </span>

                        <PropertyValue
                            icon="▣"
                            text="Target"
                        />

                    </div>
                }
                muted
            />





            <PropertyRow
                label="Assignee"
                icon={
                    <span className="text-[#777171] text-sm">
                        ◌
                    </span>
                }
                value="Add Assignee"
                muted
            />

            <PropertyRow
                label="Members"
                icon={
                    <span className="text-[#777171] text-sm">
                        ♧
                    </span>
                }
                value="Add members"
                muted
            />

            {/* <PropertyRow
                label="Teams"
                icon={
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#159447] text-[8px] text-black">
                        ↗
                    </span>
                }
                value="Learning linear"
            />

            <PropertyRow
                label="Slack"
                icon={
                    <span className="text-[#8b8585] text-sm">
                        ✣
                    </span>
                }
                value="Slack channel"
                muted
            /> */}

        </div>
    );
}


function PropertyRow({
    label,
    icon,
    value,
    muted = false,
}) {
    return (
        <div
            className="
                grid
                grid-cols-[104px_minmax(0,1fr)]
                items-center
                min-h-11
                gap-2
            "
        >

            {/* Label */}
            <div className="text-[#9c9696]">
                {label}
            </div>


            {/* Value */}
            <div
                className={`
                    flex
                    min-w-0
                    items-center
                    gap-3
                    ${
                        muted
                            ? "text-[#777171]"
                            : "text-[#e5e0e0]"
                    }
                `}
            >

                <span className="flex w-4 shrink-0 items-center justify-center">
                    {icon}
                </span>

                <div className="min-w-0 truncate">
                    {value}
                </div>

            </div>

        </div>
    );
}


function PropertyValue({
    icon,
    text,
}) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-[#777171]">
                {icon}
            </span>

            <span className="text-[#aaa4a4]">
                {text}
            </span>
        </div>
    );
}





// import { useTaskPageContext } from "../../TaskPageContext";

// export default function PropertiesPanel() {

//     const { task } = useTaskPageContext();

//     return (
//         <div className="space-y-5 px-5">

//             <div>
//                 <h2 className="text-sm font-medium text-[#ddd8d8]">
//                     Properties
//                 </h2>

//                 <p className="mt-1 text-xs text-[#6f6a6a]">
//                     Task information and metadata.
//                 </p>
//             </div>


//             <Property
//                 label="Status"
//                 value={task.status}
//             />

//             <Property
//                 label="Priority"
//                 value={task.priority}
//             />

//             <Property
//                 label="Assignee"
//                 value={task.assignee}
//             />

//             <Property
//                 label="Due date"
//                 value={task.dueDate}
//             />


//             <Property
//                 label="Task ID"
//                 value={task._id}
//             />

//         </div>
//     );
// }


// function Property({ label, value }) {

//     return (
//         <div className="space-y-1.5">

//             <div
//                 className="
//                     text-[10px]
//                     font-medium
//                     uppercase
//                     tracking-wider
//                     text-[#666161]
//                 "
//             >
//                 {label}
//             </div>

//             <div
//                 className="
//                     rounded-md
//                     border
//                     border-[#292727]
//                     bg-[#1d1c1c]
//                     px-3
//                     py-2
//                     text-xs
//                     text-[#bbb5b5]
//                 "
//             >
//                 {value}
//             </div>

//         </div>
//     );
// }
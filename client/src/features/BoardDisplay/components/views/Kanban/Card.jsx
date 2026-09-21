export default function Card({ task, onPointerDown, onPointerMove,  onPointerUp }) {

    return (
        <div
            draggable
            onPointerDown={(e) => onPointerDown(e, task)}
            // onPointerMove={onPointerMove}
            // onPointerUp={ onPointerUp}
            data-task-id={task._id}
            className="
                bg-[#242323]
                rounded-md
                min-h-fit
                flex
                flex-col
                p-2
                text-sm
                gap-1
                hover:bg-[#2a2929]
                hover:shadow-2xl
                hover:shadow-[#1a1919]
                cursor-pointer
            "
        >

            {/* Top row */}
            <div className="flex">

                <div className="grow">
                    {task.title}
                </div>

                <div className="flex gap-2 items-center">

                    {/* Label placeholder */}
                    <div className="text-xs">
                        #Label
                    </div>

                    {/* Delete */}
                    <div
                        className="
                            hover:bg-[#222121]
                            rounded-sm
                            p-0.5
                            cursor-pointer
                        "
                    >
                        <svg width="14px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#e3e3e3">
                            <path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#e3e3e3" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#e3e3e3" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>

                    </div>

                    {/* Edit */}
                    <div
                        className="
                            hover:bg-[#222121]
                            rounded-sm
                            p-0.5
                            cursor-pointer
                        "
                    >
                        {/* <svg width="15px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ebebeb"><path d="M22 5V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5Z" stroke="#ebebeb" stroke-width="1.2"></path><path d="M2 12H6" stroke="#ebebeb" stroke-width="1.2"></path><path d="M6 3V21" stroke="#ebebeb" stroke-width="1.2"></path><path d="M15.5 11.5L12 14.5" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 10.01L17.01 9.99889" stroke="#ebebeb" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>

                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg> */}
                    </div>

                </div>

            </div>


            {/* Description */}
            <div className="text-sm text-white/60">
                {task.description}
            </div>


            {/* Bottom row */}
            <div className="flex mt-1">

                <div className="grow">
                    {/* future metadata */}
                </div>

                <div className="flex gap-3 text-xs">

                    <div>
                        Due-Date
                    </div>

                    <div>
                        {task.priority}
                    </div>

                    {/* <div>
                        (Checklist)
                        (task creator)
                        (task assignee/task to be done by X profile icon)
                        (Comment)
                    </div> */}

                </div>

            </div>

        </div>
    );
}
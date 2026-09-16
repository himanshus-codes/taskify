import Card from "./Card";

export default function Column({ column, tasks }) {

    // const tasks = column.tasks ?? [];

    console.log(tasks)
    console.log(column)

    const taskArray = tasks.filter((task) => {
        console.log(task.columnId == column._id)
        
        if(task.columnId == column._id){
            return task
        }
    })

    console.log(taskArray)

    return (
        <div
            className="
                flex
                flex-col
                bg-[#1c1b1b]
                rounded-md
                border-[0.1px]
                border-[#2f2d2d]
                p-2
                pt-3
                
                min-h-20
                shadow-[#161414]
                shadow-xl
            "
        >

            {/* Column header */}
            <div className="flex mx-2 mb-5 ">

                <div className="flex grow  items-center  text-sm font-medium gap-2">
                    <div>
                        {column.title}
                    </div>
                    <div className="text-sm  text-gray-500 ">
                        <span>
                            ({taskArray?.length})
                        </span>
                    </div>
                </div>
                

                <div className="flex items-center gap-1">

                    {/* Add task */}
                    <div
                        className="
                            hover:bg-[#222121]
                            rounded-sm
                            p-0.5
                            cursor-pointer
                        "
                    >
                        <svg width="16px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff">
                            <path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>

                    </div>

                    {/* More */}
                    <div
                        className="
                            hover:bg-[#222121]
                            rounded-sm
                            p-0.5
                            cursor-pointer
                        "
                    >

                        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff">
                            <path d="M20 12.5C20.2761 12.5 20.5 12.2761 20.5 12C20.5 11.7239 20.2761 11.5 20 11.5C19.7239 11.5 19.5 11.7239 19.5 12C19.5 12.2761 19.7239 12.5 20 12.5Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.7239 12.5 12 12.5Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M4 12.5C4.27614 12.5 4.5 12.2761 4.5 12C4.5 11.7239 4.27614 11.5 4 11.5C3.72386 11.5 3.5 11.7239 3.5 12C3.5 12.2761 3.72386 12.5 4 12.5Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>

                    </div>

                </div>

            </div>


            {/* Tasks */}
            <div
                className="
                    flex
                    flex-col
                    pr-1
                    overflow-y-auto
                    gap-2.5
                    rounded-md
                    kanban-scrollbar-col
                    text-white/70
                "
            >

                {tasks.map((task) => {
                    if(task.columnId == column._id){
                        return (<Card
                            key={task._id}
                            task={task}
                        />)
                    }
                })}

            </div>

        </div>
    );
}
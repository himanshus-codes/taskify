import Card from "./Card";
import QuickAddTask from "./components/QuickAddTask";
import { useState, useEffect, useRef } from "react";


export default function Column({ column, tasks, onAddTask }) {

    // const tasks = column.tasks ?? [];

    console.log(tasks)
    console.log(column)

   const taskArray = tasks.filter(
        task => task.columnId === column._id
    );
    console.log(taskArray)


    const [isAdding, setIsAdding] = useState(false);
    
    const kanbanScrollRef = useRef(null);
    const previousTaskCount = useRef(taskArray.length);
    const isInitialRender = useRef(true);

    useEffect(() => {

        // Don't scroll when the column initially loads its tasks
        if (isInitialRender.current) {
            isInitialRender.current = false;
            previousTaskCount.current = taskArray.length;
            return;
        }

        // Only scroll when a task was added
        if (taskArray.length <= previousTaskCount.current) {
            previousTaskCount.current = taskArray.length;
            return;
        }

        const container = kanbanScrollRef.current;

        if (!container) {
            previousTaskCount.current = taskArray.length;
            return;
        }

        requestAnimationFrame(() => {

            container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth"
            });

        });

        previousTaskCount.current = taskArray.length;

    }, [taskArray.length]);


    useEffect(()=>{
        if(isAdding){
            
            requestAnimationFrame(() => {

                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: "smooth"
                });

            });
        } 
    },[isAdding])
    

    return (
        <div
            data-kanban-column
            className="
                flex
                flex-col
                min-h-0
                h-fit
                max-h-full
                bg-[#1c1b1b]
                rounded-md
                border-[0.1px]
                border-[#2f2d2d]
                p-2
                pt-3
                gap-2
                shadow-[#161414]
                shadow-xl
            "
        >

            {/* Column header */}
            <div className="flex mx-2 mb-1 ">

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
                    <button
                        onClick={() => onAddTask(column._id, column.title)}
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

                    </button>

                    {/* More */}
                    <button
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

                    </button>

                </div>

            </div>


            {/* Tasks */}
            <div
                ref={kanbanScrollRef}
                className="
                    flex
                    flex-col
                    pr-1
                    flex-1
                    min-h-0
                    overflow-y-auto
                    gap-2.5
                    rounded-md
                    kanban-scrollbar-col
                    text-white/70
                "
            >

                {taskArray.map(task => (
                    <Card
                        key={task._id}
                        task={task}
                    />
                ))}
                
                {
                    isAdding && <QuickAddTask
                        columnId={column._id} isAdding={isAdding} setIsAdding={setIsAdding}
                    />
                }


            </div>

            {/* { taskArray.length == 0 &&
                <div className="text-xs border-dotted border p-2 flex flex-col justify-center items-center">
                    <div>Drag & Drop Cards</div>
                    <div>Or</div>
                </div>
            } */}

            {
                !isAdding && <QuickAddTask
                    columnId={column._id} isAdding={isAdding} setIsAdding={setIsAdding}
                />
            }

        </div>
    );
}
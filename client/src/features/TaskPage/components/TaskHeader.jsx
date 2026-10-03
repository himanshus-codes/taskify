import { useParams, Link } from "react-router-dom";
import { useTaskPageContext } from "../TaskPageContext";
import { useEffect } from "react";

export default function TaskHeader() {

    const { boardId } = useParams();
    console.log(boardId)
    const {
        isTaskLoading,
        task,
        isSidebarOpen,
        toggleSidebar,
    } = useTaskPageContext();
    
    console.log(task)
    // useEffect(()=>{
    //     if(isTaskLoading){
    //         return
    //     }
    // }, [isTaskLoading])
    return (
        <header
            className="
                mr-10
                ml-10
                shrink-0
          
                px-4
                py-3
            "
        >
   

            {/* Top row */}
            <div
                className="
                    
                    flex
                    items-center
                    justify-between
                "
            >

                <div className="flex items-center gap-2 text-xs text-[#777373]">

                    <Link
                        to={`/workspaces/current/boards/${boardId}`}
                        className="hover:text-[#bdb7b7]"
                    >
                        Board
                    </Link>

                    <span>/</span>

                    <span className="text-[#aaa4a4]">
                        {task.title}
                    </span>

                </div>

                <div className="flex items-center gap-2">
                    
                    <button
                        type="button"
                        onClick={toggleSidebar}
                        className="
                            rounded-md
                            text-sm
                            text-[#aaa5a5]
                            hover:bg-[#242323]
                            hover:text-white
                        "
                        title={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
                    >
                        {/* {isSidebarOpen ? ">" : "<"} */}
                        {isSidebarOpen ? 
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M17 13C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11C16.4477 11 16 11.4477 16 12C16 12.5523 16.4477 13 17 13Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 17H7C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7H17C19.7614 7 22 9.23858 22 12C22 14.7614 19.7614 17 17 17Z" stroke="#ffffff" stroke-width="1"></path></svg>
                         : <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M7 13C7.55228 13 8 12.5523 8 12C8 11.4477 7.55228 11 7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13Z" fill="#ffffff" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 17H7C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7H17C19.7614 7 22 9.23858 22 12C22 14.7614 19.7614 17 17 17Z" stroke="#ffffff" stroke-width="1"></path></svg>
                         }
                    </button>
                </div>

            </div>

        </header>
    );
}
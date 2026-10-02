import TaskHeader from "./components/TaskHeader";
import TaskMainContent from "./components/TaskMainContent";
// import TaskSidebar from "./components/sidebar/oldSidebar/TaskSidebar";
import { useTaskPageContext } from "./TaskPageContext";
import TaskSidebar2 from "./components/sidebar/oldSidebar/TaskSidebar2";
import TaskSidebar from "./components/TaskSidebar";

//  border-[#2a2929]

export default function TaskPageLayout() {

    const {
        isTaskLoading,
        task,
        isSidebarOpen,
        toggleSidebar
    } = useTaskPageContext();


    if (isTaskLoading || !task) {
        return (
            <div className="flex h-full w-full items-center justify-center text-sm text-[#777171]">
                Loading task...
            </div>
        );
    }

    return (
        <div
            className="
                flex
                flex-1
                min-w-0
                min-h-0
                flex-col
                overflow-hidden
                rounded-lg
                border-[0.1px]
                border-[#242323]
                bg-[#181717]
                text-[#d2cbcb]
            "
        >

            {/* Header */}
            <TaskHeader />
            <hr className="
                m-0
                p-0
                mr-10
                ml-10
                shrink-0
                border-[#1e1d1d]
              
                pb-3"/>

            {/* Body */}
            <div
                className="
                    flex
                    min-h-0
                    min-w-0
                    flex-1
                    overflow-hidden
                "
            >

                {/* Main */}
                <main
                    className="
                        min-h-0
                        min-w-0
                        flex-1
                        overflow-y-auto
                        kanban-scrollbar
                        relative
                    "
                >   
                    <button 
                        onClick={()=>{toggleSidebar()}}
                        className="
                            absolute
                            top-0
                            right-0
                            pr-1
                            rounded-md
                            hover:bg-[#2f2f2f]
                        "
                    >
                        {isSidebarOpen ? 
                            <svg width="16px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M13 6L19 12L13 18" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 6L11 12L5 18" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            :
                            <svg width="16px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M11 6L5 12L11 18" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19 6L13 12L19 18" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        }
                    </button>
                    <TaskMainContent />
                </main>


                {/* Sidebar */}
                {isSidebarOpen && (
                    <aside
                        className="
                            flex
                            w-94
                            shrink-0
                            min-h-0
                            flex-col
                            overflow-y-auto
                            border-l-[0.1px]
                            border-[#222020]
                            kanban-scrollbar
                        "
                    >
                        <TaskSidebar/>
                        {/* <TaskSidebar2/> */}
                        {/* <TaskSidebar /> */}
                    </aside>
                )}

            </div>
        </div>
    );
}
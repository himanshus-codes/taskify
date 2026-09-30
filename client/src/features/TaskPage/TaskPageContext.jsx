import React from "react";
import {useState, useEffect, createContext ,useContext} from "react"
import { useParams } from "react-router-dom";

const TaskPageContext = createContext()

const mockTask = {
    _id: "task-1",
    title: "Build Task Detail Page",
    summary:
        "Create a dedicated task page with a document-style content area and collapsible sidebar.",
    status: "In Progress",
    priority: "High",
    assignee: "Himanshu",
    dueDate: "Oct 5, 2026",
};


export function TaskPageProvider({children}){

    const { taskId } = useParams();
    const [task] = useState(mockTask);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const [activeSidebarTab, setActiveSidebarTab] = useState("properties"); // "checklist" "resources" "activity"


    function toggleSidebar() {
        setIsSidebarOpen(prev => !prev);
    }


    // const [openSections, setOpenSections] = useState({
    //     properties: true,
    //     activity: false,
    //     checklists: false,
    //     resources: false,
    // });


    return <TaskPageContext.Provider 
            value={{
                task,
                isSidebarOpen,
                toggleSidebar,

                activeSidebarTab,
                setActiveSidebarTab,
            }}>
            {children}
    </TaskPageContext.Provider>
}

export function useTaskPageContext() {
    const context = useContext(TaskPageContext);

    if (!context) {
        throw new Error(
            "useTaskDetailContext must be used inside TaskPageProvider"
        );
    }

    return context;
}
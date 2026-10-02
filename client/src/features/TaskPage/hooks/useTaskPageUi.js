import {
    useState
} from "react";


export function useTaskPageUi() {

    // -----------------------------------------
    // Sidebar state
    // -----------------------------------------

    const [
        isSidebarOpen,
        setIsSidebarOpen
    ] = useState(true);

    const [
        activeSidebarTab,
        setActiveSidebarTab
    ] = useState("checklist"); // properties


    function toggleSidebar() {

        setIsSidebarOpen(
            previous => !previous
        );
    }


    return {
        isSidebarOpen,
        toggleSidebar,
        activeSidebarTab,
        setActiveSidebarTab
    };
}
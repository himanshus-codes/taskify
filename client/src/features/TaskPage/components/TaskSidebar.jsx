import SidebarTabNav from "./sidebar/SidebarTabNav";
import PropertiesPanel from "./sidebar/PropertiesPanel";
import ChecklistPanel from "./sidebar/checklistPanel/ChecklistPanel";
import ResourcesPanel from "./sidebar/ResoucesPanel";
import ActivityPanel from "./sidebar/ActivityPanel";

import { useTaskPageContext } from "../TaskPageContext";

export default function TaskSidebar3() {

    const {
        activeSidebarTab,
    } = useTaskPageContext();

    function renderActivePanel() {

        switch (activeSidebarTab) {

            case "properties":
                return <PropertiesPanel />;

            case "checklist":
                return <ChecklistPanel />;

            case "resources":
                return <ResourcesPanel />;

            case "activity":
                return <ActivityPanel />;

            default:
                return <PropertiesPanel />;
        }
    }

    return (
        <aside
            className="
                flex
                min-h-0
                flex-1
                flex-col
            "
        >

            {/* Tabs */}
            <div className="shrink-0 pb-2">
                <SidebarTabNav />
            </div>


            {/* Active panel */}
            <div
                className="
                    min-h-0
                    flex-1
                    pb-5
                    pt-5
                    overflow-y-auto
                    kanban-scrollbar
                    
                "
            >
                {renderActivePanel()}
            </div>

        </aside>
    );
}
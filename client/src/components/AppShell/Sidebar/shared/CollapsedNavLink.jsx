
import { NavLink } from "react-router-dom"
import { useAppData } from "../../../../hooks/useAppData"
import SidebarTooltip from "./SidebarTooltip";

export default function CollapsedNavLink ({page, children}){

    const {currentWorkspaceId} = useAppData();
      const labels = {
        boards: "Boards",
        templates: "Templates",
        stats: "Stats",
        settings: "Settings",
    };

    return <div className="relative group">
        <NavLink
            to={`/workspaces/${currentWorkspaceId}/${page}`} aria-label={labels[page]}
            className={({ isActive }) => ` flex items-center justify-center  py-2 px-2.5 rounded-md
                ${isActive ? "bg-[#292828]": "hover:bg-[#292828]"} `
            }
        >
                
            {children}
        
        </NavLink>

        <div className="hidden group-hover:block">
            <SidebarTooltip>
                {labels[page]}
            </SidebarTooltip>
        </div>
    </div>
}
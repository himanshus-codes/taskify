
import { NavLink } from "react-router-dom"
import { useAppData } from "../../../../hooks/useAppData"

export default function CollapsedNavLink ({page, children}){

    const {currentWorkspaceId} = useAppData()

    return <>
      <NavLink
                    to={`/workspaces/${currentWorkspaceId}/${page}`}
                    className={({ isActive }) =>
                        `
                        flex items-center justify-center
                        py-2 px-2.5
                        rounded-md
                        ${isActive
                            ? "bg-[#292828]"
                            : "hover:bg-[#292828]"
                        }
                        `
                    }
                >
                        
                        {children}
                        
                
                </NavLink>
    </>
}
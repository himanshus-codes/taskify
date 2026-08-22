
import { NavLink } from "react-router-dom"
import { useAppData } from "../../../../hooks/useAppData"

export default function NormalNavLink ({pageTitle,pageAddressName, children}){

    const {currentWorkspaceId} = useAppData()

    return <>
        <NavLink
            to={`/workspaces/${currentWorkspaceId}/${pageAddressName}`}
            className={({ isActive }) =>
                `
                flex flex-row items-center gap-2 py-1 px-2 rounded-sm hover:text-amber-50 md:text-sm text-xs text-left
                
                ${isActive
                    ? "bg-[#242323] text-amber-50"
                    : "hover:bg-[#242323]"
                }
                `
            }
        >
                        
            <div>
                {children}
            </div>

            <div>
                {pageTitle}
            </div>
                        
        </NavLink>
    </>
}



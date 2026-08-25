import { useAppData } from "../../../../hooks/useAppData"
import { useAppShellUiContext } from "../../../../hooks/useAppShellUiContext"
import { Link } from "react-router-dom"
export default function WorkspaceSelectionMenu(){

    const {workspacesArray, currentWorkspaceId, currentWorkspaceIdSetter} = useAppData()
    const {  isWorkspaceOptnsTabOpen, setWorkspaceOptnsTabState } = useAppShellUiContext()


    // console.log(currentWorkspaceId)
    // rendering workspace list
    return <>


        {/* <div className={`flex flex-col rounded-sm bg-[#2d2c2c] py-1 px-1 gap-1 text-sm border-[#3b3a3a]         border-[0.25px] absolute z-50 top-58 ${wspSelectorTab ?  'block': 'hidden'}`}> */}

        <div className={`flex flex-col rounded-sm bg-[#2d2c2c] py-1 px-1 gap-1 text-sm border-[#3b3a3a]         border-[0.25px]  `}>

            {/* <div className="flex flex-row gap-2 text-white  grow py-1   px-2  hover:rounded-md hover:bg-[#3b3939]  hover:text-amber-50 text-sm  ">
                <div className="bg-amber-300 rounded-md text-sm  w-5 text-center">
                    <div className=" text-black">W</div>
                </div>
                <div className=" text-sm">WS Name </div>
            </div> */}

            {workspacesArray.length>0 && workspacesArray.map((workspace)=>{
                return <Link key={workspace._id} to={`/workspaces/${workspace._id}/boards`}>          

                    <div  className="flex flex-row  text-white  grow py-1   md:px-2 px-1  hover:rounded-md hover:bg-[#3b3939]  hover:text-amber-50 md:text-sm text-xs items-center ">
                            
                        <div className="flex flex-row grow md:gap-2 gap-1.5 items-center" onClick={()=>{currentWorkspaceIdSetter(workspace._id)}}>
                            <div className="md:w-5 w-4  bg-amber-300 rounded-sm text-xs text-center">
                                <div className=" text-black md:text-sm text-xs text-center">{workspace.title[0]}</div>
                            </div>
                            <div className=" md:text-sm text-xs ">{workspace.title } </div>

                        </div>

                        <div className={workspace._id == currentWorkspaceId? `block` : `hidden`}>
                            <svg md:width="14px" md:height="16px" width="12px" height="14px"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M5 13L9 17L19 7" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </div>
                    </div>

                </Link>
                
            })}
           

            <hr className="mt-1 text-[#434141]" />

            <div className="cursor-pointer flex flex-row md:gap-2 gap-1 text-white md:text-sm text-xs grow py-1   px-2  hover:rounded-md hover:bg-[#3b3939]  hover:text-amber-50 text-left">

                <div>Create New</div>
            </div>
          
        </div>

    </>
}

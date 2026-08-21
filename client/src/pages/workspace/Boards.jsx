
import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useAppData } from "../../hooks/useAppData"
import { getBoards } from "../../services/boardService"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

export default function Boards(){

    const {token} = useAuth()
    const {currentWorkspaceId} = useAppData()
    const [boards, setBoards] = useState([])

    const { workspaceId } = useParams();
    // console.log(workspaceId)

    //    if(!currentWorkspaceId){
    //             return
    //         }
    
    useEffect(()=>{
        // console.log(token)
        console.log(currentWorkspaceId)

        async function getCurWoskspaceBoards(){

            if(!currentWorkspaceId){
                return
            }
            
            try{
                let res = await getBoards(token, currentWorkspaceId)
                // console.log(res.data.boards)
                setBoards(res.data.boards)
            } catch(e){
                console.log(e)

            }

        }

        getCurWoskspaceBoards()

    }, [token, currentWorkspaceId, workspaceId])

    return <div className="flex flex-col  ">
            <div className="flex justify-between ">
                <div>
                    <h1 className="text-lg font-medium items-center mb-10 text-[#f1eeee] cursor-pointer">
                        Boards
                    </h1>
                </div>
                
                <div className="text-base bg-[#242222] h-fit rounded-sm px-2 hover:bg-[#302f2f] cursor-pointer">
                    + New
                </div>
            </div>
            
            <div className="flex gap-20 mb-8">
                <div className="text-sm hover:text-[#f0eaea] cursor-pointer">Active</div>
                {/* <div className="text-sm">Starred</div> */}
                <div className="text-sm hover:text-[#f2ecec] cursor-pointer ">Archived</div>
            </div>

            <div className="grid grid-cols-4 gap-10 b-8min-h-0">

            
            { boards.length != 0 &&

                boards.map((board) => {

                    return <Link key={board._id} to={`/workspaces/${currentWorkspaceId}/boards/${board._id}`}>
                        <div  className="w-full min-h-30 max-h-fit text-white  bg-[#3b3a65] rounded-md flex flex-col items-center p-px hover:shadow-[#2a2a34] hover:shadow-[2px_1px_2px_0px_rgba(0,0,0,0.3)]
                    hover:border-[#3b3a65] hover:border-[0.5px] cursor-pointer">

                    {/* return <div className="w-full min-h-30 max-h-fit text-white bg-[#72767a] rounded-md flex flex-col items-center p-px "> */}
                        
                        <div className="flex flex-row w-full h-8 text-base bg-[#16232e] text-center items-center rounded-md rounded-bl-2xl gap-2 justify-end pr-2 ">
                            
                            <div>
                                <svg width="16px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 12V15C21 18.3137 18.3137 21 15 21H9C5.68629 21 3 18.3137 3 15V9C3 5.68629 5.68629 3 9 3H12" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </div>
                            
                            <div className=""></div>
                            
                            <div>
                               <svg width="16px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </div>
                        
                        </div>

                        {/* <div className="w-full grow text-base bg-[#3b3a65] text-center rounded-md">{board.description}</div> */}
                        
                        {/* <div className=" flex w-full grow  bg-[#3b3a65] text-center rounded-md items-end justify-center"> */}
                        <div className=" flex w-full grow  bg-[#3b3a65] text-center rounded-md items-center justify-center">
                            <div>{board.title}</div>
                        </div>
                    </div>
                    </Link>
                
                })

            } </div>

            <div className=" h-88 flex flex-col justify-center items-center">
            {
                boards.length==0 &&
                            <div className="flex flex-col gap-4 w-100  text-center items-center  min-h-50 min-w-50  ">

                                <div className="flex flex-col gap-2 items-center  ">
                                    <div>
                                        <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#707070"><path d="M9.99998 15L9.99999 19C10 20.1046 9.10457 21 7.99999 21H4C2.89543 21 2 20.1046 2 19V15C2 13.8954 2.89543 13 4 13H7.99998C9.10455 13 9.99998 13.8954 9.99998 15Z" stroke="#707070" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 4.99999L16 8.99999C16 10.1046 15.1046 11 14 11H10C8.89543 11 8 10.1046 8 9V5C8 3.89543 8.89543 3 10 3H14C15.1045 3 16 3.89543 16 4.99999Z" stroke="#707070" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 15L22 19C22 20.1046 21.1046 21 20 21H16C14.8954 21 14 20.1046 14 19V15C14 13.8954 14.8954 13 16 13H20C21.1045 13 22 13.8954 22 15Z" stroke="#707070" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 16V13" stroke="#707070" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 6V3" stroke="#707070" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 16V13" stroke="#707070" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                    </div>
                                    
                                    <div className="text-gray-300 text-lg font-medium">
                                        No Boards
                                    </div>
                                </div>

                                <div className="text-gray-300 text-sm font-medum">
                                    Get started by creating a new board
                                </div>

                                <div className="text-gray-700 text-sm font-medium bg-white p-1 rounded-sm mt-4 px-3 cursor-pointer hover:bg-amber-50"  >
                                    Create New Board
                                </div>

                            </div>
            }
            </div>


    </div>
}
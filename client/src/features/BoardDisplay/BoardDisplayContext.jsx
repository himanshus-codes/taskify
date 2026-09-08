import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getBoard, getFullDashboardBoard } from "../../services/boardService";


export const BoardDisplayContext = createContext()


// Boards: its not a BOARD it's techinically a work Board


function BoardDisplayProvider({ children }) {

    // -------------------------
    // Board data

    const {token} = useAuth()
    const {boardId} = useParams()
    console.log(boardId)

    const [boardData, setBoardData] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null)
    // const [lists, setLists] = useState([]);
    // const [cards, setCards] = useState([]);

 

    useEffect(()=>{
        
        async function fetchBoard(){
            try{
                const res = await getBoard(token, boardId)

                console.log(res.data)
                setBoardData(res.data)
            } catch (e){
                console.log(e)
                setError("Some issue occurred")
            }
        }

        fetchBoard()
    },[boardId, token])

    useEffect(()=>{
        
        async function fetchDashboard(){
            try{
                const res = await getFullDashboardBoard(token, boardId)

                console.log(res.data)
                setDashboardData(res.data)
            } catch (e){
                console.log(e)
                setError("Some issue occurred")
            }
        }

        fetchDashboard()
    },[boardId, token])





    // -------------------------
    // Board UI state

    const [viewType, setViewType] = useState("kanban");
    // const [searchQuery, setSearchQuery] = useState("");
    // const [filter, setFilter] = useState(null);


    const [openMenu, setOpenMenu] = useState(null); // view, sort, filter, more, accessibility, newList, share
    

  

    return (
        <BoardDisplayContext.Provider
            value={{
                boardData,
                setBoardData,

                // lists,
                // setLists,

                // cards,
                // setCards,

                viewType,
                setViewType,

               openMenu, 
               setOpenMenu,

               dashboardData,
               setDashboardData

                // searchQuery,
                // setSearchQuery,

                // filter,
                // setFilter,
            }}
        >
            {children}
        </BoardDisplayContext.Provider>
    );
}

export default BoardDisplayProvider
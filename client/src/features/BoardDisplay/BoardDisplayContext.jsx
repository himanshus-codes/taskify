import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const BoardDisplayContext = createContext()

function BoardDisplayProvider({ children }) {

    // -------------------------
    // Board data


    const [boardData, setBoardData] = useState(null);
    // const [lists, setLists] = useState([]);
    // const [cards, setCards] = useState([]);


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
               setOpenMenu

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
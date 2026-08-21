import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const BoardContext = createContext()

function BoardProvider({ children }) {

    // -------------------------
    // Board data


    const [board, setBoard] = useState(null);
    // const [lists, setLists] = useState([]);
    // const [cards, setCards] = useState([]);


    // -------------------------
    // Board UI state

    const [viewType, setViewType] = useState("kanban");
    // const [searchQuery, setSearchQuery] = useState("");
    // const [filter, setFilter] = useState(null);


    return (
        <BoardContext.Provider
            value={{
                board,
                setBoard,

                // lists,
                // setLists,

                // cards,
                // setCards,

                viewType,
                setViewType,

                // searchQuery,
                // setSearchQuery,

                // filter,
                // setFilter,
            }}
        >
            {children}
        </BoardContext.Provider>
    );
}

export default BoardProvider
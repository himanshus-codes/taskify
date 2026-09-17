import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getBoard, getFullDashboardBoard, updateBoard } from "../../services/boardService";
import { createColumn } from "../../services/listService";
import { createTask } from "../../services/taskService";
export const BoardDisplayContext = createContext()


// Boards: its not a BOARD it's techinically a work Board


function BoardDisplayProvider({ children }) {

    // -------------------------
    // Board data

    const {token} = useAuth()
    const {boardId} = useParams()
    console.log(boardId)

    
    // const [dashboardData, setDashboardData] = useState(null);
    
    const [error, setError] = useState(null)
    
    const [board, setBoard] = useState(null);
    const [columns, setColumns] = useState([]);
    const [tasks, setTasks] = useState([]);
 

    useEffect(() => {

        async function fetchDashboard() {
            try {

                const res = await getFullDashboardBoard(token, boardId);

                console.log(res.data);

                const dashboardData = res.data;

                // Board metadata
                console.log(dashboardData.board)
                setBoard(dashboardData.board);

                // Columns without their nested tasks
                const columnsData = dashboardData.columns.map(column => {
                    const { tasks, ...columnData } = column; //Take the tasks property out of column, and put all the remaining properties into columnData

                    return columnData;
                });

                // const columnsData = dashboardData.columns.map(
                //     ({ tasks, ...columnData }) => columnData
                // );
                

                console.log(columnsData)
                setColumns(columnsData);

                // Extract all tasks from all columns into one array
                const tasksData = dashboardData.columns.flatMap( //flatten one level: for each column.tasks = array [task1, task2] but with flat map, each task object is returned basically making tasksData as array [t1, t2, t3] instead of [[t1,t2], [t3]] where [t1,t2], [t3] would belong to say col1 & col2
                    column => column.tasks
                );
                console.log(tasksData)
                setTasks(tasksData);

            } catch (e) {

                console.log(e);
                setError("Some issue occurred");

            }
        }

        fetchDashboard();

    }, [boardId, token]);

    // useEffect(()=>{
        
    //     async function fetchBoard(){
    //         try{
    //             const res = await getBoard(token, boardId)
    //             console.log(res.data)
    //             setBoard(res.data)
    //         } catch (e){
    //             console.log(e)
    //             setError("Some issue occurred")
    //         }
    //     }
    //     fetchBoard()
    // },[boardId, token])

    
    // -------------------------
    // Board UI state

    const [viewType, setViewType] = useState("kanban");
    // const [searchQuery, setSearchQuery] = useState("");
    // const [filter, setFilter] = useState(null);
    // const [sort, setSort] = useState(null);


    const [openMenu, setOpenMenu] = useState(null); // view, sort, filter, more, accessibility, newList, share
    
    // const resetFullDashboardBoard = async (token, boardId) => {
    //     try{
    //         const res = await getFullDashboardBoard(token, boardId)

    //         console.log(res.data)
    //         setDashboardData(res.data)
    //     } catch (e){
    //         console.log(e)
    //         setError("Some issue occurred")
    //     }
    // }
    
    async function updateBoardTitle(newTitle) {
        
        const res = await updateBoard(token, boardId, {
            title: newTitle
        });

        const updatedBoard = res.data;

        setBoard(prev => ({
            ...prev,
            title: updatedBoard.title
        }));

        // setDashboardData(prev => ({
        //     ...prev,
        //     board: {...prev.board, title:updatedBoard.title}
        // }));

        console.log("updated board")
        console.log(board)
        // console.log(dashboardData)

        return updatedBoard;
    }
    
    async function createNewColumn(data) {
        
        const res = await createColumn(
                token,
                boardId,
                data
            );

        const newColumnData = res.data;
            
        console.log(newColumnData)

        setColumns(prev => ([
            ...prev,
            newColumnData
        ]));

        return newColumnData;
    }

    async function createNewTask(columnId, data) {
        
        const res = await createTask(
            token, 
            boardId, 
            columnId, 
            data
        );

        console.log(res)

        const newTaskData = res.data;
            
        console.log(newTaskData)

        setTasks(prev => ([
            ...prev,
            newTaskData
        ]));

        return newTaskData;
    }




    return (
        <BoardDisplayContext.Provider
            value={{
                board,
                columns,
                tasks,

                viewType,
                setViewType,

               openMenu, 
               setOpenMenu,

           
                // resetFullDashboardBoard,
                updateBoardTitle,
                createNewColumn,
                createNewTask

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


// normalized dashboard in a single state:

// {
//     board: {...},

//     columnsById: {
//         C1: {...},
//         C2: {...}
//     },

//     tasksById: {
//         T1: {...},
//         T2: {...}
//     },

//     columnOrder: ["C1", "C2"],

//     taskIdsByColumnId: {
//         C1: ["T1", "T2"],
//         C2: []
//     }
// }

// separate states
// const [board, setBoard] = useState(null);
// const [columns, setColumns] = useState([]);
// const [tasks, setTasks] = useState([]);
// const [columnOrder, setColumnOrder] = useState([]);
// const [taskIdsByColumnId, setTaskIdsByColumnId] = useState({});

// filters & sort
// const [filters, setFilters] = useState(...);
// const [sort, setSort] = useState(...);

// controlled setters
// updateBoardTitle()
// updateBoardDescription()

// createColumn()
// updateColumn()
// deleteColumn()

// createTask()
// updateTask()
// deleteTask()
// moveTask()

// const filteredTasks = tasks
//     .filter(task => task.priority === "high")
//     .filter(task => task.title.includes(searchQuery))
//     .sort(...);

// BoardDisplayProvider
// │
// ├── board
// │
// ├── columns
// │
// ├── tasks
// │
// ├── columnOrder
// │
// ├── taskIdsByColumnId
// │
// ├── filterState
// │
// ├── sortState
// │
// ├── searchQuery
// │
// └── UI state
//       ├── viewType
//       └── openMenu




// . One thing I would NOT do yet

// Don't immediately introduce:

// columnsById
// tasksById
// taskIdsByColumnId
// columnOrder

// unless you actually need them.

// For your current CRUD stage:

// const [board, setBoard] = useState(null);
// const [columns, setColumns] = useState([]);
// const [tasks, setTasks] = useState([]);

// is perfectly reasonable.

// You already have:

// task.columnId

// which gives you the relationship.

// Later, when you implement sophisticated drag-and-drop ordering, you can evolve this into:
// {
//     columnsById: {},
//     tasksById: {},
//     taskIdsByColumnId: {}
// }

// without needing to redesign the entire backend.
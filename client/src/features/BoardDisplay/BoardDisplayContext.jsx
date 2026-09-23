import { createContext, useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getBoard, getFullDashboardBoard, updateBoard } from "../../services/boardService";

import { 
    createColumn as createColumnApi, 
    updateColumn as updateColumnApi, 
    deleteColumn as deleteColumnApi 
} from "../../services/listService";

import { 
    createTask as createTaskApi, 
    updateTask as updateTaskApi,
    deleteAllTasksByColumnId as deleteAllTasksByColumnIdApi 
} from "../../services/taskService";

export const BoardDisplayContext = createContext()


// Boards: its not a BOARD it's techinically a work Board


function BoardDisplayProvider({ children }) {

    // -------------------------
    // Board data

    const {token} = useAuth()
    const {boardId} = useParams()
    //console.log(boardId)

    
    // const [dashboardData, setDashboardData] = useState(null);
    
    const [error, setError] = useState(null)
    
    const [board, setBoard] = useState(null);
    const [columns, setColumns] = useState([]);
    const [tasks, setTasks] = useState([]);
 

    useEffect(() => {

        async function fetchDashboard() {
            try {

                const res = await getFullDashboardBoard(token, boardId);

                //console.log(res.data);

                const dashboardData = res.data;

                // Board metadata
                //console.log(dashboardData.board)
                console.log(dashboardData)
                setBoard(dashboardData.board);

                // Columns without their nested tasks
                const columnsData = dashboardData.columns.map(column => {
                    const { tasks, ...columnData } = column; //Take the tasks property out of column, and put all the remaining properties into columnData

                    return columnData;
                }).sort((a, b) => a.order - b.order);

                // const columnsData = dashboardData.columns.map(
                //     ({ tasks, ...columnData }) => columnData
                // );
                

                console.log(columnsData)
                setColumns(columnsData);

                // Extract all tasks from all columns into one array
                const tasksData = dashboardData.columns.flatMap( //flatten one level: for each column.tasks = array [task1, task2] but with flat map, each task object is returned basically making tasksData as array [t1, t2, t3] instead of [[t1,t2], [t3]] where [t1,t2], [t3] would belong to say col1 & col2
                    column => column.tasks
                );
                //console.log(tasksData)
                setTasks(tasksData);

            } catch (e) {

                //console.log(e);
                setError("Some issue occurred");

            }
        }

        fetchDashboard();

    }, [boardId, token]);

    // useEffect(()=>{
        
    //     async function fetchBoard(){
    //         try{
    //             const res = await getBoard(token, boardId)
    //             //console.log(res.data)
    //             setBoard(res.data)
    //         } catch (e){
    //             //console.log(e)
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

    //         //console.log(res.data)
    //         setDashboardData(res.data)
    //     } catch (e){
    //         //console.log(e)
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

        //console.log("updated board")
        //console.log(board)
        // //console.log(dashboardData)

        return updatedBoard;
    }
    console.log(columns)
    console.log(columns.length)
    console.log(columns.at(-1))
    console.log(columns[columns.length - 1])
    
    async function createNewColumn(data) {
        let colOrder;

        if(columns.length === 0){
            colOrder=1000
        } else {
            // const lastCol = columns[columns.length - 1];
            const lastCol = columns.at(-1);
                
            const highestColOrder = lastCol.order

            colOrder = highestColOrder + 1000
        }

        const res = await createColumnApi(
                token,
                boardId,
                 {...data, order: colOrder}
            );

        const newColumnData = res.data;
            
        //console.log(newColumnData)

        setColumns(prev => ([
            ...prev,
            newColumnData
        ]));

        return newColumnData;
    }


    async function updateColumnOrder(
        columnId,
        newColOrder,
        previousColumns
    ) {

        setColumns(prev => {

            const updatedColumns = prev.map(col =>
                col._id === columnId
                    ? {
                        ...col,
                        order: newColOrder
                    }
                    : col
            );

            return updatedColumns.sort(
                (a, b) => a.order - b.order
            );
        });

        try {

            const res =
                await updateColumnApi(
                    token,
                    columnId,
                    {
                        order: newColOrder
                    }
                );

            return res;

        } catch (error) {

            setColumns(previousColumns);

            throw error;
        }
    }

    // console.log(columns)
    // console.log(tasks)

    // Arrays of Tasks by their parent colum Ids and arraged in ascending value of order property (task {order:"val"})
    const tasksByColumnId = useMemo(() => {
        return columns.reduce((acc, column) => {
            const columnTasks = tasks.filter(
                task => task.columnId === column._id
            );

            acc[column._id] = columnTasks.sort(
                (a, b) => a.order - b.order
            );

            return acc;
        }, {});
    }, [columns, tasks]);

    console.log(tasksByColumnId)

    // const tasksByColumnId={}
    // const colIds = []
    // for(let col of columns){
    //     colIds.push(col._id)
    // }
    // console.log(colIds)
    
    // for(let colId of colIds){
    //     tasksByColumnId[colId] = []
    //     for(let task of tasks){
    //         // console.log(task)
    //         if(task.columnId == colId){
    //             tasksByColumnId[colId].push(task)
    //         }
    //     }
    // }
    // console.log(tasksByColumnId)


    async function createNewTask(columnId, data) {

        let newTaskOrder;

        if(tasksByColumnId[columnId].length==0){
            newTaskOrder=1000
        } else {
            const columnTasksArr = tasksByColumnId[columnId];
            const lastTask = columnTasksArr.at(-1);
                
            const highestTaskOrder = lastTask.order

            newTaskOrder = highestTaskOrder + 1000
        }

        const res = await createTaskApi(
            token, 
            boardId, 
            columnId, 
            {...data, order: newTaskOrder}
        );

        //console.log(res)

        const newTaskData = res.data;
            
        console.log(newTaskData)

        setTasks(prev => ([
            ...prev,
            newTaskData
        ]));

        return newTaskData;
    }

    // async function updateTaskOrder(taskId, newOrder, newColId = null) {

    //     const data = {
    //         order: newOrder
    //     };

    //     if (newColId) {
    //         data.columnId = newColId;
    //     }

    //     const res = await updateTaskApi(
    //         token,
    //         taskId,
    //         data
    //     );

    //     setTasks(prev =>
    //         prev.map(task =>
    //             task._id === taskId
    //                 ? {
    //                     ...task,
    //                     order: newOrder,
    //                     ...(newColId && {
    //                         columnId: newColId
    //                     })
    //                 }
    //                 : task
    //         )
    //     );

    //     return res;
    // }
    

    async function updateTaskOrder(
        taskId,
        newOrder,
        newColId = null,
        previousTasks = null
    ) {

        console.log("update task order req received")
        // -----------------------------------------
        // Keep previous state for rollback
        // -----------------------------------------

        


        // -----------------------------------------
        // Build updated task
        // -----------------------------------------

        const updatedTasks = tasks.map(task =>
            task._id === taskId
                ? {
                    ...task,
                    order: newOrder,
                    ...(newColId && {
                        columnId: newColId
                    })
                }
                : task
        );


        // -----------------------------------------
        // Optimistic UI update
        // -----------------------------------------

        setTasks(updatedTasks);


        // -----------------------------------------
        // API payload
        // -----------------------------------------

        const data = {
            order: newOrder
        };

        if (newColId) {
            console.log("yess")
            data.columnId = newColId;
        }

        console.log("API DATA", data);
        try {

            const res = await updateTaskApi(
                token,
                taskId,
                data
            );
            console.log("UPDATE TASK API RESPONSE:", res);
            return res;

        } catch (error) {

            console.log(
                "UPDATE FAILED — ROLLBACK SNAPSHOT:",
                previousTasks
            );

            // -------------------------------------
            // Rollback
            // -------------------------------------
            if (previousTasks) {
                console.log("ROLLING BACK TASKS");
                setTasks([...previousTasks]);
            }

            throw error;
        }
    }

    async function deleteColumn(columnId) {
        
        const res = await deleteColumnApi(token, columnId)

        console.log(res)

        setColumns(columns => columns.filter((column)=> column._id !== columnId));
        setTasks(prev =>
            prev.filter(task => task.columnId !== columnId)
        );

        return res;
    }

    async function deleteAllTasksByColumnId(columnId) {
        
        const res = await deleteAllTasksByColumnIdApi(token, columnId)
        console.log(res)
        //console.log(newTaskData)

        setTasks(tasks => tasks.filter((task)=> task.columnId !== columnId));

        return res;
    }


    async function updateColumnTitle(columnId, newTitle ) {
        
        const res = await updateColumnApi(token, columnId, {
            title: newTitle
        });


        setColumns((prevs) => prevs.map((prev)=>{
                
                if(prev._id === columnId){
                    prev.title = newTitle
                    return prev
                } else{
                    return prev
                }
            })
        );

        return res;
    }
    


// 400 invalid ID
// 401 unauthenticated
// 403 unauthorized
// 404 resource not found
// 409 conflict
// 500 unexpected server failure



    return (
        <BoardDisplayContext.Provider
            value={{
                board,
                columns,
                tasks,
                setTasks,
                tasksByColumnId, 

                viewType,
                setViewType,

               openMenu, 
               setOpenMenu,

           
                // resetFullDashboardBoard,
                updateBoardTitle,
                createNewColumn,
                createNewTask,
                deleteColumn,
                deleteAllTasksByColumnId,
                updateColumnTitle,
                updateTaskOrder,
                updateColumnOrder

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

// createColumnApi()
// updateColumn()
// deleteColumn()

// createTaskApi()
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

import TodoCard from "./TodoCard"
import '../styles/dashboard.css'
import { useEffect, useState } from "react"
import AddNewTodoButton from './AddNewTodoButton'
import AddNewTodoForm from "./AddNewTodoForm"
import { useAuth } from "../context/AuthContext"
import { editTodo } from "../services/todoService"

// export default function TodoColumn({title, todos, addTodoComponent}){
export default function TodoColumn({title, todos, setTodos, sort, draggedTodo, setDraggedTodo, boxStatus}){
    console.log(todos)

    // Todo Creation/ Add Todo Form State
    const [isAddTodoFormVisible, setAddTodoFormVisible] = useState(false)
    console.log("title", title=="Pending")

    const {token} = useAuth()
    
    

    //  function todoCardRenderer(){
    //         return  todos.map((todo)=> <TodoCard key={todo._id} todo={todo} todos={todos} />)
    //     }

    // let todoCardRenderer=()=>{
    //     return  todos.map((todo, index)=> <TodoCard key={todo._id} todo={todo} todos={todos} setTodos={setTodos} onDragStart={(e)=>{handleDragStart(e, todo, index)}} />)
    // };

    


    useEffect(()=>{
        console.log("TodoColumn mounted", title);

        return ()=>{
            console.log("TodoColumn unmounted", title);
        };
    }, []);


    // drag and drop todo;

    function handleDragOver(e){
        e.preventDefault()
        console.log("Drag Over happened", e.target) // expected "box" on which todo item is dragged over; but give any particular element on which drag over happened
    }

    function handleDragStart(e, todo, index){
        console.log("Drag Start happened", e.target) // doesnt log at all; expected log should happen when todo item / card starts dragging

        console.log(todo)
        console.log(index)
        // setDraggedTodo(todo)

        // e.dataTransfer.setData("data", JSON.stringify({ todo, index }));

        e.dataTransfer.setData("todoId", todo._id);

    }

    console.log(boxStatus)


    async function handleDrop(e, newStatus){
        console.log(newStatus)

        console.log("Drop happened", e.target)
        console.log("Drop happened", e.currentTarget)

        // let draggedData =  e.dataTransfer.getData("data") // doesnt log at all; expected should log the box on which todo item/card was  when I stopped dragging the todo item/card
        
        
        let todoId =  e.dataTransfer.getData("todoId") // doesnt log at all; expected should log the box on which todo item/card was  when I stopped dragging the todo item/card


        try{
            const updatedTodo = await editTodo(todoId, token, {"status":newStatus} )

            console.log(updatedTodo)

            setTodos((todos)=>
                todos.map(todo=>
                    todo._id === todoId ? {...todo, status: newStatus} : todo
                )
            )
        }catch(e){
            console.log(e)
        }

    }



    console.log("TodoColumn render", title);

    return <>
            {/* <div className="container" id="inprogress"> */}
            {/* <div className="maintitle">In Progress</div> */}
            {/* <div className="box" id="inprogressBox"> */}

        <div className="container" >
            
            <div className="maintitle">
                {/* <div className="titleDiv">{title}</div> {addTodoComponent} */}
                {/* <div className="titleDiv">{title}</div> {AddNewTodoButton} */}
                <div className="titleDiv">{title}</div> {title==="Pending" ? <AddNewTodoButton isAddTodoFormVisible={isAddTodoFormVisible}  setAddTodoFormVisible={ setAddTodoFormVisible} setTodos={setTodos}  />  : null }
            </div>

            {/* {AddNewTodoForm} */}
            
            {title==="Pending" ? <div  id="newTodoFormWrapper" style={isAddTodoFormVisible? {padding:"17px"} : {display:"none"}}><AddNewTodoForm isAddTodoFormVisible={isAddTodoFormVisible}  setAddTodoFormVisible={ setAddTodoFormVisible}  setTodos={setTodos} /> </div> : null }
            
            <div className="box"  onDragOver={handleDragOver}  onDrop={(e)=>{ handleDrop(e, boxStatus)}} >
            
            {/* { todoCardRenderer()} */}

            {/* Rendering Todo Cards */}

            {todos.map((todo, index)=> <TodoCard key={todo._id} todo={todo} todos={todos} setTodos={setTodos} handleDragStart={(e)=>{handleDragStart(e, todo, index)}} />)}
                
               
            {/* Empty UI Message */}

            { todos.length == 0 ? 
                (   <div className="empty-message">
                        <div>Drag & Drop Your Todo</div>
                    </div>
                ) : null}

            </div>
            
        </div>
    </>
}
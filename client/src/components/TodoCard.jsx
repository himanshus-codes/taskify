
import '../styles/dashboard.css'
import { useState, useRef, useEffect } from 'react';
import EditTodoForm from './EditTodoForm';
import { deleteTodo } from '../services/todoService';
import { useAuth } from '../context/AuthContext';

export default function TodoCard({todo, todos, setTodos, handleDragStart}){

    const [editOn, setEditOn] = useState(false)

    const todoRef = useRef(todo)
    const {token } = useAuth()

    const [del, setDel]=useState(false)



    function formatDate(createdAt){

    const d = new Date(createdAt);

    return d.toLocaleDateString(
        "en-US",
        {
            month:"short",
            day:"numeric",
            year:"numeric"
        });

        // Example:
        // Apr 29, 2026
    }

    function timeAgo(createdAt){

        const created = new Date(createdAt);
        const now = new Date();

        const diffInMilliseconds = now - created; // milliseconds since 1970 unix epoch

        const hours =
        Math.floor(diffInMilliseconds / (1000*60*60)); // 1 second = 1000ms // milliseconds in 1 hour = 60min * 60 sec * 1000ms


        if(hours < 1){
            return "Just now";
        }

        if(hours < 24){
            return `${hours} hr ago`;
        }

        const days =
        Math.floor(hours/24);

        return `${days} day ago`;
    }

    async function handleDelete(e){

        
        // console.log("item id",e.target.closest('.item').dataset.itemId)
        // console.log("btn id", e.target.dataset.delId)

        try{
            const data = await deleteTodo(e.target.dataset.delId, token)

            // console.log(data)

            // todo=null

            // for(const Todo of todos){
            //     if(Todo._id == e.target.dataset.delId ){
                    
            //     }
            // }

            // for(let i=0; i<todos.length; i++){
            //     if(todos[i]._id == e.target.dataset.delId ){
            //         console.log(true)
            //         todos.splice(i, 1)
            //     }
            // }



            // setDel(curr => !curr)

           

            // setTodos((todos)=> { for(let i=0; i<todos.length; i++){
            //     console
            //     if(todos[i]._id == e.target.dataset.delId ){
            //         console.log(true)
            //         return todos.splice(i, 1)
            //     } else{
            //         return todos
            //     }
            // }})

            setTodos(currTodos => currTodos.filter(todo => todo._id !== e.target.dataset.delId))

        } catch(e){
            console.log(e)
            alert('failed to delete todo')

        }

    }

    function handleEdit(e){
        e.target.closest('.item').draggable=false
        console.log(e.target.closest('.item'))
        
        setEditOn(curr => !curr)
    
    }

    console.log(handleDragStart)
    
    return <>
         <div className="item" draggable={true} data-item-id={todo._id} onDragStart={handleDragStart} >

        { editOn ? <EditTodoForm currentTodo={todo} setEditOn={setEditOn} setTodos={setTodos}/> : 
         
               
               <><div className="todo">
                    <div className="titleTop">
                        <div className="todoTitle">{todo.title} </div>
                        <div className="optionsDE">
                            {/* <div className="icon-btn edit" >✏️</div> */}
                            {/* <div className="icon-btn delete"> 🗑️</div> */}

                            
                            <button className="icon-btn edit" onClick={handleEdit}><img width="32" height="32" src="https://img.icons8.com/puffy/32/FD7E14/create-new.png" alt="create-new"/>{/*✏️*/}</button>
                            <button className="icon-btn delete"   onClick={handleDelete}> <img  data-del-id={todo._id} width="24" height="24" src="https://img.icons8.com/material-rounded/24/3A7086/filled-trash.png" alt="filled-trash"/> {/*🗑️ */} </button>
                        </div>
                    </div>
                    <div className="description">{todo.description}</div>
                </div>

                <div className="status">
                    <div className={`priority ${todo.priority}`}>{`${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}`} </div>
                    <div className="date">{formatDate(todo.createdAt)}</div>
                    <div className="time">{timeAgo(todo.createdAt)}</div>
                </div> </>

               }
        </div>


    </>
}
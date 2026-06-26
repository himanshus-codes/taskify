import { useEffect, useState } from "react"
import { saveTodo } from "../services/todoService"
import { useAuth } from "../context/AuthContext"

export default function AddNewTodoForm({isAddTodoFormVisible,setAddTodoFormVisible, setTodos}){

    const {token} = useAuth()

    const [todoTitle, setTodoTitle]= useState("")
    const [todoDescription, setTodoDescription]= useState("")
    const [todoPriority, setTodoPriority]= useState("low")


    async function saveTodoHandler(e){

        e.preventDefault()
        let body = {"title" : todoTitle, "description": todoDescription, "priority": todoPriority, "status":"pending"}
        console.log(body)
        try{
            let newTodo = await saveTodo(token, body)
            console.log(newTodo)
            // alert(todo)
            setTodos(currTodos=>[...currTodos, newTodo])
            setTodoTitle("")
            setTodoDescription("")
            setTodoPriority("low")
            setAddTodoFormVisible(curr=> !curr)

        }catch(err){
            console.log(err)
            alert(err)

        }
    }

      return <>   
             <form onSubmit={saveTodoHandler} id="newTodoForm" style= {isAddTodoFormVisible ? {display:"block"} : {display: "none"} } >
                
                    <input id="todoTitle" placeholder="Title" value={todoTitle} onChange={(e)=>{setTodoTitle(e.target.value) }} required />
                    <textarea id="todoDesc" placeholder="Description" value={todoDescription} onChange={(e)=>{setTodoDescription(e.target.value) }} required ></textarea>

                     
                    <select id="todoPrioritySelect"  value={todoPriority} onChange={(e)=>{setTodoPriority(e.target.value) }}>
            
                        <option value="low" > Low (Default)</option>
                        <option value="medium"> Medium</option>
                        <option value="high">High</option>
                    </select>     
                    <div><button id="saveTodo" type="submit">Save Task</button></div>
                </form>
    </>
}
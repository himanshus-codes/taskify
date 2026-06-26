import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import { editTodo } from "../services/todoService"

export default function EditTodoForm({currentTodo, setEditOn, setTodos}){
    // console.log(currentTodo)

    

    const {token} = useAuth()

    const [todoTitle, setTodoTitle] = useState(currentTodo.title)
    const [todoDescription, setTodoDescription]= useState(currentTodo.description)
    const [todoPriority, setTodoPriority]= useState(currentTodo.priority)

    function handleCancel(e){
        e.preventDefault()
        console.log(e.target)
        setEditOn(curr => !curr)
        e.target.closest('.item').draggable=true
        console.log(e.target.closest('.item'))
    }

    async function handleSaveEdit(e){
        console.log(e.target)

        e.preventDefault()
        e.target.closest('.item').draggable=true
        console.log(e.target.closest('.item'))


        if(todoTitle !== currentTodo.title || todoPriority !==currentTodo.priority || todoDescription !== currentTodo.description){
            // alert("halted")
            
            let body ={};
            let updateFields = ["title", 'description', 'priority']
            let newData={"title":todoTitle, "description":todoDescription,"priority": todoPriority}
            
            for(let key of updateFields){
                console.log(currentTodo[key] !== newData[key])
                if(currentTodo[key] !== newData[key]){
                    body[key] = newData[key]

                }
            }


            try{


                const updatedTodo = await editTodo(currentTodo._id, token, body)

                console.log(updatedTodo)

                setEditOn(curr => !curr)


                setTodos(currTodos => currTodos.map(todo=> 
                    todo._id == currentTodo._id ? updatedTodo : todo

                ))

            
            }catch(e){
                console.log(e)
                setEditOn(curr => !curr)


               

                // alert(e)
            }

       } else{
         setEditOn(curr => !curr)

        }

    }

    function log(){}

    return <>

              <form  id="editTodoForm" onSubmit={handleSaveEdit} >
                
                    <input id="todoTitle" placeholder="Title" value={todoTitle} onChange={(e)=>{setTodoTitle(e.target.value), log()}} required />
                    <textarea id="todoDesc" placeholder="Description" value={todoDescription} onChange={(e)=>{setTodoDescription(e.target.value), log()}} required ></textarea>
       
                    <select id="todoPrioritySelect"  value={todoPriority} onChange={(e)=>{setTodoPriority(e.target.value), log()}}>

                        <option value="low" > Low (Default)</option>
                        <option value="medium"> Medium</option>
                        <option value="high">High</option>
                    </select>  

                    <div className="buttonsDiv">
                        <button  className="saveEdit" type="submit" >Save</button>
                        <button className="cancelEdit" onClick={handleCancel} >Cancel</button>
                    </div>
                </form>
    </>
}
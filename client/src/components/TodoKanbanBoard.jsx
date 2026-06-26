import TodoColumn from "./TodoColumn"
import '../styles/dashboard.css'

import { useEffect, useState} from "react"

export default function TodoKanbanBoard({addTodoComponent, todos, setTodos, selectedSort, selectedPriority}){
    
    const [draggedTodo, setDraggedTodo]=useState(null)
    

    let newTodos = todos.filter(todo=>todo.status == "pending")

    
    let inprogressTodos= todos.filter(todo=>todo.status=="in-progress")
    let underReviewTodos= todos.filter(todo=>todo.status=="under-review")

    let completedTodos = todos.filter(todo=>todo.status=="completed")

    console.log("Todo Kanban bOARD: todos update expected", todos)

    if(selectedPriority !== "none"){
        console.log("----------------------------------------")
        newTodos = newTodos.filter(todo => todo.priority == selectedPriority)
        inprogressTodos = inprogressTodos.filter(todo => todo.priority == selectedPriority)
        underReviewTodos = underReviewTodos.filter(todo => todo.priority == selectedPriority)
        completedTodos = completedTodos.filter(todo => todo.priority == selectedPriority)
        console.log(newTodos)
    } 

    if(selectedSort =="oldest"){

        newTodos = newTodos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt) )
        inprogressTodos = inprogressTodos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        underReviewTodos = underReviewTodos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        completedTodos = completedTodos.sort((a, b)=> new Date(a.createdAt) - new Date(b.createdAt))

    }else if(selectedSort=="newest"){

        newTodos = newTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt) )
        inprogressTodos = inprogressTodos.sort((a, b) =>new Date(b.createdAt) - new Date(a.createdAt))
        underReviewTodos = underReviewTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        completedTodos = completedTodos.sort((a, b)=> new Date(b.createdAt) - new Date(a.createdAt))
    }



    useEffect(()=>{
        console.log('Sort', selectedSort)
        console.log('Priority', selectedPriority)

    }, [selectedSort, selectedPriority])


    return <> 
    
    <div id="main">

        
        <TodoColumn boxStatus="pending" title="Pending" todos={newTodos} setTodos={setTodos} selectedSort={selectedPriority} setDraggedTodo={setDraggedTodo} draggedTodo={draggedTodo}></TodoColumn>

        
        <TodoColumn  boxStatus="in-progress" title="In Progress" todos={inprogressTodos} setTodos={setTodos} setDraggedTodo={setDraggedTodo} draggedTodo={draggedTodo}></TodoColumn>
        <TodoColumn boxStatus="under-review" title="Under Review" todos={underReviewTodos} setTodos={setTodos} setDraggedTodo={setDraggedTodo}draggedTodo={draggedTodo} ></TodoColumn>
        <TodoColumn  boxStatus="completed" title="Completed" todos={completedTodos} setTodos={setTodos} setDraggedTodo={setDraggedTodo} draggedTodo={draggedTodo}></TodoColumn>

    </div></>
}


// WHAT IS React Hook lint ???

import '../styles/dashboard.css'
import { useState, useEffect } from 'react'
import { fetchTodos } from '../services/todoService'
import { useAuth } from '../context/AuthContext'
import TodoKanbanBoard from '../components/TodoKanbanBoard'
import FilterNSortBar from '../components/FilterNSortBar'


function Dashboard(){

    const [todos, setTodos] = useState([])
    const {token} = useAuth()


    const [selectedSort,  setSort]= useState("newest")
    const [selectedPriority, setPriority]= useState("none")

    useEffect(()=>{
        async function loadTodos(){
            try{   
                let fetchedTodos = await fetchTodos(token)
                console.log(fetchedTodos)
                // setTodos(curr => fetchedTodos)

                setTodos(fetchedTodos)
                // render todos

                console.log("todos state", todos)
            }catch(err){
                console.log(err)
                // failed to fetch referesh page...
            }
        }

        loadTodos()
    }, [])
    // }, [token]) // useful in cases like token refresh/expiry

    useEffect(() => {
        console.log("DASHBOARD todos updated", todos);
        // render todos

    }, [todos]);

    return <>
        <LogoutButton></LogoutButton>
        <FilterNSortBar setSort={setSort} selectedSort={selectedSort} setPriority={setPriority}selectedPriority={selectedPriority}/>
        <TodoKanbanBoard  todos={todos} setTodos={setTodos} selectedSort={selectedSort} setPriority={setPriority} selectedPriority={selectedPriority}/>
    
    </>
}

export default Dashboard


function LogoutButton(){
    const {setlogoutContext} = useAuth()

    return<><button id="logout" onClick={setlogoutContext}>Log Out</button></>
}


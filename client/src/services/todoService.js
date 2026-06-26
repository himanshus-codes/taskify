export async function fetchTodos(token){
    const res = await fetch('http://localhost:3000/todos',{
        method:"GET",
        headers:{
            token
        }
    })

    const data = await res.json()
    console.log(data)

    if (!res.ok) {
        throw new Error(data.message);
    }

    return data.todos;

    // Or (below) managing error at api service layer

    // if(res.ok){
    //     return data.todos
    // } else{

    //      throw({
    //             type:"Failed to fetch Todos",
    //             error:data
    //         })

    //     if(data.message="Failed to Fetch Todos"){
    //         throw({
    //             type:"Failed to fetch Todos",
    //             error:data
    //         })
    //     }
    // }
}


export async function saveTodo(token, body){
    const res = await fetch('http://localhost:3000/todos/todo', {
        method:"POST",
        headers:{
            token,
            "Content-Type": "application/json"
        },
        
        body:JSON.stringify(body)
    })

    const data = await res.json()

    if(!res.ok){
        throw ({
            message:data,
            error:data
        })

        return 
    }

    return data.todo
}


export async function editTodo( todoId,token, body){
    const res = await fetch(`http://localhost:3000/todos/${todoId}`, {
        method:"PATCH",
        headers:{
            token,
            "Content-Type": "application/json"
        },
        
        body:JSON.stringify(body)
    })

    const data = await res.json()

    if(!res.ok){
         throw ({
            message:data,
            error:data
        })


    } else{
    return data.updatedTodo

    }

}
export async function deleteTodo( todoId,token){
    const res = await fetch(`http://localhost:3000/todos/${todoId}`, {
        method:"DELETE",
        headers:{
            token
        }
    })

    const data = await res.json()

    if(!res.ok){
         throw ({
            message:data,
            error:data
        })


    } else{
    return data

    }

}
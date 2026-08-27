export const getBoards = async (token, workspaceId) => {
    
    let res;

    try {
        res = await fetch(`http://localhost:3000/workspace/${workspaceId}/boards`,{
            method:"GET",

            headers:{
                token
            }
        })

    } catch(e){
        const err = new Error("Unable to connect to server.");
        err.code = "NETWORK_ERROR";
        throw err;
    }

    const data = await res.json();

    if (!res.ok) {
        const err = new Error(data.message);
        err.code = data.code;
        throw err;
    }
    // console.log(data)

    return data;
}

export const createBoard = async (token, workspaceId, boardData) => {
    
    let res;

    try {
        res = await fetch(`http://localhost:3000/workspace/${workspaceId}/board`,{
            method:"POST",

            headers:{
                token,
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                title: boardData.title,
                description: boardData.description
            })
        })

    } catch(e){
        const err = new Error("Unable to connect to server.");
        err.code = "NETWORK_ERROR";
        throw err;
    }

    const data = await res.json();

    if (!res.ok) {
        const err = new Error(data.message);
        err.code = data.code;
        throw err;
    }
    // console.log(data)

    return data;
}

export const getBoard = async (token, boardId) => {
    
    let res;

    try {
        res = await fetch(`http://localhost:3000/boards/${boardId}`,{
            method:"GET",

            headers:{
                token
            }
        })

    } catch(e){
        const err = new Error("Unable to connect to server.");
        err.code = "NETWORK_ERROR";
        throw err;
    }

    const data = await res.json();

    if (!res.ok) {
        const err = new Error(data.message);
        err.code = data.code;
        throw err;
    }
    // console.log(data)

    return data;
}
export const getFullDashboardBoard = async (token, boardId) => {
    
    let res;

    try {
        res = await fetch(`http://localhost:3000/boards/${boardId}/dashboard/`,{
            method:"GET",

            headers:{
                token
            }
        })

    } catch(e){
        const err = new Error("Unable to connect to server.");
        err.code = "NETWORK_ERROR";
        throw err;
    }

    const data = await res.json();

    if (!res.ok) {
        const err = new Error(data.message);
        err.code = data.code;
        throw err;
    }
    // console.log(data)

    return data;
}
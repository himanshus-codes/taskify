export async function fetchWorkspaces(token){
    
    let res;
    try{
        res= await fetch("http://localhost:3000/workspaces", {
            method:"GET",
            headers:{
                token
            }
        })
    }catch(e){
        const err = new Error("Unable to connect to server.");
        err.code = "NETWORK_ERROR";
        throw err;
    }
    const data = await res.json()
    if (!res.ok) {
        const err = new Error(data.message);
        err.code = data.code;
        throw err;
    }
    // console.log(data)

    return data;
}
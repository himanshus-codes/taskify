export async function signin(email, password) {
    let res;

    try {
        res = await fetch("http://localhost:3000/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
    } catch {
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
    console.log(data)

    return data;
}

export const signup = async (firstName, lastName, email, password)=> {
    
        let res;
        try{

            res = await fetch( "http://localhost:3000/signup",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                })
            });

        }   catch {
            const err = new Error("Unable to connect to server.");
            err.code = "NETWORK_ERROR";
            throw err;
        }

        console.log(res.ok)

        const data = await res.json()

        if (!res.ok) {
            const err = new Error(data.message);
            err.code = data.code;
            err.issues=data.issues
            throw err;
        }

    return data        
}

















// export const  signin = async (email, password)=>{
//       try{
//         const res = await fetch( "http://localhost:3000/signin",
//             {
//                 method:"POST",
//                 headers:{
//                     "Content-Type":"application/json"
//                 },
//                 body: JSON.stringify({
//                     email,
//                     password
//                 })
//             });

//         // return res
//       } catch(e){
//         console.log(e)
//       } finally{

//       }
//     }

// export const signup = async ()=>{
//         try{
//             const res = await fetch( "http://localhost:3000/signin",
//             {
//                 method:"POST",
//                 headers:{
//                     "Content-Type":"application/json"
//                 },
//                 body: JSON.stringify({
//                     email,
//                     password
//                 })
//             });

//         return res
//         } catch(e){

//         } finally{

//         }
        
// }
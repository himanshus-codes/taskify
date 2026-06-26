export async function signin(email, password) {
        console.log(email, password)


        const res = await fetch( "http://localhost:3000/signin",
            
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });


            console.log(res.ok)
            console.log(res)
            const data = await res.json()
            console.log(data)
            console.log(data.message)
         

            if(!res.ok){
                
                throw new Error("Invalid Credentials")
            }

        
        
            return data.token

   
    }

export const signup = async (firstName, lastName, email, password)=> {
 
            const res = await fetch( "http://localhost:3000/signup",
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
            console.log(res.ok)

            const data = await res.json()

            if(!res.ok){
                console.log(data)
                console.log(data.message)
                // console.log(data.dataValidationError)
                // console.log(data.dataValidationError[0])
                
                
                if(data.message==="INVALID_DATA_FORMAT"){

                    // let {origin,code,minimum,inclusive,path,message} = data.dataValidationError[0];
                    // console.log(origin,code,minimum,inclusive,path,message)
                    // // throw new Error(data.dataValidationError[0].code)
                    // throw new Error({origin,code,minimum,inclusive,path,message})

                    // // throw new Error(data)
                    // // throw new Error("error is effed up")
                    // // return  

                    console.log("VALIDATION_ERROR")

                    throw {
                        type: "VALIDATION_ERROR",
                        issues: data.dataValidationErrorResult
                    };
                } else if(data.message === "Email Already In Use"){
                    console.log("EMAIL_EXISTS")
                    throw {
                        type: "EMAIL_EXISTS",
                        message: data.message
                    };
                } 
                throw new Error(data.message)
            }

            console.log(data)

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
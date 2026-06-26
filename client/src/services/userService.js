export async function getUser(token){
    console.log("get user request")
  

        const res = await fetch("http://localhost:3000/me",{
            method:"GET",
            headers:{
                token
            }
        })

        const data = await res.json()
        console.log(data)
        // return data
         if(res.ok){
                return data
            }
        if(!res.ok){

            if(data.message== "Internal Server Error"){

                throw {
                    type:"Internal Server Error",
                }

                return

            } else if(data.message == "Authentication Failed" ){
                throw {
                    type:"Authentication Failed",
                    message:data.error
                }

                return
            }

           
        } 

   
}
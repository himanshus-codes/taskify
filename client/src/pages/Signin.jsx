import '../styles/login.css'
import {Link, useNavigate} from 'react-router-dom'
import { signin } from '../services/authService'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

function Signin(){
    const [message, setMessage] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()

    const {token, setloginContext, user} = useAuth()
 
    // if a previous render has 3 hooks, then the rerender of the component should also have 3 hooks

    if(token && user){
        return <Navigate to="/dashboard" replace={true} />;
        
    }
     
    async function sendSigninReq(e){
        e.preventDefault()
        setMessage("")

        console.log("sendSigninReq")
        setLoading(true)
        console.log(email, password)
        
        try{
            // let data = signin("email", "body")
            let resToken = await signin(email, password)

            if(resToken){
                console.log(resToken)
            
                    
                await setloginContext(resToken)
              
                setMessage("Login Successful")

                await new Promise(resolve =>
                    setTimeout(resolve, 300)
                );

                navigate("/dashboard", {replace:true});
            }
        } catch(e){
            console.log(e)
            console.log(e.message)
         
      
            switch(e.message){
                case "Invalid Credentials":
                    await new Promise(resolve =>
                        setTimeout(resolve, 300)
                    );
                    setMessage("Invalid Credentials");
                    break;

                case "Authentication Failed":
                    await new Promise(resolve =>
                        setTimeout(resolve, 3000)
                    );
                    setMessage("Something went wrong!")

                    break;

                default:
                    setMessage("Something went wrong!");
            }

        }finally{
            setLoading(false)
        }
    }

    //  useEffect(()=>{
    //         console.log('user', user)
    //     }, [user])


 return <>
        <div id="mainLogin">
        <div id="signinDiv">
        <h1 className="h1main">Sign In</h1>
            <form id="signinForm" onSubmit={sendSigninReq}>
                <label className='labelAuthForm' htmlFor="email">Email</label>
                <input  placeholder="example@<domain>.com"  id="email" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                <label className='labelAuthForm' htmlFor="password">Password </label>
                <input placeholder="password" id="password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                <button id="signin" className="submit" type="submit" disabled={loading}>{loading ? "Signing In..." :"Sign In"}</button>
            </form>
        <p id="message">{message}</p>
        {/* <span className="linksinguporin">Don't have an Account? <a href="/register">Signx Up</a></span> */}
        <span className="linksinguporin">Don't have an Account? <Link to="/signup">Sign Up</Link></span>
        </div>
    </div>
    </>

}


export default Signin
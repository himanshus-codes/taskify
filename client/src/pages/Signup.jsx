import '../styles/register.css'
import {Link} from 'react-router-dom'
import {  signup } from '../services/authService'
import { useState } from 'react'

// enforce strong password rules...

function Signup(){

    const [message, setMessage] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLaoding] = useState(false)
    const [errors, setErrors] = useState({
        firstName:{"fail":false, "too_small":false, "too_big":false},
        lastName:{"fail":false, "too_small":false, "too_big":false}, 
        email:{ "fail":false, "invalid_format":false, "too_small":false, "too_big":false}, 
        password:{ "fail":false, "too_small":false, "too_big":false}})


    async function sendSignupReq(e){
        e.preventDefault()
        setLaoding(true)
        setMessage("")
        setErrors({
        firstName:{"fail":false, "too_small":false, "too_big":false},
        lastName:{"fail":false, "too_small":false, "too_big":false}, 
        email:{ "fail":false, "invalid_format":false, "too_small":false, "too_big":false}, 
        password:{ "fail":false, "too_small":false, "too_big":false}})
     
        console.log("signing up...")

        try{
            let data = await signup(firstName, lastName, email, password)
            console.log(data)
            setMessage(data.message)

        }catch(e){
            // console.log(e)
            // console.log(e)
            // console.log( e.message.path)

          console.log(e);

            switch(e.type){

                case "VALIDATION_ERROR":
                    console.log(e.issues);
                    console.log(e.issues.length);
                    let errorResArray = e.issues

                    // let reqfields = [firstName, lastName, email, password]

                    let filteredFields={}

                    for(let i=0; i<e.issues.length; i++){
                        // for(const key of reqfields){
                           filteredFields[errorResArray[i].path[0]] = {"fail":true, "too_small":false, "too_big":false}
                           console.log(errorResArray[i].code)
                           console.log(errorResArray[i].path[0])
                           console.log(typeof(errorResArray[i].code))

                           switch(errorResArray[i].code){
                               case "too_small":
                                   filteredFields[errorResArray[i].path[0]]["too_small"] = true;
                                   break;
                                case "too_big":
                                    filteredFields[errorResArray[i].path[0]]["too_big"] = true;
                                    // filteredFields[errorResArray[i].path[0].too_big] = true;
                                    break;

                                case "invalid_format":
                                    console.log(filteredFields[errorResArray[i].path[0]])
                                    console.log(filteredFields[errorResArray[i].path[0]]["invalid_format"])
                                    filteredFields[errorResArray[i].path[0]]["invalid_format"] = true;
                                    console.log(filteredFields[errorResArray[i].path[0]]["invalid_format"])
                                    break;
                           }        
                           
                           console.log(errorResArray[i].path[0])
                           console.log(filteredFields) //{firstName: true, lastName: true}
                           setErrors(filteredFields)
                        // }
                    }
                    
                    break;

                case "EMAIL_EXISTS":
                    setMessage(e.message);
                    break;

                default:
                    setMessage("Something went wrong");
            }
            // console.log(e.dataValidationError.result.error.issues)
        }finally{

            setLaoding(false)
        }

    }

    return <div id="mainReg">
            <div id="signupDiv">
            <h1 className="h1main">Sign Up</h1>
        
            <form  id="signupForm" onSubmit={sendSignupReq}>
                <label className='labelAuthForm'  htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" placeholder="Jaby" value={firstName} onChange={(e)=>{setFirstName(e.target.value), setErrors({firstName:{"fail":false, "too_small":false, "too_big":false},lastName:{"fail":false, "too_small":false, "too_big":false}, email:{ "fail":false, "invalid_format":false, "too_small":false, "too_big":false}, password:{ "fail":false, "too_small":false, "too_big":false}})}} /*required*/ />
                {errors.firstName["too_big"] ? <p className="fieldError">First Name Should be at max 30 character long</p> : undefined}
                {errors.firstName["too_small"] ? <p className="fieldError"> First Name Should be at least 3 character long</p> : undefined}

                <label className='labelAuthForm'  htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" placeholder="Koay" value={lastName} onChange={(e)=>{setLastName(e.target.value), setErrors({firstName:{"fail":false, "too_small":false, "too_big":false},lastName:{"fail":false, "too_small":false, "too_big":false}, email:{ "fail":false, "invalid_format":false, "too_small":false, "too_big":false}, password:{ "fail":false, "too_small":false, "too_big":false}})}}/*required*//>
                {errors.lastName["too_big"] ? <p className="fieldError"> Last Name Should be at max 30 character long</p> : undefined}
                {errors.lastName.too_small ? <p className="fieldError">Last Name Should be at least 3 character long</p> : undefined}

                <label className='labelAuthForm'  htmlFor="email">Email</label>
                <input id="email" /*type = email */ placeholder="example@<domain>.com" value={email} onChange={(e)=>{setEmail(e.target.value), setErrors({firstName:{"fail":false, "too_small":false, "too_big":false},lastName:{"fail":false, "too_small":false, "too_big":false}, email:{ "fail":false, "invalid_format":false, "too_small":false, "too_big":false}, password:{ "fail":false, "too_small":false, "too_big":false}})}} /*required*//>
                {errors.email["invalid_format"] ? <p className="fieldError">Invalid Email Format</p> : undefined}
                {errors.email.too_small ? <p className="fieldError">Too Small Email</p> : undefined}
                {errors.email["too_big"] ? <p className="fieldError"> Too Large Email</p> : undefined}

                <label className='labelAuthForm'  htmlFor="password">Password</label>
                <input id="password" type="password" placeholder="" value={password} onChange={(e)=>{setPassword(e.target.value), setErrors({firstName:{"fail":false, "too_small":false, "too_big":false},lastName:{"fail":false, "too_small":false, "too_big":false}, email:{ "fail":false, "invalid_format":false, "too_small":false, "too_big":false}, password:{ "fail":false, "too_small":false, "too_big":false}})}} /*required*/minLength="6"/>
                {errors.password["too_big"] ? <p className="fieldError"> Password Should be at max 128 Characters long</p> : undefined}
                {errors.password.too_small ? <p className="fieldError">Password should be atleast 8 characters long</p> : undefined}
                {errors.password["invalid_format"] ? <p className="fieldError">Invalid Password Format</p> : undefined}


                <button id="signup" className="submit" type="submit" disabled={loading}>{loading? "Signing Up..." : "Sign Up"}</button>
            </form>
            <p id="message">{message}</p>
            {/* <span className="linksinguporin">Already have an Account? <a href="/login">Sign In</a></span> */}
            <span className="linksinguporin">Already have an Account? <Link to="/signin">Sign In</Link></span>
            </div>
    </div>
}


export default Signup 
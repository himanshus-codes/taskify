const jwt = require('jsonwebtoken')


const {User} = require('../models/User.js');
const { Collection } = require('mongoose');

let JWT_SECRET_USER = process.env.JWT_SECRET_USER


async function userMiddleware(req, res, next) {

    console.log("user Auth Middleware called",req.method, req.url)


    // Implement user auth logic

try{
    console.log("req diverted to user auth logic")

    const token = req.headers.token;
        
        if(!token){
            // throw("User Not Logged In")
            // return
            
            // or better
            // throw new Error("User Not Logged In");
            // return


            // even better
            return res.status(401).json({
                message: "Authentication failed",
                error: "Auth token required"
            });
        }
    
        let id = jwt.verify(req.headers.token, JWT_SECRET_USER) 

        let userData = await User.findOne({_id : id})
        console.log(userData)

        if(!userData){
            // throw("user data not found")
            // return

            return res.status(401).json({
                message: "Authentication failed",
                error: "User no longer exists"
            });
        }
        req.userData  = userData;
        console.log("before next()")
    
        next()
        console.log("after next()")
   
    } catch(e){
        console.error(e);

        if(e.name == "JsonWebTokenError"){
            console.error(e); // backend log

            return res.status(401).json({
                message:"Authentication Failed",
                error: "Invalid Auth Token"
            })} 

            return res.status(500).json({
                message: "Internal server error"
            });


            // fRONT END ERROR LOG
            // {message: 'Request failed', error: {…}}
            //     error: {name: 'JsonWebTokenError', message: 'jwt malformed'}
            //     message: "Request failed"
            // }
        }
}


function isAdmin(req, res, next){

    // console.log("admin verification middleware", req.method, req.url)

     if (req.userData.role !== "admin") {
        return res.status(403).json({ message: "Admins only" });
    }

    next()
}


async function roleCheck(req, res, next){
    

    console.log("role check middleware")

  
        const userId = req.params.id

    let userData = await User.findById(userId);

    if(!userData){
        res.json({
            message:"User Data not found: Invalid user Id"
        })

        return
    }

    req.userCurrentRole = userData.role 
    console.log(req.userCurrentRole)

    next()


   
   
    
    
}


module.exports = {userMiddleware, isAdmin, roleCheck};
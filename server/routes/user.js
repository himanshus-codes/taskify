// routes/user.routes.js
const { Router } = require("express");
const router = Router();

const userController = require("../controllers/user.js");
const { userMiddleware } = require("../middleware/user.js");

router.post("/signup", userController.signup);
router.post("/signin", userController.login);

router.get("/me", userMiddleware, userController.getMe);
router.patch("/me", userMiddleware, userController.updateMe);
router.patch("/me/password", userMiddleware, userController.updatePassword);
router.delete("/me", userMiddleware, userController.deleteMe);

module.exports = router;















// const { Router } = require("express");
// const userRouter = Router();
// const {userMiddleware, isAdmin} = require("../middleware/user");
// const {z} = require('zod')
// const bcrypt = require('bcrypt')
// const {User, Todo} = require('../database/index')
// const jwt = require('jsonwebtoken')

// let JWT_SECRET_USER = 'thats my secret'
// // User Routes

// // dummy static admin creation
// let adminCreated = false;
// async function createAdmin(){
    
//         let adminPassword = "itsafcukingadminpassword"

//         const hashedAdminPass = await bcrypt.hash(adminPassword, 5)

//         const adminSignUpInfo = new User ({
//             firstName: "himanshu",
//             lastName: "sharma",
//             password: hashedAdminPass,
//             email: "himadmin@company.in",
//             role:"admin"
//         })

//         console.log(adminSignUpInfo)

//         await adminSignUpInfo.save()
// }

// adminCreated = true;

// if(!adminCreated){
//     createAdmin()
// }






// //user signup
// userRouter.post('/signup', async (req, res) => {
//     // Implement user signup logic
//     console.log('Sign Up req received')

//     // const {firstName, lastName, password, email} = req.body;
    
//     const requiredUserSchema = z.object({
//         email : z.string().min(3).max(100).email(),
//         password : z.string().min(6).max(24),
//         firstName : z.string().min(3).max(100),
//         lastName : z.string().min(3).max(100),
//     })

//     const zodValidationResult = requiredUserSchema.safeParse(req.body)
//     console.log('hii')
//     console.log(zodValidationResult.success)

//     if (!zodValidationResult.success) {
//         const formattedErrors = zodValidationResult.error.issues.map(err => ({
//             field: err.path[0],
//             message: err.message
//         }));

//         res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         errors: formattedErrors
//         });

//         return 
//     }
//     const {firstName, lastName, password, email} =zodValidationResult.data ;


//     let errorThrown = false;

//     try{
//         const hashedPassword = await bcrypt.hash(password, 5 ) 
//         console.log(hashedPassword)


//         let emailExists = null;
//         emailExists = await User.findOne({email : email})
//         console.log(emailExists)  

//         if(emailExists){

//             console.log("Email  Already Exist");
//             throw("Email Already Exists")
//         }

//         const userSignUpInfo = new User ({
//             firstName,
//             lastName,
//             password: hashedPassword,
//             email
//         })

//         console.log(userSignUpInfo)

//         await userSignUpInfo.save()
//     } catch(e){
        
//         errorThrown = true;

//         res.json({
//             message : "Sign Up : Failed",
//             error : e
//         })  
//     }

//     if(!errorThrown) {
//         res.json({
//             message: "Sign Up Success : You are now registered",
//         })
//     }
// });

// // user login
// userRouter.post('/login', async (req, res) => {
//     const {email, password} = req.body;

//     const userData = await User.findOne({email : email});

//     if(!userData){
//         res.json({
//             message: "Invalid eMAIL"
//         })
//     } else {
//         const matchPass = await bcrypt.compare(password, userData.password)
//         console.log("Password match", matchPass)

//         if(!matchPass){
//             res.json({
//                 message: "wrong pass"
//             })
//         } else{
//             const token = jwt.sign(userData._id.toString(), JWT_SECRET_USER);
//             res.json({
//                 message:"Login Success : Session Token Generated",
//                 token: token
//             })
//         }
//     }

// });

// // user's account details
// userRouter.get('/me', userMiddleware,  (req, res)=>{
//     console.log('user account details req ')
//     res.json({
//         message:"account details fetched",
//         data : req.userData
//     })
// })

// // user dashboard
// // stats like total todos; incomplete, complete etc, success rate etc 
// // (more complexities in case of sub categories like daily, weekly todos)

// userRouter.post('/me/stats', (req, res)=>{

// })

// // use update account details: via name, email etc

// // update name etc.

// userRouter.patch('/me',userMiddleware, async (req, res)=>{
//     let id = req.userData._id;


//     console.log("update personal details request")
//     // const {firstName, lastName, email} = req.body

//     const updateMeSchema = z.object({
//         firstName: z.string().min(3).max(100),
//         lastName: z.string().min(3).max(100),
//         email: z.string().email()
//     }).partial().refine(data => Object.keys(data).length > 0, {
//         message: "At least one field must be provided"
//     });

//     const validationResult = updateMeSchema.safeParse(req.body);
//     console.log(validationResult.success)
//     console.log(validationResult.data)

//     if(!validationResult.success){
//         res.json({
//             message: "incorrect format data",
//             error: validationResult.error.issues
//         })
//         return
//     }

//     try {

//         const filteredUpdates ={}

//         let updates = validationResult.data
        
//         const allowedFields = ["email", "firstName", "lastName"]

//         for(const key of allowedFields){
//             if(updates[key] !== undefined ){
//                filteredUpdates[key] = updates[key] 
//             }
//         }

//         console.log("filtered updates", filteredUpdates)


//         const user = await User.findByIdAndUpdate(id, {$set:{filteredUpdates}}, {new:true})

//         res.json({
//             message:"update successful",
//             updatedAccountInfo: user
//         })

//     }catch(e){
//         res.json({
//             message: "Update Failed",
//             error: e
//         })
//     }

// })


// //update email via (otp)

// // update password
// userRouter.patch('/me/password', userMiddleware, async (req, res)=>{
//     console.log("password update req received")

//     try{
//         let id = req.userData._id;

//         // failed to write missing body error
//         // console.log(req.body == false)

//         // if(!req.body){
//         //     // res.json({message:"empty request body: current and new password not sent"})
//         //     throw("empty request body: current and new password not sent")
//         // }


//         const passwordValidationSchema =  z.object({
//             newPassword: z.string().min(8).max(24),
//             currentPassword: z.string().min(8).max(24)
//         })

//         const passValidationResult = passwordValidationSchema.safeParse(req.body)

//         if(!passValidationResult.success){
//             return res.status(400).json(result.error.issues);
//         }

//         // checking current password == password in DB

//         const {newPassword, currentPassword} = passValidationResult.data;

//         let passwordVerfication = await bcrypt.compare(currentPassword, req.userData.password ) 
//         console.log("passwordVerfication passwordVerfication", passwordVerfication)
        
//         if(!passwordVerfication){
//             return res.status(400).json({
//                 message:"incorrect current password"
//             });

            
//         }

//         const hashedNewPassword = await bcrypt.hash(newPassword, 5)

//         let userData = await User.findById(req.userData._id);
//         userData.password = hashedNewPassword;
//         await userData.save();

//         // await User.findByIdAndUpdate(req.userData._id, {$set: {password: hashedNewPassword}}, {new: true})
//         res.status(200).json({message:"updated password"})

//     }catch(e){
//         res.json({message:"failed to update password", error: e})
//     }

//     })

// // user delete account

// userRouter.delete('/me', userMiddleware, async (req, res)=>{
//     const id = req.userData._id
//     console.log('delete requesttt------')

//     try{

//         const toBeDeletedData = await User.findByIdAndDelete(id)
//         const userTodos = await Todo.deleteMany()
//         console.log("data to be deleted -----------------",toBeDeletedData)

//         if(!toBeDeletedData){
//             res.status(404).json({
//                 message:"user not found"
//             })
//         }

//         res.status(200).json({
//             message: "User account deleted successfully",
//             data: toBeDeletedData
//         })

//     } catch(e){
//         res.json({
//             message: "Couldn't delete account",
//             error: e
//         }) 
//     }
// })


// // logout functionality

// userRouter.post('/logout', userMiddleware, (req, res) => {
//     // Implement logout logic
// });






// module.exports = userRouter


// {
//   "email": "himanshu@example.com",
//   "password": "securePass123",
//   "firstName": "Himanshu",
//   "lastName": "Sharma"
// }

// {
//   "email": "hi",
//   "password": "12",
//   "firstName": "A",
//   "lastName": ""
// }


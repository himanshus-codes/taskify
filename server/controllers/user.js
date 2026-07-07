// controllers/user.controller.js
const userService = require("../services/user.js");
const { signupSchema, updateSchema, passwordSchema } = require("../validations/user");

exports.signup = async (req, res) => {
  
  let result;

  console.log(req.body)
    // req.body = JSON.parse(req.body);
    result = signupSchema.safeParse(req.body);
    console.log(result)
    console.log("req received",  req.path)
    // console.log("error: ", result.error.issues)
    if (!result.success) {
      console.log("error: ", result.error.issues)
      return res.status(400).json({message:"INVALID_DATA_FORMAT",  dataValidationErrorResult: result.error.issues });
    }

  try {

    let existing = await userService.signup(result.data);
    console.log(existing)
    // if(existing){
    //   return res.status(409).json({
        
    //   "error": "conflict",
    //   "message": "Email Already in Use",
    //   "field": "email"

    //   })
    // }
    res.json({ message: "Signup successful" });
  } catch (err) {
    console.log("Result",result)
    console.log("Error",e)
      
    if(e.message === "Email_Already_Exists") {
        console.log("Email_Already_Exists")
        return res.status(409).json({
          message: "Email Already In Use",
          field: "email"
        });
      }

    res.json({ message: "Signup failed", error: e  });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await userService.login(req.body);
    res.json({ token });
  } catch (e) {
    console.log(e)
    // res.status(403).json({ message: "Sign_In_Failed",error: e });
    // res.status(403).json({ message: "Sign_In_Failed",error: e.message });\
    
    // res.status(403).json({ message: "Sign_In_Failed",error: "Invalid_Credentials" });
    res.status(403).json({ message: "Sign_In_Failed",error: "Invalid Credentials" });
  }
};

exports.getMe = (req, res) => {
  res.json({ data: req.userData });
};

exports.updateMe = async (req, res) => {
  const result = updateSchema.safeParse(req.body);

  if (!result.success) {
    return res.json({ error: result.error.issues });
  }

  const updated = await userService.updateMe(req.userData._id, result.data);

  res.json({ updated });
};

exports.updatePassword = async (req, res) => {
  const result = passwordSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(result.error.issues);
  }

  await userService.updatePassword(req.userData, result.data);

  res.json({ message: "Password updated" });
};

exports.deleteMe = async (req, res) => {
  await userService.deleteMe(req.userData._id);
  res.json({ message: "User deleted" });
};
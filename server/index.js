const mongoose = require("mongoose");
const cors = require('cors')
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require('./routes/user.js');
const taskRouter = require('./routes/task.js');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(cors());

app.use((req,res,next)=>{
  console.log(req.method, req.url);
  next();
});


app.get("/", (req, res)=> res.send("I am Healthy"));

app.use('/', userRouter);
app.use('/', taskRouter);


mongoose.connect(process.env.MONGO_URL) 
.then(() => {
  console.log("DB connected")
  app.listen(port, ()=> console.log(`server is running at http://localhost:${port}`));
})
.catch(err => console.log(err));

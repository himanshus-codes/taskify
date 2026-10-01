const mongoose = require("mongoose");
const {Task} = require("./models/Task.js")
const cors = require('cors')
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require('./routes/user.js');
const taskRouter = require('./routes/task.js');
const boardRouter = require('./routes/board.js')
const columnRouter = require('./routes/column.js')
const workspaceRouter = require('./routes/workspace.js')
const labelRouter = require("./routes/label.js");
const checklistRouter = require("./routes/checklist.js");


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
app.use('/', boardRouter);
app.use('/', columnRouter);
app.use('/', workspaceRouter);
app.use("/", labelRouter);
app.use("/", checklistRouter);


// better (standard express pattern)
// app.use("/users", userRouter);
// app.use("/tasks", taskRouter);
// app.use("/boards", boardRouter);


mongoose.connect(process.env.MONGO_URL) 
.then(() => {
  console.log("DB connected")
  Task.syncIndexes();
  // Label.syncIndexes();
  // Checklist.syncIndexes();


  app.listen(port, ()=> console.log(`server is running at http://localhost:${port}`));
})
.catch(err => console.log(err));

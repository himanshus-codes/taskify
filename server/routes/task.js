const { Router } = require("express");
const {userMiddleware, isAdmin} = require("../middleware/user.js");
const mongoose = require('mongoose')
const taskRouter = Router();
const {Task} = require('../models/User.js')
const {z} = require('zod')

//  Task CRUD Routes

// create task by user
taskRouter.post('/tasks/task', userMiddleware, async (req, res) => {
    console.log(req.body)
    // Implement task creation logic
    console.log('task creation request')
    let id = req.userData._id 
    // const {title, description, priority, status } = req.body;

    let requiredTaskSchema = z.object({
        title: z.string()
        .min(3, "Title must be at least 3 characters")
        .max(150, "Title too long"),

        description: z.string()
            .min(5, "Description too short")
            .max(1500, "Description too long"),

        priority: z.enum(["low", "medium", "high"], {
            errorMap: () => ({ message: "Priority must be low, medium, or high" })
        }),

        status: z.enum(["pending", "in-progress", "completed", "under-review"], {
            errorMap: () => ({ message: "Invalid status value" })
        })
    })

    const zodValidationTaskResult = requiredTaskSchema.safeParse(req.body)
    console.log("zodValidationTaskResult", zodValidationTaskResult)
    console.log("zodValidationTaskResult Data", zodValidationTaskResult.data)

    if(!zodValidationTaskResult.success){
         const formattedErrors = zodValidationTaskResult.error.issues.map(err => ({
            field: err.path[0],
            message: err.message
        }));

        return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formattedErrors
        });


    } else{

        console.log("before saving task")

    const {title, description, priority, status } = zodValidationTaskResult.data;

        try{
            let taskData = new Task({
                title,
                description,
                priority,
                status,
                userId : id
            })


           let newTask = await taskData.save()
           console.log(newTask)

            console.log("after saving task")


            res.status(201).json({
                    message:"Task_Saved",
                    task: newTask
                })

        }  catch(e){

            console.log(e)
            res.json({
                message:"Failed_To_Create_Task",
                error:e

            })
        }
    }

});

// fetch all tasks by user
taskRouter.get('/tasks', userMiddleware, async (req, res) => {
    const id =  req.userData._id
    try{
        const fetchedTaskData = await Task.find({userId: id})

        // console.log(fetchedTaskData)

        res.status(200).json({
            message: "Tasks Fetched",
            tasks: fetchedTaskData
        })

    } catch(e){
        res.json({
            message:"Failed to Fetch Tasks",
            error: e
        })
    }

});


// fetch speciffic task
taskRouter.get('/tasks/:id', userMiddleware, async  (req, res)=>{

    console.log("get task req recieved")
    
    const taskId= req.params.id

    console.log(taskId)

      if(!mongoose.Types.ObjectId.isValid(taskId)){
      return res.status(400).json({
         error: "Invalid Task ID"
      });
  }

    const taskData = await Task.findById(taskId)

    console.log("task Data ", taskData);

    
    res.json({
        message: "Found Task",
        task: taskData
    })
})


// update a task by user: status title description priority etc
taskRouter.patch('/tasks/:id', userMiddleware, async (req, res) => {


    console.log("update task request")
    const taskId = req.params.id;

    const requiredSchema = z.object({
        title: z.string()
        .min(3, "Title must be at least 3 characters")
        .max(150, "Title too long"),

        description: z.string()
            .min(5, "Description too short")
            .max(1500, "Description too long"),

        priority: z.enum(["low", "medium", "high"], {
            errorMap: () => ({ message: "Priority must be low, medium, or high" })
        }),

        status: z.enum(["pending", "in-progress", "completed", "under-review"], {
            errorMap: () => ({ message: "Invalid status value" })
        })
    }).partial()

    const validationResult = requiredSchema.safeParse(req.body);

    console.log(validationResult.success)

    if(!validationResult.success){
        return res.status(400).json({
            message: "Invalid Data format ",
            error: validationResult.error.issues
        })

    }

    try{

        const updates = validationResult.data;

        const filteredUpdates = {};
        const allowedFields = ["title", "description", "priority", "status"];
        
        for(const key of allowedFields){
            if(updates[key] !== undefined){
                filteredUpdates[key] = updates[key]
            }
        }           
        console.log(filteredUpdates)
        const taskData = await Task.findByIdAndUpdate(taskId, {$set : filteredUpdates}, {new:true})

        res.json({
            message:"task updated successfully",
            updatedTask: taskData

          
        })

    }catch(e){
        res.json({
            message: "couldn't update task",
            error: e
        })
    }

})

taskRouter.delete('/tasks/:id', userMiddleware, async (req, res)=>{
    try{
        console.log('delete req received')
        const id = req.params.id
        const data = await Task.findByIdAndDelete(id)

        res.status(200).json({
            message:"Task_Deleted_Sucessfully",
            data:data
        })
    } catch(e){
        //404
        res.status(400).json({
            message:"Deletion_Failed",
            error:e
        })
    }
})


taskRouter.put('/', isAdmin, (req, res) => {
    // Implement update task  logic
});

taskRouter.delete('/', isAdmin, (req, res) => {
    // Implement delete all tasks logic
});

taskRouter.delete('/:id', isAdmin, (req, res) => {
    // Implement delete task by id logic
});


taskRouter.get('/', isAdmin, (req, res) => {
    // Implement fetching all task logic
});

taskRouter.get('/:id', isAdmin, (req, res) => {
    // Implement fetching task by id logic
});



module.exports = taskRouter;


// {
//   "title": "Finish backend revision",
//   "description": "Revise Zod and Mongoose schemas and build small API",
//   "priority": "high",
//   "status": "in-progress",
//   "userId": "user_123"
// }


// {
//   "title": "Go for a walk",
//   "description": "30 minutes evening walk for refreshment",
//   "priority": "low",
//   "status": "pending",
//   "userId": "user_456"
// }
const { Router } = require("express");
const {userMiddleware, isAdmin} = require("../middleware/user");
const mongoose = require('mongoose')
const todoRouter = Router();
const {Todo} = require('../database/index.js')
const {z} = require('zod')

//  Todo CRUD Routes

// create todo by user
todoRouter.post('/todos/todo', userMiddleware, async (req, res) => {
    console.log(req.body)
    // Implement todo creation logic
    console.log('todo creation request')
    let id = req.userData._id 
    // const {title, description, priority, status } = req.body;

    let requiredTodoSchema = z.object({
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

    const zodValidationTodoResult = requiredTodoSchema.safeParse(req.body)
    console.log("zodValidationTodoResult", zodValidationTodoResult)
    console.log("zodValidationTodoResult Data", zodValidationTodoResult.data)

    if(!zodValidationTodoResult.success){
         const formattedErrors = zodValidationTodoResult.error.issues.map(err => ({
            field: err.path[0],
            message: err.message
        }));

        return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formattedErrors
        });


    } else{

        console.log("before saving todo")

    const {title, description, priority, status } = zodValidationTodoResult.data;

        try{
            let todoData = new Todo({
                title,
                description,
                priority,
                status,
                userId : id
            })


           let newTodo = await todoData.save()
           console.log(newTodo)

            console.log("after saving todo")


            res.status(201).json({
                    message:"Todo_Saved",
                    todo: newTodo
                })

        }  catch(e){

            console.log(e)
            res.json({
                message:"Failed_To_Create_Todo",
                error:e

            })
        }
    }

});

// fetch all todos by user
todoRouter.get('/todos', userMiddleware, async (req, res) => {
    const id =  req.userData._id
    try{
        const fetchedTodoData = await Todo.find({userId: id})

        // console.log(fetchedTodoData)

        res.status(200).json({
            message: "Todos Fetched",
            todos: fetchedTodoData
        })

    } catch(e){
        res.json({
            message:"Failed to Fetch Todos",
            error: e
        })
    }

});


// fetch speciffic todo
todoRouter.get('/todos/:id', userMiddleware, async  (req, res)=>{

    console.log("get todo req recieved")
    
    const todoId= req.params.id

    console.log(todoId)

      if(!mongoose.Types.ObjectId.isValid(todoId)){
      return res.status(400).json({
         error: "Invalid Todo ID"
      });
  }

    const todoData = await Todo.findById(todoId)

    console.log("todo Data ", todoData);

    
    res.json({
        message: "Found Todo",
        todo: todoData
    })
})


// update a todo by user: status title description priority etc
todoRouter.patch('/todos/:id', userMiddleware, async (req, res) => {


    console.log("update todo request")
    const todoId = req.params.id;

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
        const todoData = await Todo.findByIdAndUpdate(todoId, {$set : filteredUpdates}, {new:true})

        res.json({
            message:"todo updated successfully",
            updatedTodo: todoData

          
        })

    }catch(e){
        res.json({
            message: "couldn't update todo",
            error: e
        })
    }

})

todoRouter.delete('/todos/:id', userMiddleware, async (req, res)=>{
    try{
        console.log('delete req received')
        const id = req.params.id
        const data = await Todo.findByIdAndDelete(id)

        res.status(200).json({
            message:"Todo_Deleted_Sucessfully",
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


todoRouter.put('/', isAdmin, (req, res) => {
    // Implement update todo  logic
});

todoRouter.delete('/', isAdmin, (req, res) => {
    // Implement delete all todos logic
});

todoRouter.delete('/:id', isAdmin, (req, res) => {
    // Implement delete todo by id logic
});


todoRouter.get('/', isAdmin, (req, res) => {
    // Implement fetching all todo logic
});

todoRouter.get('/:id', isAdmin, (req, res) => {
    // Implement fetching todo by id logic
});



module.exports = todoRouter;


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
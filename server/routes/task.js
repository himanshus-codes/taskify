const { Router } = require("express");
const {userMiddleware, isAdmin} = require("../middleware/user.js");
const mongoose = require('mongoose')
const router = Router();
const {Task} = require('../models/Task.js')
const {z} = require('zod')


const taskController = require("../controllers/task.js")

//  Task CRUD Routes

// create task by user
router.get('/columns/:id/tasks', userMiddleware, taskController.getAllTasks)

// Delete All Tasks by Column
router.delete('/columns/:id/tasks', userMiddleware, taskController.deleteAllTasks)

// router.post('/columns/:id/tasks', userMiddleware, taskController.createColumns)

router.post('/boards/:boardId/columns/:columnId/task', userMiddleware, taskController.createTask)

router.get('/tasks/:id', userMiddleware, taskController.getTaskDetails)
router.patch('/tasks/:id', userMiddleware, taskController.updateTask)
router.delete('/tasks/:id', userMiddleware, taskController.deleteTask)

module.exports = router;



// router.put('/', isAdmin, (req, res) => {
//     // Implement update task  logic
// });

// router.delete('/', isAdmin, (req, res) => {
//     // Implement delete all tasks logic
// });

// router.delete('/:id', isAdmin, (req, res) => {
//     // Implement delete task by id logic
// });


// router.get('/', isAdmin, (req, res) => {
//     // Implement fetching all task logic
// });

// router.get('/:id', isAdmin, (req, res) => {
//     // Implement fetching task by id logic
// });





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
const {createTaskSchema, updateTaskSchema} = require("../validations/task")
const taskService = require("../services/task")

//  Task CRUD Routes

// create task by user
exports.createTask = async (req, res) => {

    const columnId = req.params.id;

    const validationResult = createTaskSchema.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            error: "Validation_Error",
            issues: validationResult.error.issues
        });
    }

    try {

        const task = await taskService.createTask(
            columnId,
            validationResult.data
        );

        return res.status(201).json({
            success: "Task_Created",
            data: task
        });

    } catch (e) {

        return res.status(500).json({
            error: "Internal_Server_Error",
            message: "Could_Not_Create_Task"
        });

    }

};

// fetch all tasks by user
exports.getAllTasks = async (req, res) => {

    const columnId = req.params.id;

    try {

        const tasks = await taskService.fetchAllTasks(columnId);

        return res.json({
            success: "Tasks_Fetched",
            data: tasks
        });

    } catch (e) {

        return res.status(500).json({
            error: "Internal_Server_Error",
            message: "Could_Not_Fetch_Tasks"
        });

    }

};


// fetch speciffic task
exports.getTaskDetails = async (req, res) => {

    const taskId = req.params.id;

    try {

        const task = await taskService.getTaskDetails(taskId);

        if (!task) {
            return res.status(404).json({
                error: "Task_Not_Found"
            });
        }

        return res.json({
            success: "Task_Fetched",
            data: task
        });

    } catch (e) {

        return res.status(500).json({
            error: "Internal_Server_Error",
            message: "Could_Not_Fetch_Task"
        });

    }

};

// update a task by user: status title description priority etc
exports.updateTask = async (req, res) => {

    const taskId = req.params.id;

    const validationResult = updateTaskSchema.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            error: "Validation_Error",
            issues: validationResult.error.issues
        });
    }

    try {

        const task = await taskService.updateTask(
            taskId,
            validationResult.data
        );

        if (!task) {
            return res.status(404).json({
                error: "Task_Not_Found"
            });
        }

        return res.json({
            success: "Task_Updated",
            data: task
        });

    } catch (e) {

        return res.status(500).json({
            error: "Internal_Server_Error",
            message: "Could_Not_Update_Task"
        });

    }

};
exports.deleteTask = async (req, res) => {

    const taskId = req.params.id;

    try {

        const task = await taskService.deleteTask(taskId);

        if (!task) {
            return res.status(404).json({
                error: "Task_Not_Found"
            });
        }

        return res.json({
            success: "Task_Deleted",
            data: task
        });

    } catch (e) {

        return res.status(500).json({
            error: "Internal_Server_Error",
            message: "Could_Not_Delete_Task"
        });

    }

};
exports.deleteAllTasks = async (req, res) => {

    const columnId = req.params.id;

    try {

        const result = await taskService.deleteAllTasks(columnId);

        return res.json({
            success: "Tasks_Deleted",
            deletedCount: result.deletedCount
        });

    } catch (e) {

        return res.status(500).json({
            error: "Internal_Server_Error",
            message: "Could_Not_Delete_Tasks"
        });

    }

};



// taskRouter.put('/', isAdmin, (req, res) => {
//     // Implement update task  logic
// });

// taskRouter.delete('/', isAdmin, (req, res) => {
//     // Implement delete all tasks logic
// });

// taskRouter.delete('/:id', isAdmin, (req, res) => {
//     // Implement delete task by id logic
// });


// taskRouter.get('/', isAdmin, (req, res) => {
//     // Implement fetching all task logic
// });

// taskRouter.get('/:id', isAdmin, (req, res) => {
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
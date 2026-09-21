const { createTaskSchema, updateTaskSchema } = require("../validations/task");
const taskService = require("../services/task");
const mongoose = require("mongoose")

// Task CRUD Routes

// Create Task
exports.createTask = async (req, res) => {

    console.log("hiiiiiiiii")
    const columnId = req.params.columnId;
    const boardId = req.params.boardId;

    console.log(columnId)
    console.log(boardId)

    const result = createTaskSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            success: false,
            code: "VALIDATION_FAILED",
            message: "Invalid Task data provided.",
            issues: result.error.issues
        });
    }

    console.log(result.success)

    try {
        const task = await taskService.createTask(
            columnId,
            boardId,
            result.data
        );

        return res.status(201).json({
            success: true,
            code: "CREATED",
            message: "Task successfully created.",
            data: task
        });

    } catch (err) {
        console.log(err)
        if (err.code === 11000) {

            const field = Object.keys(err.keyPattern)[0];
            const value = Object.values(err.keyValue)[0];

            return res.status(409).json({
                success: false,
                code: "DUPLICATE_ENTITY",
                message: `A Task with this ${field} already exists.`,
                issues: [
                    {
                        field,
                        value
                    }
                ]
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create Task."
        });
    }
};


// Get All Tasks
exports.getAllTasks = async (req, res) => {

    const columnId = req.params.id;

    try {

        const tasks = await taskService.getAllTasks(columnId);

        return res.status(200).json({
            success: true,
            code: "FETCHED",
            message: "Tasks fetched successfully.",
            data: {
                tasks
            }
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch Tasks."
        });
    }
};


// Get Task Details
exports.getTaskDetails = async (req, res) => {

    const taskId = req.params.id;

    try {

        const task = await taskService.getTaskDetails(taskId);

        return res.status(200).json({
            success: true,
            code: "FETCHED",
            message: "Task details fetched successfully.",
            data: task
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Task not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch Task."
        });
    }
};


// Update Task
exports.updateTask = async (req, res) => {

    const taskId = req.params.id;

    const result = updateTaskSchema.safeParse(req.body);

    if (!result.success) {

        return res.status(400).json({
            success: false,
            code: "VALIDATION_FAILED",
            message: "Invalid Task update data.",
            issues: result.error.issues
        });
    }

    try {

        const task = await taskService.updateTask(
            taskId,
            result.data
        );

        return res.status(200).json({
            success: true,
            code: "UPDATED",
            message: "Task updated successfully.",
            data: task
        });

    } catch (err) {

        if (err.code === 11000) {

            const field = Object.keys(err.keyPattern)[0];
            const value = Object.values(err.keyValue)[0];

            return res.status(409).json({
                success: false,
                code: "DUPLICATE_ENTITY",
                message: `A Task with this ${field} already exists.`,
                issues: [
                    {
                        field,
                        value
                    }
                ]
            });
        }

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Task not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update Task."
        });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {

    const taskId = req.params.id;

    try {

        await taskService.deleteTask(taskId);

        return res.status(200).json({
            success: true,
            code: "DELETED",
            message: "Task deleted successfully."
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Task not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete Task."
        });
    }
};


// Delete All Tasks by Column
exports.deleteAllTasks = async (req, res) => {

    const columnId = req.params.id;

    if (!mongoose.isValidObjectId(columnId)) {
        return res.status(400).json({
            success: false,
            code: "INVALID_COLUMN_ID",
            message: "Invalid column ID."
        });
    }

    try {

        const result = await taskService.deleteAllTasks(columnId);

        return res.status(200).json({
            success: true,
            code: "DELETED",
            message: "All Tasks deleted successfully.",
            data: {
                deletedCount: result.deletedCount
            }
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete Tasks."
        });
    }
};
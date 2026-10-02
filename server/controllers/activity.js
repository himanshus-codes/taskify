const {
    createCommentSchema,
    updateCommentSchema
} = require("../validations/activity");

const activityService = require("../services/activity");

const mongoose = require("mongoose");


// Get Task Activity

exports.getTaskActivity = async (req, res) => {

    const taskId = req.params.taskId;

    if (!mongoose.isValidObjectId(taskId)) {

        return res.status(400).json({
            success: false,
            code: "INVALID_TASK_ID",
            message: "Invalid task ID."
        });
    }

    try {

        const activities =
            await activityService.getTaskActivity(taskId);

        return res.status(200).json({
            success: true,
            code: "FETCHED",
            message: "Task activity fetched successfully.",
            data: {
                activities
            }
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch Task activity."
        });
    }
};


// Create Comment

exports.createComment = async (req, res) => {

    const taskId = req.params.taskId;

    if (!mongoose.isValidObjectId(taskId)) {

        return res.status(400).json({
            success: false,
            code: "INVALID_TASK_ID",
            message: "Invalid task ID."
        });
    }

    const result = createCommentSchema.safeParse(
        req.body
    );

    if (!result.success) {

        return res.status(400).json({
            success: false,
            code: "VALIDATION_FAILED",
            message: "Invalid Comment data provided.",
            issues: result.error.issues
        });
    }

    try {

        const activity =
            await activityService.createComment(
                taskId,
                result.data
            );

        return res.status(201).json({
            success: true,
            code: "CREATED",
            message: "Comment successfully created.",
            data: activity
        });

    } catch (err) {

        if (err.message === "TASK_NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "TASK_NOT_FOUND",
                message: "Task not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create Comment."
        });
    }
};


// Update Comment

exports.updateComment = async (req, res) => {

    const activityId = req.params.id;

    if (!mongoose.isValidObjectId(activityId)) {

        return res.status(400).json({
            success: false,
            code: "INVALID_ACTIVITY_ID",
            message: "Invalid activity ID."
        });
    }

    const result = updateCommentSchema.safeParse(
        req.body
    );

    if (!result.success) {

        return res.status(400).json({
            success: false,
            code: "VALIDATION_FAILED",
            message: "Invalid Comment update data.",
            issues: result.error.issues
        });
    }

    try {

        const activity =
            await activityService.updateComment(
                activityId,
                result.data
            );

        return res.status(200).json({
            success: true,
            code: "UPDATED",
            message: "Comment updated successfully.",
            data: activity
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Comment not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update Comment."
        });
    }
};


// Delete Comment

exports.deleteComment = async (req, res) => {

    const activityId = req.params.id;

    if (!mongoose.isValidObjectId(activityId)) {

        return res.status(400).json({
            success: false,
            code: "INVALID_ACTIVITY_ID",
            message: "Invalid activity ID."
        });
    }

    try {

        await activityService.deleteComment(
            activityId
        );

        return res.status(200).json({
            success: true,
            code: "DELETED",
            message: "Comment deleted successfully."
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Comment not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete Comment."
        });
    }
};
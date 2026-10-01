const {
    createChecklistSchema,
    updateChecklistSchema,
    createChecklistItemSchema,
    updateChecklistItemSchema
} = require("../validations/checklist");

const checklistService = require("../services/checklist");

const mongoose = require("mongoose");


// Create Checklist

exports.createChecklist = async (req, res) => {

    const taskId = req.params.taskId;

    if (!mongoose.isValidObjectId(taskId)) {

        return res.status(400).json({
            success: false,
            code: "INVALID_TASK_ID",
            message: "Invalid task ID."
        });
    }


    const result = createChecklistSchema.safeParse(
        req.body
    );

    if (!result.success) {

        return res.status(400).json({
            success: false,
            code: "VALIDATION_FAILED",
            message: "Invalid Checklist data provided.",
            issues: result.error.issues
        });
    }


    try {

        const checklist =
            await checklistService.createChecklist(
                taskId,
                result.data
            );

        return res.status(201).json({
            success: true,
            code: "CREATED",
            message: "Checklist successfully created.",
            data: checklist
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
            message: "Failed to create Checklist."
        });
    }
};


// Get All Checklists

exports.getAllChecklists = async (req, res) => {

    const taskId = req.params.taskId;

    if (!mongoose.isValidObjectId(taskId)) {

        return res.status(400).json({
            success: false,
            code: "INVALID_TASK_ID",
            message: "Invalid task ID."
        });
    }


    try {

        const checklists =
            await checklistService.getAllChecklists(
                taskId
            );

        return res.status(200).json({
            success: true,
            code: "FETCHED",
            message: "Checklists fetched successfully.",
            data: {
                checklists
            }
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch Checklists."
        });
    }
};


// Get Checklist Details

exports.getChecklistDetails = async (req, res) => {

    const checklistId = req.params.id;

    if (!mongoose.isValidObjectId(checklistId)) {

        return res.status(400).json({
            success: false,
            code: "INVALID_CHECKLIST_ID",
            message: "Invalid checklist ID."
        });
    }


    try {

        const checklist =
            await checklistService.getChecklistDetails(
                checklistId
            );

        return res.status(200).json({
            success: true,
            code: "FETCHED",
            message: "Checklist details fetched successfully.",
            data: checklist
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Checklist not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch Checklist."
        });
    }
};


// Update Checklist

exports.updateChecklist = async (req, res) => {

    const checklistId = req.params.id;

    if (!mongoose.isValidObjectId(checklistId)) {

        return res.status(400).json({
            success: false,
            code: "INVALID_CHECKLIST_ID",
            message: "Invalid checklist ID."
        });
    }


    const result = updateChecklistSchema.safeParse(
        req.body
    );

    if (!result.success) {

        return res.status(400).json({
            success: false,
            code: "VALIDATION_FAILED",
            message: "Invalid Checklist update data.",
            issues: result.error.issues
        });
    }


    try {

        const checklist =
            await checklistService.updateChecklist(
                checklistId,
                result.data
            );

        return res.status(200).json({
            success: true,
            code: "UPDATED",
            message: "Checklist updated successfully.",
            data: checklist
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Checklist not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update Checklist."
        });
    }
};


// Delete Checklist

exports.deleteChecklist = async (req, res) => {

    const checklistId = req.params.id;

    if (!mongoose.isValidObjectId(checklistId)) {

        return res.status(400).json({
            success: false,
            code: "INVALID_CHECKLIST_ID",
            message: "Invalid checklist ID."
        });
    }


    try {

        await checklistService.deleteChecklist(
            checklistId
        );

        return res.status(200).json({
            success: true,
            code: "DELETED",
            message: "Checklist deleted successfully."
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Checklist not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete Checklist."
        });
    }
};


// Create Checklist Item

exports.createChecklistItem = async (req, res) => {

    const checklistId = req.params.checklistId;

    if (!mongoose.isValidObjectId(checklistId)) {

        return res.status(400).json({
            success: false,
            code: "INVALID_CHECKLIST_ID",
            message: "Invalid checklist ID."
        });
    }


    const result = createChecklistItemSchema.safeParse(
        req.body
    );

    if (!result.success) {

        return res.status(400).json({
            success: false,
            code: "VALIDATION_FAILED",
            message: "Invalid Checklist item data.",
            issues: result.error.issues
        });
    }


    try {

        const checklist =
            await checklistService.createChecklistItem(
                checklistId,
                result.data
            );

        return res.status(201).json({
            success: true,
            code: "CREATED",
            message: "Checklist item successfully created.",
            data: checklist
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Checklist not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create Checklist item."
        });
    }
};


// Update Checklist Item

exports.updateChecklistItem = async (req, res) => {

    const checklistId = req.params.checklistId;
    const itemId = req.params.itemId;

    if (
        !mongoose.isValidObjectId(checklistId) ||
        !mongoose.isValidObjectId(itemId)
    ) {

        return res.status(400).json({
            success: false,
            code: "INVALID_ID",
            message: "Invalid checklist or item ID."
        });
    }


    const result = updateChecklistItemSchema.safeParse(
        req.body
    );

    if (!result.success) {

        return res.status(400).json({
            success: false,
            code: "VALIDATION_FAILED",
            message: "Invalid Checklist item update data.",
            issues: result.error.issues
        });
    }


    try {

        const checklist =
            await checklistService.updateChecklistItem(
                checklistId,
                itemId,
                result.data
            );

        return res.status(200).json({
            success: true,
            code: "UPDATED",
            message: "Checklist item updated successfully.",
            data: checklist
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Checklist or item not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update Checklist item."
        });
    }
};


// Delete Checklist Item

exports.deleteChecklistItem = async (req, res) => {

    const checklistId = req.params.checklistId;
    const itemId = req.params.itemId;

    if (
        !mongoose.isValidObjectId(checklistId) ||
        !mongoose.isValidObjectId(itemId)
    ) {

        return res.status(400).json({
            success: false,
            code: "INVALID_ID",
            message: "Invalid checklist or item ID."
        });
    }


    try {

        const checklist =
            await checklistService.deleteChecklistItem(
                checklistId,
                itemId
            );

        return res.status(200).json({
            success: true,
            code: "DELETED",
            message: "Checklist item deleted successfully.",
            data: checklist
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Checklist or item not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete Checklist item."
        });
    }
};
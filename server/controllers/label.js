const {
    createLabelSchema,
    updateLabelSchema
} = require("../validations/label");

const labelService = require("../services/label");

const mongoose = require("mongoose");


// Create Label

exports.createLabel = async (req, res) => {

    const boardId = req.params.boardId;

    if (!mongoose.isValidObjectId(boardId)) {

        return res.status(400).json({
            success: false,
            code: "INVALID_BOARD_ID",
            message: "Invalid board ID."
        });
    }


    const result = createLabelSchema.safeParse(req.body);

    if (!result.success) {

        return res.status(400).json({
            success: false,
            code: "VALIDATION_FAILED",
            message: "Invalid Label data provided.",
            issues: result.error.issues
        });
    }


    try {

        const label = await labelService.createLabel(
            boardId,
            result.data
        );

        return res.status(201).json({
            success: true,
            code: "CREATED",
            message: "Label successfully created.",
            data: label
        });

    } catch (err) {

        if (err.code === 11000) {

            return res.status(409).json({
                success: false,
                code: "DUPLICATE_ENTITY",
                message: "A Label with this name already exists in this board.",
                issues: [
                    {
                        field: "name",
                        value: result.data.name
                    }
                ]
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create Label."
        });
    }
};


// Get All Labels

exports.getAllLabels = async (req, res) => {

    const boardId = req.params.boardId;

    if (!mongoose.isValidObjectId(boardId)) {

        return res.status(400).json({
            success: false,
            code: "INVALID_BOARD_ID",
            message: "Invalid board ID."
        });
    }


    try {

        const labels = await labelService.getAllLabels(
            boardId
        );

        return res.status(200).json({
            success: true,
            code: "FETCHED",
            message: "Labels fetched successfully.",
            data: {
                labels
            }
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch Labels."
        });
    }
};


// Get Label Details

exports.getLabelDetails = async (req, res) => {

    const labelId = req.params.id;

    if (!mongoose.isValidObjectId(labelId)) {

        return res.status(400).json({
            success: false,
            code: "INVALID_LABEL_ID",
            message: "Invalid label ID."
        });
    }


    try {

        const label = await labelService.getLabelDetails(
            labelId
        );

        return res.status(200).json({
            success: true,
            code: "FETCHED",
            message: "Label details fetched successfully.",
            data: label
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Label not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch Label."
        });
    }
};


// Update Label

exports.updateLabel = async (req, res) => {

    const labelId = req.params.id;


    if (!mongoose.isValidObjectId(labelId)) {

        return res.status(400).json({
            success: false,
            code: "INVALID_LABEL_ID",
            message: "Invalid label ID."
        });
    }


    const result = updateLabelSchema.safeParse(req.body);

    if (!result.success) {

        return res.status(400).json({
            success: false,
            code: "VALIDATION_FAILED",
            message: "Invalid Label update data.",
            issues: result.error.issues
        });
    }


    try {

        const label = await labelService.updateLabel(
            labelId,
            result.data
        );

        return res.status(200).json({
            success: true,
            code: "UPDATED",
            message: "Label updated successfully.",
            data: label
        });

    } catch (err) {

        if (err.code === 11000) {

            return res.status(409).json({
                success: false,
                code: "DUPLICATE_ENTITY",
                message: "A Label with this name already exists in this board.",
                issues: [
                    {
                        field: "name",
                        value: result.data.name
                    }
                ]
            });
        }


        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Label not found."
            });
        }


        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update Label."
        });
    }
};


// Delete Label

exports.deleteLabel = async (req, res) => {

    const labelId = req.params.id;


    if (!mongoose.isValidObjectId(labelId)) {

        return res.status(400).json({
            success: false,
            code: "INVALID_LABEL_ID",
            message: "Invalid label ID."
        });
    }


    try {

        await labelService.deleteLabel(labelId);

        return res.status(200).json({
            success: true,
            code: "DELETED",
            message: "Label deleted successfully."
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Label not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete Label."
        });
    }
};
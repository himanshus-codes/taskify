const { columnSchema, columnUpdateSchema } = require("../validations/column");
const columnService = require("../services/column");

exports.getColumns = async (req, res) => {

    const boardId = req.params.id;

    try {

        const columns = await columnService.getColumns(boardId);

        return res.status(200).json({
            success: true,
            code: "FETCHED",
            message: "Columns fetched successfully.",
            data: {
                columns
            }
        });

    } catch (err) {

        // if (err.message === "NO_COLUMNS_FOUND") {
        //     return res.status(404).json({
        //         success: false,
        //         code: "NOT_FOUND",
        //         message: "No columns found."
        //     });
        // }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch Columns."
        });
    }
};


exports.createColumn = async (req, res) => {

    const boardId = req.params.id;

    const result = columnSchema.safeParse(req.body);

    if (!result.success) {

        return res.status(400).json({
            success: false,
            code: "VALIDATION_FAILED",
            message: "Invalid Column data provided.",
            issues: result.error.issues
        });
    }

    try {

        const column = await columnService.createColumn(
            boardId,
            result.data
        );

        return res.status(201).json({
            success: true,
            code: "CREATED",
            message: "Column successfully created.",
            data: column
        });

    } catch (err) {
        console.log(err)

        if (err.code === 11000) {

            const field = Object.keys(err.keyPattern)[0];
            const value = Object.values(err.keyValue)[0];

            return res.status(409).json({
                success: false,
                code: "DUPLICATE_ENTITY",
                message: `A Column with this ${field} already exists.`,
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
            message: "Failed to create Column."
        });
    }
};


exports.createColumns = async (req, res) => {

    const boardId = req.params.id;

    if (!Array.isArray(req.body)) {

        return res.status(400).json({
            success: false,
            code: "VALIDATION_FAILED",
            message: "Invalid Columns data provided."
        });
    }

    const columns = [];

    for (const column of req.body) {

        const result = columnSchema.safeParse(column);

        if (!result.success) {

            return res.status(400).json({
                success: false,
                code: "VALIDATION_FAILED",
                message: "Invalid Columns data provided.",
                issues: result.error.issues
            });
        }

        columns.push(result.data);
    }

    try {

        const createdColumns = await columnService.createColumns(
            boardId,
            columns
        );

        return res.status(201).json({
            success: true,
            code: "CREATED",
            message: "Columns successfully created.",
            data: {
                columns: createdColumns
            }
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create Columns."
        });
    }
};


exports.getColumnDetails = async (req, res) => {

    const columnId = req.params.id;

    try {

        const column = await columnService.getColumnDetails(columnId);

        return res.status(200).json({
            success: true,
            code: "FETCHED",
            message: "Column details fetched successfully.",
            data: column
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Column not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch Column."
        });
    }
};


exports.updateColumn = async (req, res) => {

    const columnId = req.params.id;

    const result = columnUpdateSchema.safeParse(req.body);

    if (!result.success) {

        return res.status(400).json({
            success: false,
            code: "VALIDATION_FAILED",
            message: "Invalid Column update data.",
            issues: result.error.issues
        });
    }

    try {

        const column = await columnService.updateColumn(
            columnId,
            result.data
        );

        return res.status(200).json({
            success: true,
            code: "UPDATED",
            message: "Column updated successfully.",
            data: column
        });

    } catch (err) {

        if (err.code === 11000) {

            const field = Object.keys(err.keyPattern)[0];
            const value = Object.values(err.keyValue)[0];

            return res.status(409).json({
                success: false,
                code: "DUPLICATE_ENTITY",
                message: `A Column with this ${field} already exists.`,
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
                message: "Column not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update Column."
        });
    }
};


exports.deleteColumn = async (req, res) => {

    const columnId = req.params.id;

    try {

        await columnService.deleteColumn(columnId);

        return res.status(200).json({
            success: true,
            code: "DELETED",
            message: "Column deleted successfully."
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Column not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete Column."
        });
    }
};



exports.deleteColumns = async (req, res) => {

    const boardId = req.params.id;

    try {

        const result = await columnService.deleteColumns(boardId);

        return res.status(200).json({
            success: true,
            code: "DELETED",
            message: "All Columns deleted successfully.",
            data: {
                deletedCount: result.deletedCount
            }
        });

    } catch (err) {

        if (err.message === "NO_COLUMNS_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "No columns available to delete."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete Columns."
        });
    }
};

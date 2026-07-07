const {columnSchema, columnUpdateSchema} = require("../validations/column");
const columnService = require('../services/column');
const { success } = require("zod");

exports.getColumns = async (req, res)=>{
    const boardId = req.params.id;

    try{
        const data = await columnService.fetchColumns(boardId)

        return res.json({
            success:"All_Columns_Fetched",
            data: data
        })
    }catch(e){
        res.status(500).json({
            error:"Internal_Server_Error",
            message:"Could_Not_Fetch_Columns"
        })
    }
}
exports.createColumn = async (req, res) => {

    const boardId = req.params.id;

    const validationResult = columnSchema.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            error: "Validation_Error",
            issues: validationResult.error.issues
        });
    }

    try {

        const column = await columnService.createColumn(
            boardId,
            validationResult.data
        );

        return res.status(201).json({
            success: "Column_Created",
            data: column
        });

    } catch (err) {

        if (err.code === 11000) {
            return res.status(409).json({
                success: false,
                // message: "A column with this title already exists.",
                message: `A column with this ${Object.keys(err.keyPattern)[0]} already exists.`,
                field: Object.keys(err.keyPattern)[0], 
                value: Object.values(err.keyValue)[0], 
            });
        }

        return res.status(500).json({
            error: "Internal_Server_Error",
            message: "Could_Not_Create_Column"
        });

    }

};
exports.createColumns = async (req, res) => {

    const boardId = req.params.id;

    if (!Array.isArray(req.body)) {
        return res.status(400).json({
            error: "Validation_Error",
            message: "Body should be an array."
        });
    }

    const parsed = [];

    for (const col of req.body) {

        const result = columnSchema.safeParse(col);

        if (!result.success) {
            return res.status(400).json({
                error: "Validation_Error",
                issues: result.error.issues
            });
        }

        parsed.push(result.data);
    }

    try {

        const columns = await columnService.createColumns(
            boardId,
            parsed
        );

        return res.status(201).json({
            success: "Columns_Created",
            data: columns
        });

    } catch (e) {

        return res.status(500).json({
            error: "Internal_Server_Error",
            message: "Could_Not_Create_Columns"
        });

    }

};


exports.deleteColumns = async (req, res) => {

    const boardId = req.params.id;

    try {

        const result = await columnService.deleteColumns(boardId);

        return res.json({
            success: "Columns_Deleted",
            deletedCount: result.deletedCount
        });

    } catch (e) {

        return res.status(500).json({
            error: "Internal_Server_Error",
            message: "Could_Not_Delete_Columns"
        });

    }

};

exports.getColumnDetails = async (req, res) => {

    const columnId = req.params.id;

    try {

        const column = await columnService.getColumnDetails(columnId);

        if (!column) {
            return res.status(404).json({
                error: "Not_Found"
            });
        }

        return res.json({
            success: "Column_Details_Fetched",
            data: column
        });

    } catch (e) {

        return res.status(500).json({
            error: "Internal_Server_Error"
        });

    }

};
exports.updateColumn = async (req, res) => {

    const columnId = req.params.id;

    const validationResult = columnUpdateSchema.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            error: "Validation_Error",
            issues: validationResult.error.issues
        });
    }

    try {

        const column = await columnService.updateColumn(
            columnId,
            validationResult.data
        );

        if (!column) {
            return res.status(404).json({
                error: "Not_Found"
            });
        }

        return res.json({
            success: "Column_Updated",
            data: column
        });

    } catch (err) {

        if (err.code === 11000) {
            return res.status(409).json({
                success: false,
                message: `A column with this ${Object.keys(err.keyPattern)[0]} already exists.`,
                field: Object.keys(err.keyPattern)[0], // "task"
                value: Object.values(err.keyValue)[0], // "task title"
            });
        }

        return res.status(500).json({
            error: "Internal_Server_Error"
        });

    }

};
exports.deleteColumn = async (req, res) => {

    const columnId = req.params.id;

    try {

        const column = await columnService.deleteColumn(columnId);

        if (!column) {
            return res.status(404).json({
                error: "Not_Found"
            });
        }

        return res.json({
            success: "Column_Deleted",
            data: column
        });

    } catch (e) {

        return res.status(500).json({
            error: "Internal_Server_Error"
        });

    }

};
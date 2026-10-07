const { createBoardSchema, updateBoardSchema } = require("../validations/board.js");
const boardService = require("../services/board.js");

// Kanban Dashboard
exports.getDashboard = async (req, res) => {

    const boardId = req.params.id;

    try {

        const dashboard = await boardService.dashboardBuilder(boardId);

        return res.status(200).json({
            success: true,
            code: "FETCHED",
            message: "Board dashboard fetched successfully.",
            data: dashboard
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {
            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Board not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch Board dashboard."
        });
    }
};


// Create Board
exports.createBoard = async (req, res) => {

    console.log("hiiiiiiiiiiiiiii")
    console.log("req boardController", req.url);

    const result = createBoardSchema.safeParse(req.body);

    if (!result.success) {

        return res.status(400).json({
            success: false,
            code: "VALIDATION_FAILED",
            message: "Invalid Board data provided.",
            issues: result.error.issues
        });
    }
    const workspaceId = req.params.id
    const userId = req.userData._id;

    try {

        const board = await boardService.createBoard(userId, workspaceId, result.data);

        console.log(board);

        return res.status(201).json({
            success: true,
            code: "CREATED",
            message: "Board successfully created.",
            data: board
        });

    } catch (err) {

        console.log(err);

        if (err.code === 11000) {

            const field = Object.keys(err.keyPattern)[0];
            const value = Object.values(err.keyValue)[0];

            return res.status(409).json({
                success: false,
                code: "DUPLICATE_ENTITY",
                message: `A Board with this ${field} already exists.`,
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
            message: "Failed to create Board."
        });
    }
};


// Get Boards
exports.getBoards = async (req, res) => {

    console.log("req received GetBoards");

    const userId = req.userData._id;

    try {

        const boards = await boardService.getBoards(userId);

        console.log(boards);

        return res.status(200).json({
            success: true,
            code: "FETCHED",
            message: "Boards fetched successfully.",
            data: {
                boards
            }
        });

    } catch (err) {

        if (err.message === "NO_BOARDS_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "No boards found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch Boards."
        });
    }
};


// Redundant
exports.getBoard = async (req, res) => {

    console.log("req received GetBoards");

    const boardId = req.params.id;

    console.log(typeof (req.params.id));

    try {

        const board = await boardService.getBoardDetails(boardId);

        return res.status(200).json({
            success: true,
            code: "FETCHED",
            message: "Board details fetched successfully.",
            data: board
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Board not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch Board."
        });
    }
};


// Update Board
exports.updateBoard = async (req, res) => {

    const result = updateBoardSchema.safeParse(req.body);

    const boardId = req.params.id;

    if (!result.success) {

        return res.status(400).json({
            success: false,
            code: "VALIDATION_FAILED",
            message: "Invalid Board update data.",
            issues: result.error.issues
        });
    }

    try {

        const board = await boardService.updateBoard(
            boardId,
            result.data
        );

        return res.status(200).json({
            success: true,
            code: "UPDATED",
            message: "Board updated successfully.",
            data: board
        });

    } catch (err) {

        if (err.code === 11000) {

            const field = Object.keys(err.keyPattern)[0];
            const value = Object.values(err.keyValue)[0];

            return res.status(409).json({
                success: false,
                code: "DUPLICATE_ENTITY",
                message: `A Board with this ${field} already exists.`,
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
                message: "Board not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update Board."
        });
    }
};


// Delete Board
exports.deleteBoard = async (req, res) => {

    const boardId = req.params.id;

    try {

        await boardService.deleteBoard(boardId);

        return res.status(200).json({
            success: true,
            code: "DELETED",
            message: "Board deleted successfully."
        });

    } catch (err) {

        if (err.message === "NOT_FOUND") {

            return res.status(404).json({
                success: false,
                code: "NOT_FOUND",
                message: "Board not found."
            });
        }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete Board."
        });
    }
};


// Delete All Boards
exports.deleteBoards = async (req, res) => {

    const userId = req.userData._id;

    try {

        const result = await boardService.deleteBoards(userId);

        return res.status(200).json({
            success: true,
            code: "DELETED",
            message: "All Boards deleted successfully.",
            data: {
                deletedCount: result.deletedCount
            }
        });

    } catch (err) {

        // if (err.message === "NO_BOARDS_FOUND") {

        //     return res.status(404).json({
        //         success: false,
        //         code: "NOT_FOUND",
        //         message: "No boards available to delete."
        //     });
        // }

        return res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete Boards."
        });
    }
};







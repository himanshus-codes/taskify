const { Board } = require("../models/Board");
const { Column } = require("../models/Column");
const { Task } = require("../models/Task");
const mongoose = require("mongoose");


exports.dashboardBuilder = async (boardId) => {

    const board = await Board.findById(boardId);

    if (!board) {
        throw new Error("NOT_FOUND");
    }

    console.log("------------------------------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------------------------------");
    console.log("board", board);

    const columns = await Column.find({ boardId });

    const columnIds = columns.map((column) => column._id);

    console.log("columnIds", columnIds);

    const tasks = await Task.find({
        columnId: {
            $in: columnIds
        }
    });

    console.log("Tasks ", tasks);

    const columnsWithTasks = columns.map((column) => {

        const columnTasks = tasks.filter((task) => {
            return task.columnId.toString() === column._id.toString();
        });

        return {
            ...column.toObject(),
            tasks: columnTasks
        };
    });

    console.log("columns with tasks", columnsWithTasks);

    return {
        board,
        columns: columnsWithTasks
    };
};


exports.createBoard = async (userId, data) => {

    const board = await Board.create({
        title: data.title,
        description: data.description,
        userId
    });

    console.log(board);

    return board;
};


exports.getBoards = async (userId) => {

    const boards = await Board.find({
        userId
    });

    console.log("---------------------------------------------");
    console.log(boards);

    if (boards.length === 0) {
        throw new Error("NO_BOARDS_FOUND");
    }

    return boards;
};


// Redundant service
exports.getBoardDetails = async (boardId) => {

    // if (!mongoose.isValidObjectId(boardId)) {
    //     throw new Error("NOT_FOUND");
    // }

    const board = await Board.findById(boardId);

    if (!board) {
        throw new Error("NOT_FOUND");
    }

    return board;
};


exports.updateBoard = async (boardId, updates) => {

    const board = await Board.findByIdAndUpdate(
        boardId,
        { $set: updates },
        { new: true }
    );

    if (!board) {
        throw new Error("NOT_FOUND");
    }

    return board;
};


exports.deleteBoard = async (boardId) => {

    const board = await Board.findByIdAndDelete(boardId);

    if (!board) {
        throw new Error("NOT_FOUND");
    }

    return board;
};


exports.deleteBoards = async (userId) => {

    const result = await Board.deleteMany({
        userId
    });

    // if (result.deletedCount === 0) {
    //     throw new Error("NO_BOARDS_FOUND");
    // }

    return result;
};
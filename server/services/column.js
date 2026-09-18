const { Column } = require("../models/Column.js");
const mongoose = require("mongoose");
const {Task} = require("../models/Task.js")

exports.getColumns = async (boardId) => {

    const columns = await Column.find({
        boardId
    }).sort({
        order: 1
    });

    // if (columns.length === 0) {
    //     throw new Error("NO_COLUMNS_FOUND");
    // }

    return columns;
};


exports.createColumn = async (boardId, data) => {

    const column = await Column.create({
        title: data.title,
        // order: data.order,
        boardId
    });

    return column;
};


exports.createColumns = async (boardId, columns) => {

    const documents = columns.map((column) => ({
        title: column.title,
        order: column.order,
        boardId
    }));

    const createdColumns = await Column.insertMany(documents);

    return createdColumns;
};


exports.deleteColumns = async (boardId) => {

    const result = await Column.deleteMany({
        boardId
    });

    // if (result.deletedCount === 0) {
    //     throw new Error("NO_COLUMNS_FOUND");
    // }

    return result;
};


exports.getColumnDetails = async (columnId) => {

    // if (!mongoose.isValidObjectId(columnId)) {
    //     throw new Error("NOT_FOUND");
    // }

    const column = await Column.findById(columnId);

    if (!column) {
        throw new Error("NOT_FOUND");
    }

    return column;
};


exports.updateColumn = async (columnId, updates) => {

    const column = await Column.findByIdAndUpdate(
        columnId,
        { $set: updates },
        {
            new: true,
            runValidators: true
        }
    );

    if (!column) {
        throw new Error("NOT_FOUND");
    }

    return column;
};

// delete column and it's tasks
exports.deleteColumn = async (columnId) => {

     // 1. Check if the column exists first
    const column = await Column.findById(columnId);
    
    if (!column) {
        throw new Error("NOT_FOUND");
    }

    // 2. Delete the column and all associated tasks simultaneously in parallel using promise.all
    await Promise.all([
        Column.findByIdAndDelete(columnId),
        Task.deleteMany({ columnId })
    ]);


    // old code

    // const column = await Column.findByIdAndDelete(columnId);
    
    // await Task.deleteMany({
    //     columnId
    // });
    
    // if (!column) {
    //     throw new Error("NOT_FOUND");
    // }

    return column;
};
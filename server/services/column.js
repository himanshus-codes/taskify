const { Column } = require("../models/Column.js");
const mongoose = require("mongoose");


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


exports.deleteColumn = async (columnId) => {

    const column = await Column.findByIdAndDelete(columnId);

    if (!column) {
        throw new Error("NOT_FOUND");
    }

    return column;
};
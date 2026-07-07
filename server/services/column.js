const {Column} = require("../models/Column.js");

exports.fetchColumns = async (boardId) => {
    return await Column.find({ boardId }).sort({ order: 1 });
};

exports.createColumn = async (boardId, data) => {
    return await Column.create({
        title: data.title,
        order: data.order,
        boardId
    });
};

exports.createColumns = async (boardId, columns) => {
    const docs = columns.map(col => ({
        title: col.title,
        order: col.order,
        boardId
    }));

    return await Column.insertMany(docs);
};

exports.deleteColumns = async (boardId) => {
    return await Column.deleteMany({ boardId });
};

exports.getColumnDetails = async (columnId) => {
    return await Column.findById(columnId);
};

exports.updateColumn = async (columnId, updates) => {
    return await Column.findByIdAndUpdate(
        columnId,
        updates,
        {
            new: true,
            runValidators: true
        }
    );
};

exports.deleteColumn = async (columnId) => {
    return await Column.findByIdAndDelete(columnId);
};
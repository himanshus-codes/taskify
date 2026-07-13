const { Task } = require("../models/Task");
const mongoose = require("mongoose");


exports.createTask = async (columnId, data) => {

    const taskData = new Task({
        title: data.title,
        description: data.description,
        priority: data.priority,
        columnId
    });

    const newTask = await taskData.save();

    console.log(newTask);

    console.log(newTask);

    return newTask;
};


exports.getAllTasks = async (columnId) => {

    const tasks = await Task.find({
        columnId
    });

    return tasks;
};


exports.deleteAllTasks = async (columnId) => {

    const result = await Task.deleteMany({
        columnId
    });

    return result;
};


exports.getTaskDetails = async (taskId) => {

    // if (!mongoose.isValidObjectId(taskId)) {
    //     throw new Error("NOT_FOUND");
    // }

    const task = await Task.findById(taskId);

    if (!task) {
        throw new Error("NOT_FOUND");
    }

    return task;
};


exports.updateTask = async (taskId, updates) => {

    const task = await Task.findByIdAndUpdate(
        taskId,
        { $set: updates },
        {
            new: true,
            runValidators: true
        }
    );

    if (!task) {
        throw new Error("NOT_FOUND");
    }

    return task;
};


exports.deleteTask = async (taskId) => {

    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
        throw new Error("NOT_FOUND");
    }

    return task;
};
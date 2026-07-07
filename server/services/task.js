const {Task} = require('../models/Task.js')
const mongoose = require('mongoose')


exports.createTask = async (columnId, data)=>{



    let taskData = new Task({
        title: data.title,
        description: data.description,
        priority: data.priority,
        columnId
    })

    let newTask = await taskData.save()
    console.log(newTask)

    console.log(newTask)

    return newTask
}

exports.fetchAllTasks = async (columnId) => {
    return await Task.find({ columnId });
};

exports.deleteAllTasks = async (columnId) => {
    return await Task.deleteMany({ columnId });
};

exports.getTaskDetails = async (taskId) => {
    return await Task.findById(taskId);
};

exports.updateTask = async (taskId, updates) => {
    return await Task.findByIdAndUpdate(
        taskId,
        updates,
        {
            new: true,
            runValidators: true
        }
    );
};

exports.deleteTask = async (taskId) => {
    return await Task.findByIdAndDelete(taskId);
};
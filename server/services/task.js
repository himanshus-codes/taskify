const { Task } = require("../models/Task");
const mongoose = require("mongoose");



const {
    recordActivityEvent
} = require("../utils/activityEventRecorder");

const {
    recordTaskUpdateActivity
} = require("../utils/taskActivityRecorder");


// --------------------------------------------------
// Create Task
// --------------------------------------------------

exports.createTask = async (
    columnId,
    boardId,
    data,
    userId
) => {

    const taskData = new Task({

        title: data.title,

        description: data.description,

        priority: data.priority,

        status: data.status,

        labels: data.labels,

        startDate: data.startDate,

        targetDate: data.targetDate,

        order: data.order,

        boardId,

        columnId
    });


    const newTask = await taskData.save();


    await recordActivityEvent({

        taskId: newTask._id,

        actorId: userId,

        eventType: "task-created",

        metadata: {
            title: newTask.title
        }
    });


    return newTask;
};


// --------------------------------------------------
// Get All Tasks
// --------------------------------------------------

exports.getAllTasks = async (columnId) => {

    const tasks = await Task.find({
        columnId
    });

    return tasks;
};


// --------------------------------------------------
// Delete All Tasks
// --------------------------------------------------

exports.deleteAllTasks = async (columnId) => {

    const result = await Task.deleteMany({
        columnId
    });

    return result;
};


// --------------------------------------------------
// Get Task
// --------------------------------------------------

exports.getTaskDetails = async (taskId) => {

    const task = await Task.findById(taskId);

    if (!task) {
        throw new Error("NOT_FOUND");
    }

    return task;
};


// --------------------------------------------------
// Update Task
// --------------------------------------------------

exports.updateTask = async (
    taskId,
    updates,
    userId
) => {

    // First capture the previous state.
    const beforeTask = await Task.findById(
        taskId
    );


    if (!beforeTask) {
        throw new Error("NOT_FOUND");
    }


    const afterTask = await Task.findByIdAndUpdate(

        taskId,

        {
            $set: updates
        },

        {
            new: true,
            runValidators: true
        }
    );


    if (!afterTask) {
        throw new Error("NOT_FOUND");
    }


    await recordTaskUpdateActivity({

        beforeTask,

        afterTask,

        updates,

        actorId: userId
    });


    return afterTask;
};


// --------------------------------------------------
// Delete Task
// --------------------------------------------------

exports.deleteTask = async (
    taskId
) => {

    const task = await Task.findByIdAndDelete(
        taskId
    );


    if (!task) {
        throw new Error("NOT_FOUND");
    }


    return task;
};














// exports.createTask = async (columnId,boardId, data) => {

//     console.log("req rec")

//     const taskData = new Task({
//         title: data.title,
//         description: data.description,
//         priority: data.priority,
//         order:data.order,
//         boardId,
//         columnId
//     });

//     const newTask = await taskData.save();

//     console.log(newTask);

//     console.log(newTask);

//     return newTask;
// };



// exports.createTask = async (columnId, boardId, data) => {

//     console.log("req rec");

//     const taskData = new Task({

//         title: data.title,

//         description: data.description,

//         priority: data.priority,

//         status: data.status,

//         labels: data.labels,

//         startDate: data.startDate,

//         targetDate: data.targetDate,

//         order: data.order,

//         boardId,

//         columnId
//     });

//     const newTask = await taskData.save();

//     console.log(newTask);

//     return newTask;
// };

// exports.getAllTasks = async (columnId) => {

//     const tasks = await Task.find({
//         columnId
//     });

//     return tasks;
// };

// // delete all tasks belonging to a column
// exports.deleteAllTasks = async (columnId) => {

//     const result = await Task.deleteMany({
//         columnId
//     });

//     return result;
// };


// exports.getTaskDetails = async (taskId) => {

//     // if (!mongoose.isValidObjectId(taskId)) {
//     //     throw new Error("NOT_FOUND");
//     // }

//     const task = await Task.findById(taskId);

//     if (!task) {
//         throw new Error("NOT_FOUND");
//     }

//     return task;
// };


// exports.updateTask = async (taskId, updates) => {

//     const task = await Task.findByIdAndUpdate(
//         taskId,
//         { $set: updates },
//         {
//             new: true,
//             runValidators: true
//         }
//     );

//     if (!task) {
//         throw new Error("NOT_FOUND");
//     }

//     return task;
// };


// exports.deleteTask = async (taskId) => {

//     const task = await Task.findByIdAndDelete(taskId);

//     if (!task) {
//         throw new Error("NOT_FOUND");
//     }

//     return task;
// };
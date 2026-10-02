const { Activity } = require("../models/Activity");
const { Task } = require("../models/Task");


// Get Activity for Task

exports.getTaskActivity = async (taskId) => {

    const activities = await Activity.find({
        taskId
    })
    .sort({
        createdAt: 1
    });

    return activities;
};


// Create Comment

exports.createComment = async (taskId, data) => {

    const task = await Task.findById(taskId);

    if (!task) {
        throw new Error("TASK_NOT_FOUND");
    }

    const activity = new Activity({
        taskId,
        type: "comment",
        comment: data.comment
    });

    const newActivity = await activity.save();

    return newActivity;
};


// Update Comment

exports.updateComment = async (activityId, data) => {

    const activity = await Activity.findOneAndUpdate(
        {
            _id: activityId,
            type: "comment"
        },
        {
            $set: {
                comment: data.comment
            }
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!activity) {
        throw new Error("NOT_FOUND");
    }

    return activity;
};


// Delete Comment

exports.deleteComment = async (activityId) => {

    const activity = await Activity.findOneAndDelete({
        _id: activityId,
        type: "comment"
    });

    if (!activity) {
        throw new Error("NOT_FOUND");
    }

    return activity;
};


// Internal Event Creation

exports.createEvent = async (
    taskId,
    eventType,
    metadata = null
) => {

    const activity = new Activity({
        taskId,
        type: "event",
        eventType,
        metadata
    });

    const newActivity = await activity.save();

    return newActivity;
};




const { Checklist } = require("../models/Checklist");
const { Task } = require("../models/Task");


// Create Checklist

exports.createChecklist = async (taskId, data) => {

    const task = await Task.findById(taskId);

    if (!task) {
        throw new Error("TASK_NOT_FOUND");
    }

    const checklistData = new Checklist({
        taskId,
        title: data.title,
        items: []
    });

    const newChecklist = await checklistData.save();

    return newChecklist;
};


// Get All Checklists belonging to Task

exports.getAllChecklists = async (taskId) => {

    const checklists = await Checklist.find({
        taskId
    });

    return checklists;
};


// Get Checklist Details

exports.getChecklistDetails = async (checklistId) => {

    const checklist = await Checklist.findById(
        checklistId
    );

    if (!checklist) {
        throw new Error("NOT_FOUND");
    }

    return checklist;
};


// Update Checklist

exports.updateChecklist = async (
    checklistId,
    updates
) => {

    const checklist = await Checklist.findByIdAndUpdate(
        checklistId,
        {
            $set: updates
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!checklist) {
        throw new Error("NOT_FOUND");
    }

    return checklist;
};


// Delete Checklist

exports.deleteChecklist = async (checklistId) => {

    const checklist = await Checklist.findByIdAndDelete(
        checklistId
    );

    if (!checklist) {
        throw new Error("NOT_FOUND");
    }

    return checklist;
};


// Create Checklist Item

exports.createChecklistItem = async (
    checklistId,
    data
) => {

    const checklist = await Checklist.findById(
        checklistId
    );

    if (!checklist) {
        throw new Error("NOT_FOUND");
    }

    checklist.items.push({
        text: data.text,
        checked: data.checked,
        order: data.order
    });

    await checklist.save();

    return checklist;
};


// Update Checklist Item

exports.updateChecklistItem = async (
    checklistId,
    itemId,
    updates
) => {

    const checklist = await Checklist.findOneAndUpdate(
        {
            _id: checklistId,
            "items._id": itemId
        },
        {
            $set: Object.fromEntries(
                Object.entries(updates).map(
                    ([key, value]) => [
                        `items.$.${key}`,
                        value
                    ]
                )
            )
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!checklist) {
        throw new Error("NOT_FOUND");
    }

    return checklist;
};


// Delete Checklist Item

exports.deleteChecklistItem = async (
    checklistId,
    itemId
) => {

    const checklist = await Checklist.findOneAndUpdate(
        {
            _id: checklistId,
            "items._id": itemId
        },
        {
            $pull: {
                items: {
                    _id: itemId
                }
            }
        },
        {
            new: true
        }
    );

    if (!checklist) {
        throw new Error("NOT_FOUND");
    }

    return checklist;
};
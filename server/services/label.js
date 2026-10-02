const { Label } = require("../models/Label");
const { Task } = require("../models/Task");

// Create Label

exports.createLabel = async (boardId, data) => {

    const labelData = new Label({
        name: data.name,
        color: data.color,
        boardId
    });

    const newLabel = await labelData.save();

    return newLabel;
};


// Get All Labels belonging to Board

exports.getAllLabels = async (boardId) => {

    const labels = await Label.find({
        boardId
    }).sort({
        name: 1
    });

    return labels;
};


// Get Label Details

exports.getLabelDetails = async (labelId) => {

    const label = await Label.findById(labelId);

    if (!label) {
        throw new Error("NOT_FOUND");
    }

    return label;
};


// Update Label

exports.updateLabel = async (labelId, updates) => {

    const label = await Label.findByIdAndUpdate(
        labelId,
        {
            $set: updates
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!label) {
        throw new Error("NOT_FOUND");
    }

    return label;
};


// Delete Label

exports.deleteLabel = async (labelId) => {

    const label = await Label.findByIdAndDelete(labelId);

    if (!label) {
        throw new Error("NOT_FOUND");
    }


    // Remove this label reference from
    // every task that currently uses it.

    await Task.updateMany(
        {
            labels: labelId
        },
        {
            $pull: {
                labels: labelId
            }
        }
    );


    // Note:2 transactions

    // delete Label (delete label from labels collection)
    //  ↓
    // $pull labelId from Tasks (delete labelid of the label being deleted from each task which was using it)

    // If the first succeeds and the second fails, you can still end up inconsistent
    // so better approach is mongoose session based transactions

    return label;
};
const { Checklist } = require("../models/CheckList.js");
const { Task } = require("../models/Task");


const {
    recordActivityEvent
} = require("../utils/activityEventRecorder");

const {
    recordChecklistCompletionTransition,
    recordChecklistUpdated
} = require("../utils/checklistActivityRecorder");


// --------------------------------------------------
// Create Checklist
// --------------------------------------------------

exports.createChecklist = async (
    taskId,
    data,
    userId
) => {

    const task = await Task.findById(taskId);


    if (!task) {
        throw new Error("TASK_NOT_FOUND");
    }


    const checklistData = new Checklist({

        taskId,

        title: data.title,

        items: []
    });


    const newChecklist =
        await checklistData.save();


    await recordActivityEvent({

        taskId: newChecklist.taskId,

        actorId: userId,

        eventType: "checklist-created",

        metadata: {
            checklistId: newChecklist._id,

            title: newChecklist.title
        }
    });


    return newChecklist;
};


// --------------------------------------------------
// Get All Checklists
// --------------------------------------------------

exports.getAllChecklists = async (taskId) => {

    const checklists = await Checklist.find({
        taskId
    });

    return checklists;
};


// --------------------------------------------------
// Get Checklist Details
// --------------------------------------------------

exports.getChecklistDetails = async (
    checklistId
) => {

    const checklist = await Checklist.findById(
        checklistId
    );


    if (!checklist) {
        throw new Error("NOT_FOUND");
    }


    return checklist;
};


// --------------------------------------------------
// Update Checklist
// --------------------------------------------------

exports.updateChecklist = async (
    checklistId,
    updates,
    userId
) => {

    const beforeChecklist =
        await Checklist.findById(
            checklistId
        );


    if (!beforeChecklist) {
        throw new Error("NOT_FOUND");
    }


    const afterChecklist =
        await Checklist.findByIdAndUpdate(

            checklistId,

            {
                $set: updates
            },

            {
                new: true,
                runValidators: true
            }
        );


    if (!afterChecklist) {
        throw new Error("NOT_FOUND");
    }


    const completionEventCreated =
        await recordChecklistCompletionTransition({

            beforeChecklist,

            afterChecklist,

            actorId: userId
        });


    const otherUpdates =
        Object.keys(updates).filter(
            field => field !== "completed"
        );


    const hasOtherUpdates =
        otherUpdates.some(
            field =>
                String(
                    beforeChecklist[field]
                ) !==
                String(
                    afterChecklist[field]
                )
        );


    const completedChanged =
        Boolean(beforeChecklist.completed) !==
        Boolean(afterChecklist.completed);


    if (
        hasOtherUpdates ||
        (
            completedChanged &&
            !completionEventCreated
        )
    ) {

        await recordChecklistUpdated({

            checklist: afterChecklist,

            actorId: userId,

            metadata: {
                changes: updates
            }
        });
    }


    return afterChecklist;
};


// --------------------------------------------------
// Delete Checklist
// --------------------------------------------------

exports.deleteChecklist = async (
    checklistId,
    userId
) => {

    const checklist =
        await Checklist.findByIdAndDelete(
            checklistId
        );


    if (!checklist) {
        throw new Error("NOT_FOUND");
    }


    await recordActivityEvent({

        taskId: checklist.taskId,

        actorId: userId,

        eventType: "checklist-deleted",

        metadata: {
            checklistId: checklist._id,

            title: checklist.title
        }
    });


    return checklist;
};


// --------------------------------------------------
// Create Checklist Item
// --------------------------------------------------

    // exports.createChecklistItem = async (
    //     checklistId,
    //     data,
    //     userId
    // ) => {

    //     const checklist =
    //         await Checklist.findById(
    //             checklistId
    //         );


    //     if (!checklist) {
    //         throw new Error("NOT_FOUND");
    //     }


    //     checklist.items.push({

    //         text: data.text,

    //         checked: data.checked,

    //         order: data.order
    //     });


    //     await checklist.save();


    //     await recordChecklistUpdated({

    //         checklist,

    //         actorId: userId,

    //         metadata: {

    //             change: "item-added",

    //             item: checklist.items[
    //                 checklist.items.length - 1
    //             ]
    //         }
    //     });


    //     return checklist;
    // };


    exports.createChecklistItem = async (
        checklistId,
        data,
        userId
    ) => {

        const checklist =
            await Checklist.findById(
                checklistId
            );


        if (!checklist) {
            throw new Error("NOT_FOUND");
        }


        const createdItem =
            checklist.items.create({

                text: data.text,

                checked: data.checked,

                order: data.order
            });


        checklist.items.push(
            createdItem
        );


        await checklist.save();


        await recordChecklistUpdated({

            checklist,

            actorId: userId,

            metadata: {

                change: "item-added",

                item: createdItem
            }
        });


        return createdItem;
    };
// --------------------------------------------------
// Update Checklist Item
// --------------------------------------------------

exports.updateChecklistItem = async (
    checklistId,
    itemId,
    updates,
    userId
) => {

    const beforeChecklist =
        await Checklist.findOne({

            _id: checklistId,

            "items._id": itemId
        });


    if (!beforeChecklist) {
        throw new Error("NOT_FOUND");
    }


    const beforeItem =
        beforeChecklist.items.id(itemId);


    const checklist =
        await Checklist.findOneAndUpdate(

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


    const completedEventCreated =
        await recordChecklistCompletionTransition({

            beforeChecklist,

            afterChecklist: checklist,

            actorId: userId
        });


    if (!completedEventCreated) {

        const afterItem =
            checklist.items.id(itemId);


        await recordChecklistUpdated({

            checklist,

            actorId: userId,

            metadata: {

                change: "item-updated",

                itemId,

                changes: {

                    before: beforeItem,

                    after: afterItem
                }
            }
        });
    }


    return checklist;
};


// --------------------------------------------------
// Delete Checklist Item
// --------------------------------------------------

exports.deleteChecklistItem = async (
    checklistId,
    itemId,
    userId
) => {

    const beforeChecklist =
        await Checklist.findOne({

            _id: checklistId,

            "items._id": itemId
        });


    if (!beforeChecklist) {
        throw new Error("NOT_FOUND");
    }


    const deletedItem =
        beforeChecklist.items.id(itemId);


    const checklist =
        await Checklist.findOneAndUpdate(

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


    const completedEventCreated =
        await recordChecklistCompletionTransition({

            beforeChecklist,

            afterChecklist: checklist,

            actorId: userId
        });


    if (!completedEventCreated) {

        await recordChecklistUpdated({

            checklist,

            actorId: userId,

            metadata: {

                change: "item-deleted",

                item: deletedItem
            }
        });
    }


    return checklist;
};

// // Create Checklist

// exports.createChecklist = async (taskId, data) => {

//     const task = await Task.findById(taskId);

//     if (!task) {
//         throw new Error("TASK_NOT_FOUND");
//     }

//     const checklistData = new Checklist({
//         taskId,
//         title: data.title,
//         items: []
//     });

//     const newChecklist = await checklistData.save();

//     return newChecklist;
// };


// // Get All Checklists belonging to Task

// exports.getAllChecklists = async (taskId) => {

//     const checklists = await Checklist.find({
//         taskId
//     });

//     return checklists;
// };


// // Get Checklist Details

// exports.getChecklistDetails = async (checklistId) => {

//     const checklist = await Checklist.findById(
//         checklistId
//     );

//     if (!checklist) {
//         throw new Error("NOT_FOUND");
//     }

//     return checklist;
// };


// // Update Checklist

// exports.updateChecklist = async (
//     checklistId,
//     updates
// ) => {

//     const checklist = await Checklist.findByIdAndUpdate(
//         checklistId,
//         {
//             $set: updates
//         },
//         {
//             new: true,
//             runValidators: true
//         }
//     );

//     if (!checklist) {
//         throw new Error("NOT_FOUND");
//     }

//     return checklist;
// };


// // Delete Checklist

// exports.deleteChecklist = async (checklistId) => {

//     const checklist = await Checklist.findByIdAndDelete(
//         checklistId
//     );

//     if (!checklist) {
//         throw new Error("NOT_FOUND");
//     }

//     return checklist;
// };


// // Create Checklist Item

// exports.createChecklistItem = async (
//     checklistId,
//     data
// ) => {

//     const checklist = await Checklist.findById(
//         checklistId
//     );

//     if (!checklist) {
//         throw new Error("NOT_FOUND");
//     }

//     checklist.items.push({
//         text: data.text,
//         checked: data.checked,
//         order: data.order
//     });

//     await checklist.save();

//     return checklist;
// };


// // Update Checklist Item

// exports.updateChecklistItem = async (
//     checklistId,
//     itemId,
//     updates
// ) => {

//     const checklist = await Checklist.findOneAndUpdate(
//         {
//             _id: checklistId,
//             "items._id": itemId
//         },
//         {
//             $set: Object.fromEntries(
//                 Object.entries(updates).map(
//                     ([key, value]) => [
//                         `items.$.${key}`,
//                         value
//                     ]
//                 )
//             )
//         },
//         {
//             new: true,
//             runValidators: true
//         }
//     );

//     if (!checklist) {
//         throw new Error("NOT_FOUND");
//     }

//     return checklist;
// };


// // Delete Checklist Item

// exports.deleteChecklistItem = async (
//     checklistId,
//     itemId
// ) => {

//     const checklist = await Checklist.findOneAndUpdate(
//         {
//             _id: checklistId,
//             "items._id": itemId
//         },
//         {
//             $pull: {
//                 items: {
//                     _id: itemId
//                 }
//             }
//         },
//         {
//             new: true
//         }
//     );

//     if (!checklist) {
//         throw new Error("NOT_FOUND");
//     }

//     return checklist;
// };
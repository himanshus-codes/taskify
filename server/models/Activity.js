const mongoose = require("mongoose");


const ActivitySchema = new mongoose.Schema(
    {
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true,
        },

        type: {
            type: String,
            enum: ["comment", "event"],
            required: true,
        },

        // Later, when users/collaboration exist
        actorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        comment: {
            type: String,
            trim: true,
        },

        eventType: {
            type: String,
            enum: [
                "task-created",
                "task-updated",
                "task-title-changed",
                "status-changed",
                "priority-changed",
                "list-changed",
                "start-date-changed",
                "due-date-changed",
                "checklist-created",
                "checklist-updated",
                "checklist-completed",
                "checklist-deleted"
            ],
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);


ActivitySchema.index({
    taskId: 1,
    createdAt: 1,
});


const Activity = mongoose.model(
    "Activity",
    ActivitySchema
);

module.exports = {
    Activity,
};


// eventType: [
//     "task-created",
//     "task-updated",
//      "due-date-updated/added"
//      "start-date-updated/added"
//     "task-title-updated"
//     "status-changed",
//     "priority-changed",
//     "list-changed",
//     "dates-changed",
//     "checklist-created",
//     "checklist-updated",
//     "checklist-completed", checklist-completed (when completion condition is reached)
//     "checklist-deleted",
//     

        // later....
        // attachment(file_name)-was-added(attached)
        // memberx-added-attachment
        // new-member-added-to-task

        // "attachment-added",
        // "attachment-removed",
        // "member-added",
        // "member-removed",
// ]

// | Change                      | Activity? | Reason                                      |
// | --------------------------- | --------: | ------------------------------------------- |
// | Task created                |         ✅ | Important lifecycle event                   |
// | Status changed              |         ✅ | Meaningful task progress                    |
// | Priority changed            |         ✅ | Meaningful property change                  |
// | Moved to another column     |         ✅ | Meaningful workflow change                  |
// | Due/start date changed      |         ✅ | Potentially important                       |
// | Comment added               |         ✅ | Core activity                               |
// | Checklist created           |         ✅ | Useful                                      |
// | Checklist completed/updated |   ✅/maybe | Depends on how detailed you want history    |
// | **Label added/removed**     | ❌ usually | Often too noisy                             |
// | Label color/name changed    |         ❌ | Board-level configuration, not task history |
// | Task title edited           |   ✅/maybe | Could be useful, but can also create noise  |
// | Task description edited     | ❌ usually | Potentially very noisy                      |

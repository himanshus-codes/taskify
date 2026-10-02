const {
    recordActivityEvent
} = require("./activityEventRecorder");


const recordChecklistCompletionTransition = async ({
    beforeChecklist,
    afterChecklist,
    actorId
}) => {

    const wasCompleted = Boolean(
        beforeChecklist.completed
    );

    const isCompleted = Boolean(
        afterChecklist.completed
    );


    if (
        !wasCompleted &&
        isCompleted
    ) {

        await recordActivityEvent({

            taskId: afterChecklist.taskId,

            actorId,

            eventType: "checklist-completed",

            metadata: {
                checklistId: afterChecklist._id,

                checklistTitle: afterChecklist.title
            }
        });


        return true;
    }


    return false;
};


const recordChecklistUpdated = async ({
    checklist,
    actorId,
    metadata = null
}) => {

    await recordActivityEvent({

        taskId: checklist.taskId,

        actorId,

        eventType: "checklist-updated",

        metadata: {
            checklistId: checklist._id,

            checklistTitle: checklist.title,

            ...metadata
        }
    });
};


module.exports = {
    recordChecklistCompletionTransition,
    recordChecklistUpdated
};
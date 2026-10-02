const { Activity } = require("../models/Activity");

const recordActivityEvent = async ({
    taskId,
    actorId,
    eventType,
    metadata = null
}) => {

    try {

        const activity = await Activity.create({
            taskId,
            type: "event",
            actorId,
            eventType,
            metadata
        });

        return activity;

    } catch (error) {

        // Activity is best-effort.
        // A failure here must not fail the primary operation.

        console.error(
            `Failed to record activity event: ${eventType}`,
            error
        );

        return null;
    }
};

module.exports = {
    recordActivityEvent
};
const mongoose = require("mongoose");
const {
    recordActivityEvent
} = require("./activityEventRecorder");


// --------------------------------------------------
// Value comparison
// --------------------------------------------------

const normalizeValue = (value) => {

    if (value === null || value === undefined) {
        return value;
    }

    if (value instanceof Date) {
        return value.getTime();
    }

    if (
        value &&
        typeof value === "object" &&
        value._bsontype === "ObjectId"
    ) {
        return value.toString();
    }

    if (Array.isArray(value)) {
        return value.map(normalizeValue);
    }

    if (typeof value === "object") {

        const normalized = {};

        for (const key of Object.keys(value).sort()) {
            normalized[key] = normalizeValue(value[key]);
        }

        return normalized;
    }

    return value;
};


const valuesEqual = (a, b) => {

    return JSON.stringify(
        normalizeValue(a)
    ) === JSON.stringify(
        normalizeValue(b)
    );
};


// --------------------------------------------------
// Task update activity recorder
// --------------------------------------------------

const recordTaskUpdateActivity = async ({
    beforeTask,
    afterTask,
    updates,
    actorId
}) => {

    const taskId = afterTask._id;

    const explicitEventMap = {

        title: "task-title-changed",

        status: "status-changed",

        priority: "priority-changed",

        columnId: "list-changed",

        startDate: "start-date-changed",

        targetDate: "due-date-changed"
    };


    const explicitlyHandledFields = new Set();

    const genericChanges = {};


    // ----------------------------------------------
    // Determine explicit task events
    // ----------------------------------------------

    for (const field of Object.keys(explicitEventMap)) {

        if (!(field in updates)) {
            continue;
        }

        const beforeValue = beforeTask[field];
        const afterValue = afterTask[field];


        if (
            valuesEqual(
                beforeValue,
                afterValue
            )
        ) {
            continue;
        }


        explicitlyHandledFields.add(field);


        await recordActivityEvent({

            taskId,

            actorId,

            eventType: explicitEventMap[field],

            metadata: {
                field,

                before: beforeValue,

                after: afterValue
            }
        });
    }


    // ----------------------------------------------
    // Find changes that don't have a dedicated event
    // ----------------------------------------------

    for (const field of Object.keys(updates)) {

        if (explicitlyHandledFields.has(field)) {
            continue;
        }


        const beforeValue = beforeTask[field];
        const afterValue = afterTask[field];


        if (
            valuesEqual(
                beforeValue,
                afterValue
            )
        ) {
            continue;
        }


        genericChanges[field] = {

            before: beforeValue,

            after: afterValue
        };
    }


    // ----------------------------------------------
    // Generic task-updated event
    // ----------------------------------------------

    if (
        Object.keys(genericChanges).length > 0
    ) {

        await recordActivityEvent({

            taskId,

            actorId,

            eventType: "task-updated",

            metadata: {
                changes: genericChanges
            }
        });
    }
};


module.exports = {
    recordTaskUpdateActivity
};
// GET /tasks/:taskId/activity
export async function getTaskActivity(token, taskId) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/tasks/${taskId}/activity`,
            {
                method: "GET",

                headers: {
                    token
                }
            }
        );

    } catch (e) {
        const err = new Error("Unable to connect to server.");
        err.code = "NETWORK_ERROR";
        throw err;
    }

    const data = await res.json();

    if (!res.ok) {
        const err = new Error(data.message);
        err.code = data.code;
        throw err;
    }

    return data;
}


// POST /tasks/:taskId/comments
export async function createComment(
    token,
    taskId,
    commentData
) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/tasks/${taskId}/comments`,
            {
                method: "POST",

                headers: {
                    token,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    comment: commentData.comment
                })
            }
        );

    } catch (e) {
        const err = new Error("Unable to connect to server.");
        err.code = "NETWORK_ERROR";
        throw err;
    }

    const data = await res.json();

    if (!res.ok) {
        const err = new Error(data.message);
        err.code = data.code;
        throw err;
    }

    return data;
}


// PATCH /activities/:id/comment
export async function updateComment(
    token,
    activityId,
    commentData
) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/activities/${activityId}/comment`,
            {
                method: "PATCH",

                headers: {
                    token,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    comment: commentData.comment
                })
            }
        );

    } catch (e) {
        const err = new Error("Unable to connect to server.");
        err.code = "NETWORK_ERROR";
        throw err;
    }

    const data = await res.json();

    if (!res.ok) {
        const err = new Error(data.message);
        err.code = data.code;
        throw err;
    }

    return data;
}


// DELETE /activities/:id/comment
export async function deleteComment(
    token,
    activityId
) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/activities/${activityId}/comment`,
            {
                method: "DELETE",

                headers: {
                    token
                }
            }
        );

    } catch (e) {
        const err = new Error("Unable to connect to server.");
        err.code = "NETWORK_ERROR";
        throw err;
    }

    const data = await res.json();

    if (!res.ok) {
        const err = new Error(data.message);
        err.code = data.code;
        throw err;
    }

    return data;
}
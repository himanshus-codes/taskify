// GET /columns/:id/tasks
export async function getTasks(token, columnId) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/columns/${columnId}/tasks`,
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


// DELETE /columns/:id/tasks
export async function deleteAllTasks(token, columnId) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/columns/${columnId}/tasks`,
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


// POST /columns/:id/task
export async function createTask(token, columnId, taskData) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/columns/${columnId}/task`,
            {
                method: "POST",

                headers: {
                    token,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title: taskData.title,
                    description: taskData.description,
                    priority: taskData.priority
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


// GET /tasks/:id
export async function getTaskDetails(token, taskId) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/tasks/${taskId}`,
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


// PATCH /tasks/:id
export async function updateTask(token, taskId, taskData) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/tasks/${taskId}`,
            {
                method: "PATCH",

                headers: {
                    token,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title: taskData.title,
                    description: taskData.description,
                    priority: taskData.priority
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


// DELETE /tasks/:id
export async function deleteTask(token, taskId) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/tasks/${taskId}`,
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
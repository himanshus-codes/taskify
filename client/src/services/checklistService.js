// POST /tasks/:taskId/checklists
export async function createChecklist(token, taskId, checklistData) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/tasks/${taskId}/checklists`,
            {
                method: "POST",

                headers: {
                    token,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title: checklistData.title
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


// GET /tasks/:taskId/checklists
export async function getChecklists(token, taskId) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/tasks/${taskId}/checklists`,
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


// GET /checklists/:id
export async function getChecklistDetails(token, checklistId) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/checklists/${checklistId}`,
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


// PATCH /checklists/:id
export async function updateChecklist(
    token,
    checklistId,
    checklistData
) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/checklists/${checklistId}`,
            {
                method: "PATCH",

                headers: {
                    token,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title: checklistData.title,
                    completed: checklistData.completed
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


// DELETE /checklists/:id
export async function deleteChecklist(token, checklistId) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/checklists/${checklistId}`,
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


// POST /checklists/:checklistId/items
export async function createChecklistItem(
    token,
    checklistId,
    itemData
) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/checklists/${checklistId}/items`,
            {
                method: "POST",

                headers: {
                    token,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    text: itemData.text,
                    checked: itemData.checked,
                    order: itemData.order
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
    console.log(data)
    return data;
}


// PATCH /checklists/:checklistId/items/:itemId
export async function updateChecklistItem(
    token,
    checklistId,
    itemId,
    itemData
) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/checklists/${checklistId}/items/${itemId}`,
            {
                method: "PATCH",

                headers: {
                    token,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    text: itemData.text,
                    checked: itemData.checked,
                    order: itemData.order
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


// DELETE /checklists/:checklistId/items/:itemId
export async function deleteChecklistItem(
    token,
    checklistId,
    itemId
) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/checklists/${checklistId}/items/${itemId}`,
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
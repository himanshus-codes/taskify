// POST /boards/:boardId/labels
export async function createLabel(token, boardId, labelData) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/boards/${boardId}/labels`,
            {
                method: "POST",

                headers: {
                    token,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: labelData.name,
                    color: labelData.color
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


// GET /boards/:boardId/labels
export async function getLabels(token, boardId) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/boards/${boardId}/labels`,
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


// GET /labels/:id
export async function getLabelDetails(token, labelId) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/labels/${labelId}`,
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


// PATCH /labels/:id
export async function updateLabel(token, labelId, labelData) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/labels/${labelId}`,
            {
                method: "PATCH",

                headers: {
                    token,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: labelData.name,
                    color: labelData.color
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


// DELETE /labels/:id
export async function deleteLabel(token, labelId) {

    let res;

    try {
        res = await fetch(
            `http://localhost:3000/labels/${labelId}`,
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
// GET /boards/:id/columns
export const getColumns = async (token, boardId) => {
    
    let res;

    try {
        res = await fetch(
            `http://localhost:3000/boards/${boardId}/columns`,
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
};


// POST /boards/:id/column
export const createColumn = async (token, boardId, columnData) => {
    
    let res;

    try {
        res = await fetch(
            `http://localhost:3000/boards/${boardId}/column`,
            {
                method: "POST",

                headers: {
                    token,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title: columnData.title,
                    // order:columnData.order
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
};


// GET /columns/:id
export const getColumnDetails = async (token, columnId) => {
    
    let res;

    try {
        res = await fetch(
            `http://localhost:3000/columns/${columnId}`,
            {
                method: "GET",

                headers: {
                    token
                }
            }
        );

    } catch (e) {
        const err = new Error("Unable to connect to server.");
        err.code = data.code;
        throw err;
    }

    const data = await res.json();

    if (!res.ok) {
        const err = new Error(data.message);
        err.code = data.code;
        throw err;
    }

    return data;
};


// PATCH /columns/:id
export const updateColumn = async (token, columnId, columnData) => {
    
    let res;

    try {
        res = await fetch(
            `http://localhost:3000/columns/${columnId}`,
            {
                method: "PATCH",

                headers: {
                    token,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title: columnData.title,
                    order:columnData.order
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
};


// DELETE /boards/:id/columns
export const deleteColumns = async (token, boardId) => {
    
    let res;

    try {
        res = await fetch(
            `http://localhost:3000/boards/${boardId}/columns`,
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
};


// DELETE /columns/:id
export const deleteColumn = async (token, columnId) => {
    
    let res;

    try {
        res = await fetch(
            `http://localhost:3000/columns/${columnId}`,
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
};
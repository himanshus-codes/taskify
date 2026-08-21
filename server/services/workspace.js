const {Workspace} = require("../models/Workspace")
const{Board} = require("../models/Board")


exports.createWorkspace = async (ownerId, data) => {

    const workspace = await Workspace.create({
        title: data.title,
        description: data.description,
        ownerId
    })

    return workspace
}


exports.getWorkspaces = async(ownerId)=>{

    return await Workspace.find({
        ownerId
    })

}


exports.getWorkspaceDetails = async (workspaceId) => {

    const workspace = await Workspace.findById(workspaceId)

    if (!workspace) {
        throw new Error("NOT_FOUND")
    }

    return workspace
}

exports.getBoards = async (workspaceId) => {

   

    const boards = await Board.find({
        workspaceId
    });

    console.log(boards)

    // console.log(boards);

    // if (boards.length === 0) {
    //     throw new Error("NO_BOARDS_FOUND");
    // }

    return boards;
};


exports.updateWorkspace = async (workspaceId, updates) => {

    const workspace = await Workspace.findByIdAndUpdate(
        workspaceId,
        { $set: updates },
        { new: true }
    )

    if (!workspace) {
        throw new Error("NOT_FOUND")
    }

    return workspace
}


exports.deleteWorkspace = async (workspaceId) => {

    const workspace = await Workspace.findByIdAndDelete(workspaceId)

    if (!workspace) {
        throw new Error("NOT_FOUND")
    }

    return workspace
}


exports.deleteWorkspaces = async (ownerId) => {

    const result = await Workspace.deleteMany({
        ownerId
    })

    // if (result.deletedCount === 0) {
    //     throw new Error("NO_WORKSPACES_FOUND")
    // }

    return result
}
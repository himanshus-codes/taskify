const { json } = require("zod")
const {Workspace} = require("../models/Workspace")

exports.createWorkspace = async (ownerId, data)=>{
    const res = await Workspace.create({
        title: data.title,
        description: data.description,
        ownerId: ownerId
    })

    return res

}

exports.getWorkspaces = async(ownerId)=>{
    const res = await Workspace.find(ownerId);
    return res
}   

exports.getWorkspaceDetails = async(workspaceId)=>{
    const res = await Workspace.findbyId(workspaceid);
        if(!res){
        throw new Error("No_Workspace_Found")
    }

    return res
}



exports.updateWorkspace = async(workspaceId, updates)=>{

    
    const res = await Workspace.findByIdAndUpdate(workspaceId, {$set: updates}, {new : true});

    if(!res){
        throw new Error("No_Workspace_Found")
    }

    return res
}


exports.deleteWorkspace = async(workspaceId, updates)=>{

    
    const res = await Workspace.findByIdAndDelete(workspaceId);

    if(!res){
        throw new Error("No_Workspace_Found")
    }

    return res
}
exports.deleteWorkspaces = async(ownerId)=>{

    
    const res = await Workspace.deleteMany(ownerId);

    if(!res){
        throw new Error("No_Workspaces_Found")
    }

    return res
}



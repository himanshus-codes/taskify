const  dataValidations = require("../validations/workspace")
const workspaceService = require("../services/workspace");
const { success } = require("zod");
const { mongo } = require("mongoose");


// create workspace
exports.createWorkspace = async (req, res) =>  {

    const userId =  req.userData._id;

    const result = dataValidations.createValidifier(req.body)

    if(!result.success){
        return res.status(400).json({
            error: "INVALID_DATA_FORMAT",
            errorData: result.error.issues
        })
    }
    
    try{
        let mongoRes = workspaceService.createWorkspace(userId, result.data)

        res.json({
            success:"Workspace_Successfully_Created",
            data: mongoRes
        })

    }catch(err){

        if (err.code === 11000) {
            return res.status(409).json({
                success: false,
                message: `A workspace with this ${Object.keys(err.keyPattern)[0]} already exists.`,
                field: Object.keys(err.keyPattern)[0], // "title"
                value: Object.values(err.keyValue)[0], // "Test Board 1"
            });
        }

        return res.status(500).json({
            error:"Interval_Server_Error",
            message:"Failed_To_Save_Workspace"
        })
    }
}


exports.getWorkspaces = async (req, res)=>{
    console.log("req received Get Workspaces")

    let userId = req.userData._id


    try{
        const workspaces = await workspaceService.getWorkspaces(userId)
        console.log(workspaces)
        res.status(200).json({
            success:"Workspaces_Data_Fetched",
            data: {workspaces}
        })

    }catch(e){
        
        if(e.message == "No_Workspace(s)_Found"){
            return res.status(404).json({
                error:e.message
            })
        }

        return res.status(500).json({
            error:"Internal_Server_Error",
            message:"Failed_To_Fetch_Workspaces"
        })
    }
    
}




// redundtant 
exports.getWorkspaceDetails = async (req, res)=>{
    console.log("req received GetBoards")
    let workspaceId = req.params.id
    console.log(typeof(req.params.id))

    try{
        const data = await workspaceService.getWorkspaceDetails(workspaceId)

        res.status(200).json({
            success:"Workspace_Data_Fetched",
            data: data
        })
    }catch(e){
        
        if(e.message == "No_Workspace_Found"){
            return res.status(404).json({
                message:"Failed_To_Fetch_Workspace_Details",
                error:"No_Workspace_Found"
            })
        }

        return res.status(500).json({
            error:"Internal_Server_Error",
            message:"Failed_To_Fetch_Workspace"
        })
    }
    
}

exports.updateWorkspace = async (req, res)=>{

    const result = dataValidations.updateValidifier.safeParse(req.body)
    let workspaceId = req.params.id

    if(!result.success){
        return res.status(400).json({
            error:"Invalid_Data_Format",
            validationFailureResponse:result.error.issues
        })
    }

    try{
        const data = await boardService.updateBoard(workspaceId, result.data );
        
        return res.status(200).json({
            success:"Workspace_Updated_Successfully",
            data:data
        })
    
       
    }catch(err){

        if (err.code === 11000) {
            return res.status(409).json({
                success: false,
                message: `A Workspace with this ${Object.keys(err.keyPattern)[0]} already exists.`,
                field: Object.keys(err.keyPattern)[0], 
                value: Object.values(err.keyValue)[0], 
            });
        }

        if(err.message == "No_Workspace_Found"){
            // return res.status(422).json({
            return res.status(400).json({
                message:"Failed_To_Update_Workspace",
                error:"No_Workspace_Found"
            })
        }

        return res.status(500).json({
            error:"Internal_Server_Error",
            message:"Failed_To_Update_Workspace"
        })
    }
}

exports.deleteWorkspace = async (req, res)=>{
    let workspaceId = req.params.id

    try{
        let data = boardService.deleteWorkspace(workspaceId);

        return res.json({
            success:"Workspace_Successfully_Deleted",
        })
    } catch(e){

       if(e.message == "No_Workspace_Found"){
            return res.json({
                error:"No_Workspace_Found",
                message:"Failed_To_Delete_Workspace"
            })
        }

        return res.status(500).json({
            error:"Internal_Server_Error",
            message:"Failed_To_Delete_Workspace"
        })
    }
}

exports.deleteWorkspaces = (req, res)=>{
    let userId = req.userData._id;

    try{
        let data = boardService.deleteWorkspaces(userId);

        return res.json({
            success:"Workspaces_Successfully_Deleted"
        })
    } catch(e){
        if(e.message == "No_Workspaces_Found"){
            return res.json({
                error:"No_Workspaces_Found",
                message:"Failed_To_Delete_Workspaces"
            })
        }

        return res.status(500).json({
            error:"Internal_Server_Error",
            message:"Failed_To_Delete_Workspaces"
        })
    }
}

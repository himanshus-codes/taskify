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
            success:false,
            // code: "INVALID_DATA_FORMAT",
            code: "VALIDATION_FAILED",
            // message:"Failed to create new Workspace.",
            message:"Invalid Workspace data provided.",
            issues: result.error.issues
        })
    }
    
    try{
        const workspace = await workspaceService.createWorkspace(userId, result.data)

        res.status(201).json({
            success:true,
            code:"CREATED",
            message:`Workspace successfully created.`,
            data: {
                id: workspace._id,
                title: workspace.title
            }
        })

    }catch(err){


        if (err.code === 11000) {

            const field = Object.keys(err.keyPattern)[0]
            const value = Object.values(err.keyValue)[0]

            return res.status(409).json({
                success: false,
                // code:"DUPLICATE_KEY",
                // code:"CONFLICT",
                code:"DUPLICATE_ENTITY",
                message: `A Workspace with this ${field} already exists.`,
                issues: [{
                    field,
                    value
                }]
            });
        }

        return res.status(500).json({
            success: false,
            code:"INTERNAL_SERVER_ERROR",
            message:"Failed to create Workspace."
        })
    }
}

exports.getWorkspaces = async (req, res) => {

    const ownerId = req.userData._id

    try {

        const workspaces = await workspaceService.getWorkspaces(ownerId)

        return res.status(200).json({
            success:true,
            code:"FETCHED",
            message:"Workspaces fetched successfully.",
            data:{
                workspaces
            }
        })

    } catch(err) {

        return res.status(500).json({
            success:false,
            code:"INTERNAL_SERVER_ERROR",
            message:"Failed to fetch Workspaces."
        })
    }
}


exports.getWorkspaceDetails = async(req,res)=>{

    const workspaceId = req.params.id

    try {

        const workspace = await workspaceService.getWorkspaceDetails(workspaceId)

        return res.status(200).json({
            success:true,
            code:"FETCHED",
            message:"Workspace details fetched successfully.",
            data:workspace
        })


    }catch(e){

        if(e.message === "NOT_FOUND"){
            return res.status(404).json({
                success:false,
                code:"NOT_FOUND",
                message:"Workspace not found."
            })
        }

        return res.status(500).json({
            success:false,
            code:"INTERNAL_SERVER_ERROR",
            message:"Failed to fetch Workspace."
        })
    }
}

exports.updateWorkspace = async(req,res)=>{

    const result = dataValidations.updateValidifier.safeParse(req.body)

    const workspaceId = req.params.id


    if(!result.success){

        return res.status(400).json({
            success:false,
            code:"VALIDATION_FAILED",
            message:"Invalid Workspace update data.",
            issues:result.error.issues
        })
    }


    try{

        const workspace = await workspaceService.updateWorkspace(
            workspaceId,
            result.data
        )


        return res.status(200).json({
            success:true,
            code:"UPDATED",
            message:"Workspace updated successfully.",
            data:workspace
        })


    }catch(err){


        if(err.code === 11000){

            const field = Object.keys(err.keyPattern)[0]
            const value = Object.values(err.keyValue)[0]


            return res.status(409).json({
                success:false,
                code:"DUPLICATE_ENTITY",
                message:`A Workspace with this ${field} already exists.`,
                issues:[
                    {
                        field,
                        value
                    }
                ]
            })
        }


        if(err.message === "NOT_FOUND"){

            return res.status(404).json({
                success:false,
                code:"NOT_FOUND",
                message:"Workspace not found."
            })
        }


        return res.status(500).json({
            success:false,
            code:"INTERNAL_SERVER_ERROR",
            message:"Failed to update Workspace."
        })
    }
}

exports.deleteWorkspace = async(req,res)=>{

    const workspaceId = req.params.id

    try{

        await workspaceService.deleteWorkspace(workspaceId)


        return res.status(200).json({
            success:true,
            code:"DELETED",
            message:"Workspace deleted successfully."
        })


    }catch(e){


        if(e.message === "NOT_FOUND"){

            return res.status(404).json({
                success:false,
                code:"NOT_FOUND",
                message:"Workspace not found."
            })
        }


        return res.status(500).json({
            success:false,
            code:"INTERNAL_SERVER_ERROR",
            message:"Failed to delete Workspace."
        })
    }
}


exports.deleteWorkspaces = async(req,res)=>{

    const ownerId = req.userData._id

    try{

       let result = await workspaceService.deleteWorkspaces(ownerId)


        return res.status(200).json({
            success:true,
            code:"DELETED",
            message:"All Workspaces deleted successfully.",
            data:{
                deletedCount: result.deletedCount
            }
        })


    }catch(e){


        // if(e.message === "NO_WORKSPACES_FOUND"){

        //     return res.status(404).json({
        //         success:false,
        //         code:"NOT_FOUND",
        //         message:"No workspaces available to delete."
        //     })
        // }


        return res.status(500).json({
            success:false,
            code:"INTERNAL_SERVER_ERROR",
            message:"Failed to delete Workspaces."
        })
    }
}
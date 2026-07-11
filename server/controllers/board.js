const {createBoardSchema, updateBoardSchema } = require("../validations/board.js")
const boardService = require("../services/board.js")
const { success } = require("zod")


//kanbadn Dashboard

exports.getDashboard = async (req, res) => {
    const boardId = req.params.id;

    try{
        const dasboard = await boardService.dashboardBuilder(boardId)

        if(!dasboard){
            return res.status(404).json(404).json({
                error: "Board_Not_Found"
            });
        }

        res.json({
            success:"Dashboard_Loaded",
            data:dasboard
        })

    }catch (e){
        return res.status(500).json({
            error:"Internal_Server_Error",
            message:"Could_Not_Load_Dashboard",
            errorCode:e
        })
    }
}

exports.createBoard = async (req, res)=>{
    console.log("req boardController", req.url)

    let result = createBoardSchema.safeParse(req.body)

    if(!result.success) {
        return res.status(400).json({
            error: "INVALID_DATA_FORMAT",
            errorData: result.error.issues
        })
    }

    let userId = req.userData._id

    try{

        const mongoRes = await boardService.createBoard(userId, result.data )
        console.log(mongoRes)
        
        return res.status(200).json({
            success:"Board_Saved_Successfully",
            data:mongoRes
        })
    

    } catch(err){
        console.log(err)
        // console.log(err.code)
        // console.log(err.code === 11000)

        if (err.code === 11000) {
            return res.status(409).json({
                success: false,
                // message: "A board with this title already exists.",
                message: `A board with this ${Object.keys(err.keyPattern)[0]} already exists.`,
                field: Object.keys(err.keyPattern)[0], // "title"
                value: Object.values(err.keyValue)[0], // "Test Board 1"
            });
        }

        return res.status(500).json({
            error:"Interval_Server_Error",
            message:"Failed_To_Save_Board"
        })
    }

}

exports.getBoards = async (req, res)=>{
    console.log("req received GetBoards")
    let userId = req.userData._id


    try{
        const boards = await boardService.fetchBoards(userId)
        console.log(boards)
        res.status(200).json({
            success:"Boards_Data_Fetched",
            data: {boards}
        })
    }catch(e){
        
        if(e.message == "No_Boards_Found"){
            return res.status(404).json({
                message:"Failed_To_Get_Board_Details",
                error:"No_Boards_Found"
            })
        }

        return res.status(500).json({
            error:"Internal_Server_Error",
            message:"Failed_To_Fetch_Boards"
        })
    }
    
}




// redundtant 
exports.getBoard = async (req, res)=>{
    console.log("req received GetBoards")
    let boardId = req.params.id
    console.log(typeof(req.params.id))

    try{
        const data = await boardService.fetchBoardDetails(boardId)

        res.status(200).json({
            success:"Board_Data_Fetched",
            data: data
        })
    }catch(e){
        
        if(e.message == "No_Board_Found"){
            return res.status(404).json({
                error:e.message
            })
        }

        return res.status(500).json({
            error:"Internal_Server_Error",
            message:"Failed_To_Fetch_Board"
        })
    }
    
}

exports.updateBoard = async (req, res)=>{

    const result = updateBoardSchema.safeParse(req.body)
    let boardId = req.params.id

    if(!result.success){
        return res.status(400).json({
            error:"Invalid_Data_Format",
            validationFailureResponse:result.error.issues
        })
    }

    try{
        const data = await boardService.updateBoard(boardId, result.data );
        
        return res.status(200).json({
            success:"Board_Updated_Successfully",
            data:data
        })
    
       
    }catch(err){

        if (err.code === 11000) {
            return res.status(409).json({
                success: false,
                // message: "A board with this title already exists.",
                message: `A board with this ${Object.keys(err.keyPattern)[0]} already exists.`,
                field: Object.keys(err.keyPattern)[0], // "title"
                value: Object.values(err.keyValue)[0], // "Test Board 1"
            });
        }

        if(err.message == "Incorrect_Board_Id"){
            // return res.status(422).json({
            return res.status(400).json({
                error:err.message
            })
        }

        return res.status(500).json({
            error:"Internal_Server_Error",
            message:"Failed_To_Update_Board"
        })
    }
}

exports.deleteBoard = async (req, res)=>{
    let boardId = req.params.id

    try{
        let data = boardService.deleteBoard(boardId);

        return res.json({
            success:"Board_Successfully_Deleted",
        })
    } catch(e){

        if(e.message == "Incorrect_Board_Id"){
            return res.json({
                error:"Incorrect_Board_Id",
                message:"Failed_To_Delete_Board"
            })
        }

        return res.status(500).json({
            error:"Internal_Server_Error",
            message:"Failed_To_Delete_Board"
        })
    }
}

exports.deleteBoards = (req, res)=>{
    let userId = req.userData._id;

    try{
        let data = boardService.deleteBoards(userId);

        return res.json({
            success:"Boards_Successfully_Deleted"
        })
    } catch(e){
        if(e.message == "No_Boards_Found"){
            return res.json({
                error:"No_Boards_Found",
                message:"Failed_To_Delete_Boards"
            })
        }

        return res.status(500).json({
            error:"Internal_Server_Error",
            message:"Failed_To_Delete_Boards"
        })
    }
}

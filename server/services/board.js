const {Board} = require('../models/Board')
const {Column} = require('../models/Column')
const {Task} = require('../models/Task')
const mongoose = require('mongoose');


exports.dashboardBuilder = async (boardId) =>{
    const board = await Board.findById(boardId)
    if(!board){
        throw new Error("Board_Not_Found");
    }
    console.log("------------------------------------------------------------------------------------------------")
    console.log("------------------------------------------------------------------------------------------------")
    console.log("------------------------------------------------------------------------------------------------")
    console.log("board",board)

    const columns = await Column.find({boardId});
    // if(columns.length == 0){
    //     return {
    //         columns:null
    //     };
    // }

    const columnIds = columns.map((column)=> column._id);
    console.log("columnIds",columnIds)
    const tasks = await Task.find({
        columnId:{
            $in: columnIds
        }
    });

    // if(!tasks){
    //     throw new Error("Tasks_Not_Found");
    // }
    console.log("Tasks ",tasks)

    const columnsWithTasks = columns.map(column => {

        const columnTasks = tasks.filter(task => {
            return task.columnId.toString() === column._id.toString()
        })

        return {
            ...column.toObject(),
            tasks: columnTasks
        }
    })

    console.log("columns with tasks",columnsWithTasks)
    return {
        board,
        columns: columnsWithTasks
    };

}


exports.createBoard = async (userId, data) => {

    let saveRes = await Board.create({
        title: data.title,
        description:data.description,
        userId
    })

    console.log(saveRes)

    return saveRes
}
exports.fetchBoards = async (userId) => {


    const res = await Board.find({userId: userId})
    console.log("---------------------------------------------")
    console.log(res)
    if(res){
        return res
    }

    throw new Error("No_Boards_Found")

}

// redundant service..
exports.fetchBoardDetails = async (boardId)=>{

    // (mongoose.isValidObjectId(boardId))

    if (!mongoose.isValidObjectId(boardId)) {
        throw new Error("Invalid_Board_Id_Format");
    }

    const data = await Board.findById(boardId);

    if (!data) {
        throw new Error("Board_Not_Found");
    }


    // to be handled at frontend
    // if(data.length== 0){
    //     return "No Board Created Yet"
    // }

    return data
}


exports.updateBoard = async (boardId, updates )=>{

    const res = await Board.findByIdAndUpdate(boardId, {$set : updates}, {new:true} )
    if(!res){
        throw new Error("Incorrect_Board_Id")
    }
    return res
}
exports.deleteBoard = async (boardId)=>{

    const res = await Board.findByIdAndDelete(boardId )
    if(!res){
        throw new Error("Incorrect_Board_Id")
    }
}
exports.deleteBoards = async (userId)=>{

    const res = await Board.deleteMany({userId: userId})
    if(!res){
        throw new Error("No_Boards_Found")
    }
    return res
}
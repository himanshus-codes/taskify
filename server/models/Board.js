const mongoose = require("mongoose");


const BoardSchema = new mongoose.Schema({

    title:{
        type:String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    }},

    {
        timestamps: true
    }

)


const Board = mongoose.model('Board', BoardSchema);

module.exports={
    Board
}

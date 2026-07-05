const mongoose = require("mongoose");


const ColumnSchema = new mongoose.Schema({
        title:{
            type: String,
            required: true
        },

        order: {
            type: Number,
            required: true
        },

        boardId={
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref: "Board",
            index:true
        }},
        {
            timestamps:true
        }
    
)
const mongoose = require("mongoose");
const { columnSchema } = require("../validations/column");


const ColumnSchema = new mongoose.Schema({
        title:{
            type: String,
            required: true,
            unique: true
        },

        order: {
            type: Number,
            required: true
        },

        boardId: {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref: "Board",
            index:true
        }},
        {
            timestamps:true
        }
    
)


const Column = mongoose.model("column", ColumnSchema);
module.exports = {Column};
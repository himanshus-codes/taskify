const mongoose = require("mongoose");

const mongoose = require("mongoose");

const ColumnSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        // order: {
        //     type: Number,
        //     required: true,
        //     unique:true
        // },


        boardId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Board",
            index: true
        }
    },
    {
        timestamps: true
    }
);

ColumnSchema.index(
    { boardId: 1, title: 1 },
    { unique: true }
);

const Column = mongoose.model("column", ColumnSchema);

module.exports = { Column };
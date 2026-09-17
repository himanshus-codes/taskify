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
    {
        unique: true,
        collation: {
            locale: "en",
            strength: 2
        }
    }
);

const Column = mongoose.model("Column", ColumnSchema);

// console.log(Column.schema.indexes());

module.exports = { Column };
const mongoose = require("mongoose");


const ChecklistSchema = new mongoose.Schema(
    {
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },


        // order of checklists // but this can be managed by sorting based on createdAt date
        // order: {
        //     type: Number,
        //     required: true,
        // },

        items: [
            {
                text: {
                    type: String,
                    required: true,
                    trim: true,
                },

                checked: {
                    type: Boolean,
                    default: false,
                },

                order: {
                    type: Number,
                    required: true,
                    // unique:true
                },
            }
        ],
    },
    {
        timestamps: true,
    }
);

const Checklist = mongoose.model(
    "Checklist",
    ChecklistSchema
);

module.exports = {
    Checklist,
};
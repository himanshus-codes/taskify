const mongoose = require("mongoose");


const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Task Title is required"],
            trim: true,
        },

        description: {
            type: String,
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high", "normal"],
            default: "normal",
            required: true,
        },

        status: {
            type: String,
            enum: [
                "pending",
                "in-progress",
                "completed",
                "under-review",
            ],
            default: "pending",
        },

        // References reusable labels belonging to the board
        labels: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Label",
            }
        ],

        startDate: {
            type: Date,
            default: null,
        },

        targetDate: {
            type: Date,
            default: null,
        },

        boardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board",
            required: true,
            index: true,
        },

        columnId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Column",
            required: true,
            index: true,
        },

        order: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

TaskSchema.index(
    { boardId: 1, title: 1 },
    {
        unique: true,
        collation: {
            locale: "en",
            strength: 2,
        },
    }
);


TaskSchema.index(
    { columnId: 1, order: 1 },
    {
        unique: true,
    }
);


const Task = mongoose.model("Task", TaskSchema);

module.exports = {
    Task,
};
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "  Task Title is required"]
    },
    description: {
        type: String,
        required: [true, " description is required"]
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true
    },

    boardId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Board",
        required: true,
        index: true
    },

    columnId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Column",
        required: true,
        index: true
    }

        // order via drag/drop within same column
        //   order: {
        //     type: Number,
        //     default: 0
        // },

        // status: {
        //     type: String,
        //     enum: ["pending", "in-progress", "completed", "under-review"],
        //     default: "pending"
        // },
        // if multi users/collabas
        // userId: {
        //     // type: String,
        //     type:  mongoose.Schema.Types.ObjectId,
        //     ref: "User",
        //     required: true,
        //     index: true
            
        // },

       
    },
    
    {
        timestamps : true,
    }

   
);

TaskSchema.index(
    { boardId: 1, title: 1 },
    { unique: true }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = {
    Task
}
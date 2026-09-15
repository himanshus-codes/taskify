const mongoose = require("mongoose");

const WorkspaceSchema = new mongoose.Schema({
    title:{
         type: String,
         required: true,
        //  unique: true
    },
    description:{
        type: String,
        required: true
    }, 

    ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    }
},{
    timestamps: true
}
)

WorkspaceSchema.index(
    { ownerId: 1, title: 1 },
    { unique: true }
);

const Workspace = mongoose.model("Workspace", WorkspaceSchema);


module.exports = { 
    Workspace
}


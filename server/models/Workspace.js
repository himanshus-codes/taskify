const mongoose = require("mongoose");

const WorkspaceSchema = new mongoose.Schema({
    title:{
         type: String,
         required: true,
         unique: true
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

const Workspace = mongoose.model("Workspace", WorkspaceSchema);


module.exports = { 
    Workspace
}
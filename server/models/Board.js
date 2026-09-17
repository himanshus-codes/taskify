const mongoose = require("mongoose");


const BoardSchema = new mongoose.Schema({

    title:{
        type:String,
        required: true,
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
    },

    workspaceId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Workspace',
        required:true,
        index:true
    }
    
},
  
    {
        timestamps: true
    }

)

BoardSchema.index(
    { workspaceId: 1, title: 1 },
    {
        unique: true,
        collation: {
            locale: "en",
            strength: 2
        }
    }
);


const Board = mongoose.model('Board', BoardSchema);

module.exports={
    Board
}

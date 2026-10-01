const mongoose = require("mongoose");


const LabelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        color: {
            type: String,
            required: true,
        },

        boardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

LabelSchema.index(
    { boardId: 1, name: 1 },
    {
        unique: true,
        collation: {
            locale: "en",
            strength: 2,
        },
    }
);

const Label = mongoose.model("Label", LabelSchema);

module.exports = {
    Label,
};


// how does label schema connect with Task Schema, what is the relation
// and what role does boardId play here.
// what does below lines mean?

// Then:

// Board
//  ├── Label A
//  ├── Label B
//  └── Label C

// Task
//  ├── labelId A
//  └── labelId C

// So Task.labels is effectively the many-to-many side of the relationship.

// That gives you persistent label identity and lets multiple tasks use the same label.
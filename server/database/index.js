const mongoose = require('mongoose');

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/week4/hard/taskify');

// Define schemas

const UserSchema = new mongoose.Schema({
    // Schema definition here

    firstName: {
        type: String,
        required: [true, "First Name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }, role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    }, {
    timestamps: true
});


const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "  Todo Title is required"]
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

    status: {
        type: String,
        enum: ["pending", "in-progress", "completed", "under-review"],
        default: "pending"
    },

     userId: {
        // type: String,
        type:  mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
        
    }},
    
    {
    timestamps : true,

    }

   
);

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    User,
    Todo
}
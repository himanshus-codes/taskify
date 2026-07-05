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



const User = mongoose.model('User', UserSchema);

module.exports = {
    User
}
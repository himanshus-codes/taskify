// services/user.service.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const { Task } = require("../models/Task");

const JWT_SECRET = process.env.JWT_SECRET_USER;


exports.signup = async ({ firstName, lastName, email, password }) => {

    const existingUser = await User.findOne({
        email
    });

    if (existingUser) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    // if (existing) {
    //     return existing
    // }

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    return user;
};


exports.login = async ({ email, password }) => {

    const user = await User.findOne({
        email
    });

    // if (!user) throw  "Invalid_Email";

    if (!user) {
        throw new Error("UNAUTHORIZED");
    }

    const passwordMatched = await bcrypt.compare(
        password,
        user.password
    );

    // if (!match) throw "Wrong_Password";

    if (!passwordMatched) {
        throw new Error("UNAUTHORIZED");
    }

    const token = jwt.sign(
        user._id.toString(),
        JWT_SECRET
    );

    return token;
};


exports.updateMe = async (userId, updates) => {

    const user = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true }
    );

    if (!user) {
        throw new Error("NOT_FOUND");
    }

    return user;
};


exports.updatePassword = async (
    userData,
    { currentPassword, newPassword }
) => {

    const passwordMatched = await bcrypt.compare(
        currentPassword,
        userData.password
    );

    if (!passwordMatched) {
        throw new Error("UNAUTHORIZED");
    }

    const hashedPassword = await bcrypt.hash(
        newPassword,
        5
    );

    const user = await User.findById(userData._id);

    if (!user) {
        throw new Error("NOT_FOUND");
    }

    user.password = hashedPassword;

    await user.save();

    return user;
};


exports.deleteMe = async (userId) => {

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        throw new Error("NOT_FOUND");
    }

    await Task.deleteMany({
        userId
    });

    return user;
};
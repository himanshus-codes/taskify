// services/user.service.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Todo } = require("../database/index");

const JWT_SECRET = process.env.JWT_SECRET_USER;

exports.signup = async ({ firstName, lastName, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email_Already_Exists");
  // if (existing) {
  //     return existing
  // }

  const hashed = await bcrypt.hash(password, 5);

  await User.create({
    firstName,
    lastName,
    email,
    password: hashed,
  });
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  // if (!user) throw  "Invalid_Email";
  if (!user) throw new Error("Invalid_Email");

  const match = await bcrypt.compare(password, user.password);
  // if (!match) throw "Wrong_Password";
  if (!match) throw new Error("Invalid_Password");

  return jwt.sign(user._id.toString(), JWT_SECRET);
};

exports.updateMe = async (id, updates) => {
  return await User.findByIdAndUpdate(
    id,
    { $set: updates }, // ⚠️ FIXED BUG (you had wrong structure)
    { new: true }
  );
};

exports.updatePassword = async (userData, { currentPassword, newPassword }) => {
  const match = await bcrypt.compare(currentPassword, userData.password);
  if (!match) throw "Incorrect current password";

  const hashed = await bcrypt.hash(newPassword, 5);

  const user = await User.findById(userData._id);
  user.password = hashed;
  await user.save();
};

exports.deleteMe = async (id) => {
  await User.findByIdAndDelete(id);
  await Todo.deleteMany({ userId: id }); 
};
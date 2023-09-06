const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minLength: 3
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [4, "Password must be at least 8 characters"]
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minLength: 3
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minLength: 3
  },
  dateOfBirth: {
    type: Date,
    default: () => new Date("10.02.1995")
  },
  ssn: {
    type: Number,
    required: [true, "Social security number is required"],
    default: 123456789,
    min: 10,
    max: 10   
  } 
});

const User = mongoose.model("User", userSchema, "users");

const addUser = async (user) => {
  const newUser = new User(user);
  return await newUser.save();
};

const getAll = async () => {
  return await User.find({});
};

module.exports = {
  addUser,
  getAll
};
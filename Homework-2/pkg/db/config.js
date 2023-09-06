const mongoose = require("mongoose");

exports.connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://marijazlatkova44:testpassword@cluster0.tonpgxf.mongodb.net/films?retryWrites=true&w=majority");
    console.log("Successfully connected to DataBase");
  } catch (err) {
    console.log("Error connecting to DataBase", err);
  }
};
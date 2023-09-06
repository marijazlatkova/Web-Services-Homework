//* 1. Create a model in mongoose for users
//*  - username, email, password, firstName, lastName, dateOfBirth, ssn
//* 2. Create route to create at least one user
//* 3. Make handler to get user info (without password)

//? * Bonus:
//* - Procitajte za node-input-validator

const express = require("express");
const config = require("./pkg/config");
require("./pkg/db");

const { createUser, getAllUsers } = require("./handlers/userHandler");

const app = express();

app.use(express.json());

app.post("/users", createUser);
app.get("/users", getAllUsers);

app.listen(config.getSection("development").PORT, (err) => {
  err 
  ? console.log(err) 
  : console.log(`Server started successfully at port ${config.getSection("development").PORT}`);
});
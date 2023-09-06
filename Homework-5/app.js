//! - Izrabotka na monoliten servis auth+food recipies so multitenant opcii

//? - Model za account
//? - Napravete 2 korisnika koi ke imaat po 3 recepti
//? - Vo account treba da dodademe relacija za recept modelot

//! -> Polinja za recept:
//* 1. title - string
//* 2. ingredients - [string]
//* 3. instructions - string
//* 4. prepTime - number
//* 5. cookTime - number
//* 6. servings - number
//* 7. account_id - ObjectId

const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const config = require("./pkg/config");
require("./pkg/db");

const { accountRegister, accountLogin, refreshToken, resetPassword } = require("./handlers/authHandler");
const { createRecipe, getAllRecipes, getOneRecipe, updateRecipe, removeRecipe } = require("./handlers/recipeHandler");

const app = express();

app.use(express.json());

app.use(
  jwt({
    secret: config.getSection("development").JWT,
    algorithms: ["HS256"]
  }).unless({
    path: [
      "/api/v1/auth/register",
      "/api/v1/auth/login",
      "/api/v1/auth/refreshToken",
      "/api/v1/auth/resetPassword"
    ],
  })
);

//* account ruti
app.post("/api/v1/auth/register", accountRegister);
app.post("/api/v1/auth/login", accountLogin);
app.post("/api/v1/auth/refreshToken", refreshToken);
app.post("/api/v1/auth/resetPassword", resetPassword);

//* recept ruti
app.post("/recipes", createRecipe);
app.get("/recipes", getAllRecipes);
app.get("/recipes/:id", getOneRecipe);
app.put("/recipes/:id", updateRecipe);
app.delete("/recipes/:id", removeRecipe);

//* middleware funkcija koja se koristi za da se obraboti greshkata sto moze da se sluci pri JWT avtentifikacija
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedAccess") {
    res.status(401).send("Invalid token...");
  }
  res.status(err.status).send(err.inner.message);
});

app.listen(config.getSection("development").PORT, (err) => {
  err 
  ? console.log(err) 
  : console.log(`Server started successfully at port ${config.getSection("development").PORT}`);
});
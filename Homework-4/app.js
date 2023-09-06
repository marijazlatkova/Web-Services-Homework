//! 1. Istrazete za bcrypt, jwt, express-jwt
//? 2. Probajte da ja dopolnite setNewPassword vo accounts/index.js -> mongoose modelot
//* 3. Probajte da napravite reset password

const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const config = require("./pkg/config");
require("./pkg/db");

const { accountRegister, accountLogin, resetPassword } = require("./handlers/authHandler");
const { createFilm, getAllFilms, getOneFilm, updateFilm, removeFilm } = require("./handlers/filmHandler");

const app = express();

app.use(express.json());

app.use(
  jwt({
    secret: config.getSection("development").JWT,
    algorithms: ["HS256"]
  }).unless({
    path: ["/api/v1/auth/register", "/api/v1/auth/login", "/api/v1/auth/resetPassword"]
  })
);

app.use(function (err, req, res, next) {
  if (err.name === "unauthorizedAccess") {
    return res.status(401).send("Invalid token");
  } 
});

app.post("/api/v1/auth/register", accountRegister);
app.post("/api/v1/auth/login", accountLogin);
app.post("/api/v1/auth/resetPassword", resetPassword);

app.post("/films", createFilm);
app.get("/films", getAllFilms);
app.get("/film/:id", getOneFilm);
app.put("/film/:id", updateFilm);
app.delete("/film/:id", removeFilm);

app.listen(config.getSection("development").PORT, (err) => {
  err 
  ? console.log(err) 
  : console.log(`Server started successfully at port ${config.getSection("development").PORT}`);
});
//! 1. Napravete gi funkciite od prethodniot cas da rabotat so handleri
//? 2. Testirajte gi CRUD funkciite preku POSTMAN
//* 3. Demonstrirajte i objasnete go procesot vo tekot na naredniot cas

const express = require("express");
const db = require("./pkg/db/config");
const { getAllFilms, getOneFilm, createFilm, updateFilm, removeFilm } = require("./handlers/filmHandler");
const app = express();

db.connect();

app.use(express.json());

app.get("/films", getAllFilms);
app.get("/film/:id", getOneFilm);
app.post("/films", createFilm);
app.patch("/film/:id", updateFilm);
app.delete("/film/:id", removeFilm);

const PORT = 10000;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server started successfully on port ${PORT}`);
});
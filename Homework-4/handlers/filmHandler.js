const { films, validate } = require("../pkg/films/validate");
const { findAll, findOne, create, update, remove } = require("../pkg/films");

const createFilm = async (req, res) => {
  try {
    await validate(req.body, films);
    const newFilm = await create(req.body);
    return res.status(201).send(newFilm);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getAllFilms = async (req, res) => {
  try {
    const allFilms = await findAll();
    const totalFilms = allFilms.length;
    return res.status(200).send({
      message: `${totalFilms} films found successfully`,
      data: allFilms
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getOneFilm = async (req, res) => {
  try {
    const film = await findOne(req.params.id);
    return res.status(200).send(film);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const updateFilm = async (req, res) => {
  try {
    await update(req.params.id, req.body);
    return res.status(204).send("");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const removeFilm = async (req, res) => {
  try {
    await remove(req.params.id);
    return res.status(204).send("");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllFilms,
  getOneFilm,
  createFilm,
  updateFilm,
  removeFilm
};
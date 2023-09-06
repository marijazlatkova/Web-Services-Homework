const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
  title: {
    type: String
  },
  director: {
    type: String
  },
  genre: {
    type: String
  },
  release_year: {
    type: Number
  },
  rating: {
    type: Number
  },
  language: {
    type: String
  }
});

const Film = mongoose.model("Film", filmSchema, "films");

const findAll = async () => {
  return await Film.find({});
};

const findOne = async (id) => {
  return await Film.findOne({ _id: id });
};

const create = async (data) => {
  const film = new Film(data);
  return await film.save();
};

const update = async (id, data) => {
  return await Film.updateOne({ _id: id }, data);
};

const remove = async (id) => {
  return await Film.deleteOne({ _id: id });
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove
};
const mongoose = require("mongoose");

const recipesSchema = new mongoose.Schema({
  title: {
    type: String
  },
  ingredients: {
    type: [String]
  },
  instructions: {
    type: String
  },
  prepTime: {
    type: Number
  },
  cookTime: {
    type: Number
  },
  servings: {
    type: Number
  },
  account_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "accounts"
  } 
});

const Recipe = mongoose.model("Recipe", recipesSchema, "recipes");

const create = async (data) => {
  const recipe = new Recipe(data);
  return await recipe.save();
};

const getAll = async (account_id) => {
  return await Recipe.find({ account_id });
};

const getOne = async (account_id, id) => {
  return await Recipe.findOne({ account_id, _id: id });
};

const getAllAlphabetically = async (account_id) => {
  const data = await getAll(account_id);
  return data.sort((a, b) => a - b);
};

const update = async (id, newData) => {
  return await Recipe.updateOne({ _id: id }, newData);
};

const remove = async (id) => {
  return await Recipe.deleteOne({ _id: id });
};

module.exports = {
  create,
  getAll,
  getOne,
  getAllAlphabetically,
  update,
  remove
};
const { recipePost, recipePut, validate } = require("../pkg/recipes/validate");
const Recipe = require("../pkg/recipes");

const createRecipe = async (req, res) => {
  try {
    await validate(req.body, recipePost);
    if (!req.auth.id) {
      return res.status(400).send("Unauthorized action!");
    }
    const data = {
      ...req.body,
      account_id: req.auth.id
    }
    const newRecipe = await Recipe.create(data);
    return res.status(201).send(newRecipe);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await Recipe.getAllAlphabetically(req.auth.id);
    const totalRecipes = allRecipes.length;
    return res.status(200).send({
      message: `${totalRecipes} recipes found successfully`,
      data: allRecipes
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getOneRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.getOne(req.auth.id, req.params.id);
  if (!recipe) {
    return res.status(404).send("Recipe not found!");
  }
  return res.status(200).send(recipe);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const updateRecipe = async (req, res) => {
  try {
    await validate(req.body, recipePut);
    if (!req.auth.id) {
      return res.status(400).send("Unauthorized action!");
    }
    const data = {
      ...req.body,
      account_id: req.auth.id
    }
    await Recipe.update(req.params.id, data);
    return res.status(204).send("");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const removeRecipe = async (req, res) => {
  try {
    if (!req.auth.id) {
      return res.status(400).send("Unauthorized action!");
    }
    await Recipe.remove(req.params.id, req.auth.id);
    return res.status(204).send("");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createRecipe, 
  getAllRecipes,
  getOneRecipe,
  updateRecipe,
  removeRecipe
};
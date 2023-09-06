const { Validator } = require("node-input-validator");

const recipePost = {
  title: "required|string|maxLength:20",
  ingredients: "required|array",
  instructions: "required|string",
  prepTime: "required|integer|min:3|max:3",
  cookTime: "required|integer|min:3|max:3",
  servings: "required|integer|min:5|max:5"
};

const recipePut = {
  title: "string",
  ingredients: "array",
  instructions: "string",
  prepTime: "integer",
  cookTime: "integer",
  servings: "integer"
};

const validate = async (data, schema) => {
  const v = new Validator(data, schema);
  const e = v.check();
  if (!e) {
    throw {
      code: 400,
      error: v.errors
    };
  };
};

module.exports = {
  recipePost, 
  recipePut,
  validate
};
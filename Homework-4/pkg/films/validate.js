const { Validator } = require("node-input-validator");

const films = {
  title: "required|string|minLength:3",
  director: "required|string|minLength:3",
  genre: "required|string|minLength:3",
  release_year: "required|number|min:4|max:4",
  rating: "required|number|min:4|max:4",
  language: "required|string|minLength:3"
};

const validate = async (data, schema) => {
  let v = new Validator(data, schema);
  let e = v.check();
  if (!e) {
    throw {
      code: 400,
      error: v.errors
    };
  };
};

module.exports = {
  films,
  validate
};
const { Validator } = require("node-input-validator");

const register = {
  username: "required|string",
  email: "required|email",
  password: "required|string"
};

const login = {
  email: "required|email",
  password: "required|string"
};

const resetPass = {
  old_password: "required|string",
  new_password: "required|string"
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
  register,
  login,
  resetPass,
  validate
};
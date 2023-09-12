const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { register, login, resetPass, validate } = require("../pkg/accounts/validate");
const Account = require("../pkg/accounts");
const config = require("../pkg/config");

const accountRegister = async (req, res) => {
  try {
    await validate(req.body, register);
    const exists = await Account.getByEmail(req.body.email);
    if (exists) {
      return res.status(400).send("Account with this email already exists!");
    }
    req.body.password = bcrypt.hashSync(req.body.password);
    const account = await Account.create(req.body);
    return res.status(201).send(account);
  } catch (err) {
    return res.status(err.status).send(err.status);
  }
};

const accountLogin = async (req, res) => {
  try {
    await validate(req.body, login);
    const { email, password } = req.body;
    const account = await Account.getByEmail(email);
    if (!account) {
      return res.status(400).send("Account not found!");
    }
    if (!bcrypt.compareSync(password, account.password)) {
      return res.status(400).send("Incorrect password!");
    }
    const payload = {
      username: account.username,
      email: account.email,
      id: account._id,
      exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60
    }
    const token = jwt.sign(payload, config.getSection("development").JWT);
    return res.status(200).send(token);
  } catch (err) {
    return res.status(err.status).send(err.status);
  }
};

const refreshToken = async (req, res) => {
  try {
    const payload = {
      ...req.auth,
      exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60
    }
    const token = jwt.sign(payload, config.getSection("development").JWT);
    return res.status(200).send(token);
  } catch (err) {
    return res.status(err.status).send(err.status);
  }
};

const resetPassword = async (req, res) => {
  try {
    await validate(req.body, resetPass);
    const { old_password, new_password, email } = req.body;
    const account = await Account.getByEmail(email);
    if (!account) {
      return res.status(400).send("Account not found!");
    }
    if (!bcrypt.compareSync(old_password, account.password)) {
      return res.status(400).send("Incorrect password!");
    }
    if (old_password === new_password) {
      return res.status(400).send("New password cannot be the same as old password");
    }
    const newPassword = bcrypt.hashSync(new_password);
    await Account.setNewPassword(account._id, newPassword);
    return res.status(200).send("Password reset successfully");
  } catch (err) {
    return res.status(err.status).send(err.status);
  }
};

module.exports = { accountRegister, accountLogin, refreshToken, resetPassword };
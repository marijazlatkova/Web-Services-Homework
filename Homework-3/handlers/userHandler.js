const { addUser, getAll } = require("../pkg/users/userSchema");

const createUser = async (req, res) => {
  try {
    const newUser = await addUser(req.body);
    return res.status(201).send(newUser);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await getAll();
    const allUsersWithoutPassword = allUsers.map(user => {
      user.password = undefined;
      return user;
    });
    return res.status(200).send(allUsersWithoutPassword);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createUser,
  getAllUsers
};
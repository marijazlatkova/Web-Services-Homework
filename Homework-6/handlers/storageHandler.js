const fs = require("fs");
const makeId = require("../pkg/strings");

const MAX_FILESIZE = 1048576;
const ALLOWED_FILETYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/pjpeg"
];

const upload = async (req, res) => {
  try {
    if (MAX_FILESIZE < req.files.document.size) {
      return res.status(400).send("File exceeds max file size!");
    }

    if (!ALLOWED_FILETYPES.includes(req.files.document.mimetype)) {
      return res.status(400).send("File type is not allowed");
    }

    const userDir = `user_${req.auth.id}`;
    const userDirPath = `${__dirname}/../uploads/${userDir}`;

    if (!fs.existsSync(userDirPath)) {
      fs.mkdirSync(userDirPath);
    }

    const fileName = `${makeId(6)}_${req.files.document.name}`;
    const filePath = `${userDirPath}/${fileName}`;

    req.files.document.mv(filePath, (err) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      }
      return res.status(200).send({ file_name: fileName });
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const download = async (req, res) => {
  try {
    const userDir = `user_${req.auth.id}`;
    const userDirPath = `${__dirname}/../uploads/${userDir}`;
    const filePath = `${userDirPath}/${req.params.filename}`;

    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File not found!");
    }

    res.download(filePath);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const listFiles = async (req, res) => {
  try {
    const userDir = `user_${req.auth.id}`;
    const userDirPath = `${__dirname}/../uploads/${userDir}`;

    if (!fs.existsSync(userDirPath)) {
      return res.status(400).send("You don't have any uploads yet!");
    }

    const files = fs.readdirSync(userDirPath);
    return res.status(200).send({ msg: "Uploaded files", files });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const removeFiles = async (req, res) => {
  try {
    const userDir = `user_${req.auth.id}`;
    const userDirPath = `${__dirname}/../uploads/${userDir}`;

    if (!fs.existsSync(userDirPath)) {
      return res.status(400).send("User directory not found.");
    }

    const fileName = req.params.filename;
    const filePath = `${userDirPath}/${fileName}`;

    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File not found.");
    }

    fs.unlinkSync(filePath);

    const filesInDir = fs.readdirSync(userDirPath);

    if (filesInDir.length === 0) {
      fs.rmdirSync(userDirPath);
      return res.status(200).send(`File ${fileName} removed, and user directory ${userDir} deleted.`);
    }

    return res.status(200).send(`File ${fileName} removed.`);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  upload,
  download,
  listFiles,
  removeFiles
};
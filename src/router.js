const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const { userRefs } = require("../firebase/configFirestore.js");
const { bucket: storageBucket } = require('../firebase/configStorage.js');

const {
  index,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("./controller.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "images";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const filter = function (req, file, cb) {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    req.errorMessage = "File is not a valid image!";
    cb(null, false);
  }
};

const upload = multer({ storage, filter });

router.post("/upload/", upload.single("image"), async (req, res) => {
  try {
    id = req.query.id || req.params.id

    if (!id) {
        return res.status(400).json({
          status: {
            code: 400,
            message: "Bad Request",
          },
          error: "Missing 'id' parameter.",
        });
      }

    const file = req.file;

    const bucket = storageBucket;
    const timestamp = new Date().toISOString();
    const filePath = `images/${timestamp}_${file.originalname}`;
    const uploadOpt = {
      destination: filePath,
      metadata: { contentType: file.mimetype },
    };
    await bucket.upload(file.path, uploadOpt);

    const imageURL = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

    await userRefs.doc(id).update({ imageURL });

    res.status(200).json({
      status: {
        code: 200,
        message: "Images Added",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: {
        code: 500,
        message: "Internal Server Error",
      },
      error: error.message,
    });
  }
});

router.get("/", index);
router.get("/users", getUsers);
router.get("/users/:id", getUsers);
router.post("/users", addUser);
router.put("/users", updateUser);
router.put("/users/:id", updateUser);
router.delete("/users", deleteUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
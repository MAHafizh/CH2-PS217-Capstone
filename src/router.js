const express = require("express");
const router = express.Router();
const { index, getUsers } = require("./controller.js");

router.get("/", index);
router.get("/users", getUsers);

module.exports = router;

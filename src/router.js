const express = require("express");
const router = express.Router();
const { index, getUsers, addUsers } = require("./controller.js");

router.get("/", index);
router.get("/users", getUsers);
router.post("/users", addUsers);

module.exports = router;

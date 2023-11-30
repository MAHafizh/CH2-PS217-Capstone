const express = require("express");
const router = express.Router();
const { index, getUsers, addUsers, updateUsers } = require("./controller.js");

router.get("/", index);
router.get("/users", getUsers);
router.post("/users", addUsers);
router.put("/users/:id", updateUsers);

module.exports = router;

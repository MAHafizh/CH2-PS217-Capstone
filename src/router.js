const express = require("express");
const router = express.Router();
const { index, getUsers, addUser, updateUser, deleteUser } = require("./controller.js");

router.get("/", index);
router.get("/users", getUsers);
router.post("/users", addUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;

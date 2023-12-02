const express = require("express");
const router = express.Router();
const { index, getUsers, addUser, updateUser, deleteUser, addImgUser } = require("./controller.js");

router.get("/", index);
router.get("/users", getUsers);
router.get("/users/:id", getUsers);
router.post("/users", addUser);
router.put("/users", updateUser);
router.put("/users/:id", updateUser);
router.delete("/users", deleteUser);
router.delete("/users/:id", deleteUser);
router.post("/users/images", addImgUser);
router.post("/users/images/:id", addImgUser);

module.exports = router;

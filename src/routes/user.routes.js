const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const verifyToken = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/auth.middleware");

router.get("/", verifyToken, isAdmin, controller.getAllUsers);
router.put("/:id", verifyToken, controller.updateUser);
router.delete("/:id", verifyToken, isAdmin, controller.deleteUser);

module.exports = router;
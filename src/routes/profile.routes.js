const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const verifyToken = require("../middleware/auth.middleware");

router.put("/me", verifyToken.verifyToken, controller.updateUser);
router.get("/me", verifyToken.verifyToken, controller.detailUser);

module.exports = router;
const express = require("express");
const router = express.Router();
const controller = require("../controllers/car.controller");
const verifyToken = require("../middleware/auth.middleware");

router.get("/", verifyToken, controller.getAllCars);
router.post("/", verifyToken, controller.createCar);
router.put("/:id", verifyToken, controller.updateCar);
router.delete("/:id", verifyToken, controller.deleteCar);

module.exports = router;
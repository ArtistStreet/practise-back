const express = require("express");
const router = express.Router();
const controller = require("../controllers/car.controller");
const verifyToken = require("../middleware/auth.middleware");

router.get("/", verifyToken.verifyToken, controller.getAllCars);
router.get("/my-cars", verifyToken.verifyToken, controller.getMyCars);
router.post("/", verifyToken.verifyToken, controller.createCar);
router.put("/:id", verifyToken.verifyToken, controller.updateCar);
router.delete("/:id", verifyToken.verifyToken, controller.deleteCar);

module.exports = router;
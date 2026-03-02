const Car = require("../models/car.model")
const { getPagination } = require("../utils/pagination");

exports.getAllCars = async (req, res) => {
     try {
          const { page, limit, skip } = getPagination(req);

          const cars = await Car.find().populate("owner", "name").skip(skip).limit(limit);
          res.status(200).json({
               success: true,
               count: cars.length,
               page,
               totalPages: Math.ceil(await Car.countDocuments() / limit),
               data: cars
          })
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
}

exports.getMyCar = async (req, res) => {
     try {
          const { page, limit, skip } = getPagination(req);

          const car = await Car.find({ owner: req.user.id }).skip(skip).limit(limit);
          res.status(200).json({
               success: true,
               count: car.length,
               page,
               totalPages: Math.ceil(await Car.countDocuments({ owner: req.user.id }) / limit),
               data: car
          })
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
}

exports.createCar = async (req, res) => {
     const { brand, plateNumber } = req.body;
     try {
          const newCar = await Car.create({
               owner: req.user.id,
               brand,
               plateNumber
          })

          res.status(201).json({
               success: true,
               data: newCar
          })
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
}

exports.updateCar = async (req, res) => {
     try {
          const { id } = req.params;
          const { brand, plateNumber } = req.body;
          const updatedCar = await Car.findByIdAndUpdate(id, {
               brand,
               plateNumber
          }, { new: true });

          res.json({
               success: true,
               data: updatedCar
          })
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
}

exports.deleteCar = async (req, res) => {
     try {
          const { id } = req.params;
          const deleteCar = await Car.findByIdAndDelete(id);
          res.json({
               success: true,
               data: deleteCar
          })
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
}
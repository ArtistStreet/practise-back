const mongoose = require("mongoose");

const carModel = new mongoose.Schema({
     owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
     brand: { type: String, required: true },
     plateNumber: { type: String, required: true }
})

module.exports = mongoose.model("Car", carModel);

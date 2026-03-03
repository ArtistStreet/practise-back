require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/users", require("./src/routes/user.routes"));
app.use("/api/cars", require("./src/routes/car.routes"));
app.use("/api/profile", require("./src/routes/profile.routes"));

mongoose.connect("mongodb://localhost:27017/gara")
     .then(() => console.log("MongoDB connected"))
     .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on 5000"));
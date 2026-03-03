const User = require("../models/user.model");
const { getPagination } = require("../utils/pagination");

exports.getAllUsers = async (req, res) => {
     try {
          const { page, limit, skip } = getPagination(req)

          const users = await User.find().select("-password").skip(skip).limit(limit);
          res.status(200).json({
               success: true,
               count: users.length,
               page,
               totalPages: Math.ceil(await User.countDocuments() / limit),
               data: users
          })
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
}

exports.detailUser = async (req, res) => {
     try {
          const user = await User.findById(req.user.id).select("-password");

          if (!user) {
               return res.status(404).json({ error: "User not found" });
          }

          res.status(200).json({
               success: true,
               data: user,
          });
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

exports.updateUser = async (req, res) => {
     try {
          const { name, email } = req.body;

          const updatedUser = await User.findByIdAndUpdate(
               req.user.id,
               { name, email },
               { new: true }
          ).select("-password");

          if (!updatedUser) {
               return res.status(404).json({ error: "User not found" });
          }

          res.status(200).json({
               success: true,
               data: updatedUser,
          });
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

exports.deleteUser = async (req, res) => {
     try {
          const { id } = req.params;
          const deleteUser = await User.findByIdAndDelete(id);
          if (!deleteUser) {
               return res.status(404).json({ error: "User not found" });
          }
          res.status(200).json({
               success: true,
               message: "User deleted successfully"
          })
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
}
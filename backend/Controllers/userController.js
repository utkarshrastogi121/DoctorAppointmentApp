import mongoose from "mongoose";
import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const updateUser = async (req, res) => {
  const id = req.params.id;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  if (req.userId !== id && req.userRole !== "admin") {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update!",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  if (req.userId !== id && req.userRole !== "admin") {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete!",
      error: error.message,
    });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No User Found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user!",
      error: error.message,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      message: "Users Found",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users!",
      error: error.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile info retrieved",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, cannot get profile",
      error: error.message,
    });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId }).populate("doctor");

    if (!bookings || bookings.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No appointments found",
        data: [],
      });
    }

    const uniqueDoctorsMap = new Map();
    bookings.forEach((booking) => {
      if (booking.doctor) {
        const doctorData = { ...booking.doctor._doc };
        delete doctorData.password;
        uniqueDoctorsMap.set(doctorData._id.toString(), doctorData);
      }
    });

    const uniqueDoctors = Array.from(uniqueDoctorsMap.values());

    res.status(200).json({
      success: true,
      message: "Appointments retrieved",
      data: uniqueDoctors,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, cannot get appointments",
      error: err.message,
    });
  }
};

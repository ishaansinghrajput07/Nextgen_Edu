import Counsellor from "../models/Counsellor.model.js";
import Counter from "../models/Counter.model.js";
import bcrypt from "bcrypt";
import Activity from "../models/activity.model.js";

// Add Counsellor
export const addCounsellor = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      password,
      designation,
      department,
      role,
      monthlyLeadTarget,
      monthlyAdmissionTarget,
    } = req.body;

    const existing = await Counsellor.findOne({ email });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Counsellor already exists",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const counter = await Counter.findOneAndUpdate(
      { name: "employeeId" },
      { $inc: { sequence: 1 } },
      { new: true, upsert: true },
    );

    const employeeId = `EMP${String(counter.sequence).padStart(3, "0")}`;

    const counsellor = await Counsellor.create({
      name,
      email,
      phoneNumber,
      password: hashpassword,
      employeeId,
      designation,
      department,
      role,
      monthlyLeadTarget,
      monthlyAdmissionTarget,
      createdBy: req.user._id,
    });

    await Activity.create({
      action: `Added Counsellor ${counsellor.name}`,
      by: req.user.name,
    });

    return res.status(201).json({
      success: true,
      counsellor,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Counsellor
export const updateCounsellor = async (req, res) => {
  try {
    const updated = await Counsellor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found",
      });
    }

    await Activity.create({
      action: `Updated Counsellor ${updated.name}`,
      by: req.user.name,
    });

    return res.status(200).json({
      success: true,
      counsellor: updated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Counsellors
export const getAllCounsellors = async (req, res) => {
  try {
    const counsellors = await Counsellor.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: counsellors.length,
      counsellors,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Single Counsellor
export const getSingleCounsellor = async (req, res) => {
  try {
    const counsellor = await Counsellor.findById(req.params.id);

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found",
      });
    }

    return res.status(200).json({
      success: true,
      counsellor,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Counsellor
export const deleteCounsellor = async (req, res) => {
  try {
    const counsellor = await Counsellor.findById(req.params.id);

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found",
      });
    }

    await counsellor.deleteOne();
    await Activity.create({
      action: `Deleted Counsellor ${counsellor.name}`,
      by: req.user.name,
    });

    return res.status(200).json({
      success: true,
      message: "Counsellor deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Change Status
export const changeCounsellorStatus = async (req, res) => {
  try {
    const counsellor = await Counsellor.findById(req.params.id);

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found",
      });
    }

    counsellor.status = counsellor.status === "Active" ? "Inactive" : "Active";

    await counsellor.save();

    await Activity.create({
      action: `${counsellor.name} marked as ${counsellor.status}`,
      by: req.user.name,
    });

    return res.status(200).json({
      success: true,
      counsellor,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

import mongoose from "mongoose";
import Contact from "../models/Contact.model.js";
import Student from "../models/student.model.js";
import Commission from "../models/commission.model.js";
import bcrypt from "bcryptjs";

import Admission from "../models/admission.model.js";
import Counsellor from "../models/counsellor.model.js";
import Notification from "../models/notification.model.js";
import Activity from "../models/activity.model.js";
import Email from "../models/email.model.js";
import Auth from "../models/auth.model.js";
import { sanitizeAdmissionForCounsellor } from "../util/workflow.js";

export const createCounsellor = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      password,
      employeeId,
      designation,
      department,
      role,
      monthlyLeadTarget,
      monthlyAdmissionTarget,
      joiningDate,
      notes,
      permissions,
      profileImage,
    } = req.body;

    // ==========================================
    // Required Validation
    // ==========================================

    if (!name || !email || !phoneNumber || !password || !employeeId) {
      return res.status(400).json({
        success: false,
        message:
          "Name, Email, Phone Number, Password and Employee ID are required.",
      });
    }

    // ==========================================
    // Duplicate Email
    // ==========================================

    const emailExists = await Counsellor.findOne({
      email: email.toLowerCase(),
    });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // ==========================================
    // Duplicate Employee ID
    // ==========================================

    const employeeExists = await Counsellor.findOne({
      employeeId,
    });

    if (employeeExists) {
      return res.status(400).json({
        success: false,
        message: "Employee ID already exists.",
      });
    }

    // ==========================================
    // Duplicate Phone
    // ==========================================

    const phoneExists = await Counsellor.findOne({
      phoneNumber,
    });

    if (phoneExists) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists.",
      });
    }

    // ==========================================
    // Hash Password
    // ==========================================

    const hashedPassword = await bcrypt.hash(password, 10);

    // ==========================================
    // Create Counsellor
    // ==========================================

    const counsellor = await Counsellor.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phoneNumber: phoneNumber.trim(),
      password: hashedPassword,
      employeeId: employeeId.trim(),

      designation: designation || "Counsellor",
      department: department || "Admissions",
      role: role || "Counsellor",

      status: "Active",

      profileImage: profileImage || "",

      monthlyLeadTarget: monthlyLeadTarget || 0,
      monthlyAdmissionTarget: monthlyAdmissionTarget || 0,

      joiningDate: joiningDate || new Date(),

      notes: notes || "",

      permissions: permissions || [],

      createdBy: req.user._id,
    });

    // ==========================================
    // Activity Log
    // ==========================================

    await Activity.create({
      action: `Created Counsellor (${counsellor.name})`,
      by: req.user.name,
    });

    // ==========================================
    // Response
    // ==========================================

    return res.status(201).json({
      success: true,
      message: "Counsellor created successfully.",

      counsellor: {
        _id: counsellor._id,
        name: counsellor.name,
        email: counsellor.email,
        phoneNumber: counsellor.phoneNumber,
        employeeId: counsellor.employeeId,
        designation: counsellor.designation,
        department: counsellor.department,
        role: counsellor.role,
        status: counsellor.status,
        monthlyLeadTarget: counsellor.monthlyLeadTarget,
        monthlyAdmissionTarget: counsellor.monthlyAdmissionTarget,
        joiningDate: counsellor.joiningDate,
        createdAt: counsellor.createdAt,
      },
    });
  } catch (error) {
    console.log("CREATE COUNSELLOR ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create counsellor.",
      error: error.message,
    });
  }
};

// ======================================================
// COUNSELLOR SELF
// CHANGE PASSWORD
// ======================================================

export const changeCounsellorPassword = async (req, res) => {
  try {
    const counsellorId = req.user._id;

    const { currentPassword, newPassword } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters.",
      });
    }

    // ==========================================
    // FIND COUNSELLOR
    // ==========================================

    const counsellor = await Counsellor.findById(counsellorId);

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found.",
      });
    }

    // ==========================================
    // VERIFY CURRENT PASSWORD
    // ==========================================

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      counsellor.password,
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    // ==========================================
    // HASH NEW PASSWORD
    // ==========================================

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    counsellor.password = hashedPassword;

    await counsellor.save();

    // ==========================================
    // ACTIVITY LOG
    // ==========================================

    await Activity.create({
      action: `Changed counsellor password (${counsellor.name})`,
      by: counsellor.name,
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.log("CHANGE COUNSELLOR PASSWORD ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to change password.",
      error: error.message,
    });
  }
};

// ======================================================
// PART 1B
// GET ALL COUNSELLORS
// Admin / Super Admin
// ======================================================

export const getAllCounsellors = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", status, role } = req.query;

    page = Number(page);
    limit = Number(limit);

    // ==========================================
    // Query
    // ==========================================

    const query = {};

    // ==========================================
    // Search
    // ==========================================

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          employeeId: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phoneNumber: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // ==========================================
    // Status Filter
    // ==========================================

    if (status && status !== "All") {
      query.status = status;
    }

    // ==========================================
    // Role Filter
    // ==========================================

    if (role && role !== "All") {
      query.role = role;
    }

    // ==========================================
    // Total Records
    // ==========================================

    const total = await Counsellor.countDocuments(query);

    // ==========================================
    // Get Counsellors
    // ==========================================

    const counsellors = await Counsellor.find(query)
      .select("-password")
      .populate("createdBy", "name email")
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit);

    // ==========================================
    // Response
    // ==========================================

    return res.status(200).json({
      success: true,

      pagination: {
        totalRecords: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        limit,
      },

      count: counsellors.length,

      counsellors,
    });
  } catch (error) {
    console.log("GET ALL COUNSELLORS ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch counsellors.",
      error: error.message,
    });
  }
};

// ======================================================
// PART 1C
// GET SINGLE COUNSELLOR
// Admin / Super Admin
// ======================================================

export const getSingleCounsellor = async (req, res) => {
  try {
    const { id } = req.params;

    // ==========================================
    // Counsellor Details
    // ==========================================

    const counsellor = await Counsellor.findById(id)
      .select("-password")
      .populate("createdBy", "name email");

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found.",
      });
    }

    // ==========================================
    // Leads
    // ==========================================

    const totalLeads = await Contact.countDocuments({
      counsellor: id,
    });

    const convertedLeads = await Contact.countDocuments({
      counsellor: id,
      status: "Converted",
    });

    // ==========================================
    // Students
    // ==========================================

    const totalStudents = await Student.countDocuments({
      counsellor: id,
    });

    // ==========================================
    // Admissions
    // ==========================================

    const totalAdmissions = await Admission.countDocuments({
      counsellor: id,
    });

    // ==========================================
    // Universities
    // ==========================================

    const universities = await Admission.distinct("university", {
      counsellor: id,
    });

    // ==========================================
    // Recent Leads
    // ==========================================

    const recentLeads = await Contact.find({
      counsellor: id,
    })
      .select(
        `
        leadNumber
        leadName
        phoneNumber
        email
        interestedCourse
        university
        status
        createdAt
      `,
      )
      .sort({
        createdAt: -1,
      })
      .limit(10);

    // ==========================================
    // Response
    // ==========================================

    return res.status(200).json({
      success: true,

      counsellor,

      performance: {
        totalLeads,
        convertedLeads,
        totalStudents,
        totalAdmissions,

        conversionRate:
          totalLeads === 0
            ? 0
            : Number(((convertedLeads / totalLeads) * 100).toFixed(2)),

        totalCommission: counsellor.totalCommission,
        paidCommission: counsellor.paidCommission,
        pendingCommission: counsellor.pendingCommission,

        universities,
      },

      recentLeads,
    });
  } catch (error) {
    console.log("GET SINGLE COUNSELLOR ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch counsellor.",
      error: error.message,
    });
  }
};

// ======================================================
// PART 2A
// UPDATE COUNSELLOR
// Admin / Super Admin
// ======================================================

export const updateCounsellor = async (req, res) => {
  try {
    const { id } = req.params;

    // ==========================================
    // Find Counsellor
    // ==========================================

    const counsellor = await Counsellor.findById(id);

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found.",
      });
    }

    // ==========================================
    // Email Duplicate Check
    // ==========================================

    if (req.body.email && req.body.email.toLowerCase() !== counsellor.email) {
      const emailExists = await Counsellor.findOne({
        email: req.body.email.toLowerCase(),
        _id: { $ne: id },
      });

      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already exists.",
        });
      }

      counsellor.email = req.body.email.toLowerCase().trim();
    }

    // ==========================================
    // Phone Duplicate Check
    // ==========================================

    if (
      req.body.phoneNumber &&
      req.body.phoneNumber !== counsellor.phoneNumber
    ) {
      const phoneExists = await Counsellor.findOne({
        phoneNumber: req.body.phoneNumber,
        _id: { $ne: id },
      });

      if (phoneExists) {
        return res.status(400).json({
          success: false,
          message: "Phone number already exists.",
        });
      }

      counsellor.phoneNumber = req.body.phoneNumber.trim();
    }

    // ==========================================
    // Employee ID Duplicate Check
    // ==========================================

    if (req.body.employeeId && req.body.employeeId !== counsellor.employeeId) {
      const employeeExists = await Counsellor.findOne({
        employeeId: req.body.employeeId,
        _id: { $ne: id },
      });

      if (employeeExists) {
        return res.status(400).json({
          success: false,
          message: "Employee ID already exists.",
        });
      }

      counsellor.employeeId = req.body.employeeId.trim();
    }

    // ==========================================
    // Update Fields
    // ==========================================

    if (req.body.name !== undefined) counsellor.name = req.body.name.trim();

    if (req.body.designation !== undefined)
      counsellor.designation = req.body.designation;

    if (req.body.department !== undefined)
      counsellor.department = req.body.department;

    if (req.body.role !== undefined) counsellor.role = req.body.role;

    if (req.body.status !== undefined) counsellor.status = req.body.status;

    if (req.body.monthlyLeadTarget !== undefined)
      counsellor.monthlyLeadTarget = req.body.monthlyLeadTarget;

    if (req.body.monthlyAdmissionTarget !== undefined)
      counsellor.monthlyAdmissionTarget = req.body.monthlyAdmissionTarget;

    if (req.body.joiningDate !== undefined)
      counsellor.joiningDate = req.body.joiningDate;

    if (req.body.notes !== undefined) counsellor.notes = req.body.notes;

    if (req.body.permissions !== undefined)
      counsellor.permissions = req.body.permissions;

    if (req.body.profileImage !== undefined)
      counsellor.profileImage = req.body.profileImage;

    // ==========================================
    // Save
    // ==========================================

    await counsellor.save();

    // ==========================================
    // Activity Log
    // ==========================================

    await Activity.create({
      action: `Updated counsellor (${counsellor.name})`,
      by: req.user.name,
    });

    // ==========================================
    // Response
    // ==========================================

    return res.status(200).json({
      success: true,
      message: "Counsellor updated successfully.",

      counsellor: {
        _id: counsellor._id,
        name: counsellor.name,
        email: counsellor.email,
        phoneNumber: counsellor.phoneNumber,
        employeeId: counsellor.employeeId,
        designation: counsellor.designation,
        department: counsellor.department,
        role: counsellor.role,
        status: counsellor.status,
        monthlyLeadTarget: counsellor.monthlyLeadTarget,
        monthlyAdmissionTarget: counsellor.monthlyAdmissionTarget,
        profileImage: counsellor.profileImage,
        joiningDate: counsellor.joiningDate,
        notes: counsellor.notes,
        permissions: counsellor.permissions,
      },
    });
  } catch (error) {
    console.log("UPDATE COUNSELLOR ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update counsellor.",
      error: error.message,
    });
  }
};

// ======================================================
// PART 2B
// DELETE COUNSELLOR
// Admin / Super Admin
// ======================================================

export const deleteCounsellor = async (req, res) => {
  try {
    const { id } = req.params;

    // ==========================================
    // Find Counsellor
    // ==========================================

    const counsellor = await Counsellor.findById(id);

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found.",
      });
    }

    // ==========================================
    // Check Assigned Leads
    // ==========================================

    const totalLeads = await Contact.countDocuments({
      counsellor: id,
    });

    if (totalLeads > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete counsellor. Assigned leads exist. Please reassign the leads first.",
      });
    }

    // ==========================================
    // Check Students
    // ==========================================

    const totalStudents = await Student.countDocuments({
      counsellor: id,
    });

    if (totalStudents > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete counsellor. Students are assigned.",
      });
    }

    // ==========================================
    // Check Admissions
    // ==========================================

    const totalAdmissions = await Admission.countDocuments({
      counsellor: id,
    });

    if (totalAdmissions > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete counsellor. Admissions are linked.",
      });
    }

    // ==========================================
    // Delete
    // ==========================================

    await Counsellor.findByIdAndDelete(id);

    // ==========================================
    // Activity Log
    // ==========================================

    await Activity.create({
      action: `Deleted counsellor (${counsellor.name})`,
      by: req.user.name,
    });

    // ==========================================
    // Response
    // ==========================================

    return res.status(200).json({
      success: true,
      message: "Counsellor deleted successfully.",
    });
  } catch (error) {
    console.log("DELETE COUNSELLOR ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete counsellor.",
      error: error.message,
    });
  }
};

// ======================================================
// PART 2C
// ACTIVATE / DEACTIVATE COUNSELLOR
// Admin / Super Admin
// ======================================================

export const updateCounsellorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be Active or Inactive",
      });
    }

    // ==========================================
    // FIND COUNSELLOR
    // ==========================================

    const counsellor = await Counsellor.findById(id);

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found",
      });
    }

    // ==========================================
    // UPDATE STATUS
    // ==========================================

    counsellor.status = status;

    await counsellor.save();

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: `Counsellor ${status.toLowerCase()} successfully`,
      counsellor,
    });
  } catch (error) {
    console.log("UPDATE COUNSELLOR STATUS ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update counsellor status",
      error: error.message,
    });
  }
};

// ======================================================
// PART 3A
// RESET COUNSELLOR PASSWORD
// Admin / Super Admin
// ======================================================

export const resetCounsellorPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // ==========================================
    // FIND COUNSELLOR
    // ==========================================

    const counsellor = await Counsellor.findById(id);

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found",
      });
    }

    // ==========================================
    // HASH PASSWORD
    // ==========================================

    const hashedPassword = await bcrypt.hash(password, 10);

    counsellor.password = hashedPassword;

    await counsellor.save();

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: "Counsellor password reset successfully",
    });
  } catch (error) {
    console.log("RESET COUNSELLOR PASSWORD ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reset counsellor password",
      error: error.message,
    });
  }
};

// ======================================================
// PART 3B
// ASSIGN LEADS TO COUNSELLOR
// Admin / Super Admin
// ======================================================

export const assignLeadsToCounsellor = async (req, res) => {
  try {
    const { counsellorId, leadIds } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!counsellorId) {
      return res.status(400).json({
        success: false,
        message: "Counsellor ID is required",
      });
    }

    if (!leadIds || !Array.isArray(leadIds) || leadIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Lead IDs are required",
      });
    }

    // ==========================================
    // CHECK COUNSELLOR
    // ==========================================

    const counsellor = await Counsellor.findById(counsellorId);

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found",
      });
    }

    // ==========================================
    // UPDATE LEADS
    // ==========================================

    const result = await Contact.updateMany(
      {
        _id: { $in: leadIds },
      },
      {
        $set: {
          counsellor: counsellorId,
          assignedBy: req.user._id,
          assignedAt: new Date(),
        },
      },
    );

    // ==========================================
    // ACTIVITY LOG
    // ==========================================

    await Activity.create({
      action: `Assigned ${leadIds.length} lead(s) to ${counsellor.name}`,
      by: req.user.name,
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: `${result.modifiedCount} lead(s) assigned successfully`,
      assignedCount: result.modifiedCount,
    });
  } catch (error) {
    console.log("ASSIGN LEADS ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to assign leads",
      error: error.message,
    });
  }
};

// ======================================================
// PART 3C
// REMOVE ASSIGNED LEADS
// Admin / Super Admin
// ======================================================

export const removeAssignedLeads = async (req, res) => {
  try {
    const { leadIds } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!leadIds || !Array.isArray(leadIds) || leadIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Lead IDs are required",
      });
    }

    // ==========================================
    // GET LEADS
    // ==========================================

    const leads = await Contact.find({
      _id: {
        $in: leadIds,
      },
    });

    if (leads.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No leads found",
      });
    }

    // ==========================================
    // REMOVE ASSIGNMENT
    // ==========================================

    const result = await Contact.updateMany(
      {
        _id: {
          $in: leadIds,
        },
      },
      {
        $unset: {
          counsellor: "",
          assignedBy: "",
          assignedAt: "",
        },
      },
    );

    // ==========================================
    // ACTIVITY
    // ==========================================

    await Activity.create({
      action: `${result.modifiedCount} lead(s) unassigned`,
      by: req.user.name,
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: `${result.modifiedCount} lead(s) removed successfully`,
      removedCount: result.modifiedCount,
    });
  } catch (error) {
    console.log("REMOVE ASSIGNED LEADS ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove assigned leads",
      error: error.message,
    });
  }
};

// ======================================================
// PART 4A
// GET COUNSELLOR PERFORMANCE
// Admin / Super Admin
// ======================================================

export const getCounsellorPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    // ==========================================
    // COUNSELLOR
    // ==========================================

    const counsellor = await Counsellor.findById(id).select("-password");

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found",
      });
    }

    // ==========================================
    // LEADS
    // ==========================================

    const totalLeads = await Contact.countDocuments({
      counsellor: id,
    });

    const newLeads = await Contact.countDocuments({
      counsellor: id,
      status: "New",
    });

    const contactedLeads = await Contact.countDocuments({
      counsellor: id,
      status: "Contacted",
    });

    const interestedLeads = await Contact.countDocuments({
      counsellor: id,
      status: "Interested",
    });

    const followUpLeads = await Contact.countDocuments({
      counsellor: id,
      status: "Follow Up",
    });

    const convertedLeads = await Contact.countDocuments({
      counsellor: id,
      status: "Converted",
    });

    const closedLeads = await Contact.countDocuments({
      counsellor: id,
      status: "Closed",
    });

    // ==========================================
    // STUDENTS
    // ==========================================

    const totalStudents = await Student.countDocuments({
      counsellor: id,
    });

    // ==========================================
    // ADMISSIONS
    // ==========================================

    const totalAdmissions = await Admission.countDocuments({
      counsellor: id,
    });

    const recentAdmissions = await Admission.find({
      counsellor: id,
    })
      .sort({ createdAt: -1 })
      .limit(10);

    // ==========================================
    // UNIVERSITIES
    // ==========================================

    const universities = await Admission.aggregate([
      {
        $match: {
          counsellor: counsellor._id,
        },
      },
      {
        $group: {
          _id: "$university",
          totalAdmissions: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          totalAdmissions: -1,
        },
      },
    ]);

    // ==========================================
    // CONVERSION RATE
    // ==========================================

    const conversionRate =
      totalLeads > 0
        ? Number(((convertedLeads / totalLeads) * 100).toFixed(2))
        : 0;

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      counsellor,

      performance: {
        totalLeads,
        newLeads,
        contactedLeads,
        interestedLeads,
        followUpLeads,
        convertedLeads,
        closedLeads,

        totalStudents,
        totalAdmissions,

        conversionRate,

        totalCommission: counsellor.totalCommission,
        paidCommission: counsellor.paidCommission,
        pendingCommission: counsellor.pendingCommission,
      },

      universities,

      recentAdmissions,
    });
  } catch (error) {
    console.log("GET COUNSELLOR PERFORMANCE ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch counsellor performance",
      error: error.message,
    });
  }
};

// ======================================================
// PART 4B
// MONTHLY PERFORMANCE ANALYTICS
// Admin / Super Admin
// ======================================================

export const getMonthlyPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    // ==========================================
    // CHECK COUNSELLOR
    // ==========================================

    const counsellor = await Counsellor.findById(id).select("name employeeId");

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found",
      });
    }

    // ==========================================
    // MONTHLY LEADS
    // ==========================================

    const monthlyLeads = await Contact.aggregate([
      {
        $match: {
          counsellor: counsellor._id,
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalLeads: {
            $sum: 1,
          },
          convertedLeads: {
            $sum: {
              $cond: [{ $eq: ["$status", "Converted"] }, 1, 0],
            },
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // ==========================================
    // MONTHLY ADMISSIONS
    // ==========================================

    const monthlyAdmissions = await Admission.aggregate([
      {
        $match: {
          counsellor: counsellor._id,
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalAdmissions: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // ==========================================
    // FORMAT DATA
    // ==========================================

    const monthNames = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const analytics = monthlyLeads.map((lead) => {
      const admission = monthlyAdmissions.find(
        (item) =>
          item._id.year === lead._id.year && item._id.month === lead._id.month,
      );

      const totalAdmissions = admission ? admission.totalAdmissions : 0;

      return {
        year: lead._id.year,
        month: monthNames[lead._id.month],

        totalLeads: lead.totalLeads,

        convertedLeads: lead.convertedLeads,

        totalAdmissions,

        conversionRate:
          lead.totalLeads > 0
            ? Number(((lead.convertedLeads / lead.totalLeads) * 100).toFixed(2))
            : 0,
      };
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      counsellor,

      analytics,
    });
  } catch (error) {
    console.log("MONTHLY PERFORMANCE ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch monthly performance",
      error: error.message,
    });
  }
};

// ======================================================
// PART 4C
// COUNSELLOR ACTIVITY TIMELINE
// ======================================================

export const getCounsellorActivityTimeline = async (req, res) => {
  try {
    const { id } = req.params;

    // ==========================================
    // Check Counsellor
    // ==========================================

    const counsellor = await Counsellor.findById(id).select(
      "name employeeId email",
    );

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found",
      });
    }

    // ==========================================
    // Activities
    // ==========================================

    const activities = await Activity.find({
      by: counsellor.name,
    })
      .sort({ createdAt: -1 })
      .limit(100);

    // ==========================================
    // Response
    // ==========================================

    return res.status(200).json({
      success: true,
      counsellor,
      totalActivities: activities.length,
      activities,
    });
  } catch (error) {
    console.log("GET COUNSELLOR ACTIVITY TIMELINE ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch counsellor activity timeline.",
      error: error.message,
    });
  }
};

// ======================================================
// PART 6A
// COUNSELLOR DASHBOARD REPORT
// Admin / Super Admin
// ======================================================

export const getCounsellorDashboardReport = async (req, res) => {
  try {
    const { id } = req.params;

    let { startDate, endDate } = req.query;

    const counsellor = await Counsellor.findById(id).select(
      "name employeeId email",
    );

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found",
      });
    }

    // ==========================================
    // DATE FILTER
    // ==========================================

    let filter = {
      counsellor: id,
    };

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // ==========================================
    // LEADS
    // ==========================================

    const totalLeads = await Contact.countDocuments(filter);

    const convertedLeads = await Contact.countDocuments({
      ...filter,
      status: "Converted",
    });

    const newLeads = await Contact.countDocuments({
      ...filter,
      status: "New",
    });

    const followUps = await Contact.countDocuments({
      ...filter,
      status: "Follow Up",
    });

    // ==========================================
    // ADMISSIONS
    // ==========================================

    const totalAdmissions = await Admission.countDocuments(filter);

    // ==========================================
    // COMMISSION
    // ==========================================

    const commissions = await Commission.find({
      counsellor: id,
      ...(startDate &&
        endDate && {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        }),
    });

    let totalCommission = 0;
    let paidCommission = 0;
    let pendingCommission = 0;

    commissions.forEach((item) => {
      totalCommission += item.amount || 0;

      if (item.status === "Paid") {
        paidCommission += item.amount || 0;
      } else {
        pendingCommission += item.amount || 0;
      }
    });

    // ==========================================
    // CONVERSION RATE
    // ==========================================

    const conversionRate =
      totalLeads > 0
        ? Number(((convertedLeads / totalLeads) * 100).toFixed(2))
        : 0;

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      counsellor,

      report: {
        totalLeads,
        newLeads,
        followUps,
        convertedLeads,
        totalAdmissions,

        conversionRate,

        totalCommission,
        paidCommission,
        pendingCommission,
      },
    });
  } catch (error) {
    console.log("DASHBOARD REPORT ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate dashboard report.",
      error: error.message,
    });
  }
};

// ======================================================
// PART 6B
// LEAD STATUS REPORT
// Admin / Super Admin
// ======================================================

export const getCounsellorLeadStatusReport = async (req, res) => {
  try {
    const { id } = req.params;

    let { startDate, endDate } = req.query;

    // ==========================================
    // CHECK COUNSELLOR
    // ==========================================

    const counsellor = await Counsellor.findById(id).select(
      "name employeeId email",
    );

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found",
      });
    }

    // ==========================================
    // FILTER
    // ==========================================

    const filter = {
      counsellor: counsellor._id,
    };

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // ==========================================
    // TOTAL LEADS
    // ==========================================

    const totalLeads = await Contact.countDocuments(filter);

    // ==========================================
    // STATUS REPORT
    // ==========================================

    const statuses = [
      "New",
      "Contacted",
      "Interested",
      "Follow Up",
      "Converted",
      "Closed",
      "Lost",
    ];

    const report = [];

    for (const status of statuses) {
      const count = await Contact.countDocuments({
        ...filter,
        status,
      });

      report.push({
        status,
        total: count,
        percentage:
          totalLeads > 0 ? Number(((count / totalLeads) * 100).toFixed(2)) : 0,
      });
    }

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      counsellor,

      totalLeads,

      report,
    });
  } catch (error) {
    console.log("LEAD STATUS REPORT ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch lead status report.",
      error: error.message,
    });
  }
};

// ======================================================
// PART 1
// COUNSELLOR SELF DASHBOARD
// ======================================================

export const getCounsellorDashboard = async (req, res) => {
  try {
    // ==========================================
    // LOGGED-IN COUNSELLOR
    // ==========================================

    const counsellorId = req.user._id;

    // ==========================================
    // COUNSELLOR DETAILS
    // ==========================================

    const counsellor =
      await Counsellor.findById(counsellorId).select("-password");

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found.",
      });
    }

    // ==========================================
    // LEADS
    // ==========================================

    const totalLeads = await Contact.countDocuments({
      counsellor: counsellorId,
    });

    const newLeads = await Contact.countDocuments({
      counsellor: counsellorId,
      status: "New",
    });

    const contactedLeads = await Contact.countDocuments({
      counsellor: counsellorId,
      status: "Contacted",
    });

    const interestedLeads = await Contact.countDocuments({
      counsellor: counsellorId,
      status: "Interested",
    });

    const followUpLeads = await Contact.countDocuments({
      counsellor: counsellorId,
      status: "Follow Up",
    });

    const convertedLeads = await Contact.countDocuments({
      counsellor: counsellorId,
      status: "Converted",
    });

    const closedLeads = await Contact.countDocuments({
      counsellor: counsellorId,
      status: "Closed",
    });

    // ==========================================
    // STUDENTS
    // ==========================================

    const totalStudents = await Student.countDocuments({
      counsellor: counsellorId,
    });

    // ==========================================
    // ADMISSIONS
    // ==========================================

    const totalAdmissions = await Admission.countDocuments({
      counsellor: counsellorId,
    });

    // ==========================================
    // COMMISSION
    // ==========================================

    const totalCommission = counsellor.totalCommission || 0;
    const paidCommission = counsellor.paidCommission || 0;
    const pendingCommission = counsellor.pendingCommission || 0;

    // ==========================================
    // CONVERSION RATE
    // ==========================================

    const conversionRate =
      totalLeads > 0
        ? Number(((convertedLeads / totalLeads) * 100).toFixed(2))
        : 0;

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      counsellor: {
        _id: counsellor._id,
        name: counsellor.name,
        email: counsellor.email,
        phoneNumber: counsellor.phoneNumber,
        employeeId: counsellor.employeeId,
        designation: counsellor.designation,
        department: counsellor.department,
        role: counsellor.role,
        status: counsellor.status,
        profileImage: counsellor.profileImage,
        joiningDate: counsellor.joiningDate,
      },

      stats: {
        totalLeads,
        newLeads,
        contactedLeads,
        interestedLeads,
        followUpLeads,
        convertedLeads,
        closedLeads,

        totalStudents,
        totalAdmissions,

        conversionRate,

        totalCommission,
        paidCommission,
        pendingCommission,
      },
    });
  } catch (error) {
    console.log("GET COUNSELLOR DASHBOARD ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch counsellor dashboard.",
      error: error.message,
    });
  }
};


// ======================================================
// COUNSELLOR SELF
// GET SINGLE MY LEAD
// ======================================================

export const getCounsellorLead = async (req, res) => {
  try {
    // ==========================================
    // LOGGED-IN COUNSELLOR
    // ==========================================

    const counsellorId = req.user._id;
    const { id } = req.params;

    // ==========================================
    // VALIDATE LEAD ID
    // ==========================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead ID.",
      });
    }

    // ==========================================
    // FIND LEAD
    // Only logged-in counsellor's lead
    // ==========================================

    const lead = await Contact.findOne({
      _id: id,
      counsellor: counsellorId,
    });

    // ==========================================
    // LEAD NOT FOUND
    // ==========================================

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found or not assigned to you.",
      });
    }

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      lead,
    });
  } catch (error) {
    console.log("GET COUNSELLOR LEAD ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch lead.",
      error: error.message,
    });
  }
};

// ======================================================
// PART 6C
// UNIVERSITY-WISE PERFORMANCE REPORT
// Admin / Super Admin
// ======================================================

export const getUniversityWisePerformanceReport = async (req, res) => {
  try {
    const { id } = req.params;

    let { startDate, endDate } = req.query;

    // ==========================================
    // CHECK COUNSELLOR
    // ==========================================

    const counsellor = await Counsellor.findById(id).select(
      "name employeeId email",
    );

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found",
      });
    }

    // ==========================================
    // FILTER
    // ==========================================

    const filter = {
      counsellor: counsellor._id,
    };

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // ==========================================
    // UNIVERSITY LIST
    // ==========================================

    const universities = await Contact.distinct("university", filter);

    const report = [];

    // ==========================================
    // LOOP
    // ==========================================

    for (const university of universities) {
      const leadFilter = {
        ...filter,
        university,
      };

      const totalLeads = await Contact.countDocuments(leadFilter);

      const convertedLeads = await Contact.countDocuments({
        ...leadFilter,
        status: "Converted",
      });

      const totalAdmissions = await Admission.countDocuments({
        counsellor: counsellor._id,
        university,
        ...(startDate &&
          endDate && {
            createdAt: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          }),
      });

      const commissions = await Commission.find({
        counsellor: counsellor._id,
        university,
        ...(startDate &&
          endDate && {
            createdAt: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          }),
      });

      let totalCommission = 0;

      commissions.forEach((item) => {
        totalCommission += item.amount || 0;
      });

      report.push({
        university,

        totalLeads,

        convertedLeads,

        totalAdmissions,

        conversionRate:
          totalLeads > 0
            ? Number(((convertedLeads / totalLeads) * 100).toFixed(2))
            : 0,

        totalCommission,
      });
    }

    // ==========================================
    // SORT
    // ==========================================

    report.sort((a, b) => b.totalAdmissions - a.totalAdmissions);

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      counsellor,

      totalUniversities: report.length,

      report,
    });
  } catch (error) {
    console.log("UNIVERSITY PERFORMANCE REPORT ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch university performance report.",
      error: error.message,
    });
  }
};


// ======================================================
// COUNSELLOR SELF
// GET COUNSELLOR PROFILE
// ======================================================

export const getCounsellorProfile = async (req, res) => {
  try {
    // ==========================================
    // LOGGED-IN COUNSELLOR
    // ==========================================

    const counsellorId = req.user._id;

    // ==========================================
    // FIND COUNSELLOR
    // ==========================================

    const counsellor = await Counsellor.findById(counsellorId)
      .select("-password")
      .populate("createdBy", "name email");

    // ==========================================
    // NOT FOUND
    // ==========================================

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor profile not found.",
      });
    }

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      counsellor: {
        _id: counsellor._id,
        name: counsellor.name,
        email: counsellor.email,
        phoneNumber: counsellor.phoneNumber,
        employeeId: counsellor.employeeId,
        designation: counsellor.designation,
        department: counsellor.department,
        role: counsellor.role,
        status: counsellor.status,
        profileImage: counsellor.profileImage,

        monthlyLeadTarget: counsellor.monthlyLeadTarget,
        monthlyAdmissionTarget: counsellor.monthlyAdmissionTarget,

        joiningDate: counsellor.joiningDate,
        notes: counsellor.notes,
        permissions: counsellor.permissions,

        totalCommission: counsellor.totalCommission || 0,
        paidCommission: counsellor.paidCommission || 0,
        pendingCommission: counsellor.pendingCommission || 0,

        createdAt: counsellor.createdAt,
        updatedAt: counsellor.updatedAt,
      },
    });
  } catch (error) {
    console.log("GET COUNSELLOR PROFILE ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch counsellor profile.",
      error: error.message,
    });
  }
};

// ======================================================
// COUNSELLOR SELF
// GET MY LEADS
// ======================================================

export const getMyLeads = async (req, res) => {
  try {
    // ==========================================
    // LOGGED-IN COUNSELLOR
    // ==========================================

    const counsellorId = req.user._id;

    let {
      page = 1,
      limit = 10,
      search = "",
      status,
      university,
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    // ==========================================
    // VALIDATION
    // ==========================================

    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    // ==========================================
    // FILTER
    // ==========================================

    const filter = {
      counsellor: counsellorId,
    };

    // ==========================================
    // SEARCH
    // ==========================================

    if (search) {
      filter.$or = [
        {
          leadName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phoneNumber: {
            $regex: search,
            $options: "i",
          },
        },
        {
          leadNumber: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // ==========================================
    // STATUS FILTER
    // ==========================================

    if (status && status !== "All") {
      filter.status = status;
    }

    // ==========================================
    // UNIVERSITY FILTER
    // ==========================================

    if (university && university !== "All") {
      filter.university = university;
    }

    // ==========================================
    // TOTAL LEADS
    // ==========================================

    const total = await Contact.countDocuments(filter);

    // ==========================================
    // FETCH LEADS
    // ==========================================

    const leads = await Contact.find(filter)
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit);

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      pagination: {
        totalRecords: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        limit,
      },

      count: leads.length,

      leads,
    });
  } catch (error) {
    console.log("GET MY LEADS ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch your leads.",
      error: error.message,
    });
  }
};

// ======================================================
// COUNSELLOR SELF
// GET RECENT ACTIVITIES
// ======================================================

export const getRecentActivities = async (req, res) => {
  try {
    // ==========================================
    // LOGGED-IN COUNSELLOR
    // ==========================================

    const counsellorId = req.user._id;

    // ==========================================
    // FIND COUNSELLOR
    // ==========================================

    const counsellor = await Counsellor.findById(counsellorId).select(
      "name email employeeId",
    );

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found.",
      });
    }

    // ==========================================
    // RECENT ACTIVITIES
    // ==========================================

    const activities = await Activity.find({
      by: counsellor.name,
    })
      .sort({
        createdAt: -1,
      })
      .limit(10);

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      count: activities.length,

      activities,
    });
  } catch (error) {
    console.log("GET RECENT ACTIVITIES ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch recent activities.",
      error: error.message,
    });
  }
};

// ======================================================
// COUNSELLOR SELF
// GET RECENT LEADS
// ======================================================

export const getRecentLeads = async (req, res) => {
  try {
    // ==========================================
    // LOGGED-IN COUNSELLOR
    // ==========================================

    const counsellorId = req.user._id;

    // ==========================================
    // FIND RECENT LEADS
    // ==========================================

    const leads = await Contact.find({
      counsellor: counsellorId,
    })
      .select(
        `
        _id
        leadNumber
        leadName
        phoneNumber
        email
        interestedCourse
        university
        status
        createdAt
        updatedAt
      `,
      )
      .sort({
        createdAt: -1,
      })
      .limit(10);

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      count: leads.length,

      leads,
    });
  } catch (error) {
    console.log("GET RECENT LEADS ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch recent leads.",
      error: error.message,
    });
  }
};

// ======================================================
// COUNSELLOR SELF
// GET RECENT STUDENTS
// ======================================================

export const getRecentStudents = async (req, res) => {
  try {
    // ==========================================
    // LOGGED-IN COUNSELLOR
    // ==========================================

    const counsellorId = req.user._id;

    // ==========================================
    // FIND RECENT STUDENTS
    // ==========================================

    const students = await Student.find({
      counsellor: counsellorId,
    })
      .sort({
        createdAt: -1,
      })
      .limit(10);

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      count: students.length,

      students,
    });
  } catch (error) {
    console.log("GET RECENT STUDENTS ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch recent students.",
      error: error.message,
    });
  }
};

// ======================================================
// COUNSELLOR SELF
// GET TODAY'S FOLLOW UPS
// ======================================================

export const getTodaysFollowUps = async (req, res) => {
  try {
    // ==========================================
    // LOGGED-IN COUNSELLOR
    // ==========================================

    const counsellorId = req.user._id;

    // ==========================================
    // TODAY START & END
    // ==========================================

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // ==========================================
    // TODAY'S FOLLOW UPS
    // ==========================================

    const followUps = await Contact.find({
      counsellor: counsellorId,

      followUpDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
      .sort({
        followUpDate: 1,
      })
      .limit(50);

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      count: followUps.length,

      followUps,
    });
  } catch (error) {
    console.log("GET TODAY'S FOLLOW UPS ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch today's follow ups.",
      error: error.message,
    });
  }
};

// ======================================================
// COUNSELLOR SELF
// UPDATE MY LEAD
// ======================================================

export const updateCounsellorLead = async (req, res) => {
  try {
    console.log("🔥 updateCounsellorLead HIT");
    console.log("Lead ID:", req.params.id);
    console.log("User ID:", req.user?._id);
    console.log("Body:", req.body);

    const counsellorId = req.user._id;
    const { id } = req.params;

    const lead = await Contact.findOne({
      _id: id,
      assignedTo: counsellorId,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found or not assigned to you.",
      });
    }

    if (req.body.username !== undefined) {
      lead.username = req.body.username.trim();
    }

    if (req.body.phoneNumber !== undefined) {
      lead.phoneNumber = req.body.phoneNumber.trim();
    }

    if (req.body.email !== undefined) {
      lead.email = req.body.email.trim().toLowerCase();
    }

    if (req.body.interestedCourse !== undefined) {
      lead.interestedCourse = req.body.interestedCourse;
    }

    if (req.body.university !== undefined) {
      lead.university = req.body.university;
    }

    if (req.body.status !== undefined) {
      lead.status = req.body.status;
    }

    if (req.body.followUpDate !== undefined) {
      lead.followUpDate = req.body.followUpDate;
    }

    if (req.body.notes !== undefined) {
      lead.notes = req.body.notes;
    }

    await lead.save();

    console.log("✅ LEAD SAVED:", lead._id);

    await Activity.create({
      action: `Updated lead (${lead.username || "Unknown"})`,
      by: req.user.name || req.user.email || "Counsellor",
    });

    return res.status(200).json({
      success: true,
      message: "Lead updated successfully.",
      lead,
    });
  } catch (error) {
    console.log("❌ UPDATE COUNSELLOR LEAD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update lead.",
      error: error.message,
    });
  }
};
// ======================================================
// COUNSELLOR SELF
// UPDATE COUNSELLOR PROFILE
// ======================================================

export const updateCounsellorProfile = async (req, res) => {
  try {
    // ==========================================
    // LOGGED-IN COUNSELLOR
    // ==========================================

    const counsellorId = req.user._id;

    // ==========================================
    // FIND COUNSELLOR
    // ==========================================

    const counsellor = await Counsellor.findById(counsellorId);

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor profile not found.",
      });
    }

    // ==========================================
    // EMAIL UPDATE
    // ==========================================

    if (
      req.body.email !== undefined &&
      req.body.email.toLowerCase().trim() !== counsellor.email
    ) {
      const email = req.body.email.toLowerCase().trim();

      const emailExists = await Counsellor.findOne({
        email,
        _id: { $ne: counsellorId },
      });

      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already exists.",
        });
      }

      counsellor.email = email;
    }

    // ==========================================
    // PHONE UPDATE
    // ==========================================

    if (
      req.body.phoneNumber !== undefined &&
      req.body.phoneNumber.trim() !== counsellor.phoneNumber
    ) {
      const phoneNumber = req.body.phoneNumber.trim();

      const phoneExists = await Counsellor.findOne({
        phoneNumber,
        _id: { $ne: counsellorId },
      });

      if (phoneExists) {
        return res.status(400).json({
          success: false,
          message: "Phone number already exists.",
        });
      }

      counsellor.phoneNumber = phoneNumber;
    }

    // ==========================================
    // NAME
    // ==========================================

    if (req.body.name !== undefined) {
      counsellor.name = req.body.name.trim();
    }

    // ==========================================
    // PROFILE IMAGE
    // ==========================================

    if (req.body.profileImage !== undefined) {
      counsellor.profileImage = req.body.profileImage;
    }

    // ==========================================
    // NOTES
    // ==========================================

    if (req.body.notes !== undefined) {
      counsellor.notes = req.body.notes;
    }

    // ==========================================
    // SAVE
    // ==========================================

    await counsellor.save();

    // ==========================================
    // ACTIVITY LOG
    // ==========================================

    await Activity.create({
      action: `Updated counsellor profile (${counsellor.name})`,
      by: counsellor.name,
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",

      counsellor: {
        _id: counsellor._id,
        name: counsellor.name,
        email: counsellor.email,
        phoneNumber: counsellor.phoneNumber,
        employeeId: counsellor.employeeId,
        designation: counsellor.designation,
        department: counsellor.department,
        role: counsellor.role,
        status: counsellor.status,
        profileImage: counsellor.profileImage,
        joiningDate: counsellor.joiningDate,
        notes: counsellor.notes,
        permissions: counsellor.permissions,
        monthlyLeadTarget: counsellor.monthlyLeadTarget,
        monthlyAdmissionTarget: counsellor.monthlyAdmissionTarget,
        totalCommission: counsellor.totalCommission || 0,
        paidCommission: counsellor.paidCommission || 0,
        pendingCommission: counsellor.pendingCommission || 0,
        createdAt: counsellor.createdAt,
        updatedAt: counsellor.updatedAt,
      },
    });
  } catch (error) {
    console.log("UPDATE COUNSELLOR PROFILE ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update counsellor profile.",
      error: error.message,
    });
  }
};
import Auth from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Counsellor from "../models/Counsellor.model.js";
import Contact from "../models/Contact.model.js";
import Activity from "../models/activity.model.js";
// ==============================
// Generate JWT Token
// ==============================

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// ==============================
// Register Super Admin
// (Only First Time)
// ==============================

export const registerSuperAdmin = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    const alreadyExists = await Auth.findOne({
      role: "SuperAdmin",
    });

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Super Admin already exists",
      });
    }

    const user = await Auth.create({
      name,
      email,
      phoneNumber,
      password,
      role: "SuperAdmin",
    });

    await Activity.create({
      action: "Super Admin Registered",
      by: user.name,
    });

    return res.status(201).json({
      success: true,
      message: "Super Admin Registered Successfully",
      token: generateToken(user._id),
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Login
// ==============================
// ==============================
// Login
// ==============================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // First check Auth Model
    let user = await Auth.findOne({
      email,
    }).select("+password");

    let userType = "Auth";

    // If not found check Counsellor Model

    if (!user) {
      user = await Counsellor.findOne({
        email,
      }).select("+password");

      if (user) {
        userType = "Counsellor";
      }
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    let isMatch;

    // Auth password check

    if (userType === "Auth") {
      isMatch = await user.comparePassword(password);
    }

    // Counsellor password check
    else {
      isMatch = await bcrypt.compare(password, user.password);
    }

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    user.lastLogin = new Date();

    await user.save();
    await Activity.create({
      action: "Logged In",
      by: user.name,
    });

    return res.status(200).json({
      success: true,

      message: "Login Successful",

      token: generateToken(user._id),

      user: {
        _id: user._id,

        name: user.name,

        email: user.email,

        role: userType === "Counsellor" ? "Counsellor" : user.role,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};
// ==============================
// Create Admin
// Super Admin Only
// ==============================

export const createAdmin = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    const exists = await Auth.findOne({
      email,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const admin = await Auth.create({
      name,
      email,
      phoneNumber,
      password,
      role: "Admin",
      createdBy: req.user._id,
    });

    await Activity.create({
      action: `Created Admin ${admin.name}`,
      by: req.user.name,
    });

    return res.status(201).json({
      success: true,
      message: "Admin Created Successfully",
      admin,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Get Profile
// ==============================

export const getProfile = async (req, res) => {
  try {
    let user;

    if (req.user.role === "Counsellor") {
      user = await Counsellor.findById(req.user._id).select("-password");
    } else {
      user = await Auth.findById(req.user._id).select("-password");
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Get All Admins
// ==============================

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Auth.find({
      role: "Admin",
    })
      .populate("createdBy", "name email")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: admins.length,
      admins,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Delete Admin
// ==============================

export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Auth.findById(req.params.id);
    await Activity.create({
      action: "Logged Out",
      by: req.user.name,
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    await admin.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Logout
// ==============================

export const logout = async (req, res) => {
  try {
    await Activity.create({
      action: "Logged Out",
      by: req.user.name,
    });

    return res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Change Password
// ==============================
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    let user;
    let isMatch;

    if (req.user.role === "Counsellor") {
      user = await Counsellor.findById(req.user._id).select("+password");

      isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Old Password is incorrect",
        });
      }

      user.password = await bcrypt.hash(newPassword, 10);
    } else {
      user = await Auth.findById(req.user._id).select("+password");

      isMatch = await user.comparePassword(oldPassword);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Old Password is incorrect",
        });
      }

      user.password = newPassword;
    }

    await user.save();
    await Activity.create({
      action: "Changed Password",
      by: req.user.name,
    });

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const adminPerformance = async (req, res) => {
  try {
    const admins = await Auth.find({ role: "Admin" });

    const data = await Promise.all(
      admins.map(async (admin) => {
        // Admin ke counsellors
        const counsellors = await Counsellor.find({
          createdBy: admin._id,
        });

        const counsellorIds = counsellors.map((c) => c._id);

        // Total Leads
        const totalLeads = await Contact.countDocuments({
          assignedTo: {
            $in: counsellorIds,
          },
        });

        // Converted Leads
        const convertedLeads = await Contact.countDocuments({
          assignedTo: {
            $in: counsellorIds,
          },
          status: "Converted",
        });

        // Conversion Rate
        const conversionRate =
          totalLeads === 0
            ? 0
            : Number(((convertedLeads / totalLeads) * 100).toFixed(2));

        return {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          isActive: admin.isActive,
          totalCounsellors: counsellors.length,
          totalLeads,
          convertedLeads,
          conversionRate,
        };
      }),
    );

    res.status(200).json({
      success: true,
      admins: data,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

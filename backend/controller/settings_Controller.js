import Setting from "../models/Settings_Model.js";
import Auth from "../models/auth.model.js";
import Activity from "../models/activity.model.js";

// ==============================
// Get Website Settings
// ==============================
export const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create({
        websiteName: "NextGenEdu",
        supportEmail: "info@nextgenedu.com",
        supportPhone: "+91 9876543210",
      });
    }

    return res.status(200).json({
      success: true,
      settings,
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
// Update Website Settings
// ==============================
export const updateSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create(req.body);
    } else {
      settings.websiteName = req.body.websiteName;
      settings.supportEmail = req.body.supportEmail;
      settings.supportPhone = req.body.supportPhone;

      await settings.save();
    }

    await Activity.create({
      action: "Updated Website Settings",
      by: req.user.name,
    });

    return res.status(200).json({
      success: true,
      message: "Settings Updated Successfully",
      settings,
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
// Update Admin Profile
// ==============================
export const updateAdminProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const admin = await Auth.findById(req.user._id).select("+password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    admin.name = name || admin.name;
    admin.email = email || admin.email;

    if (password && password.trim() !== "") {
      admin.password = password;
    }

    await admin.save();

    await Activity.create({
      action: "Updated Admin Profile",
      by: admin.name,
    });

    admin.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
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

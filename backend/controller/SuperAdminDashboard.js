import Auth from "../models/auth.model.js";
import Counsellor from "../models/counsellor.model.js";
import Contact from "../models/Contact.model.js";
import Student from "../models/student.model.js";
import University from "../models/university.model.js";

export const getSuperAdminDashboard = async (req, res) => {
  try {
    // ==========================================
    // ADMINS
    // ==========================================

    const totalAdmins = await Auth.countDocuments({
      role: "Admin",
    });

    const activeAdmins = await Auth.countDocuments({
      role: "Admin",
      isActive: true,
    });

    const inactiveAdmins = await Auth.countDocuments({
      role: "Admin",
      isActive: false,
    });

    // ==========================================
    // COUNSELLORS
    // ==========================================

    const totalCounsellors = await Counsellor.countDocuments();

    const activeCounsellors = await Counsellor.countDocuments({
      status: "Active",
    });

    // ==========================================
    // LEADS
    // ==========================================

    const totalLeads = await Contact.countDocuments();

    const convertedLeads = await Contact.countDocuments({
      status: "Converted",
    });

    // ==========================================
    // STUDENTS
    // ==========================================

    const totalStudents = await Student.countDocuments();

    // ==========================================
    // UNIVERSITIES
    // ==========================================

    const totalUniversities = await University.countDocuments();

    const activeUniversities = await University.countDocuments({
      status: "Active",
    });

    // ==========================================
    // RECENT ADMINS
    // ==========================================

    const recentAdmins = await Auth.find({
      role: "Admin",
    })
      .select("name email phoneNumber isActive lastLogin createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    // ==========================================
    // TOP COUNSELLORS
    // ==========================================

    const topCounsellors = await Counsellor.find()
      .select(
        "name employeeId totalLeads convertedLeads conversionRate status"
      )
      .sort({
        convertedLeads: -1,
        totalLeads: -1,
      })
      .limit(10);

    // ==========================================
    // RECENT LEADS
    // ==========================================

    const recentLeads = await Contact.find()
      .select(
        "leadName phoneNumber status createdAt counsellor"
      )
      .populate(
        "counsellor",
        "name employeeId"
      )
      .sort({
        createdAt: -1,
      })
      .limit(5);

    // ==========================================
    // RECENT STUDENTS
    // ==========================================

    const recentStudents = await Student.find()
      .select(
        "studentName course university admissionStatus paymentStatus createdAt"
      )
      .sort({
        createdAt: -1,
      })
      .limit(5);

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      stats: {
        totalAdmins,
        activeAdmins,
        inactiveAdmins,

        totalCounsellors,
        activeCounsellors,

        totalLeads,
        convertedLeads,

        totalStudents,

        totalUniversities,
        activeUniversities,
      },

      recentAdmins,

      topCounsellors,

      recentLeads,

      recentStudents,
    });
  } catch (error) {
    console.log("SUPER ADMIN DASHBOARD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

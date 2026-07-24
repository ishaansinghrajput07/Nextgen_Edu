import Contact from "../models/Contact.model.js";
import Counsellor from "../models/Counsellor.model.js";
import University from "../models/university.model.js";
import Student from "../models/student.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    // ==========================================
    // LEADS
    // ==========================================

    const totalLeads = await Contact.countDocuments();

    const newLeads = await Contact.countDocuments({
      status: "New",
    });

    const contactedLeads = await Contact.countDocuments({
      status: "Contacted",
    });

    const interestedLeads = await Contact.countDocuments({
      status: "Interested",
    });

    const followUpLeads = await Contact.countDocuments({
      status: "Follow Up",
    });

    const convertedLeads = await Contact.countDocuments({
      status: "Converted",
    });

    const closedLeads = await Contact.countDocuments({
      status: "Closed",
    });

    const conversionRate =
      totalLeads > 0
        ? Number(((convertedLeads / totalLeads) * 100).toFixed(2))
        : 0;

    // ==========================================
    // STUDENTS
    // ==========================================

    const totalStudents = await Student.countDocuments();

    const enrolledStudents = await Student.countDocuments({
      admissionStatus: "Enrolled",
    });

    const feePaidStudents = await Student.countDocuments({
      paymentStatus: "Paid",
    });

    // ==========================================
    // COUNSELLORS
    // ==========================================

    const totalCounsellors = await Counsellor.countDocuments();

    const activeCounsellors = await Counsellor.countDocuments({
      status: "Active",
    });

    // ==========================================
    // UNIVERSITIES
    // ==========================================

    const totalUniversities = await University.countDocuments();

    const activeUniversities = await University.countDocuments({
      status: "Active",
    });

    // ==========================================
    // COMMISSION
    // ==========================================

    const commission = await Student.aggregate([
      {
        $group: {
          _id: null,
          totalCommission: {
            $sum: "$commissionAmount",
          },
        },
      },
    ]);

    const totalCommission =
      commission.length > 0
        ? commission[0].totalCommission
        : 0;

    // ==========================================
    // PAID COMMISSION
    // ==========================================

    const paid = await Student.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          paidCommission: {
            $sum: "$commissionAmount",
          },
        },
      },
    ]);

    const paidCommission =
      paid.length > 0
        ? paid[0].paidCommission
        : 0;

    // ==========================================
    // PENDING COMMISSION
    // ==========================================

    const pendingCommission =
      totalCommission - paidCommission;

    // ==========================================
    // RECENT LEADS
    // ==========================================

    const recentLeads = await Contact.find()
      .select(
        "leadName phoneNumber status counsellor createdAt"
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
        totalLeads,
        newLeads,
        contactedLeads,
        interestedLeads,
        followUpLeads,
        convertedLeads,
        closedLeads,

        conversionRate,

        totalStudents,
        enrolledStudents,
        feePaidStudents,

        totalCounsellors,
        activeCounsellors,

        totalUniversities,
        activeUniversities,

        totalCommission,
        paidCommission,
        pendingCommission,
      },

      recentLeads,

      recentStudents,
    });
  } catch (error) {
    console.log("ADMIN DASHBOARD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
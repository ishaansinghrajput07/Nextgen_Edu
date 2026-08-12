import mongoose from "mongoose";

import Commission from "../models/commission.model.js";
import Counsellor from "../models/counsellor.model.js";
import Activity from "../models/activity.model.js";
import Notification from "../models/notification.model.js";

// ======================================================
// GET MY COMMISSION
// Counsellor Login
// ======================================================

export const getMyCommission = async (req, res) => {
  try {
    console.log("\n=================================");
    console.log("GET MY COMMISSION");
    console.log("=================================");

    // ==========================================
    // LOGGED-IN COUNSELLOR
    // ==========================================

    const counsellorId = req.user._id;

    console.log("REQ USER:", req.user);
    console.log("COUNSELLOR ID:", counsellorId);
    console.log("COUNSELLOR ID STRING:", counsellorId.toString());

    // ==========================================
    // FIND COMMISSIONS
    // ==========================================

    const commissions = await Commission.find({
      counsellor: counsellorId,
    })
      .populate(
        "student",
        "studentName email phoneNumber",
      )
      .populate(
        "university",
        "universityName",
      )
      .populate(
        "course",
        "courseName",
      )
      .populate(
        "admission",
        "admissionNumber admissionStatus",
      )
      .sort({
        createdAt: -1,
      });

    // ==========================================
    // DEBUG COMMISSIONS
    // ==========================================

    console.log(
      "FOUND COMMISSIONS COUNT:",
      commissions.length,
    );

    console.log(
      "FOUND COMMISSIONS:",
      commissions,
    );

    // ==========================================
    // PRINT EACH COMMISSION
    // ==========================================

    commissions.forEach((commission, index) => {
      console.log(`\n----- COMMISSION ${index + 1} -----`);

      console.log(
        "Commission ID:",
        commission._id,
      );

      console.log(
        "Commission Counsellor:",
        commission.counsellor,
      );

      console.log(
        "Amount:",
        commission.amount,
      );

      console.log(
        "Status:",
        commission.status,
      );

      console.log(
        "Paid Amount:",
        commission.paidAmount,
      );

      console.log(
        "Remaining Amount:",
        commission.remainingAmount,
      );

      console.log(
        "Created At:",
        commission.createdAt,
      );
    });

    // ==========================================
    // SUMMARY
    // ==========================================

    const summary = await Commission.aggregate([
      {
        $match: {
          counsellor: counsellorId,
        },
      },

      {
        $group: {
          _id: null,

          totalCommission: {
            $sum: "$amount",
          },

          paidCommission: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "Paid"],
                },
                "$amount",
                0,
              ],
            },
          },

          pendingCommission: {
            $sum: {
              $cond: [
                {
                  $in: [
                    "$status",
                    ["Pending", "Partial"],
                  ],
                },
                "$amount",
                0,
              ],
            },
          },
        },
      },
    ]);

    // ==========================================
    // DEBUG SUMMARY
    // ==========================================

    console.log("\n=================================");
    console.log("COMMISSION SUMMARY");
    console.log("=================================");

    console.log(
      "AGGREGATION RESULT:",
      summary,
    );

    console.log(
      "TOTAL COMMISSION:",
      summary[0]?.totalCommission || 0,
    );

    console.log(
      "PAID COMMISSION:",
      summary[0]?.paidCommission || 0,
    );

    console.log(
      "PENDING COMMISSION:",
      summary[0]?.pendingCommission || 0,
    );

    // ==========================================
    // FINAL RESPONSE
    // ==========================================

    const response = {
      success: true,

      summary: {
        totalCommission:
          summary[0]?.totalCommission || 0,

        paidCommission:
          summary[0]?.paidCommission || 0,

        pendingCommission:
          summary[0]?.pendingCommission || 0,
      },

      commissions,
    };

  

    return res.status(200).json(response);

  } catch (error) {
    console.log("\n=================================");
    console.log("GET MY COMMISSION ERROR");
    console.log("=================================");

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// ADMIN COMMISSION REPORT
// Admin / Super Admin
// ======================================================

export const getAdminCommissionReport = async (req, res) => {
  try {
    const {
      startDate,

      endDate,

      status,

      counsellor,

      university,
    } = req.query;

    let filter = {};

    // STATUS FILTER

    if (status && status !== "All") {
      filter.status = status;
    }

    // COUNSELLOR FILTER

    if (counsellor) {
      filter.counsellor = new mongoose.Types.ObjectId(counsellor);
    }

    // UNIVERSITY FILTER

    if (university) {
      filter.university = new mongoose.Types.ObjectId(university);
    }

    // DATE FILTER

    if (startDate || endDate) {
      filter.createdAt = {};

      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }

      if (endDate) {
        filter.createdAt.$lte = new Date(endDate);
      }
    }

    // ===============================
    // SUMMARY
    // ===============================

    const summary = await Commission.aggregate([
      {
        $match: filter,
      },

      {
        $group: {
          _id: null,

          totalCommission: {
            $sum: "$amount",
          },

          paidCommission: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "Paid"],
                },

                "$amount",

                0,
              ],
            },
          },

          pendingCommission: {
            $sum: {
              $cond: [
                {
                  $in: ["$status", ["Pending", "Partial"]],
                },

                "$amount",

                0,
              ],
            },
          },
        },
      },
    ]);

    // ===============================
    // COUNSELLOR WISE
    // ===============================

    const counsellorWise = await Commission.aggregate([
      {
        $match: filter,
      },

      {
        $group: {
          _id: "$counsellor",

          totalCommission: {
            $sum: "$amount",
          },

          paidCommission: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "Paid"],
                },

                "$amount",

                0,
              ],
            },
          },
        },
      },

      {
        $lookup: {
          from: "counsellors",

          localField: "_id",

          foreignField: "_id",

          as: "counsellor",
        },
      },

      {
        $unwind: "$counsellor",
      },

     {
  $project: {
    _id: 0,

    counsellorId: "$_id",

    counsellorName: "$counsellor.name",

    employeeId: "$counsellor.employeeId",

    totalCommission: 1,

    paidCommission: 1,
  },
}
    ]);

    return res.status(200).json({
      success: true,

      summary: summary[0] || {
        totalCommission: 0,

        paidCommission: 0,

        pendingCommission: 0,
      },

      counsellorWise,
    });
  } catch (error) {
    console.log("ADMIN COMMISSION REPORT ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================================
// UPDATE COMMISSION PAYMENT STATUS
// Admin / Super Admin
// ======================================================

export const updateCommissionPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      status,

      amount,

      paymentMode,

      transactionId,

      referenceNumber,

      remarks,
    } = req.body;

    // ======================================================
    // VALIDATION
    // ======================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,

        message: "Invalid commission id.",
      });
    }

    if (!["Pending", "Partial", "Paid", "Cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,

        message: "Invalid payment status.",
      });
    }

    // ======================================================
    // FIND COMMISSION
    // ======================================================

    const commission = await Commission.findById(id);

    if (!commission) {
      return res.status(404).json({
        success: false,

        message: "Commission not found.",
      });
    }

    // ======================================================
    // UPDATE DETAILS
    // ======================================================

    commission.status = status;

    if (amount) {
      commission.paidAmount = Number(amount);
    }

    commission.remainingAmount = Math.max(
      commission.amount - commission.paidAmount,

      0,
    );

    commission.paymentMode = paymentMode || commission.paymentMode;

    commission.transactionId = transactionId || "";

    commission.referenceNumber = referenceNumber || "";

    commission.remarks = remarks || "";

    // PAYMENT DATE

    if (status === "Paid") {
      commission.paymentDate = new Date();
    }

    // ======================================================
    // PAYMENT HISTORY
    // ======================================================

    if (amount) {
      commission.paymentHistory.push({
        amount: Number(amount),

        paymentDate: new Date(),

        paymentMode: paymentMode || "Bank Transfer",

        transactionId: transactionId || "",

        referenceNumber: referenceNumber || "",

        paidBy: req.user._id,

        remarks: remarks || "",
      });
    }

    await commission.save();

    // ======================================================
    // UPDATE COUNSELLOR SUMMARY
    // ======================================================

    const summary = await Commission.aggregate([
      {
        $match: {
          counsellor: commission.counsellor,
        },
      },

      {
        $group: {
          _id: null,

          totalCommission: {
            $sum: "$amount",
          },

          paidCommission: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "Paid"],
                },

                "$amount",

                0,
              ],
            },
          },
        },
      },
    ]);

    const totalCommission = summary[0]?.totalCommission || 0;

    const paidCommission = summary[0]?.paidCommission || 0;

    await Counsellor.findByIdAndUpdate(
      commission.counsellor,

      {
        totalCommission,

        paidCommission,

        pendingCommission: totalCommission - paidCommission,
      },
    );

    // ======================================================
    // ACTIVITY
    // ======================================================

    await Activity.create({
      action: `Commission payment updated for commission ${commission._id}`,

      by: req.user.name,
    });

    return res.status(200).json({
      success: true,

      message: "Commission payment updated successfully.",

      commission,
    });
  } catch (error) {
    console.log("UPDATE COMMISSION PAYMENT ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================================
// ADD COMMISSION PAYMENT
// Add Payment History
// ======================================================

export const addCommissionPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      amount,
      paymentMode,
      transactionId,
      referenceNumber,
      remarks,
    } = req.body;

    // ======================================================
    // VALIDATION
    // ======================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid commission id.",
      });
    }

    const paymentAmount = Number(amount);

    if (!paymentAmount || paymentAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid payment amount is required.",
      });
    }

    // ======================================================
    // FIND COMMISSION
    // ======================================================

    const commission = await Commission.findById(id);

    if (!commission) {
      return res.status(404).json({
        success: false,
        message: "Commission not found.",
      });
    }

    // ======================================================
    // CALCULATE CURRENT PAID / REMAINING
    // ======================================================

    const currentPaidAmount = Number(
      commission.paymentHistory?.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0,
      ) || 0,
    );

    const currentRemainingAmount = Math.max(
      Number(commission.amount || 0) - currentPaidAmount,
      0,
    );

    // ======================================================
    // PREVENT OVER PAYMENT
    // ======================================================

    if (currentRemainingAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "This commission is already fully paid.",
      });
    }

    if (paymentAmount > currentRemainingAmount) {
      return res.status(400).json({
        success: false,
        message: `Payment cannot exceed pending commission of ₹${currentRemainingAmount}.`,
        remainingAmount: currentRemainingAmount,
      });
    }

    // ======================================================
    // ADD PAYMENT HISTORY
    // ======================================================

    commission.paymentHistory.push({
      amount: paymentAmount,

      paymentDate: new Date(),

      paymentMode: paymentMode || "Bank Transfer",

      transactionId: transactionId || "",

      referenceNumber: referenceNumber || "",

      paidBy: req.user._id,

      remarks: remarks || "",
    });

    // ======================================================
    // RECALCULATE PAYMENT
    // ======================================================

    const totalPaid = commission.paymentHistory.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0,
    );

    const remainingAmount = Math.max(
      Number(commission.amount || 0) - totalPaid,
      0,
    );

    commission.paidAmount = totalPaid;

    commission.remainingAmount = remainingAmount;

    // ======================================================
    // STATUS AUTO UPDATE
    // ======================================================

    if (remainingAmount === 0) {
      commission.status = "Paid";
      commission.paymentDate = new Date();
    } else if (totalPaid > 0) {
      commission.status = "Partial";
    } else {
      commission.status = "Pending";
    }

    await commission.save();

    // ======================================================
    // UPDATE COUNSELLOR SUMMARY
    // ======================================================

    const summary = await Commission.aggregate([
      {
        $match: {
          counsellor: commission.counsellor,
        },
      },

      {
        $group: {
          _id: null,

          // Total commission generated
          totalCommission: {
            $sum: {
              $ifNull: ["$amount", 0],
            },
          },

          // Total amount actually paid
          paidCommission: {
            $sum: {
              $ifNull: ["$paidAmount", 0],
            },
          },

          // Total amount still pending
          pendingCommission: {
            $sum: {
              $ifNull: ["$remainingAmount", 0],
            },
          },
        },
      },
    ]);

    const totalCommission =
      summary[0]?.totalCommission || 0;

    const paidCommission =
      summary[0]?.paidCommission || 0;

    const pendingCommission =
      summary[0]?.pendingCommission || 0;

    await Counsellor.findByIdAndUpdate(
      commission.counsellor,
      {
        totalCommission,
        paidCommission,
        pendingCommission,
      },
    );

    // ======================================================
    // NOTIFICATION
    // ======================================================

    await Notification.create({
      title: "Commission Payment Added",

      message: `Payment of ₹${paymentAmount} added for commission.`,

      receiver: commission.counsellor,

      receiverModel: "Counsellor",

      type: "Commission",

      icon: "IndianRupee",

      link: "/counsellor/commission",

      createdBy: req.user._id,
    });

    // ======================================================
    // RESPONSE
    // ======================================================

    return res.status(200).json({
      success: true,

      message: "Commission payment added successfully.",

      commission,

      summary: {
        totalCommission,
        paidCommission,
        pendingCommission,
      },
    });
  } catch (error) {
    console.log(
      "ADD COMMISSION PAYMENT ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================================
// COUNSELLOR COMMISSION DASHBOARD
// Counsellor Login
// ======================================================

export const getCounsellorCommissionDashboard = async (req, res) => {
  try {
    const counsellorId = req.user._id;

    // ======================================================
    // SUMMARY
    // ======================================================

    const summary = await Commission.aggregate([
      {
        $match: {
          counsellor: new mongoose.Types.ObjectId(counsellorId),
        },
      },

      {
        $group: {
          _id: null,

          totalCommission: {
            $sum: "$amount",
          },

          paidCommission: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "Paid"],
                },

                "$amount",

                0,
              ],
            },
          },

          pendingCommission: {
            $sum: {
              $cond: [
                {
                  $in: ["$status", ["Pending", "Partial"]],
                },

                "$remainingAmount",

                0,
              ],
            },
          },
        },
      },
    ]);

    // ======================================================
    // STUDENT WISE COMMISSION
    // ======================================================

    const studentWise = await Commission.find({
      counsellor: counsellorId,
    })

      .populate("student", "studentName email phoneNumber")

      .populate("university", "universityName")

      .populate("course", "courseName")

      .populate("admission", "admissionNumber admissionStatus")

      .sort({
        createdAt: -1,
      });

    // ======================================================
    // PENDING PAYMENTS
    // ======================================================

    const pendingPayments = await Commission.find({
      counsellor: counsellorId,

      status: {
        $in: ["Pending", "Partial"],
      },
    })

      .populate("student", "studentName phoneNumber")

      .populate("university", "universityName")

      .sort({
        createdAt: -1,
      });

    // ======================================================
    // MONTHLY COMMISSION REPORT
    // ======================================================

    const monthlyReport = await Commission.aggregate([
      {
        $match: {
          counsellor: new mongoose.Types.ObjectId(counsellorId),
        },
      },

      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },

            month: {
              $month: "$createdAt",
            },
          },

          commission: {
            $sum: "$amount",
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

    return res.status(200).json({
      success: true,

      summary: {
        totalCommission: summary[0]?.totalCommission || 0,

        paidCommission: summary[0]?.paidCommission || 0,

        pendingCommission: summary[0]?.pendingCommission || 0,
      },

      studentWise,

      pendingPayments,

      monthlyReport,
    });
  } catch (error) {
    console.log("COUNSELLOR COMMISSION DASHBOARD ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================================
// GET COMMISSION HISTORY
// Admin / Counsellor
// ======================================================

export const getCommissionHistory = async (req, res) => {
  try {
    const {
      counsellor,

      status,

      fromDate,

      toDate,

      page = 1,

      limit = 10,
    } = req.query;

    // ======================================================
    // FILTER
    // ======================================================

    let filter = {};

    // COUNSELLOR LOGIN
    if (req.user.role === "Counsellor") {
      filter.counsellor = req.user._id;
    } else if (counsellor) {
      filter.counsellor = new mongoose.Types.ObjectId(counsellor);
    }

    // STATUS FILTER

    if (status && status !== "All") {
      filter.status = status;
    }

    // DATE FILTER

    if (fromDate || toDate) {
      filter.createdAt = {};

      if (fromDate) {
        filter.createdAt.$gte = new Date(fromDate);
      }

      if (toDate) {
        filter.createdAt.$lte = new Date(toDate);
      }
    }

    // ======================================================
    // PAGINATION
    // ======================================================

    const pageNumber = Math.max(Number(page), 1);

    const pageSize = Math.max(Number(limit), 1);

    const skip = (pageNumber - 1) * pageSize;

    const [total, commissions] = await Promise.all([
      Commission.countDocuments(filter),

      Commission.find(filter)

        .populate("student", "studentName email phoneNumber")

        .populate("counsellor", "name employeeId email")

        .populate("university", "universityName")

        .populate("course", "courseName")

        .populate("admission", "admissionNumber")

        .sort({
          createdAt: -1,
        })

        .skip(skip)

        .limit(pageSize),
    ]);

    return res.status(200).json({
      success: true,

      pagination: {
        total,

        currentPage: pageNumber,

        totalPages: Math.ceil(total / pageSize),

        limit: pageSize,
      },

      commissions,
    });
  } catch (error) {
    console.log("GET COMMISSION HISTORY ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================================
// EXPORT COMMISSION REPORT
// Admin Report Export
// ======================================================

export const exportCommissionReport = async (req, res) => {
  try {
    const {
      counsellor,
      university,
      status,
      fromDate,
      toDate,
    } = req.query;

    let filter = {};

    // ======================================================
    // COUNSELLOR FILTER
    // ======================================================

    if (counsellor) {
      if (!mongoose.Types.ObjectId.isValid(counsellor)) {
        return res.status(400).json({
          success: false,
          message: "Invalid counsellor id.",
        });
      }

      filter.counsellor =
        new mongoose.Types.ObjectId(counsellor);
    }

    // ======================================================
    // UNIVERSITY FILTER
    // ======================================================

    if (university) {
      if (!mongoose.Types.ObjectId.isValid(university)) {
        return res.status(400).json({
          success: false,
          message: "Invalid university id.",
        });
      }

      filter.university =
        new mongoose.Types.ObjectId(university);
    }

    // ======================================================
    // STATUS FILTER
    // ======================================================

    if (status && status !== "All") {
      filter.status = status;
    }

    // ======================================================
    // DATE FILTER
    // ======================================================

    if (fromDate || toDate) {
      filter.createdAt = {};

      if (fromDate) {
        const start = new Date(fromDate);

        if (isNaN(start.getTime())) {
          return res.status(400).json({
            success: false,
            message: "Invalid from date.",
          });
        }

        // Start of selected day
        start.setHours(0, 0, 0, 0);

        filter.createdAt.$gte = start;
      }

      if (toDate) {
        const end = new Date(toDate);

        if (isNaN(end.getTime())) {
          return res.status(400).json({
            success: false,
            message: "Invalid to date.",
          });
        }

        // End of selected day
        end.setHours(23, 59, 59, 999);

        filter.createdAt.$lte = end;
      }
    }

    // ======================================================
    // FETCH COMMISSION REPORT
    // ======================================================

    const report = await Commission.find(filter)
      .populate(
        "student",
        "studentName email phoneNumber"
      )
      .populate(
        "counsellor",
        "name employeeId"
      )
      .populate(
        "university",
        "universityName"
      )
      .populate(
        "course",
        "courseName"
      )
      .sort({
        createdAt: -1,
      })
      .lean();

    // ======================================================
    // FORMAT REPORT
    // ======================================================

    const formattedReport = report.map((item) => ({
      AdmissionNumber:
        item.admission?._id ||
        item.admission ||
        "",

      StudentName:
        item.studentName ||
        item.student?.studentName ||
        "",

      StudentEmail:
        item.student?.email ||
        "",

      StudentPhone:
        item.student?.phoneNumber ||
        "",

      Counsellor:
        item.counsellor?.name ||
        "",

      EmployeeId:
        item.counsellor?.employeeId ||
        "",

      University:
        item.universityName ||
        item.university?.universityName ||
        "",

      Course:
        item.courseName ||
        item.course?.courseName ||
        "",

      CommissionType:
        item.commissionType ||
        "",

      Percentage:
        item.percentage || 0,

      CommissionAmount:
        item.amount || 0,

      PaidAmount:
        item.paidAmount || 0,

      RemainingAmount:
        item.remainingAmount || 0,

      Status:
        item.status ||
        "Pending",

      PaymentDate:
        item.paymentDate ||
        null,

      CreatedAt:
        item.createdAt ||
        null,
    }));

    // ======================================================
    // RESPONSE
    // ======================================================

    return res.status(200).json({
      success: true,

      count: formattedReport.length,

      report: formattedReport,
    });
  } catch (error) {
    console.log(
      "EXPORT COMMISSION REPORT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Failed to export commission report.",
    });
  }
};
// ======================================================
// CREATE COMMISSION
// Called After Admission Create
// ======================================================
export const createCommission = async (req, res) => {
  try {
    const {
      admissionId,
      studentId,
      counsellorId,
      universityId,
      courseId,
      studentName,
      universityName,
      courseName,
      amount,
      percentage,
      createdBy,
    } = req.body;

    // ======================================================
    // VALIDATION
    // ======================================================

    if (
      !admissionId ||
      !studentId ||
      !counsellorId ||
      !universityId ||
      !courseId
    ) {
      return res.status(400).json({
        success: false,
        message: "Required commission data missing.",
      });
    }

    // ======================================================
    // DUPLICATE CHECK
    // ======================================================

    const existingCommission = await Commission.findOne({
      admission: admissionId,
    });

    if (existingCommission) {
      return res.status(400).json({
        success: false,
        message: "Commission already generated for this admission.",
      });
    }

    // ======================================================
    // CREATE COMMISSION
    // ======================================================

    const commission = await Commission.create({
      admission: admissionId,
      student: studentId,
      counsellor: counsellorId,
      university: universityId,
      course: courseId,

      studentName: studentName || "",
      universityName: universityName || "",
      courseName: courseName || "",

      commissionType: "Admission",

      amount: Number(amount || 0),
      percentage: Number(percentage || 0),

      status: "Pending",

      paidAmount: 0,
      remainingAmount: Number(amount || 0),

      createdBy: createdBy || req.user._id,
    });

    // ======================================================
    // UPDATE COUNSELLOR SUMMARY
    // ======================================================

    const summary = await Commission.aggregate([
      {
        $match: {
          counsellor: counsellorId,
        },
      },

      {
        $group: {
          _id: null,

          totalCommission: {
            $sum: "$amount",
          },

          paidCommission: {
            $sum: "$paidAmount",
          },

          pendingCommission: {
            $sum: "$remainingAmount",
          },
        },
      },
    ]);

    await Counsellor.findByIdAndUpdate(
      counsellorId,
      {
        totalCommission:
          summary[0]?.totalCommission || 0,

        paidCommission:
          summary[0]?.paidCommission || 0,

        pendingCommission:
          summary[0]?.pendingCommission || 0,
      }
    );

    // ======================================================
    // NOTIFICATION
    // ======================================================

    await Notification.create({
      title: "Commission Generated",

      message: `Commission of ₹${amount} generated.`,

      receiver: counsellorId,

      receiverModel: "Counsellor",

      type: "Commission",

      icon: "IndianRupee",

      link: "/counsellor/commission",

      createdBy: createdBy || req.user._id,
    });

    // ======================================================
    // RESPONSE
    // ======================================================

    return res.status(201).json({
      success: true,

      message: "Commission generated successfully.",

      commission,
    });

  } catch (error) {
    console.log("CREATE COMMISSION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCommissionPayment = async (req, res) => {
  try {
    const { id, paymentId } = req.params;

    // ======================================================
    // VALIDATION
    // ======================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid commission id.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment id.",
      });
    }

    // ======================================================
    // FIND COMMISSION
    // ======================================================

    const commission = await Commission.findById(id);

    if (!commission) {
      return res.status(404).json({
        success: false,
        message: "Commission not found.",
      });
    }

    // ======================================================
    // FIND PAYMENT
    // ======================================================

    const payment = commission.paymentHistory.id(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
      });
    }

    // Payment amount save kar lo notification ke liye
    const deletedPaymentAmount = Number(payment.amount || 0);

    // ======================================================
    // DELETE PAYMENT
    // ======================================================

    payment.deleteOne();

    // ======================================================
    // RECALCULATE PAYMENT
    // ======================================================

    const totalPaid = commission.paymentHistory.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    commission.paidAmount = totalPaid;

    commission.remainingAmount = Math.max(
      Number(commission.amount || 0) - totalPaid,
      0
    );

    // ======================================================
    // UPDATE STATUS
    // ======================================================

    if (commission.remainingAmount === 0) {
      commission.status = "Paid";
      commission.paymentDate = new Date();
    } else if (totalPaid > 0) {
      commission.status = "Partial";
      commission.paymentDate = null;
    } else {
      commission.status = "Pending";
      commission.paymentDate = null;
    }

    await commission.save();

    // ======================================================
    // UPDATE COUNSELLOR SUMMARY
    // ======================================================

    const summary = await Commission.aggregate([
      {
        $match: {
          counsellor: commission.counsellor,
        },
      },

      {
        $group: {
          _id: null,

          totalCommission: {
            $sum: {
              $ifNull: ["$amount", 0],
            },
          },

          paidCommission: {
            $sum: {
              $ifNull: ["$paidAmount", 0],
            },
          },

          pendingCommission: {
            $sum: {
              $ifNull: ["$remainingAmount", 0],
            },
          },
        },
      },
    ]);

    const totalCommission =
      summary[0]?.totalCommission || 0;

    const paidCommission =
      summary[0]?.paidCommission || 0;

    const pendingCommission =
      summary[0]?.pendingCommission || 0;

    await Counsellor.findByIdAndUpdate(
      commission.counsellor,
      {
        totalCommission,
        paidCommission,
        pendingCommission,
      }
    );

    // ======================================================
    // NOTIFICATION
    // ======================================================

    await Notification.create({
      title: "Commission Payment Deleted",

      message: `Commission payment of ₹${deletedPaymentAmount} was deleted.`,

      receiver: commission.counsellor,

      receiverModel: "Counsellor",

      type: "Commission",

      icon: "IndianRupee",

      link: "/counsellor/commission",

      createdBy: req.user._id,
    });

    // ======================================================
    // RESPONSE
    // ======================================================

    return res.status(200).json({
      success: true,

      message: "Commission payment deleted successfully.",

      commission,

      summary: {
        totalCommission,
        paidCommission,
        pendingCommission,
      },
    });

  } catch (error) {
    console.log(
      "DELETE COMMISSION PAYMENT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
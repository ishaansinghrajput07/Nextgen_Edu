import Contact from "../models/Contact.model.js";
import Student from "../models/student.model.js";
import Counsellor from "../models/counsellor.model.js";
import Activity from "../models/activity.model.js";
import Auth from "../models/Auth.model.js";

import { sendEmail, sendWelcomeEmail } from "./email_controller.js";

import {
  sendAdminNotification,
  sendCounsellorNotification,
} from "./notification_controller.js";

// =====================================================
// SUBMIT CONTACT FORM (WEBSITE LEAD)
// =====================================================

export const submitContactForm = async (req, res) => {
  try {
    const { leadName, email, phoneNumber, interestedCourse, message, source } =
      req.body;

    // ===============================
    // Validation
    // ===============================

    if (!leadName || !phoneNumber || !interestedCourse) {
      return res.status(400).json({
        success: false,

        message: "Lead name, phone number and course are required",
      });
    }

    // ===============================
    // Duplicate Check
    // ===============================

    const existingLead = await Contact.findOne({
      phoneNumber,
    });

    if (existingLead) {
      return res.status(400).json({
        success: false,

        message: "Lead already exists with this phone number",
      });
    }

    // ===============================
    // Create Lead
    // ===============================

    const contact = await Contact.create({
      leadNumber: `LEAD-${Date.now()}`,

      leadName,

      email,

      phoneNumber,

      interestedCourse,

      message,

      source: source || "Website",

      timeline: [
        {
          title: "Lead Created",

          description: "Lead submitted from website",

          date: new Date(),
        },
      ],

      statusHistory: [
        {
          status: "New",

          date: new Date(),
        },
      ],
    });

    // ===============================
    // Activity
    // ===============================

    await Activity.create({
      action: `New Lead Created (${contact.leadName})`,

      by: "Website",
    });

    // =================================
    // SEND EMAIL TO LEAD
    // =================================

    if (email) {
      await sendEmail({
        receiver: email,

        subject: "Thank You For Contacting NextGen Education",

        message: `
Hello ${leadName},

Thank you for contacting NextGen Education.

Our counsellor will contact you soon.

Interested Course:
${interestedCourse}


Regards,
NextGen Education Team
`,

        type: "Welcome",
      });
    }

    // =================================
    // SEND EMAIL TO ADMIN
    // =================================

    await sendEmail({
      receiver: process.env.EMAIL_USER,

      subject: "New Website Lead Received",

      message: `
Hello Admin,

A new lead has been received from website.


Lead Details:

Name:
${leadName}

Email:
${email}

Phone:
${phoneNumber}

Course:
${interestedCourse}

Message:
${message || "No message"}

Source:
${source || "Website"}


Please check admin dashboard.

Regards,
NextGen Education Team
`,

      type: "Lead",
    });
    // =================================
    // NOTIFY ADMIN
    // =================================

  // =================================
// NOTIFY ADMIN
// =================================

const admins = await Auth.find({
  role: "Admin",
});


for (const admin of admins) {

  await sendAdminNotification({

    adminId: admin._id,

    title: "New Website Lead",

    message: `New lead received from ${leadName}`,

    type: "Lead",

    createdBy: null,

  });

}

    return res.status(201).json({
      success: true,

      message: "Contact form submitted successfully",

      contact,
    });
  } catch (error) {
    console.log("SUBMIT CONTACT ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Server Error",

      error: error.message,
    });
  }
};

// =====================================================
// ADMIN CREATE MANUAL LEAD
// =====================================================

export const createLead = async (req, res) => {
  try {
    const {
      leadName,

      email,

      phoneNumber,

      qualification,

      interestedCourse,

      message,

      source,

      counsellor,

      notes,
    } = req.body;

    // ===============================
    // Duplicate Check
    // ===============================

    const existingLead = await Contact.findOne({
      phoneNumber,
    });

    if (existingLead) {
      return res.status(400).json({
        success: false,

        message: "Lead already exists",
      });
    }

    // ===============================
    // Create Lead
    // ===============================

    const lead = await Contact.create({
      leadNumber: `LEAD-${Date.now()}`,

      leadName,

      email,

      phoneNumber,

      qualification,

      interestedCourse,

      message,

      source,

      counsellor,

      notes,

      timeline: [
        {
          title: "Lead Created",

          description: `${req.user.name} created this lead`,

          date: new Date(),
        },
      ],

      statusHistory: [
        {
          status: "New",

          date: new Date(),
        },
      ],
    });

    // ===============================
    // Activity Log
    // ===============================

    await Activity.create({
      action: `Lead Created (${lead.leadName})`,

      by: req.user.name,
    });

    // =================================
    // SEND EMAIL
    // =================================

    if (email) {
      await sendEmail({
        receiver: email,

        subject: "Thank You For Contacting NextGen Education",

        message: `
Hello ${leadName},

Your enquiry has been received successfully.

Our counsellor will contact you soon.

Thank You,
NextGen Education Team
`,

        type: "Welcome",

        sentBy: req.user._id,
      });
    }

    // =================================
    // ADMIN NOTIFICATION
    // =================================

    await sendAdminNotification({
      adminId: req.user._id,

      title: "New Lead Created",

      message: `${lead.leadName} lead has been created`,

      type: "Lead",

      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,

      message: "Lead created successfully",

      lead,
    });
  } catch (error) {
    console.log("CREATE LEAD ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Server Error",

      error: error.message,
    });
  }
};

// =====================================================
// GET ALL LEADS
// =====================================================

export const getAllLeads = async (req, res) => {
  try {
    const {
      page = 1,

      limit = 10,

      search = "",

      status,

      counsellor,

      source,
    } = req.query;

    const query = {};

    // ===============================
    // Search
    // ===============================

    if (search) {
      query.$or = [
        {
          leadName: {
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
          email: {
            $regex: search,

            $options: "i",
          },
        },
      ];
    }

    // ===============================
    // Filters
    // ===============================

    if (status) {
      query.status = status;
    }

    if (counsellor) {
      query.counsellor = counsellor;
    }

    if (source) {
      query.source = source;
    }

    // ===============================
    // Pagination
    // ===============================

    const skip = (Number(page) - 1) * Number(limit);

    const total = await Contact.countDocuments(query);

    const leads = await Contact.find(query)

      .populate("counsellor", "name email employeeId")

      .sort({
        createdAt: -1,
      })

      .skip(skip)

      .limit(Number(limit));

    return res.status(200).json({
      success: true,

      total,

      currentPage: Number(page),

      totalPages: Math.ceil(total / Number(limit)),

      leads,
    });
  } catch (error) {
    console.log("GET ALL LEADS ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

// =====================================================
// GET SINGLE LEAD
// =====================================================

export const getSingleLead = async (req, res) => {
  try {
    const lead = await Contact.findById(req.params.id).populate(
      "counsellor",
      "name email employeeId phoneNumber",
    );

    if (!lead) {
      return res.status(404).json({
        success: false,

        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,

      lead,
    });
  } catch (error) {
    console.log("GET SINGLE LEAD ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

// =====================================================
// GET COUNSELLOR MY LEADS
// =====================================================

export const getMyLeads = async (req, res) => {
  try {
    const leads = await Contact.find({
      counsellor: req.user._id,
    })

      .populate("counsellor", "name email employeeId")

      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,

      count: leads.length,

      leads,
    });
  } catch (error) {
    console.log("GET MY LEADS ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

// =====================================================
// UPDATE LEAD
// =====================================================

export const updateLead = async (req, res) => {
  try {
    const lead = await Contact.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,

        message: "Lead not found",
      });
    }

    const oldStatus = lead.status;

    const oldCounsellor = lead.counsellor;

    // ========================================
    // STATUS UPDATE
    // ========================================

    if (req.body.status && req.body.status !== lead.status) {
      lead.status = req.body.status;

      lead.statusHistory.push({
        status: req.body.status,

        date: new Date(),
      });

      lead.timeline.push({
        title: "Status Updated",

        description: `Status changed to ${req.body.status}`,

        date: new Date(),
      });

      await Activity.create({
        action: `${lead.leadName} status changed to ${req.body.status}`,

        by: req.user.name,
      });
    }

    // =================================
    // COUNSELLOR NOTIFICATION
    // =================================

    // ========================================
    // COUNSELLOR ASSIGN
    // ========================================

    if (
      req.body.counsellor &&
      String(req.body.counsellor) !== String(lead.counsellor)
    ) {
      lead.counsellor = req.body.counsellor;

      await sendCounsellorNotification({
        counsellorId: req.body.counsellor,

        title: "New Lead Assigned",

        message: `Lead ${lead.leadName} has been assigned to you`,

        type: "Lead",

        createdBy: req.user._id,
      });

      lead.assignmentHistory.push({
        counsellor: req.body.counsellor,

        date: new Date(),
      });

      const counsellor = await Counsellor.findById(req.body.counsellor);

      lead.timeline.push({
        title: "Lead Assigned",

        description: `Assigned to ${counsellor?.name || "Counsellor"}`,

        date: new Date(),
      });

      await Activity.create({
        action: `Lead Assigned (${lead.leadName}) to ${counsellor?.name || "Counsellor"}`,

        by: req.user.name,
      });
    }

    // ========================================
    // NOTES UPDATE
    // ========================================

    if (req.body.notes !== undefined) {
      lead.notes = req.body.notes;

      lead.timeline.push({
        title: "Note Updated",

        description: "Lead note updated",

        date: new Date(),
      });
    }

    // ========================================
    // FOLLOW UP UPDATE
    // ========================================

    if (req.body.followUps) {
      lead.followUps = req.body.followUps;

      lead.timeline.push({
        title: "Follow Up Added",

        description: "New follow up added",

        date: new Date(),
      });
    }

    // ========================================
    // Other Fields Update
    // ========================================

    const allowedFields = [
      "leadName",

      "email",

      "phoneNumber",

      "qualification",

      "interestedCourse",

      "message",

      "source",

      "university",

      "country",

      "intake",

      "tuitionFee",

      "commissionPercent",

      "commissionAmount",

      "paymentStatus",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        lead[field] = req.body[field];
      }
    });

    await lead.save();

    // ========================================
    // Counsellor Stats Update
    // ========================================

    const updateCounsellorStats = async (counsellorId) => {
      if (!counsellorId) return;

      const totalLeads = await Contact.countDocuments({
        counsellor: counsellorId,
      });

      const convertedLeads = await Contact.countDocuments({
        counsellor: counsellorId,

        status: "Converted",
      });

      const conversionRate =
        totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

      await Counsellor.findByIdAndUpdate(
        counsellorId,

        {
          totalLeads,

          convertedLeads,

          conversionRate,
        },
      );
    };

    await updateCounsellorStats(lead.counsellor);

    if (oldCounsellor && String(oldCounsellor) !== String(lead.counsellor)) {
      await updateCounsellorStats(oldCounsellor);
    }

    return res.status(200).json({
      success: true,

      message: "Lead updated successfully",

      lead,
    });
  } catch (error) {
    console.log("UPDATE LEAD ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Server Error",

      error: error.message,
    });
  }
};

// =====================================================
// HANDLE STUDENT CREATION FROM LEAD
// =====================================================

export const handleStudentConversion = async (lead, oldStatus, req) => {
  try {
    // ============================================
    // REMOVE STUDENT IF CONVERSION CANCELLED
    // ============================================

    if (oldStatus === "Converted" && lead.status !== "Converted") {
      const student = await Student.findOne({
        lead: lead._id,
      });

      if (student) {
        await student.deleteOne();

        await Activity.create({
          action: `Student removed (${lead.leadName})`,

          by: req.user.name,
        });
      }

      return;
    }

    // ============================================
    // CREATE STUDENT WHEN CONVERTED
    // ============================================

    if (oldStatus !== "Converted" && lead.status === "Converted") {
      const existingStudent = await Student.findOne({
        lead: lead._id,
      });

      if (!existingStudent) {
        const student = await Student.create({
          studentNumber: `STD-${Date.now()}`,

          lead: lead._id,

          studentName: lead.leadName,

          email: lead.email,

          phoneNumber: lead.phoneNumber,

          counsellor: lead.counsellor,

          university: lead.university,

          course: lead.interestedCourse,

          country: lead.country,

          intake: lead.intake,

          tuitionFee: lead.tuitionFee,

          commissionPercent: lead.commissionPercent,

          commissionAmount: lead.commissionAmount,

          paymentStatus: lead.paymentStatus,

          paymentDate: lead.paymentStatus === "Paid" ? new Date() : null,

          admissionStatus: "Applied",

          timeline: [
            {
              title: "Student Created",

              description: "Lead converted into student",

              date: new Date(),
            },
          ],
        });

        await Activity.create({
          action: `Lead Converted to Student (${student.studentName})`,

          by: req.user.name,
        });
      }
    }

    // ============================================
    // UPDATE STUDENT DATA
    // ============================================

    if (lead.status === "Converted") {
      const student = await Student.findOne({
        lead: lead._id,
      });

      if (student) {
        student.studentName = lead.leadName;

        student.email = lead.email;

        student.phoneNumber = lead.phoneNumber;

        student.counsellor = lead.counsellor;

        student.university = lead.university;

        student.course = lead.interestedCourse;

        student.country = lead.country;

        student.intake = lead.intake;

        student.tuitionFee = lead.tuitionFee;

        student.commissionPercent = lead.commissionPercent;

        student.commissionAmount = lead.commissionAmount;

        student.paymentStatus = lead.paymentStatus;

        if (lead.paymentStatus === "Paid") {
          if (!student.paymentDate) {
            student.paymentDate = new Date();
          }
        } else {
          student.paymentDate = null;
        }

        student.timeline.push({
          title: "Student Updated",

          description: "Student data synced from lead",

          date: new Date(),
        });

        await student.save();
      }
    }
  } catch (error) {
    console.log("HANDLE STUDENT CONVERSION ERROR:", error);

    throw error;
  }
};

// =====================================================
// COUNSELLOR UPDATE OWN LEAD
// =====================================================

export const updateCounsellorLead = async (req, res) => {
  try {
    const lead = await Contact.findOne({
      _id: req.params.id,

      counsellor: req.user._id,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,

        message: "Lead not found",
      });
    }

    const oldStatus = lead.status;

    // ==========================================
    // STATUS UPDATE
    // ==========================================

    if (req.body.status && req.body.status !== lead.status) {
      lead.status = req.body.status;

      lead.statusHistory.push({
        status: req.body.status,

        date: new Date(),
      });

      lead.timeline.push({
        title: "Status Updated",

        description: `${req.user.name} changed status to ${req.body.status}`,

        date: new Date(),
      });

      await Activity.create({
        action: `${lead.leadName} status changed to ${req.body.status}`,

        by: req.user.name,
      });
    }

    // ==========================================
    // NOTES
    // ==========================================

    if (req.body.notes !== undefined) {
      lead.notes = req.body.notes;

      lead.timeline.push({
        title: "Note Updated",

        description: "Lead note updated",

        date: new Date(),
      });
    }

    // ==========================================
    // FOLLOW UP
    // ==========================================

    if (req.body.followUps) {
      lead.followUps = req.body.followUps;

      lead.timeline.push({
        title: "Follow Up Added",

        description: "Follow up updated",

        date: new Date(),
      });
    }

    await lead.save();

    // ==========================================
    // STUDENT SYNC
    // ==========================================

    await handleStudentConversion(
      lead,

      oldStatus,

      req,
    );

    // ==========================================
    // UPDATE COUNSELLOR STATS
    // ==========================================

    const totalLeads = await Contact.countDocuments({
      counsellor: req.user._id,
    });

    const convertedLeads = await Contact.countDocuments({
      counsellor: req.user._id,

      status: "Converted",
    });

    const conversionRate =
      totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

    await Counsellor.findByIdAndUpdate(
      req.user._id,

      {
        totalLeads,

        convertedLeads,

        conversionRate,
      },
    );

    await Activity.create({
      action: `Counsellor updated lead (${lead.leadName})`,

      by: req.user.name,
    });

    return res.status(200).json({
      success: true,

      message: "Lead updated successfully",

      lead,
    });
  } catch (error) {
    console.log("COUNSELLOR UPDATE LEAD ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Server Error",

      error: error.message,
    });
  }
};

// =====================================================
// GET COUNSELLOR SINGLE LEAD
// =====================================================

export const getCounsellorLead = async (req, res) => {
  try {
    const lead = await Contact.findOne({
      _id: req.params.id,

      counsellor: req.user._id,
    })

      .populate(
        "counsellor",

        "name email employeeId",
      );

    if (!lead) {
      return res.status(404).json({
        success: false,

        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,

      lead,
    });
  } catch (error) {
    console.log("GET COUNSELLOR LEAD ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

// =====================================================
// GET RECENT LEADS
// =====================================================

export const getRecentLeads = async (req, res) => {
  try {
    const recentLeads = await Contact.find()

      .sort({
        createdAt: -1,
      })

      .limit(5)

      .populate(
        "counsellor",

        "name email",
      );

    return res.status(200).json({
      success: true,

      recentLeads,
    });
  } catch (error) {
    console.log("RECENT LEADS ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

// =====================================================
// GET COUNSELLOR PROFILE
// =====================================================

export const getCounsellorProfile = async (req, res) => {
  try {
    const counsellor = await Counsellor.findById(req.user._id);

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
    console.log("COUNSELLOR PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

// =====================================================
// DELETE LEAD
// =====================================================

export const deleteLead = async (req, res) => {
  try {
    const lead = await Contact.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,

        message: "Lead not found",
      });
    }

    const leadName = lead.leadName;

    // Delete Lead

    await lead.deleteOne();

    // Delete Related Student

    await Student.findOneAndDelete({
      lead: lead._id,
    });

    // Activity Log

    await Activity.create({
      action: `Lead Deleted (${leadName})`,

      by: req.user.name,
    });

    return res.status(200).json({
      success: true,

      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.log("DELETE LEAD ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Server Error",

      error: error.message,
    });
  }
};

// =====================================================
// LEAD STATISTICS
// =====================================================

export const getLeadStats = async (req, res) => {
  try {
    const totalLeads = await Contact.countDocuments();

    const newLeads = await Contact.countDocuments({
      status: "New",
    });

    const contacted = await Contact.countDocuments({
      status: "Contacted",
    });

    const interested = await Contact.countDocuments({
      status: "Interested",
    });

    const followUp = await Contact.countDocuments({
      status: "Follow Up",
    });

    const converted = await Contact.countDocuments({
      status: "Converted",
    });

    const closed = await Contact.countDocuments({
      status: "Closed",
    });

    const conversionRate =
      totalLeads > 0 ? Math.round((converted / totalLeads) * 100) : 0;

    return res.status(200).json({
      success: true,

      stats: {
        totalLeads,

        newLeads,

        contacted,

        interested,

        followUp,

        converted,

        closed,

        conversionRate,
      },
    });
  } catch (error) {
    console.log("LEAD STATS ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

// =====================================================
// FINAL EXPORT
// =====================================================

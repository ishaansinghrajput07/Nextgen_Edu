import Contact from "../models/Contact.model.js";
import Student from "../models/student.model.js";
import Admission from "../models/admission.model.js";
import Counsellor from "../models/counsellor.model.js";
import Activity from "../models/activity.model.js";
import Auth from "../models/auth.model.js";
import mongoose from "mongoose";
import University from "../models/university.model.js";
import Course from "../models/course_model.js";
import Counter from "../models/Counter.model.js";
import Notification from "../models/notification.model.js";
import Email from "../models/email.model.js";

import { sendEmail, sendWelcomeEmail } from "./email_controller.js";

import {
  sendAdminNotification,
  sendCounsellorNotification,
} from "./notification_controller.js";

import {
  getActorName,
  normalizeLeadPayload,
  normalizePhoneNumber,
  refreshCounsellorPerformance,
  syncStudentForLead,
} from "../util/workflow.js";

const allowedLeadSources = [
  "Website",
  "Manual",
  "Google",
  "Facebook",
  "Instagram",
  "WhatsApp",
  "Referral",
  "Walk In",
  "Home Page",
  "Contact Form",
  "Other",
];

const normalizeSource = (source) =>
  allowedLeadSources.includes(source) ? source : "Other";

const duplicatePhoneQuery = (phoneNumber) => {
  const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);

  return {
    $or: [
      {
        phoneNumber,
      },
      {
        normalizedPhoneNumber,
      },
    ],
  };
};

const loadLeadWorkflow = async (leadId, isCounsellorView = false) => {
  const lead = await Contact.findById(leadId).populate(
    "counsellor",
    "name email employeeId phoneNumber",
  );

  if (!lead) {
    return {
      lead: null,
      student: null,
      admission: null,
    };
  }

  const student = await Student.findOne({
    lead: lead._id,
  }).populate("counsellor", "name email employeeId phoneNumber");

  const admission = await Admission.findOne({
    lead: lead._id,
  })
    .populate("student", "studentNumber studentName email phoneNumber")
    .populate("counsellor", "name email employeeId phoneNumber")
    .populate("university", "universityName country state city")
    .populate("course", "courseName duration fees")
    .sort({
      createdAt: -1,
    })
    .lean();

  if (isCounsellorView && admission) {
    delete admission.universityCommissionPercent;
    delete admission.universityCommissionAmount;
    delete admission.universityPaymentStatus;
    delete admission.universityPayments;
    delete admission.tuitionFee;
    delete admission.netFee;
  }

  return {
    lead,
    student,
    admission,
  };
};

// =====================================================
// WEBSITE CONTACT FORM
// =====================================================

export const submitContactForm = async (req, res) => {
  try {
    const payload = normalizeLeadPayload(req.body);

   const {
  leadName,
  email,
  phoneNumber,
  state,
  qualification,
  interestedCourse,
  message,
  source,
} = payload;

    const existingLead = await Contact.findOne(
      duplicatePhoneQuery(phoneNumber),
    );

    if (existingLead) {
      return res.status(400).json({
        success: false,
        message: "Lead already exists",
      });
    }

   const contact = await Contact.create({
  leadNumber: `LEAD-${Date.now()}`,
  leadName,
  email,
  phoneNumber,
  normalizedPhoneNumber: normalizePhoneNumber(phoneNumber),

  state,

  qualification,
  interestedCourse,
  message,
  source: normalizeSource(source),

  status: "New",

  timeline: [
    {
      title: "Lead Created",
      description: "Website lead created",
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

    await Activity.create({
      action: `Website Lead Created (${contact.leadName})`,
      by: "Website",
    });

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

State:
${state}

Regards,
NextGen Education Team
`,
        type: "Welcome",
      });
    }

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

State:
${state}

Course:
${interestedCourse}

Message:
${message || "No message"}

Source:
${normalizeSource(source)}

Please check admin dashboard.

Regards,
NextGen Education Team
`,
      type: "Lead",
    });

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

    const existingLead = await Contact.findOne(
      duplicatePhoneQuery(phoneNumber),
    );

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

      normalizedPhoneNumber: normalizePhoneNumber(phoneNumber),

      qualification,

      interestedCourse,

      message,

      source: normalizeSource(source),

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
    const { lead, student, admission } = await loadLeadWorkflow(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      lead,
      student,
      admission,
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
// ASSIGN COUNSELLOR TO LEAD
// =====================================================

export const assignCounsellor = async (req, res) => {
  try {
    const { id } = req.params;

    const { counsellorId } = req.body;

    // ========================================
    // Validation
    // ========================================

    if (!counsellorId) {
      return res.status(400).json({
        success: false,
        message: "Counsellor is required",
      });
    }

    // ========================================
    // Find Lead
    // ========================================

    const lead = await Contact.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    // ========================================
    // Find Counsellor
    // ========================================

    const counsellor = await Counsellor.findById(counsellorId);

    if (!counsellor) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not found",
      });
    }

    // ========================================
    // Already Assigned Check
    // ========================================

    if (lead.counsellor && String(lead.counsellor) === String(counsellorId)) {
      return res.status(400).json({
        success: false,
        message: "Lead is already assigned to this counsellor",
      });
    }

    // ========================================
    // Assign Counsellor
    // ========================================

    const previousCounsellor = lead.counsellor;

    lead.counsellor = counsellor._id;

    lead.contactedBy = counsellor.name || "";

    lead.contactedAt = new Date();

    // ========================================
    // ARRAY INITIALIZATION
    // ========================================

    if (!lead.assignmentHistory) {
      lead.assignmentHistory = [];
    }

    if (!lead.timeline) {
      lead.timeline = [];
    }
    console.log("assignmentHistory:", lead.assignmentHistory);
    console.log("timeline:", lead.timeline);
    // ========================================
    // Assignment History
    // ========================================

    lead.assignmentHistory.push({
      counsellor: counsellor._id,
      counsellorName: counsellor.name,
      date: new Date(),
    });

    // ========================================
    // Timeline
    // ========================================

    lead.timeline.push({
      title: "Counsellor Assigned",
      description: `${counsellor.name} has been assigned to this lead`,
      date: new Date(),
    });

    // ========================================
    // Activity Log
    // ========================================

    await Activity.create({
      action: `Lead Assigned (${lead.leadName}) to ${counsellor.name}`,
      by: req.user.name,
    });

    // ========================================
    // Save Lead
    // ========================================

    await lead.save();

    // ========================================
    // Update Counsellor Statistics
    // ========================================

    await refreshCounsellorPerformance(counsellor._id);

    if (
      previousCounsellor &&
      String(previousCounsellor) !== String(counsellor._id)
    ) {
      await refreshCounsellorPerformance(previousCounsellor);
    }

    // ========================================
    // SEND EMAIL TO COUNSELLOR
    // ========================================

    if (counsellor.email) {
      await sendEmail({
        receiver: counsellor.email,

        subject: "New Lead Assigned - NextGen Education",

        message: `
Hello ${counsellor.name},

A new lead has been assigned to you.

Lead Details

Lead Number:
${lead.leadNumber}

Lead Name:
${lead.leadName}

Phone:
${lead.phoneNumber}

Email:
${lead.email || "N/A"}

Interested Course:
${lead.interestedCourse || "N/A"}

Source:
${lead.source}

Please contact the student as soon as possible.

Regards,
NextGen Education Team
`,

        type: "Lead",
      });
    }

    // ========================================
    // SEND COUNSELLOR NOTIFICATION
    // ========================================

    await sendCounsellorNotification({
      counsellorId: counsellor._id,

      title: "New Lead Assigned",

      message: `${lead.leadName} has been assigned to you.`,

      type: "Lead",

      createdBy: req.user._id,
    });

    // ========================================
    // SEND ADMIN NOTIFICATION (OPTIONAL)
    // ========================================

    await sendAdminNotification({
      adminId: req.user._id,

      title: "Lead Assigned Successfully",

      message: `${lead.leadName} assigned to ${counsellor.name}`,

      type: "Lead",

      createdBy: req.user._id,
    });

    // ========================================
    // RETURN RESPONSE
    // ========================================

    return res.status(200).json({
      success: true,

      message: "Counsellor assigned successfully",

      lead: await Contact.findById(lead._id).populate(
        "counsellor",
        "name email employeeId phoneNumber",
      ),
    });
  } catch (error) {
    console.log("ASSIGN COUNSELLOR ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
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

    const oldCounsellor = lead.counsellor;
    const oldStatus = lead.status;

    // ========================================
    // ARRAY INITIALIZATION FOR OLD DATA
    // ========================================

    if (!lead.statusHistory) {
      lead.statusHistory = [];
    }

    if (!lead.timeline) {
      lead.timeline = [];
    }

    if (!lead.assignmentHistory) {
      lead.assignmentHistory = [];
    }

    if (!lead.followUps) {
      lead.followUps = [];
    }

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

      if (req.user) {
        await Activity.create({
          action: `${lead.leadName} status changed to ${req.body.status}`,

          by: req.user.name,
        });
      }
    }

    // ========================================
    // COUNSELLOR ASSIGN
    // ========================================

    if (
      req.body.counsellor &&
      String(req.body.counsellor) !== String(lead.counsellor)
    ) {
      const counsellor = await Counsellor.findById(req.body.counsellor);

      if (!counsellor) {
        return res.status(404).json({
          success: false,
          message: "Counsellor not found",
        });
      }

      lead.counsellor = counsellor._id;

      lead.assignmentHistory.push({
        counsellor: counsellor._id,
        counsellorName: counsellor.name,
        date: new Date(),
      });

      lead.timeline.push({
        title: "Lead Assigned",
        description: `Assigned to ${counsellor.name}`,
        date: new Date(),
      });

      if (req.user) {
        await Activity.create({
          action: `Lead Assigned (${lead.leadName}) to ${counsellor.name}`,
          by: req.user.name,
        });
      }

      await sendCounsellorNotification({
        counsellorId: counsellor._id,
        title: "New Lead Assigned",
        message: `Lead ${lead.leadName} has been assigned to you`,
        type: "Lead",
        createdBy: req.user?._id,
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
    // ENROLLMENT UPDATE
    // ========================================

    if (req.body.enrollmentStatus) {
      lead.enrollmentStatus = req.body.enrollmentStatus;
    }

    if (req.body.enrollment) {
      lead.enrollment = req.body.enrollment;
    }

    // ========================================
    // COMMISSION UPDATE
    // ========================================

    if (req.body.commission) {
      lead.commission = req.body.commission;
    }

    // ========================================
    // OTHER FIELDS UPDATE
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
      "applicationStatus",
      "enrollmentStatus",
    ];

    console.log("BODY =>", req.body);
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        lead[field] = req.body[field];
      }
    });
    console.log("ENROLLMENT STATUS BEFORE SAVE =>", lead.enrollmentStatus);

    await lead.save();

    await handleStudentConversion(lead, oldStatus, req);

    await refreshCounsellorPerformance(lead.counsellor);

    if (oldCounsellor && String(oldCounsellor) !== String(lead.counsellor)) {
      await refreshCounsellorPerformance(oldCounsellor);
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
    console.log("HANDLE_STUDENT_CONVERSION =>", {
      leadId: lead?._id,
      oldStatus,
      newStatus: lead?.status,
      counsellor: lead?.counsellor,
    });
    // ============================================
    // IF LEAD MOVED AWAY FROM ENROLLED, REMOVE ADMISSION
    // ============================================
    if (oldStatus === "Enrolled" && lead.status !== "Enrolled") {
      try {
        const admission = await Admission.findOne({ lead: lead._id });

        if (admission) {
          // remove admission record
          await Admission.findByIdAndDelete(admission._id);

          // reset student fields
          await Student.findByIdAndUpdate(admission.student, {
            admissionStatus: "Interested",
            university: "",
            course: "",
            intake: "",
          });

          // reset lead application status
          await Contact.findByIdAndUpdate(lead._id, {
            applicationStatus: "Not Applied",
          });

          // decrement counsellor convertedLeads if applicable
          if (admission.counsellor) {
            await Counsellor.findByIdAndUpdate(admission.counsellor, {
              $inc: { convertedLeads: -1 },
            });
          }

          await Activity.create({
            action: `Admission removed for lead ${lead.leadName}`,
            by: req?.user?.name || "System",
          });
        }
      } catch (err) {
        console.log("ERROR REMOVING ADMISSION ON STATUS CHANGE:", err);
      }
    }
    // ============================================
    // REMOVE STUDENT IF CONVERSION CANCELLED
    // ============================================

    // Only remove student when conversion is cancelled (not when moving to Enrolled)
    if (
      oldStatus === "Converted" &&
      !["Converted", "Enrolled"].includes(lead.status)
    ) {
      const student = await Student.findOne({
        lead: lead._id,
      });

      if (student) {
        console.log("Removing student for lead:", lead._id);
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

      console.log("Conversion: existingStudent check =>", {
        existingStudent: !!existingStudent,
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

        console.log("Student created from lead:", {
          studentId: student._id,
          lead: lead._id,
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

    // ============================================
    // ENSURE STUDENT REMAINS/UPDATED WHEN ENROLLED
    // ============================================

    if (lead.status === "Enrolled") {
      let student = await Student.findOne({ lead: lead._id });

      const enrollmentUniversityId = lead.enrollment?.university;
      const enrollmentCourseId = lead.enrollment?.course;

      let enrollmentUniversityName = lead.university || "";
      let enrollmentCourseName = lead.interestedCourse || "";

      if (
        enrollmentUniversityId &&
        mongoose.Types.ObjectId.isValid(enrollmentUniversityId)
      ) {
        const enrollmentUniversity = await University.findById(
          enrollmentUniversityId,
        );
        if (enrollmentUniversity) {
          enrollmentUniversityName = enrollmentUniversity.universityName;
        }
      }

      if (
        enrollmentCourseId &&
        mongoose.Types.ObjectId.isValid(enrollmentCourseId)
      ) {
        const enrollmentCourse = await Course.findById(enrollmentCourseId);
        if (enrollmentCourse) {
          enrollmentCourseName = enrollmentCourse.courseName;
        }
      }

      if (!student) {
        // create student if missing (use lead snapshot)
        student = await Student.create({
          studentNumber: `STD-${Date.now()}`,
          lead: lead._id,
          studentName: lead.leadName,
          email: lead.email,
          phoneNumber: lead.phoneNumber,
          counsellor: lead.counsellor || null,
          university: enrollmentUniversityName,
          course: enrollmentCourseName,
          country: lead.country || "",
          intake: lead.intake || "",
          tuitionFee: lead.tuitionFee || 0,
          commissionPercent: lead.commissionPercent || 0,
          commissionAmount: lead.commissionAmount || 0,
          paymentStatus: lead.paymentStatus || "Pending",
          admissionStatus: "Enrolled",
          timeline: [
            {
              title: "Student Created (Enrolled)",
              description: "Student record created when lead moved to Enrolled",
              date: new Date(),
            },
          ],
        });

        await Activity.create({
          action: `Student Created (Enrolled) (${student.studentName})`,
          by: req.user?.name || "System",
        });
      } else {
        // update existing student to mark enrolled
        student.admissionStatus = "Enrolled";
        student.university = enrollmentUniversityName;
        student.course = enrollmentCourseName;

        if (!student.timeline) student.timeline = [];

        student.timeline.push({
          title: "Student Enrolled",
          description: `Marked as Enrolled from lead ${lead.leadName}`,
          date: new Date(),
        });

        await student.save();
      }

      // ensure lead/contact reflects enrollment
      if (lead.enrollmentStatus !== "Enrolled") {
        lead.enrollmentStatus = "Enrolled";
        if (!lead.timeline) lead.timeline = [];
        lead.timeline.push({
          title: "Enrolled",
          description: `Student marked as Enrolled`,
          date: new Date(),
        });
        await lead.save();
      }

      // ============================================
      // AUTO-CREATE ADMISSION WHEN ENROLLED AND ENROLLMENT DATA AVAILABLE
      // - Only create if no active admission exists for this lead
      // - Require enrollment.university and enrollment.course to be valid ObjectIds
      // ============================================
      try {
        const existingAdmission = await Admission.findOne({
          lead: lead._id,
          admissionStatus: {
            $nin: ["Cancelled", "Admission Cancelled", "Rejected", "Withdrawn"],
          },
        });

        const enrollUniv = lead.enrollment?.university;
        const enrollCourse = lead.enrollment?.course;

        if (
          !existingAdmission &&
          enrollUniv &&
          enrollCourse &&
          mongoose.Types.ObjectId.isValid(enrollUniv) &&
          mongoose.Types.ObjectId.isValid(enrollCourse)
        ) {
          const [universityData, courseData, studentRecord] = await Promise.all(
            [
              University.findById(enrollUniv),
              Course.findById(enrollCourse),
              Student.findOne({ lead: lead._id }),
            ],
          );

          if (universityData && courseData && studentRecord) {
            const counter = await Counter.findOneAndUpdate(
              { name: "admission" },
              { $inc: { sequence: 1 } },
              { new: true, upsert: true },
            );

            const admissionNumber = `ADM-${String(counter.sequence).padStart(6, "0")}`;

            const finalTuitionFee = Number(
              lead.enrollment?.tuitionFee || courseData.fees || 0,
            );

            const universityCommissionPercent = Number(
              lead.commission?.collegePercentage ?? lead.commissionPercent ?? 0,
            );

            const counsellorCommissionPercent = Number(
              lead.commission?.counsellorPercentage ?? 0,
            );

            const netFee = Math.max(
              finalTuitionFee - (lead.enrollment?.scholarshipAmount || 0),
              0,
            );

            const universityCommissionAmount =
              (netFee * universityCommissionPercent) / 100;

            const counsellorCommissionAmount =
              (universityCommissionAmount * counsellorCommissionPercent) / 100;

            const counsellorId = lead.counsellor || studentRecord.counsellor;

            const counsellorData = counsellorId
              ? await Counsellor.findById(counsellorId)
              : null;

            const admissionResult = await Admission.create([
              {
                admissionNumber,
                lead: lead._id,
                student: studentRecord._id,
                counsellor: counsellorData?._id || null,
                university: universityData._id,
                course: courseData._id,
                createdBy: req.user?._id || null,
                studentName: studentRecord.studentName,
                studentEmail: studentRecord.email || "",
                studentPhone: studentRecord.phoneNumber || "",
                universityName: universityData.universityName,
                courseName: courseData.courseName,
                intake: lead.enrollment?.intake || studentRecord.intake || "",
                country:
                  lead.enrollment?.country || studentRecord.country || "India",
                admissionDate: new Date(),
                tuitionFee: finalTuitionFee,
                scholarshipAmount: Number(
                  lead.enrollment?.scholarshipAmount || 0,
                ),
                netFee,
                universityCommissionPercent,
                universityCommissionAmount: universityCommissionAmount,
                counsellorCommissionPercent,
                counsellorCommissionAmount,
                paymentDueDate: lead.enrollment?.paymentDueDate || null,
                notes: lead.notes || "",
                admissionStatus: "Enrolled",
                applicationStatus: "Enrolled",
                enrollmentStatus: "Enrolled",
                timeline: [
                  {
                    title: "Admission Created",
                    description: `Admission ${admissionNumber} auto-created on enrollment.`,
                    createdBy: req.user?._id || null,
                    date: new Date(),
                  },
                ],
              },
            ]);

            const createdAdmission = admissionResult[0];

            // Update student and lead similar to regular admission flow
            await Student.findByIdAndUpdate(studentRecord._id, {
              university: universityData.universityName,
              course: courseData.courseName,
              country:
                lead.enrollment?.country || studentRecord.country || "India",
              intake: lead.enrollment?.intake || studentRecord.intake || "",
              tuitionFee: finalTuitionFee,
              commissionPercent: counsellorCommissionPercent,
              commissionAmount: counsellorCommissionAmount,
              admissionStatus: "Enrolled",
              $push: {
                timeline: {
                  title: "Admission Created",
                  description: `Admission ${admissionNumber} created for enrolled lead.`,
                  date: new Date(),
                },
              },
            });

            await Contact.findByIdAndUpdate(lead._id, {
              status: "Enrolled",
              applicationStatus: "Enrolled",
              university: universityData.universityName,
              country: lead.enrollment?.country || "India",
              intake: lead.enrollment?.intake || "",
              tuitionFee: finalTuitionFee,
              commissionAmount: counsellorCommissionAmount,
              paymentStatus: "Pending",
              $push: {
                timeline: {
                  title: "Admission Created",
                  description: `Lead enrollment created admission ${admissionNumber}.`,
                  date: new Date(),
                },
              },
            });

            // notify admins and counsellor
            const admins = await Auth.find({
              role: { $in: ["SuperAdmin", "Admin"] },
              isActive: true,
            });

            if (admins.length) {
              const adminNotifications = admins.map((admin) => ({
                title: "New Admission Created",
                message: `Admission ${admissionNumber} created for ${studentRecord.studentName}.`,
                receiver: admin._id,
                receiverModel: "Auth",
                type: "Admission",
                icon: "GraduationCap",
                link: `/admin/admissions/${createdAdmission._id}`,
                createdBy: req.user?._id || null,
              }));

              await Notification.insertMany(adminNotifications);
            }

            if (counsellorData) {
              await Notification.create({
                title: "Admission Created",
                message: `Admission ${admissionNumber} has been created successfully.`,
                receiver: counsellorData._id,
                receiverModel: "Counsellor",
                type: "Admission",
                icon: "UserCheck",
                link: `/counsellor/admissions/${createdAdmission._id}`,
                createdBy: req.user?._id || null,
              });
            }

            // email logs (non-blocking)
            const emailLogs = [];
            if (studentRecord.email) {
              emailLogs.push({
                receiver: studentRecord.email,
                subject: "Admission Created Successfully",
                message: `Dear ${studentRecord.studentName}, your admission ${admissionNumber} has been created successfully.`,
                type: "Admission",
                sentBy: req.user?._id || null,
              });
            }
            if (universityData.email) {
              emailLogs.push({
                receiver: universityData.email,
                subject: "New Student Admission",
                message: `New admission received for ${studentRecord.studentName} in ${courseData.courseName}.`,
                type: "Admission",
                sentBy: req.user?._id || null,
              });
            }
            if (emailLogs.length) await Email.insertMany(emailLogs);
          }
        }
      } catch (err) {
        console.log("AUTO CREATE ADMISSION ERROR:", err);
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
    const { id } = req.params;

    // ==========================================
    // FIND LEAD
    // ==========================================

    const lead = await Contact.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    // ==========================================
    // OLD STATUS
    // ==========================================

    const oldStatus = lead.status;

    // ==========================================
    // ASSIGNED COUNSELLOR
    // ==========================================

    let counsellor = null;

    if (lead.assignedTo) {
      counsellor = await Counsellor.findById(lead.assignedTo);
    }

    // ==========================================
    // UPDATE FIELDS
    // ==========================================

    if (req.body.username !== undefined) {
      lead.username = req.body.username.trim();
    }

    if (req.body.leadName !== undefined) {
      lead.leadName = req.body.leadName.trim();
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

    // ==========================================
    // NOTES
    // ==========================================

    if (req.body.notes !== undefined) {
      lead.notes = req.body.notes;

      if (!lead.timeline) {
        lead.timeline = [];
      }

      lead.timeline.push({
        title: "Note Updated",
        description: "Lead note updated",
        date: new Date(),
      });
    }

    // ==========================================
    // FOLLOW UPS
    // ==========================================

    if (req.body.followUps !== undefined) {
      lead.followUps = req.body.followUps;

      if (!lead.timeline) {
        lead.timeline = [];
      }

      lead.timeline.push({
        title: "Follow Up Updated",
        description: "Follow up updated",
        date: new Date(),
      });
    }

    // ==========================================
    // SAVE LEAD
    // ==========================================

    await lead.save();

    // ==========================================
    // STUDENT CONVERSION
    // ==========================================

    await handleStudentConversion(lead, oldStatus, req);

    // ==========================================
    // COUNSELLOR STATS
    // ==========================================

    if (counsellor) {
      const totalLeads = await Contact.countDocuments({
        assignedTo: counsellor._id,
      });

      const convertedLeads = await Contact.countDocuments({
        assignedTo: counsellor._id,
        status: "Converted",
      });

      const conversionRate =
        totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

      await Counsellor.findByIdAndUpdate(counsellor._id, {
        totalLeads,
        convertedLeads,
        conversionRate,
      });
    }

    // ==========================================
    // ACTIVITY LOG
    // ==========================================

    await Activity.create({
      action: `${req.user.role || "User"} updated lead (${lead.leadName || lead.username || "Unknown"})`,
      by: req.user.name || req.user.email || "User",
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      lead,
    });
  } catch (error) {
    console.log("❌ COUNSELLOR UPDATE LEAD ERROR:", error);

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
    const { lead, student, admission } = await loadLeadWorkflow(
      req.params.id,
      true,
    );

    if (
      !lead ||
      !lead.counsellor ||
      String(lead.counsellor._id) !== String(req.user._id)
    ) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      lead,
      student,
      admission,
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

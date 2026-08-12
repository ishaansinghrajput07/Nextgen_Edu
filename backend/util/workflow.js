import mongoose from "mongoose";

import Admission from "../models/admission.model.js";
import Contact from "../models/Contact.model.js";
import Student from "../models/student.model.js";
import Counsellor from "../models/counsellor.model.js";
import Activity from "../models/activity.model.js";

export const ACTIVE_ADMISSION_STATUSES = [
  "Applied",
  "Documents Verified",
  "Offer Letter",
  "Fee Paid",
  "Enrolled",
];

export const ADMISSION_REVERSAL_STATUSES = [
  "Document Pending",
  "Documents Pending",
  "Admission Cancelled",
  "Cancelled",
  "Rejected",
  "Withdrawn",
];

export const FINANCIAL_FIELDS = [
  "tuitionFee",
  "scholarshipAmount",
  "netFee",
  "universityCommissionPercent",
  "universityCommissionAmount",
  "universityPaymentStatus",
  "universityPaymentDate",
  "universityPaymentReference",
  "universityInvoiceNumber",
  "universityPayments",
  "counsellorCommissionPercent",
  "counsellorCommissionAmount",
  "counsellorPaymentStatus",
  "counsellorPaymentDate",
  "counsellorPaymentReference",
  "counsellorPayments",
];

export const normalizePhoneNumber = (phone = "") =>
  String(phone).replace(/\D/g, "").trim();

export const normalizeLeadPayload = (payload = {}) => {
  const leadName =
    payload.leadName ||
    payload.name ||
    payload.username ||
    "";

  const phoneNumber =
    payload.phoneNumber ||
    payload.phone ||
    "";

  const interestedCourse =
    payload.interestedCourse ||
    payload.course ||
    payload.program ||
    payload.customCourse || "";

  return {
    leadName: String(leadName).trim(),

    email: String(payload.email || "")
      .trim()
      .toLowerCase(),

    phoneNumber: String(phoneNumber).trim(),

    normalizedPhoneNumber:
      normalizePhoneNumber(phoneNumber),

    // ✅ NEW
    state: String(payload.state || "").trim(),

    qualification:
      String(payload.qualification || "").trim(),

    // ✅ Handles normal + custom courses
    interestedCourse:
      String(interestedCourse).trim(),

    message:
      String(payload.message || "").trim(),

    source:
      payload.source || "Website",
  };
};

export const normalizeAdmissionStatus = (status = "") => {
  if (status === "Document Pending") return "Documents Pending";
  if (status === "Admission Cancelled") return "Cancelled";
  return status;
};

export const isAdmissionReversalStatus = (status = "") =>
  ADMISSION_REVERSAL_STATUSES.includes(status);

export const getActorName = (req) => req?.user?.name || "System";

export const isCounsellor = (user) => user?.role === "Counsellor";

export const isAdminRole = (user) =>
  ["Admin", "SuperAdmin"].includes(user?.role);

const sessionOption = (session) => (session ? { session } : {});

const withSession = (query, session) => (session ? query.session(session) : query);

const objectId = (id) =>
  id instanceof mongoose.Types.ObjectId
    ? id
    : new mongoose.Types.ObjectId(String(id));

export const logActivity = async ({ action, by = "System", session = null }) => {
  if (!action) return null;

  const payload = {
    action,
    by,
  };

  if (session) {
    const [activity] = await Activity.create([payload], { session });
    return activity;
  }

  return Activity.create(payload);
};

export const recalculateCounsellorStats = async (
  counsellorId,
  session = null,
) => {
  if (!counsellorId) return null;

  const id = objectId(counsellorId);

  const [totalLeads, convertedLeads, admissionCount] = await Promise.all([
    withSession(Contact.countDocuments({ counsellor: id }), session),
    withSession(
      Contact.countDocuments({
        counsellor: id,
        status: "Converted",
      }),
      session,
    ),
    withSession(
      Admission.countDocuments({
        counsellor: id,
        admissionStatus: {
          $in: ACTIVE_ADMISSION_STATUSES,
        },
      }),
      session,
    ),
  ]);

  const conversionRate =
    totalLeads > 0 ? Number(((convertedLeads / totalLeads) * 100).toFixed(2)) : 0;

  return withSession(
    Counsellor.findByIdAndUpdate(
      id,
      {
        totalLeads,
        convertedLeads,
        conversionRate,
        admissionCount,
      },
      {
        new: true,
      },
    ),
    session,
  );
};

export const recalculateCounsellorCommission = async (
  counsellorId,
  session = null,
) => {
  if (!counsellorId) return null;

  const id = objectId(counsellorId);

  const pipeline = [
    {
      $match: {
        counsellor: id,
        admissionStatus: {
          $nin: ADMISSION_REVERSAL_STATUSES,
        },
        counsellorPaymentStatus: {
          $ne: "Cancelled",
        },
      },
    },
    {
      $group: {
        _id: null,
        totalCommission: {
          $sum: "$counsellorCommissionAmount",
        },
        paidCommission: {
          $sum: {
            $cond: [
              {
                $eq: ["$counsellorPaymentStatus", "Paid"],
              },
              "$counsellorCommissionAmount",
              0,
            ],
          },
        },
      },
    },
  ];

  const aggregate = Admission.aggregate(pipeline);

  if (session) {
    aggregate.session(session);
  }

  const summary = await aggregate;

  const totalCommission = summary[0]?.totalCommission || 0;
  const paidCommission = summary[0]?.paidCommission || 0;

  return withSession(
    Counsellor.findByIdAndUpdate(
      id,
      {
        totalCommission,
        paidCommission,
        pendingCommission: Math.max(totalCommission - paidCommission, 0),
      },
      {
        new: true,
      },
    ),
    session,
  );
};

export const refreshCounsellorPerformance = async (
  counsellorId,
  session = null,
) => {
  if (!counsellorId) return null;

  await recalculateCounsellorStats(counsellorId, session);
  return recalculateCounsellorCommission(counsellorId, session);
};

export const syncStudentForLead = async ({
  lead,
  oldStatus,
  actorName = "System",
  session = null,
}) => {
  if (!lead) return { student: null };

  const wasConverted = oldStatus === "Converted";
  const isConverted = lead.status === "Converted";

  if (wasConverted && !isConverted) {
    const student = await withSession(
      Student.findOne({
        lead: lead._id,
      }),
      session,
    );

    if (student) {
      await Admission.deleteMany(
        {
          $or: [
            {
              lead: lead._id,
            },
            {
              student: student._id,
            },
          ],
        },
        sessionOption(session),
      );

      await student.deleteOne(sessionOption(session));

      lead.timeline.push({
        title: "Student Removed",
        description:
          "Converted status was removed; linked student and admission data were deleted.",
        date: new Date(),
      });

      await lead.save(sessionOption(session));

      await logActivity({
        action: `Student removed (${lead.leadName}) after conversion reversal`,
        by: actorName,
        session,
      });
    }

    await refreshCounsellorPerformance(lead.counsellor, session);

    return {
      student: null,
      removedStudent: Boolean(student),
    };
  }

  if (!isConverted) {
    return {
      student: null,
    };
  }

  let student = await withSession(
    Student.findOne({
      lead: lead._id,
    }),
    session,
  );

  if (!student) {
    const [createdStudent] = await Student.create(
      [
        {
          studentNumber: `STD-${Date.now()}`,
          lead: lead._id,
          studentName: lead.leadName,
          email: lead.email,
          phoneNumber: lead.phoneNumber,
          counsellor: lead.counsellor || null,
          university: lead.university || "",
          course: lead.interestedCourse || "",
          country: lead.country || "",
          intake: lead.intake || "",
          admissionStatus: "New",
          timeline: [
            {
              title: "Student Created",
              description: "Lead converted into student",
              date: new Date(),
            },
          ],
        },
      ],
      sessionOption(session),
    );

    student = createdStudent;

    lead.timeline.push({
      title: "Student Created",
      description: "Lead converted into a student profile",
      date: new Date(),
    });

    await lead.save(sessionOption(session));

    await logActivity({
      action: `Lead Converted to Student (${student.studentName})`,
      by: actorName,
      session,
    });
  } else {
    student.studentName = lead.leadName;
    student.email = lead.email || "";
    student.phoneNumber = lead.phoneNumber || "";
    student.counsellor = lead.counsellor || null;
    student.university = lead.university || "";
    student.course = lead.interestedCourse || "";
    student.country = lead.country || "";
    student.intake = lead.intake || "";
    await student.save(sessionOption(session));
  }

  await refreshCounsellorPerformance(lead.counsellor, session);

  return {
    student,
    createdStudent: !wasConverted,
  };
};

export const clearAdmissionFinancials = (admission) => {
  admission.tuitionFee = 0;
  admission.scholarshipAmount = 0;
  admission.netFee = 0;
  admission.universityCommissionPercent = 0;
  admission.universityCommissionAmount = 0;
  admission.universityPaymentStatus = "Pending";
  admission.universityPaymentDate = null;
  admission.universityPaymentReference = "";
  admission.universityInvoiceNumber = "";
  admission.universityPayments = [];
  admission.counsellorCommissionPercent = 0;
  admission.counsellorCommissionAmount = 0;
  admission.counsellorPaymentStatus = "Cancelled";
  admission.counsellorPaymentDate = null;
  admission.counsellorPaymentReference = "";
  admission.counsellorPayments = [];
};

export const sanitizeAdmissionForCounsellor = (admission) => {
  if (!admission) return admission;

  const sanitized = {
    ...admission,
  };

  delete sanitized.tuitionFee;
  delete sanitized.scholarshipAmount;
  delete sanitized.netFee;
  delete sanitized.universityCommissionPercent;
  delete sanitized.universityCommissionAmount;
  delete sanitized.universityPaymentStatus;
  delete sanitized.universityPaymentDate;
  delete sanitized.universityPaymentReference;
  delete sanitized.universityInvoiceNumber;
  delete sanitized.universityPayments;
  return sanitized;
};

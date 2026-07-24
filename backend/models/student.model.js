import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    // =================================
    // Student Number
    // =================================

    studentNumber: {
      type: String,
      unique: true,
      trim: true,
    },

    // =================================
    // Lead Reference
    // =================================

    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },

    // =================================
    // Student Details
    // =================================

    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      default: "",
    },

    phoneNumber: {
      type: String,
      default: "",
    },

    // =================================
    // Counsellor
    // =================================

    counsellor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Counsellor",
      default: null,
    },

    // =================================
    // Education / Admission Info
    // =================================

    university: {
      type: String,
      default: "",
    },

    course: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    intake: {
      type: String,
      default: "",
    },

    // =================================
    // Fees
    // =================================

    tuitionFee: {
      type: Number,
      default: 0,
    },

    commissionPercent: {
      type: Number,
      default: 0,
    },

    commissionAmount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Partial", "Paid"],
      default: "Pending",
    },

    paymentDate: {
      type: Date,
      default: null,
    },

    // =================================
    // Student Status
    // =================================

    admissionStatus: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Interested",
        "Applied",
        "Offer Letter",
        "Fee Paid",
        "Enrolled",
        "Rejected",
        "Cancelled",
      ],
      default: "New",
    },

    // =================================
    // Documents
    // =================================

    documents: [
      {
        name: String,

        url: String,

        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // =================================
    // Notes
    // =================================

    notes: {
      type: String,
      default: "",
    },

    // =================================
    // Timeline
    // =================================

    timeline: [
      {
        title: {
          type: String,
          default: "",
        },

        description: {
          type: String,
          default: "",
        },

        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  {
    timestamps: true,
  },
);

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;

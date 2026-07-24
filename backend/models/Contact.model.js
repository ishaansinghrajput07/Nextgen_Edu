import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    // ============================================
    // Lead Number
    // ============================================

    leadNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    // ============================================
    // Lead Details
    // ============================================

    leadName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    qualification: {
      type: String,
      default: "",
      trim: true,
    },

    interestedCourse: {
      type: String,
      default: "",
      trim: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================================
    // Lead Source
    // ============================================

    source: {
      type: String,
      enum: [
        "Website",
        "Manual",
        "Google",
        "Facebook",
        "Instagram",
        "WhatsApp",
        "Referral",
        "Walk In",
        "Other",
      ],
      default: "Website",
    },

    // ============================================
    // Lead Status
    // ============================================

    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Interested",
        "Follow Up",
        "Converted",
        "Closed",
      ],
      default: "New",
    },

    // ============================================
    // Counsellor Assignment
    // ============================================

    counsellor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Counsellor",
      default: null,
    },

    contactedBy: {
      type: String,
      default: "",
      trim: true,
    },

    contactedAt: {
      type: Date,
      default: null,
    },
        // ============================================
    // Education / Admission Information
    // ============================================

    university: {
      type: String,
      default: "",
      trim: true,
    },

    country: {
      type: String,
      default: "",
      trim: true,
    },

    intake: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================================
    // Fees & Commission
    // ============================================

    tuitionFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    commissionPercent: {
      type: Number,
      default: 0,
      min: 0,
    },

    commissionAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Partial",
        "Paid",
      ],
      default: "Pending",
    },

    paymentDate: {
      type: Date,
      default: null,
    },

    // ============================================
    // Application Status
    // ============================================

    applicationStatus: {
      type: String,
      enum: [
        "Not Applied",
        "Applied",
        "Offer Letter",
        "Fee Paid",
        "Enrolled",
        "Rejected",
        "Cancelled",
      ],
      default: "Not Applied",
    },

    // ============================================
    // Notes
    // ============================================

    notes: {
      type: String,
      default: "",
      trim: true,
    },
        // ============================================
    // Follow Ups
    // ============================================

    followUps: [
      {
        text: {
          type: String,
          default: "",
          trim: true,
        },

        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // ============================================
    // Timeline
    // ============================================

    timeline: [
      {
        title: {
          type: String,
          default: "",
          trim: true,
        },

        description: {
          type: String,
          default: "",
          trim: true,
        },

        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // ============================================
    // Status History
    // ============================================

    statusHistory: [
      {
        status: {
          type: String,
          enum: [
            "New",
            "Contacted",
            "Interested",
            "Follow Up",
            "Converted",
            "Closed",
          ],
        },

        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // ============================================
    // Assignment History
    // ============================================

    assignmentHistory: [
      {
        counsellor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Counsellor",
          default: null,
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
  }
);

// ============================================
// Indexes
// ============================================

// Fast Search by Lead Number


// Phone Search
contactSchema.index({
  phoneNumber: 1,
});

// Email Search
contactSchema.index({
  email: 1,
});

// Status Filter
contactSchema.index({
  status: 1,
});

// Counsellor Filter
contactSchema.index({
  counsellor: 1,
});

// Course Filter
contactSchema.index({
  interestedCourse: 1,
});

// Compound Index
contactSchema.index({
  counsellor: 1,
  status: 1,
});

// ============================================
// Model
// ============================================

const Contact =
  mongoose.models.Contact ||
  mongoose.model("Contact", contactSchema);

export default Contact;